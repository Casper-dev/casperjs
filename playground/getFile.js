const Web3 = require('web3')
const Casper = require('../dist/casper.node.js')
const fs  = require('fs')

const web3 = new Web3("http://94.130.182.144:8545")

const hash = fs.readFileSync(__dirname + '/files/hash.txt', 'utf8')
const casper = new Casper(web3)

const main = async () => {
  try {
    console.log('GETTING', hash)
    const file = await casper.getFile(hash)
                             .on('sc-connected', () => console.log('sc'))
                             .on('progress', event => console.log('progress', event))
                             .on('node-found', ip => console.log('got node', ip))
    fs.writeFileSync(__dirname + '/files/fetched', file)
  } catch(err) {
    console.error('IT FAILED', err)
    debugger
  }
}

main()