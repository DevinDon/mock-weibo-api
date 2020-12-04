const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function _externals() {
  let manifest = require('../package.json');
  let dependencies = manifest.devDependencies;
  let externals = {};
  for (let p in dependencies) {
    externals[p] = 'commonjs ' + p;
  }
  return externals;
}

const externals = _externals();

module.exports = {
  entry: './src/main/index.ts',
  mode: 'production',
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist')
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },
  target: 'node',
  externals,
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/main/resources', to: 'resources' },
        { from: 'rester.json' }
      ]
    })
  ]
};
