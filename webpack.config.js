var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [
    nodeExternals()
  ],
  entry: './src/app.ts',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'app.js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    modules: [
      path.join(__dirname, './dist')
    ],
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          tsConfigFile: 'tsconfig.json',
          typeCheck: true,
        }
      },
      { test: /\.ts$/, loader: 'ts-loader' },
    ]
  },
};
