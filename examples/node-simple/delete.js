const Web3 = require('web3-eth')
const Casper = require('casperapi')
const fs  = require('fs')

// reading uuid from meta.txt in this dir (meta.txt is created by save)
const uuid = fs.readFileSync(__dirname + '/meta.txt', 'utf8').replace('\r').split('\n')[0]

// creating web3 instance connected to casper private blockchain
const web3 = new Web3('http://94.130.182.144:8775')
const casper = new Casper(web3)


console.log('Getting link to the file with uuid:', uuid)
casper.delete(uuid)
  .on('sc-connected', () => console.log('sc'))
  .on('node-found', ip => console.log('got node', ip))
  .then(link => {
    // file gets deleted from the smart contract and target node, other nodes would drop it soon
    console.log('Deleted', uuid)
  })
  .catch(console.error)