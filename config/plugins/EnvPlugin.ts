import * as esbuild from "esbuild";

declare type EsbuildPluginEnvOptions = {};

/**
 * @example
 * ```ts
 * import { PATH } from 'env'
 * console.log(`PATH is ${PATH}`)
 * ```
 * @example
 * To set up esbuild to use this plugin:
 * ```ts
 * // esbuild.config.*
 * export default = {
 *   // ...
 *   plugins: [
 *     esbuildPluginEnv(),
 *   ]
 *   // ...
 * }
 * ```
 * @example
 * Be sure to write a module declaration for IDE support:
 * ```ts
 * declare module "env" {
 *   const env: { readonly [key: string]: string };
 *   export default env;
 * }
 * ```
 */
export const esbuildPluginEnv: (
  options?: EsbuildPluginEnvOptions
) => esbuild.Plugin = (options) => {
  return {
    name: "env",
    setup({
      onResolve: registerOnResolveCallback,
      onLoad: registerOnLoadCallback,
    }) {
      let cache = new Map();
      return new Promise<void>((resolveSetup, rejectSetup) => {
        // Intercept import paths called "/^env$/" so esbuild doesn't attempt
        // to map them to a file system location. Tag them with the "plugin:env"
        // namespace to reserve them for this plugin.
        registerOnResolveCallback(
          { filter: /^env$/ },
          (args: esbuild.OnResolveArgs) => {
            return new Promise(
              (resolveOnResolveCallback, rejectOnResolveCallback) => {
                let onResolveResult: esbuild.OnResolveResult;
                onResolveResult = {
                  path: args.path,
                  namespace: "plugin:env",
                };
                return resolveOnResolveCallback(onResolveResult);
              }
            );
          }
        );

        // Load paths tagged with the "plugin:env" namespace and behave as if
        // they point to a JSON file containing the environment variables.
        registerOnLoadCallback(
          { filter: /.*/, namespace: "plugin:env" },
          (args: esbuild.OnLoadArgs) => {
            // let key = args.path;
            // let value = cache.get(key);
            return new Promise<esbuild.OnLoadResult | null | undefined>(
              (resolveOnLoadCallback, rejectOnLoadCallback) => {
                let onLoadResult: esbuild.OnLoadResult;
                onLoadResult = {
                  contents: JSON.stringify(process.env),
                  loader: "json",
                };
                return resolveOnLoadCallback(onLoadResult);
              }
            );
          }
        );
        return resolveSetup();
      });
    },
  };
};

/**
 * @example
 * ```ts
 * import { PATH } from 'env'
 * console.log(`PATH is ${PATH}`)
 * ```
 */
export const esbuildPluginEnvSync: (
  options?: EsbuildPluginEnvOptions
) => esbuild.Plugin = (options) => {
  return {
    name: "env",
    setup({
      // initialOptions,
      // onStart: registerOnStartCallback,
      // onEnd: registerOnEndCallback,
      // onDispose: registerOnDisposeCallback,
      onLoad: registerOnLoadCallback,
      onResolve: registerOnResolveCallback,
    }) {
      // Intercept import paths called "env" so esbuild doesn't attempt
      // to map them to a file system location. Tag them with the "env-ns"
      // namespace to reserve them for this plugin.
      registerOnResolveCallback(
        { filter: /^env$/ },
        (args: esbuild.OnResolveArgs) => {
          return {
            path: args.path,
            namespace: "plugin:env",
          };
        }
      );

      // Load paths tagged with the "plugin:env" namespace and behave as if
      // they point to a JSON file containing the environment variables.
      registerOnLoadCallback(
        { filter: /.*/, namespace: "plugin:env" },
        (args: esbuild.OnLoadArgs) => {
          return {
            contents: JSON.stringify(process.env),
            loader: "json",
          };
        }
      );
    },
  } satisfies esbuild.Plugin;
};

export default esbuildPluginEnvSync;
