const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: resolve('src/main/main.ts'),
  // devtool: 'inline-source-map',
  output: {
    path: resolve('dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  externals: (() => {
    const dependencies = require('../package.json').devDependencies;
    const externals = {};
    for (const dependency in dependencies) {
      externals[dependency] = 'commonjs ' + dependency;
    }
    return externals;
  })(),
  target: 'node',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/main/resources', to: 'resources', noErrorOnMissing: true },
        { from: 'rester.yaml' },
      ],
    }),
  ],
};
