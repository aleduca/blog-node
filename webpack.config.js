const path = require('path');
const { PassThrough } = require('stream');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    comment: ['./frontend/components/comment.js'],
    userEdit: ['./frontend/components/userEdit.js'],
  },
  output: {
    path: path.resolve('frontend', 'assets', 'js'),
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
