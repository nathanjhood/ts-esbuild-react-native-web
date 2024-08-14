// @ts-check

import * as esbuild from 'esbuild';
import { createBuildOptions } from '../esbuild.config.mjs';
import process from 'process';

export const options = createBuildOptions({
  bundle: true,
  minify: true,
  sourcemap: true,
  format: 'esm',
  banner: {
    /** NODE - Append Hot reload event listener to DOM */
    // js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`
    /** BROSWER - Append Hot reload event listener to DOM */
    js: '(() => new EventSource("/esbuild").onmessage = () => location.reload())();'
  },
    // external: ['react', 'react-dom'],
});

/**
 * @param {esbuild.BuildOptions} options
 * @return {Promise<esbuild.BuildResult<esbuild.BuildOptions>>}
 */
export async function build(options) {

  const result = await esbuild.build(options)
    .catch(
      (err) => {
        console.error(err);
        process.exit(1);
      }
    );

  return result;
}

export default build

const result = await build(options)

console.info(result)
