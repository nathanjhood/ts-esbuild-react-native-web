import * as esbuild from "esbuild";

declare type EnvPluginOptions = {};

/**
 * @example
 * ```ts
 * import { PATH } from 'env'
 * console.log(`PATH is ${PATH}`)
 * ```
 */
export const esbuildPluginEnv = (options?: EnvPluginOptions) => {
  return {
    name: "env",
    setup(build: esbuild.PluginBuild) {
      // Intercept import paths called "env" so esbuild doesn't attempt
      // to map them to a file system location. Tag them with the "env-ns"
      // namespace to reserve them for this plugin.
      build.onResolve({ filter: /^env$/ }, (args) => ({
        path: args.path,
        namespace: "env-ns",
      }));

      // Load paths tagged with the "env-ns" namespace and behave as if
      // they point to a JSON file containing the environment variables.
      build.onLoad({ filter: /.*/, namespace: "env-ns" }, () => ({
        contents: JSON.stringify(process.env),
        loader: "json",
      }));
    },
  } satisfies esbuild.Plugin;
};

export default esbuildPluginEnv;
