const Web3 = require('web3-eth')
const Casper = require('casperapi')
const fs  = require('fs')

// reading uuid & file's extension from meta.txt in this dir (meta.txt is created by save)
const meta = fs.readFileSync(__dirname + '/meta.txt', 'utf8').replace('\r').split('\n')
const uuid = meta[0]
const ext = meta[1]

// creating web3 instance connected to casper private blockchain
const web3 = new Web3('http://94.130.182.144:8775')
const casper = new Casper(web3)


console.log('Getting the file with uuid:', uuid)
casper.getFile(uuid)
  .on('sc-connected', () => console.log('sc'))
  .on('progress', event => console.log('progress', event))
  .on('node-found', ip => console.log('got node', ip))
  .then(file => {
    fs.writeFileSync(__dirname + '/fetched.' + ext, file)
  })
  .catch(console.error)