const Web3 = require('web3')
const Casper =  require('../dist/casper.node.js')

const web3 = new Web3("http://94.130.182.144:8545")

const casper = new Casper(web3)

const main = async () => {
  try {
    const nodes = await casper.getNodes()
    console.log(nodes)
  } catch(err) {
    console.error(err)
  }
}

main()