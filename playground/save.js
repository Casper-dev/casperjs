const Web3 = require('web3-eth')
const Casper = require('../')
const fs  = require('fs')

const web3 = new Web3('http://94.130.182.144:8545')
const casper = new Casper(web3)

const main = async () => {
  try {
    const file = fs.createReadStream(__dirname + '/files/med.mp4')
    const uuid = await casper.save(file)
                             .on('sc-connected', () => console.log('sc'))
                             .on('progress', event => console.log('progress', event))
                             .on('node-found', ip => console.log('got node', ip))
                             
    console.log('RESULT', uuid)
    fs.writeFileSync(__dirname + '/files/hash.txt', uuid)
  } catch(err) {
    console.error('IT FAILED', err)
  }
}

main()