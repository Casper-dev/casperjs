const Web3 = require('web3')
const Casper = require('../dist/casper.node.js')
const fs  = require('fs')

const web3 = new Web3("http://94.130.182.144:8545")

const casper = new Casper(web3)

const main = async () => {
  try {
    const file = fs.readFileSync(__dirname + '/file.txt')
    const uuid = await casper.save(file)
                             .on('sc-connected', () => console.log('sc'))
                             .on('progress', console.log)
                             .on('node-found', console.log)
    // console.log('RESULT', uuid)
  } catch(err) {
    console.error('IT FAILED', err)
  }
}

main()