const path = require('path');

const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    comment: ['./components/comment.js'],
  },
  output: {
    path: srcPath + '/dist/js',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
