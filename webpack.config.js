const path = require("path");

const config = {
  devtool: "source-map",
  entry: {
    vendor: ["@babel/polyfill", "react"],
    app: ["./src/components/widgets/FirstSSR/appHydrate.js"],
    ghCard: ["./src/components/widgets/GHCard/hydrate.js"],
    checkSession: ["./src/components/widgets/FirstSSR/checkSessionHydrate.js"],
    starGame: ["./src/components/widgets/StarMatch/hydrate.js"],
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*"],
  },
};

module.exports = config;
