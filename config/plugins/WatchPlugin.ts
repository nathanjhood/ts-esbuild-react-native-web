import * as esbuild from "esbuild";
const chalk: typeof import("react-dev-utils/chalk") = require("react-dev-utils/chalk");
const printBuildError: typeof import("react-dev-utils/printBuildError") = require("react-dev-utils/printBuildError");

const onStartCallback: () => Promise<esbuild.OnStartResult> = () => {
  let errors: esbuild.PartialMessage[] = [];
  let warnings: esbuild.PartialMessage[] = [];
  const result: esbuild.OnStartResult = {
    errors: errors || [],
    warnings: warnings || [],
  };
  return new Promise<typeof result>((resolve, reject) => {
    if (errors.length) reject(result);
    return resolve(result);
  });
};

const onEndCallback: (
  result: esbuild.BuildResult
) => Promise<esbuild.OnEndResult> = ({
  errors,
  metafile,
  warnings,
  outputFiles,
}) => {
  const result: esbuild.OnEndResult = {
    errors: errors || [],
    warnings: warnings || [],
  };
  return new Promise<typeof result>((resolve, reject) => {
    if (errors.length) reject(result);
    return resolve(result);
  });
};

const handleWarnings = (warnings: esbuild.Message[]) => {
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
};

const handleErrors = (errors: esbuild.Message[]) => {
  const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === "true";
  if (tscCompileOnError) {
    console.log(
      chalk.yellow(
        "Compiled with the following type errors (you may want to check these before deploying your app):\n"
      )
    );
    errors.forEach((err) =>
      printBuildError(new Error(err.text, { cause: err }))
    );
  } else {
    console.log(chalk.red("Failed to compile.\n"));
    errors.forEach((err) =>
      printBuildError(new Error(err.text, { cause: err }))
    );
    // process.exit(1);
  }
};

export const esbuildPluginWatch = () => {
  return {
    name: "watcher",
    setup(build: esbuild.PluginBuild) {
      const options = build.initialOptions;
      options.define = options.define || {};

      build.onDispose(() => {
        console.log("This context is no longer used");
        return;
      });
      build.onStart(onStartCallback);
      build.onEnd(({ errors, metafile, warnings, outputFiles }) => {
        if (errors.length) {
          handleErrors(errors);
        } else {
          if (outputFiles) console.log(outputFiles);
          if (metafile) console.log(esbuild.analyzeMetafileSync(metafile));
          handleWarnings(warnings);
        }
        return;
      });
      return;
    },
  } satisfies esbuild.Plugin;
};

export default esbuildPluginWatch;
