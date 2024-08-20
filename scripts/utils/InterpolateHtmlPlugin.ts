// esbuild

import * as esbuild from "esbuild";

// const path: typeof import("path") = require("path");

// const envPlugin = {
//   name: 'env',
//   setup(build: esbuild.PluginBuild): (void | Promise<void>) {
//     // Intercept import paths called "env" so esbuild doesn't attempt
//     // to map them to a file system location. Tag them with the "env-ns"
//     // namespace to reserve them for this plugin.
//     build.onResolve({ filter: /^env$/ }, args => ({
//       path: args.path,
//       namespace: 'env-ns',
//     }))

//     // Redirect all paths starting with "images/" to "./public/images/"
//     build.onResolve({ filter: /^images\// }, args => {
//       return { path: path.join(args.resolveDir, 'public', args.path) }
//     })

//     // Mark all paths starting with "http://" or "https://" as external
//     build.onResolve({ filter: /^https?:\/\// }, args => {
//       return { path: args.path, external: true }
//     })

//     // Load paths tagged with the "env-ns" namespace and behave as if
//     // they point to a JSON file containing the environment variables.
//     build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
//       contents: JSON.stringify(process.env),
//       loader: 'json',
//     }))
//   },
// }

// let exampleOnLoadPlugin = {
//   name: 'example',
//   setup(build) {
//     // Load ".txt" files and return an array of words
//     build.onLoad({ filter: /\.txt$/ }, async (args) => {
//       let text = await fs.promises.readFile(args.path, 'utf8')
//       return {
//         contents: JSON.stringify(text.split(/\s+/)),
//         loader: 'json',
//       }
//     })
//   },
// }

// await esbuild.build({
//   entryPoints: ['app.js'],
//   bundle: true,
//   outfile: 'out.js',
//   plugins: [envPlugin],
// })

// // Webpack plugin
// const escapeStringRegexp = require('escape-string-regexp');

// class InterpolateHtmlPlugin {
//   constructor(htmlWebpackPlugin, replacements) {
//     this.htmlWebpackPlugin = htmlWebpackPlugin;
//     this.replacements = replacements;
//   }

//   apply(compiler) {
//     compiler.hooks.compilation.tap('InterpolateHtmlPlugin', compilation => {
//       this.htmlWebpackPlugin
//         .getHooks(compilation)
//         .afterTemplateExecution.tap('InterpolateHtmlPlugin', data => {
//           // Run HTML through a series of user-specified string replacements.
//           Object.keys(this.replacements).forEach(key => {
//             const value = this.replacements[key];
//             data.html = data.html.replace(
//               new RegExp('%' + escapeStringRegexp(key) + '%', 'g'),
//               value
//             );
//           });
//         });
//     });
//   }
// }
