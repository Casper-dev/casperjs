import json from 'rollup-plugin-json'


export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/casper.js',
    format: 'cjs'
  }, {
    file: 'dist/casper-esm.js',
    format: 'es'
  }],
  plugins: [ json() ]
}
