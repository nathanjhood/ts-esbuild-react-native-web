import * as esbuild from "esbuild";

const esbuildPluginEnv: typeof import("./plugins/EnvPlugin").default =
  require("./plugins/EnvPlugin").default;
const esbuildPluginWatch: typeof import("./plugins/WatchPlugin").default =
  require("./plugins/WatchPlugin").default;
const esbuildPluginTsc: typeof import("esbuild-plugin-tsc") = require("esbuild-plugin-tsc");
const esbuildPluginCopy: typeof import("esbuild-plugin-copy").default =
  require("esbuild-plugin-copy").default;
const esbuildPluginClean: typeof import("esbuild-plugin-clean").default =
  require("esbuild-plugin-clean").default;

const fs: typeof import("fs") = require("fs");
const path: typeof import("path") = require("path");
const chalk: typeof import("react-dev-utils/chalk") = require("react-dev-utils/chalk");

const moduleFileExtensions: typeof import("./paths").moduleFileExtensions =
  require("./paths").moduleFileExtensions;
const paths: typeof import("./paths").default = require("./paths").default;

const getClientEnvironment: typeof import("./env").default =
  require("./env").default;

// // Some apps do not need the benefits of saving a web request, so not inlining the chunk
// // makes for a smoother build process.
// const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== "false";

// const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === "true";
// const disableESLintPlugin = process.env.DISABLE_ESLINT_PLUGIN === "true";

// const imageInlineSizeLimit = parseInt(
//   process.env.IMAGE_INLINE_SIZE_LIMIT || "10000"
// );

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);

// // Check if Tailwind config exists
// const useTailwind = fs.existsSync(
//   path.join(paths.appPath, "tailwind.config.js")
// );

// // Get the path to the uncompiled service worker (if it exists).
// const swSrc = paths.swSrc;

// // style files regexes
// const cssRegex = /\.css$/;
// const cssModuleRegex = /\.module\.css$/;
// const sassRegex = /\.(scss|sass)$/;
// const sassModuleRegex = /\.module\.(scss|sass)$/;

// const hasJsxRuntime = (() => {
//   if (process.env.DISABLE_NEW_JSX_TRANSFORM === "true") {
//     return false;
//   }

