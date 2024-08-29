#!/usr/bin/env -S yarn tsx

/// <reference lib="ESNext" />

// Do this as the first thing so that any code reading it knows the right env.
// process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = "production";

import * as esbuild from "esbuild";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

const path: typeof import("path") = require("path");
const chalk: typeof import("react-dev-utils/chalk") = require("react-dev-utils/chalk");
const fs: typeof import("fs-extra") = require("fs-extra");
const bfj: typeof import("bfj") = require("bfj");
const configFactory: typeof import("../config/esbuild.config").configFactory =
  require("../config/esbuild.config").configFactory;
const paths: typeof import("../config/paths").default =
  require("../config/paths").default;
const checkRequiredFiles: typeof import("react-dev-utils/checkRequiredFiles") = require("react-dev-utils/checkRequiredFiles");
const formatWebpackMessages: typeof import("react-dev-utils/formatWebpackMessages") = require("react-dev-utils/formatWebpackMessages");
const printHostingInstructions: typeof import("react-dev-utils/printHostingInstructions") = require("react-dev-utils/printHostingInstructions");
const FileSizeReporter: typeof import("react-dev-utils/FileSizeReporter") = require("react-dev-utils/FileSizeReporter");
const printBuildError: typeof import("react-dev-utils/printBuildError") = require("react-dev-utils/printBuildError");

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;
// const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const useYarn = fs.existsSync(paths.yarnLockFile);

// // These sizes are pretty large. We'll warn for bundles exceeding them.
// const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
// const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const argv = process.argv.slice(2);
const writeStatsJson = argv.indexOf("--stats") !== -1;

// Generate configuration
const config = configFactory("production");

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.

const checkBrowsers: typeof import("./utils/browsersHelper").checkBrowsers =
  require("./utils/browsersHelper").checkBrowsers;

checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // First, read the current file sizes in build directory.
    // This lets us display how much they changed later.
    return measureFileSizesBeforeBuild(paths.appBuild);
  })
  .then(async (previousFileSizes) => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuild);
    // Merge with the public folder
    copyPublicFolder();
    // Start the esbuild build
    return build(previousFileSizes).then(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ metafile, previousFileSizes, warnings }) => {
        if (warnings.length) {
          console.log(chalk.yellow("Compiled with warnings.\n"));
          console.log(warnings.join("\n\n"));
          console.log(
            "\nSearch for the " +
              chalk.underline(chalk.yellow("keywords")) +
              " to learn more about each warning."
          );
          console.log(
            "To ignore, add " +
              chalk.cyan("// eslint-disable-next-line") +
              " to the line before.\n"
          );
        } else {
          console.log(chalk.green("Compiled successfully.\n"));
        }

        console.log(metafile);

        // console.log("File sizes after gzip: ", metafile ?? "unknown...");
        // printFileSizesAfterBuild(
        //   metafile,
        //   previousFileSizes,
        //   paths.appBuild,
        //   WARN_AFTER_BUNDLE_GZIP_SIZE,
        //   WARN_AFTER_CHUNK_GZIP_SIZE
        // );
        console.log();

        const appPackage = require(paths.appPackageJson);
        const publicUrl = paths.publicUrlOrPath;
        const publicPath = config.publicPath;
        const buildFolder = path.relative(process.cwd(), paths.appBuild);
        return printHostingInstructions(
          appPackage,
          publicUrl,
          publicPath,
          buildFolder,
          useYarn
        );
      },
      (err) => {
        const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === "true";
        if (tscCompileOnError) {
          console.log(
            chalk.yellow(
              "Compiled with the following type errors (you may want to check these before deploying your app):\n"
            )
          );
          printBuildError(err);
        } else {
          console.log(chalk.red("Failed to compile.\n"));
          printBuildError(err);
          process.exit(1);
        }
      }
    );
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  console.log("Creating an optimized production build...");

  const compiler = esbuild;
  return new Promise<{
    metafile: esbuild.Metafile;
    previousFileSizes: any;
    warnings: esbuild.Message[];
  }>((resolve, reject) => {
    compiler
      .build(config)
      .then(
        ({ errors, warnings, metafile, outputFiles /** mangleCache */ }) => {
          if (outputFiles && outputFiles.length < 0) {
            // Only when "write: false"
            for (const file of outputFiles) {
              console.log(
                file.path,
                file.contents,
                file.hash,
                file.text,
                file.contents.BYTES_PER_ELEMENT
              );
            }
          }
          let messages;
          if (errors.length < 0) {
            errors.forEach((error) => {
              const err = new Error(error.text ?? undefined, { cause: error });
              if (!err.message) {
                return reject(err);
              }
              let errMessage = err.message;

              // Add additional information for postcss errors
              if (Object.prototype.hasOwnProperty.call(err, "postcssNode")) {
                errMessage +=
                  "\nCompileError: Begins at CSS selector " +
                  err["postcssNode"].selector;
              }

              messages = formatWebpackMessages({
                errors: [errMessage],
                warnings: [],
                _showErrors: true,
                _showWarnings: true,
              });
            });
          } else {
            messages = formatWebpackMessages(
              //stats.toJson({ all: false, warnings: true, errors: true })
              {
                errors: errors.map((e) => e.text),
                warnings: warnings.map((e) => e.text),
                _showErrors: true,
                _showWarnings: true,
              }
            );
          }
          if (messages.errors.length) {
            // Only keep the first error. Others are often indicative
            // of the same problem, but confuse the reader with noise.
            if (messages.errors.length > 1) {
              messages.errors.length = 1;
            }
            return reject(new Error(messages.errors.join("\n\n")));
          }
          if (
            process.env.CI &&
            (typeof process.env.CI !== "string" ||
              process.env.CI.toLowerCase() !== "false") &&
            messages.warnings.length
          ) {
            // Ignore sourcemap warnings in CI builds. See #8227 for more info.
            const filteredWarnings = messages.warnings.filter(
              (w) => !/Failed to parse source map/.test(w)
            );
            if (filteredWarnings.length) {
              console.log(
                chalk.yellow(
                  "\nTreating warnings as errors because process.env.CI = true.\n" +
                    "Most CI servers set it automatically.\n"
                )
              );
              return reject(new Error(filteredWarnings.join("\n\n")));
            }
          }

          // const stats = {
          //   compilation: {

          //   } satisfies webpack.Stats['compilation']
          // } satisfies webpack.Stats;

          const resolveArgs = {
            metafile, // stats,
            previousFileSizes,
            warnings: warnings, // messages.warnings,
          };

          if (writeStatsJson) {
            return bfj
              .write(
                paths.appBuild + "/bundle-stats.json",
                metafile /** stats.toJson() */
              )
              .then(() => resolve(resolveArgs))
              .catch((error) => reject(new Error(error)));
          }
          return resolve(resolveArgs);
        }
      );
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: (file) => file !== paths.appHtml,
  });
}
