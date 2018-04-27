const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const nodeExternals = require('webpack-node-externals')


module.exports = (env, options) => {
  const baseConfig = {
    entry: './src/index.js',
  
    module: {
      rules: [{
        test: /\.js$/,
        use: 'babel-loader',
      }],
    },
  
    output: {
      path: path.resolve(__dirname, 'dist')
    },

    // basically every node_module
    externals: [nodeExternals()],

    plugins: []
  }

  if(options.mode === 'development') {
    baseConfig.plugins.push(new UglifyJsPlugin({
      parallel: 4,
      uglifyOptions: {
        mangle: false,
        compress: {
          dead_code: true,
          conditionals: true
        }
      }
    }))
  }

  if(options.mode === 'development') {
    baseConfig.devtool = 'source-map'
  }
  
  
  const nodeConfig = merge(baseConfig, {
    target: 'node',
    
    node: {
      __dirname: true,
      __filename: false,
    },
  
    output: {
      filename: 'casper.node.js',
      library: '',
      libraryTarget: 'commonjs2',
    },
  
    plugins: [
      new webpack.DefinePlugin({
        CASPER_BUNDLE_TARGET: "'node'"
      })
    ]
  })
  
  
  const browserBundleConfig = merge(baseConfig, {
    node: {
      buffer: false
    },

    output: {
      filename: 'casper.js',
      library: '',
      libraryTarget: 'commonjs2',
    },
  
    plugins: [
      new webpack.DefinePlugin({
        CASPER_BUNDLE_TARGET: "'browser'"
      })
    ]
  })


  return [nodeConfig, browserBundleConfig]
}