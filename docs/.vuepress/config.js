const path = require('path')


module.exports = {
  title: 'Casper API JS SDK',
  description: 'Casper API bindings in javascript',
  base: '/casperjs/',
  ga: 'UA-105436727-4',
  head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/logo.png' }],
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],

  themeConfig: {
    sidebar: [
      {
        collapsable: false,
        children: [
          '',
          '/setup/',
          '/basic-usage/',
          '/api/',
          '/examples/'
        ]
      }
    ],
    nav: [
      { text: 'Support email', link: '/support/' },
      { text: 'Github', link: 'https://github.com/Casper-dev/casperjs' },
    ]
  },

  configureWebpack: (config, isServer) => {
    // Bring back defaults
    config.resolve.alias['scrypt'] = path.resolve(__dirname, '../../node_modules/scrypt.js/js.js')
    config.resolve.alias['scrypt.js'] = path.resolve(__dirname, '../../node_modules/scrypt.js/js.js')
    config.resolve.extensions = config.resolve.extensions.concat(['.wasm', '.mjs', '.js', '.json', '.node'])
  }
}