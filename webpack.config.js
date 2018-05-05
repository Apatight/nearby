const webpack = require('webpack');
const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'BASE_URL': JSON.stringify('http://54.67.27.193:3004'),
      'IMAGE_URL': JSON.stringify('https://s3-us-west-1.amazonaws.com/apateez'),
    })
  ],
  entry: `${SRC_DIR}/app.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        exclude: /node_modules/,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015']
       },
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ],
  }
};
