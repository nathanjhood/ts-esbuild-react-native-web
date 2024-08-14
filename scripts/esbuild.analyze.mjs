// @ts-check

import * as esbuild from 'esbuild';
import fs from 'node:fs';
import { createBuildOptions } from '../esbuild.config.mjs';
import process from 'process';

const options = createBuildOptions({ minify: true, metafile: true });
const build = await esbuild.build(options);
const mode = process.env.npm_config_mode;

if (!build.metafile) throw new Error("no build meta file was generated")

if (mode === "write") {
  fs.writeFileSync("build-meta.json", JSON.stringify(build.metafile))
} else {
  console.info(await esbuild.analyzeMetafile(build.metafile, {
    verbose: false,
  }));
}

export { }
