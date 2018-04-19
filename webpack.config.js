const path = require('path')

module.exports = {
  target: 'node',
  
  node: {
    __dirname: false,
    __filename: false,
  },

  entry: './src/index.js',
  
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
    }],
  },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'casper.node.js',
    library: 'casper',
    libraryTarget: 'commonjs2',
  },

}