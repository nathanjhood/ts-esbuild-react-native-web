import type { Plugin } from "esbuild";

declare type EnvOptions = {
  sync: true | false;
  verbose: true | false;
};

export declare const EsbuildPluginEnv: (options: EnvOptions) => Plugin;

export default EsbuildPluginEnv;
