const Web3 = require('web3')
const Casper = require('../dist/casper.node.js')
const fs  = require('fs')

const web3 = new Web3("http://94.130.182.144:8545")

const casper = new Casper(web3)

const main = async () => {
  try {
    const file = fs.createReadStream(__dirname + '/files/file.txt')
    const hash = await casper.save(file)
                             .on('sc-connected', () => console.log('sc'))
                             .on('progress', event => console.log('progress', event))
                             .on('node-found', ip => console.log('got node', ip))
                             
    console.log('RESULT', hash)
    fs.writeFileSync(__dirname + '/files/hash.txt', hash)
  } catch(err) {
    console.error('IT FAILED', err)
  }
}

main()