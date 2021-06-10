module.export = {
  presets : [
    ["@babel/preset-env", { targets: { node: "current"} }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias : {
          "@modules": "./src/modules",
          "@middlewares": "./src/middlewares",
          "@config": "./src/config",
          "@shared": "./src/shared",
          "@utils": "./src/utils",
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true}],
    ["@babel/plugin-proposal-class-properties", { loose: true}],
  ],
}
