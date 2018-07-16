const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = (env, options) => ({
  entry: {
    'browser-playground': path.resolve(__dirname, 'index.js'),
  },
  
  output: {
    path: __dirname + '/dist',
    filename: 'browser-playground'
  },

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

  devtool: options.mode === 'development' ? 'source-map' : 'none',
  
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      // Didn't find a way to tell webpack-dev-server to use not index.html
      filename: options.mode === 'development' ? 'index.html' : 'browser-playground.html'
    })
  ]
})