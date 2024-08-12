import * as esbuild from 'esbuild';
import * as config from '../esbuild.config.mjs';
import * as tsc from './tsc.serve.mjs';
import process from 'process';

const options = config.createBuildOptions({
  sourcemap: true,
  bundle: true,
  minify: false,
  treeShaking: true,
  format: 'esm',
  banner: {
    // NODE - Append Hot reload event listener to DOM
    // js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`
    // // BROSWER - Append Hot reload event listener to DOM
    js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();'
  }
});

const ctx = await esbuild.context(options);

await tsc.createTscServer();
await ctx.watch();

console.info('watching...');

const { host, port } = await ctx.serve({
  port: 3000,
  host: '127.0.0.1',
  servedir: './dist',
  fallback: './dist/index.html'
});

console.info(`Serving app at http://${host}:${port}.`);

// Whenever we get some data over stdin
process.stdin.on('data', async () => {
  try {
    // Cancel the already-running build
    await ctx.cancel();
    // Then start a new build
    console.info('build:', await ctx.rebuild());
  } catch (err) {
    console.error(err);
  }
});

// // exit routine
// // await new Promise(r => setTimeout(r, 10 * 1000))
// await ctx.dispose()
// console.log('stopped watching')
