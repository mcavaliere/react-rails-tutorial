// Run like this
// webpack -d --config webpack-rails.config.js && cp railsbuild/rails-bundle.js /Users/justin/j/react/react-rails-tutorial/app/assets/javascripts && cp railsbuild/rails-bundle.js.map /Users/justin/j/react/react-rails-tutorial/public

module.exports = {
  devtool: "source-map",
  context: __dirname,
  entry: [
    // In case we don't require jQuery from CDN or asset pipeline
    "../app/assets/javascripts/example",
    "./scripts/rails_shims"
  ],
  output: {
    filename: "rails-bundle.js",
    path: __dirname + "/../app/assets/javascripts"
  },
  // Let's load jQuery from the CDN or rails asset pipeline
  externals: {
    jquery: "var jQuery"
  },
  resolve: {
    root: [__dirname + "/node_modules", __dirname + "/scripts",
      __dirname + "/../app/assets/javascripts"],
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    root: [__dirname + "/node_modules", __dirname + "/../app/assets/javascripts"],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loaders: ['es6', 'jsx?harmony'] }
    ]
  }
};