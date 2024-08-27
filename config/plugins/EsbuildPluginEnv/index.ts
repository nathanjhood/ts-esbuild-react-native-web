import type { Loader, Plugin, PluginBuild } from "esbuild";
import type { OnLoadOptions, OnLoadArgs, OnLoadResult } from "esbuild";
import type { OnResolveOptions, OnResolveArgs, OnResolveResult } from "esbuild";

interface EnvOptions {
  sync: boolean;
  verbose: boolean;
  loader: Loader;
}

export const EsbuildPluginEnv: (options: EnvOptions) => Plugin = (options) => {
  //
  return {
    name: "env",
    setup({
      onResolve: registerResolverCallback,
      onLoad: registerLoaderCallback,
      initialOptions,
    }) {
      if (options.verbose) console.info("plugin:env.setup()");
      //
      let error: Error | null = null;
      //
      const cache = new Map<string, string>();
      const stringifyEnv = () => JSON.stringify(process.env);
      const env = stringifyEnv(); // do the stringify once only
      //
      const onSuccess = (result: void) => {
        if (options.verbose) console.info("plugin:env.onSuccess()");
        return result;
      };

      const onError = (error: any) => {
        if (options.verbose) console.info("plugin:env.onError()");
        console.error(new Error("Plugin failed", { cause: error }));
        return process.exit(1);
      };

      // onResolveCallback
      function onResolveCallback(args: OnResolveArgs) {
        return new Promise<OnResolveResult>((resolve, reject) => {
          if (options.verbose) console.info("plugin:env.onResolveCallback()");
          return resolve({
            path: args.path,
            namespace: "env",
          });
        });
      }
      // onLoadCallback
      function onLoadCallback(args: OnLoadArgs) {
        return new Promise<OnLoadResult>((resolve, reject) => {
          if (options.verbose) console.info("plugin:env.onloadCallback()");
          return resolve({
            contents: env,
            loader: "json",
          });
        });
      }
      //
      const resolver: () => Promise<void> = () =>
        new Promise<void>((resolve, reject) => {
          if (options.verbose) console.info("plugin:env.resolver()");
          return resolve(
            registerResolverCallback({ filter: /^env$/ }, onResolveCallback)
          );
        });
      //
      const loader: () => Promise<void> = () =>
        new Promise<void>((resolve, reject) => {
          if (options.verbose) console.info("plugin:env.loader()");
          return resolve(
            registerLoaderCallback(
              {
                filter: /.*/,
                namespace: "env",
              },
              onLoadCallback
            )
          );
        });
      //
      return new Promise<void>((resolveSetup, rejectSetup) => {
        [resolver, loader]
          .reduce((p, f) => p.then(f), Promise.resolve())
          .then((registeredCallbacks) => {
            return registeredCallbacks;
          });
        if (error) {
          return rejectSetup(error);
        } else {
          return resolveSetup();
        }
      })
        .then((result) => onSuccess(result))
        .catch((error) => onError(error));
    },
  } satisfies Plugin;
};

export default EsbuildPluginEnv;
