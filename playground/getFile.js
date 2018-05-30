const Web3 = require('web3')
const Casper = require('../')
const fs  = require('fs')

const uuid = fs.readFileSync(__dirname + '/files/hash.txt', 'utf8')
const web3 = new Web3('http://94.130.182.144:8775')
const casper = new Casper(web3)

const main = async () => {
  try {
    console.log('GETTING', uuid)
    const file = await casper.getFile(uuid)
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