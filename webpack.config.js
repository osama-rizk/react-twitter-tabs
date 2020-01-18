const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "index.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  }
  // externals: [
  //   {
  //     react: {
  //       root: "React",
  //       commonjs2: "react",
  //       commonjs: "react",
  //       amd: "react"
  //     },
  //     "react-dom": {
  //       root: "ReactDOM",
  //       commonjs2: "react-dom",
  //       commonjs: "react-dom",
  //       amd: "react-dom"
  //     }
  //   }
  // ]
};
