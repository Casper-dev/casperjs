const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: path.resolve(__dirname, 'playground/index.js'),

  module: {
    rules: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      use: 'babel-loader',
    }],
  },

  output: {
    path: path.resolve(__dirname, 'dist')
  },

  // web3's fancy pointless dependency
  externals: [{'trim': 'undefined'}],

  devtool: 'source-map',
  
  plugins: [
    new HtmlWebpackPlugin({
      template: 'playground/index.html'
    })
  ]
}