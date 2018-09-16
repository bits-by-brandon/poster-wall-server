const path = require("path");

module.exports = {
  entry: "./src/server/index.ts",
  mode: "development",
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalWatchApi: true
          }
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src", "server")
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist")
  }
};
