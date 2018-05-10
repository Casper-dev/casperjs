const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const nodeExternals = require('webpack-node-externals')


const makeBabelRule = envConfig => ({
  test: /\.js$/,
  exclude: [/node_modules/, /promise/],
  use: {
    loader: 'babel-loader',
    options: {
      presets: [['env', envConfig]]
    }
  }
})


module.exports = (env, options) => {
  const baseConfig = {
    entry: path.resolve(__dirname, 'src/index.js'),
  
    output: {
      path: path.resolve(__dirname, 'dist')
    },

    // basically every node_module
    externals: [nodeExternals()],

    plugins: []
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

    module: {
      rules: [
        makeBabelRule({ targets: { node: '6.10' } })
      ]
    },
  
    output: {
      filename: 'casper.node.js',
      library: '',
      libraryTarget: 'commonjs2',
    }
  })
  
  
  const browserBundleConfig = merge(baseConfig, {
    output: {
      filename: options.mode === 'development' ? 'casper.js' : 'casper.min.js',
      library: '',
      libraryTarget: 'commonjs2',
    },

    module: {
      rules: [
        makeBabelRule({ targets: { browsers: ['last 2 versions'] } })
      ]
    },
  })

  const configs = [browserBundleConfig]
  if(options.mode === 'development') configs.push(nodeConfig)

  return configs
}