// @ts-check

import * as esbuild from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';
import esbuildPluginCopy from 'esbuild-plugin-copy';
import esbuildPluginClean from 'esbuild-plugin-clean';


import { fileURLToPath, URL } from 'url'

// declare type BuildPaths = {
//   publicSrcDir?: string | URL;
//   publicOutputDir?: string | URL;
//   publicOutFile?: string | URL;
//   srcHtmlFile?: string | URL;
//   destinationHTML?: string | URL;
// }

// declare type TscOptions = {
//   tsconfigPath?: string;
//   force?: boolean;
//   tsx?: boolean;
// }

// declare type CopyOptions = (import('esbuild-plugin-copy').Options)
// declare type CleanOptions = (import('esbuild-plugin-clean').CleanOptions)
// declare type BuildOptions = (import('esbuild').BuildOptions)



/**
 * @param  {esbuild.BuildOptions} options
 * @return {esbuild.BuildOptions}
 */
export const createBuildOptions = (options: esbuild.BuildOptions): esbuild.BuildOptions => {
  // const srcSourceDir = fileURLToPath(new URL('src', import.meta.url));
  // const srcOutputDir = fileURLToPath(new URL('dist', import.meta.url));
  const publicSourceDir = fileURLToPath(new URL('public', import.meta.url));
  const publicOutputDir = fileURLToPath(new URL('dist', import.meta.url));

  // const publicOutFile = `${publicOutputDir}/app.js`;
  // const srcHtmlFile = `${publicSrcDir}/index.html`;

  // const appSourceFile = fileURLToPath(new URL('App.tsx', srcSourceDir))
  // const indexSourceFile = fileURLToPath(new URL('index.tsx', srcSourceDir))
  const destinationHTML = `${publicOutputDir}/index.html`;

  return {
    // external: ['react', 'react-dom'],
    entryPoints: [
      fileURLToPath(new URL('src/App.tsx', import.meta.url)),
      fileURLToPath(new URL('src/index.tsx', import.meta.url)),
    ],
    // outfile: fileURLToPath(new URL(publicOutFile, import.meta.url)),
    outbase: fileURLToPath(new URL('src', import.meta.url)),
    outdir: fileURLToPath(new URL('dist', import.meta.url)),

    sourcemap: true,
    bundle: true,
    minify: true,
    // jsxDev: true,
    // jsx: 'automatic',
    loader: {
      // '.tsx': 'tsx',
      // '.ts': 'ts',
      '.svg': 'dataurl'
    },
    banner: {
      // NODE - Append Hot reload event listener to DOM
      // js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`,
      // // BROWSER - Append Hot reload event listener to DOM
      js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())(); '
    },
    plugins: [
      esbuildPluginTsc({
        force: true,
        tsconfigPath: fileURLToPath(new URL('tsconfig.json', import.meta.url)),
        tsx: true
      }),
      esbuildPluginClean({
        patterns: [`${publicOutputDir}/*`, `!${destinationHTML}`],
        sync: true,
        verbose: false
      }),
      esbuildPluginCopy({
        copyOnStart: true,
        resolveFrom: 'cwd',
        assets: {
          from: [`${publicSourceDir}/**/*`],
          to: [`${publicOutputDir}`]
          // keepStructure: true
        },
        verbose: false,
        once: false,
        globbyOptions: {}
      })
    ],
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
    ...options // args
  };
};

export default createBuildOptions;
