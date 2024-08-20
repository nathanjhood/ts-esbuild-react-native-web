import * as esbuild from "esbuild";

let map = new Map();

console.log(map);

map.set("process", {});

console.log(map);

map.set("env", {});

console.log(map);

(async (
  options?: { code: string },
  transformation?: esbuild.TransformOptions
) => {
  let result = await esbuild.transform(options.code, {
    loader: "ts",
  });
  console.log(result);
})(
  { code: "let x: number = 1" },
  {
    loader: "ts",
  }
);

// const plugin: {
//   name: string;
//   setup: (build: esbuild.PluginBuild) => void | Promise<void>;
// } = {
//   name: "maps",
//   setup(build) {},
// } satisfies esbuild.Plugin;

// const plugin = (options: { sync: boolean } = { sync: false }) => {
//   if (options && options.sync) return;
//   return;
// };
