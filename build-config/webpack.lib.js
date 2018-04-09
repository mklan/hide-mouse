const path = require('path');
const parts = require('./webpack.parts');

const PATHS = {
  lib: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../dist'),
};

module.exports = {
    entry: {
      'hide-mouse': PATHS.lib,
    },
    output: {
      filename: '[name].min.js',
      path: PATHS.build,
      library: 'hide-mouse',
      libraryTarget: 'umd',
    },
  ...parts.generateSourceMaps({ type: 'source-map' }),
  ...parts.loadJavaScript({ include: PATHS.lib }),
};
