const Web3 = require('web3-eth')
const Casper = require('casperapi')
const fs  = require('fs')
const path = require('path')

// Feel free to edit this, this just picks file for upload relative to this file
const pathToUpload = 'getFile.js'
const file = fs.createReadStream(path.resolve(__dirname, pathToUpload))

// reading uuid from meta.txt in this dir (meta.txt is created by save)
const uuid = fs.readFileSync(__dirname + '/meta.txt', 'utf8').replace('\r').split('\n')[0]


// creating web3 instance connected to casper private blockchain
const web3 = new Web3('http://94.130.182.144:8775')
const casper = new Casper(web3) 


console.log('Updaing:', uuid, 'with', pathToUpload)
casper.save(file, uuid)
  .on('sc-connected', () => console.log('sc'))
  .on('progress', event => console.log('progress', event))
  .on('node-found', ip => console.log('got node', ip))
  .then(uuid => {
    // uuid will be used to perform all other operations with this file
    console.log('Updated, uuid:', uuid)

    // saving uuid and file extension for other node-simple examples to work
    fs.writeFileSync(__dirname + '/meta.txt', uuid + '\n' + pathToUpload.split('.').pop())
  })
  .catch(console.error)