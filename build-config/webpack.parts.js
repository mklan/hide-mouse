const path = require('path');
const webpack = require('webpack');

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,

        use: {
          loader: 'babel-loader',
          options: {
            // Enable caching for improved performance during development.
            cacheDirectory: true,
          },
        },
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});