//   try {
//     require.resolve("react/jsx-runtime");
//     return true;
//   } catch (e) {
//     return false;
//   }
// })();

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
export function configFactory(
  esbuildEnv: "development" | "production" | "test"
) {
  const isEnvDevelopment = esbuildEnv === "development";
  const isEnvProduction = esbuildEnv === "production";

  // Variable used for enabling profiling in Production
  // passed into alias object. Uses a flag if passed into the build command
  const isEnvProductionProfile =
    isEnvProduction && process.argv.includes("--profile");

  // We will provide `paths.publicUrlOrPath` to our app
  // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
  // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
  // Get environment variables to inject into our app.
  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

  // const shouldUseReactRefresh = env.raw.FAST_REFRESH;

  return {
    metafile: true,
    absWorkingDir: paths.appPath,

    // external: ["react", "react-dom"],
    entryPoints: [paths.appIndexJs],
    // entryNames: isEnvProduction
    //   ? "static/[ext]/[name].[hash]"
    //   : isEnvDevelopment && "static/[ext]/bundle",
    // // There are also additional JS chunk files if you use code splitting.
    // chunkNames: isEnvProduction
    //   ? "static/[ext]/[name].[hash].chunk"
    //   : isEnvDevelopment && "static/[ext]/[name].chunk",
    // assetNames: "static/media/[name].[hash][ext]",

    outbase: paths.appSrc,
    // outfile: fileURLToPath(new URL(publicOutFile, import.meta.url)), // can't use outdir and outfile together...
    outdir: paths.appBuild,
    // esbuild uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: paths.publicUrlOrPath,
    loader: {
      ".jsx": "jsx",
      ".js": "js",
      ".tsx": "tsx",
      ".ts": "ts",
      ".svg": "dataurl",
      ".png": "file", // 'file' loaders will be prepending by 'publicPath', i.e., 'https://www.publicurl.com/icon.png'
      ".ico": "file",
    },
    alias: {
      // 'oldpkg': 'newpkg',
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      "react-native": "react-native-web",
      // Allows for better profiling with ReactDevTools
      ...(isEnvProductionProfile && {
        "react-dom$": "react-dom/profiling",
        "scheduler/tracing": "scheduler/tracing-profiling",
      }),
    },
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebook/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    resolveExtensions: moduleFileExtensions
      .map((ext) => `.${ext}`)
      .filter((ext) => useTypeScript || !ext.includes("ts")),
    minify: isEnvProduction,
    // sourcemap: true,
    bundle: true, // Cannot use "alias" without "bundle"
    // jsxDev: true,
    // jsx: 'automatic',
    // format: 'cjs' // There are currently three possible values that can be configured: iife, cjs, and esm
    // banner: {
    //   // NODE - Append Hot reload event listener to DOM
    //   // js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`,
    //   // // BROWSER - Append Hot reload event listener to DOM
    //   js: `(() => new EventSource("/esbuild").onmessage = () => location.reload())();`,
    // },
    // define: {
    //   "process.env.NODE_ENV": env.raw.NODE_ENV
    // },
    plugins: [
      // esbuildPluginEnv(),
      // postCssPlugin({
      //   plugins: [autoprefixer, tailwindcss()],
      // }),
      // esbuildPluginTsc({
      //   force: true,
      //   tsconfigPath: paths.appTsConfig,
      //   tsx: true,
      // }),
      esbuildPluginClean({
        patterns: [`${paths.appBuild}/*` /** `!${destinationHTML}` */],
        sync: true,
        verbose: false,
      }),
      esbuildPluginCopy({
        copyOnStart: true,
        resolveFrom: "cwd",
        assets: {
          from: [`${paths.appPublic}/**/*`],
          to: [paths.appBuild],
          // keepStructure: true
        },
        verbose: false,
        once: false,
        globbyOptions: {},
      }),
      // esbuildPluginWatch(),
      ((options?: {}) => {
        // internal plugins...
        /**
         *
         * @param {((index: number) => void)[]} tasks
         * @returns {void}
         */
        const schedule = (tasks: ((index: number) => void)[]) =>
          tasks.forEach((task, idx) => task(idx));
        // Roll all plugins into one, so that the build callback only fires once
        // per rebuild...
        // The plugins are defined inline, using an `iife`-like syntax, which
        // resembles a function that is defined and then called, in one
        // codeblock.
        // A simple example:
        // @example
        // ```ts
        // (() => eslintPluginTsc({...options}))();
        // ```
        // There are three layers to the syntax, starting with the inner
        // callback:
        // @example
        // ``` ts
        // () => eslintPluginTsc()
        // ```
        // In order to actually call this function without needing to assign it,
        // just wrap it in one parenthesis, and follow it with another:
        // @example
        // ```ts
        // ()();
        // ```
        // The first parenthesis accepts a callback function definition:
        // @example
        // ```ts
        // ( () => eslintPlugin({}) ) ();
        // ```
        // The second parenthesis, placed at the end of the expresssion,
        // calls the expression directly in place, meaning the expression gets
        // evaluated inline and its' output is not assigned to any variable or
        // constant expression.
        // Since the second parenthesis does the calling, any parameters that
        // the callback function might accept can be specified there:
        // @example
        // ```ts
        // ((params: {}) => console.log("hello", params.hello))({ hello: "world" });
        // ```
        // This opens up some cool ideas, like expressing an options defaults
        // object, before calling them programmatically at execution time:
        // @example
        // ```ts
        // ( (options: { sync?: boolean = true }) => eslintPluginCool(options) ) ({ sync: config.isRuntimeAsyncSupported });
        // ```
        return {
          name: "plugin",
          setup({
            initialOptions,
            onStart: registerOnStartCallback,
            onEnd: registerOnEndCallback,
            onDispose: registerOnDisposeCallback,
            onLoad: registerOnLoadCallback,
            onResolve: registerOnResolveCallback,
          }) {
            let cache = new Map();
            let mangleCacheMap = new Map<
              [key: string],
              [value: string | false]
            >();
            /**
             * `plugin:logger`
             *
             * @see https://esbuild.github.io/plugins/#using-plugins
             */
            ((name: string = "plugin:logger", active: boolean = true) => {
              registerOnStartCallback(() => {
                const tasks = [
                  (idx: number) =>
                    console.log(
                      chalk.green(name),
                      chalk.cyan("build") + "." + chalk.yellow("onStart()"),
                      idx
                    ),
                  (idx: number) =>
                    console.log(
                      chalk.green(name),
                      chalk.cyan("build") + "." + chalk.yellow("onStart()"),
                      idx
                    ),
                ];
                return tasks.forEach((task, idx) => task(idx));
              });
              registerOnEndCallback(
                ({ errors, warnings, metafile, outputFiles, mangleCache }) => {
                  if (errors && errors.length) {
                  }
                  if (warnings && warnings.length) {
                  }
                  if (initialOptions.metafile && metafile) {
                  }
                  if (initialOptions.write === false && outputFiles.length) {
                  }
                  if (initialOptions.mangleCache) {
                  }
                  const tasks: ((index: number) => void)[] = [
                    (index: number) =>
                      console.log(
                        chalk.green(name),
                        chalk.cyan("build") + "." + chalk.yellow("onEnd()"),
                        index
                      ),
                    (index: number) =>
                      console.log(
                        chalk.green(name),
                        chalk.cyan("build") + "." + chalk.yellow("onEnd()"),
                        index
                      ),
                  ];
                  return tasks.forEach((task, idx) => task(idx));
                }
              );
              registerOnDisposeCallback(() => {
                const tasks: ((index: number) => void)[] = [
                  (index: number) =>
                    console.log(
                      chalk.green(name),
                      chalk.cyan("build") + "." + chalk.yellow("onDispose()"),
                      index
                    ),
                  (index: number) =>
                    console.log(
                      chalk.green(name),
                      chalk.cyan("build") + "." + chalk.yellow("onDispose()"),
                      index
                    ),
                ];
                return tasks.forEach((task, index) => task(index));
              });
            })("plugin:logger", true);
            /**
             * `plugin:errorhandler`
             */
            ((name: string = "plugin:errorhandler", active: boolean = true) => {
              registerOnEndCallback(({ errors }) => {
                if (errors && errors.length) {
                  errors.forEach((error) => {
                    const tasks = [
                      (idx: number, arr: ((idx: number, arr: []) => void)[]) =>
                        console.error(
                          new Error(
                            error.text ||
                              "Unkown error" + idx + "of" + arr.length,
                            {
                              cause: {
                                detail: error.detail,
                                id: error.id,
                                location: error.location,
                                notes: error.notes,
                                pluginName: error.pluginName,
                                text: error.text,
                              },
                            }
                          )
                        ),
                    ];
                    return tasks.forEach((task, idx, arr) => task(idx, arr));
                  });
                }
              });
            })("plugin:errorhandler", true);
            /**
             * `plugin:warnhandler`
             */
            ((name: string = "plugin:warnhandler", active: boolean = true) => {
              registerOnEndCallback(({ warnings }) => {
                if (warnings.length) {
                  warnings.forEach((warning) => {
                    const tasks = [
                      (
                        idx: number,
                        arr: ((idx: number, arr: []) => void)[]
                      ) => {
                        console.warn(
                          new Error(
                            warning.text ||
                              "Unkown warning" + idx + "of" + arr.length,
                            {
                              cause: {
                                detail: warning.detail,
                                id: warning.id,
                                location: warning.location,
                                notes: warning.notes,
                                pluginName: warning.pluginName,
                                text: warning.text,
                              },
                            }
                          )
                        );
                      },
                    ];
                    return tasks.forEach((task, idx, arr) => task(idx, arr));
                  });
                }
              });
            })("plugin:warnhandler", true);
            /**
             * `plugin:txt`
             * Load ".txt" files and return an array of words.
             *
             * @see https://esbuild.github.io/plugins/#on-load
             */
            ((name: string = "plugin:txt", active: boolean = true) => {
              const tasks = [
                (idx: number) =>
                  console.info(chalk.green(name), "Registering..."),
                (idx: number) =>
                  registerOnLoadCallback({ filter: /\.txt$/ }, async (args) => {
                    let text = await fs.promises.readFile(args.path, "utf8");
                    return {
                      contents: JSON.stringify(text.split(/\s+/)),
                      loader: "json",
                    };
                  }),
                (idx: number) => console.info(chalk.green(name), "Registered."),
              ];
              return tasks.forEach((task, idx) => task(idx));
            })("plugin:txt", true);
            /**
             * `plugin:env`
             *
             * @see https://esbuild.github.io/plugins/#using-plugins
             */
            ((name: string = "plugin:env", active: boolean = true) => {
              const tasks: ((idx: number) => void)[] = [
                (idx: number) =>
                  console.info(
                    chalk.blue(new Date()),
                    chalk.green(name),
                    "Registering..."
                  ),
                (idx: number) =>
                  registerOnResolveCallback(
                    { namespace: "plugin:env", filter: /^env$/ },
                    (args) => ({
                      path: args.path,
                      namespace: "plugin:env",
                    })
                  ),
                (idx: number) =>
                  registerOnLoadCallback(
                    {
                      filter: /.*/,
                      namespace: "plugin:env",
                    } satisfies esbuild.OnLoadOptions,
                    (args: esbuild.OnLoadArgs) =>
                      ({
                        contents: JSON.stringify(process.env),
                        loader: "json",
                      }) satisfies esbuild.OnLoadResult
                  ),
                (idx: number) =>
                  console.info(
                    chalk.blue(new Date()),
                    chalk.green(name),
                    "Registered."
                  ),
              ];
              return tasks.forEach((task, idx) => task(idx));
            })("plugin:env", true);
          },
        } satisfies esbuild.Plugin;
      })(),
    ],
  } satisfies esbuild.BuildOptions;
  // Use BuildOptions, not CommonOptions, because:
  // - CommonOptions is shared by '.build' and '.context', of which we are using both
  // - CommonOptions is shared by BuildOptions and TransformOptions, but we're not using '.transform', currently
  // - we need to spec the build dir and public dir and so forth, so should do it now
}

// watch: {
//   onRebuild(error) {
//     clients.forEach(res => res.write('data: update\n\n'))
//     clients.length = 0
//     if (error)
//       console.log(
//         `[${chalk.grey(moment().format('h:mm:ss A'))}] esbuild: ${chalk.red('error while rebuilding code')}`
//       )
//     else
//       console.log(
//         `[${chalk.grey(moment().format('h:mm:ss A'))}] esbuild: ${chalk.green('code rebuilt successfully')}`
//       )
//   }
// },

export default configFactory;
