const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = (env, options) => ({
  entry: path.resolve(__dirname, 'playground/index.js'),

  module: {
    rules: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      use: 'babel-loader',
    }],
  },

  output: {
    path: path.resolve(__dirname, 'playground/dist')
  },

  // web3's fancy pointless dependency
  externals: [{'trim': 'undefined'}],

  devtool: options.mode === 'development' ? 'source-map' : 'none',
  
  plugins: [
    new HtmlWebpackPlugin({
      template: 'playground/index.html'
    })
  ]
})