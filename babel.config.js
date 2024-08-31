module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
    "module:@react-native/babel-preset",
  ],
  plugins: [
    "react-native-web",
    [
      "module-resolver",
      {
        alias: {
          "^react-native$": "react-native-web",
        },
      },
    ],
  ],
};
