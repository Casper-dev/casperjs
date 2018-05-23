const { parseSCString, uuidToHash } = require('../utils')


const SC_INTERFACE = require('./sc.abi.json')
const SC_ADDR = {
  dev: '9e322Ca6D818ec8a6BFb4352242c5615CDfD3aa7',
  prod: ''
}
const sc = {
  'dev': [],
  'prod': []
}
const getSC = (eth, mode) => {
  // initiing casper-sc is somewhat pricy, so we try to get it from cache
  for(let pair of sc[mode]) {
    if(pair.eth === eth) return pair.sc
  }

  // conneced to another web3 instance or created for the first time
  const pair = { eth, sc: new eth.Contract(SC_INTERFACE, SC_ADDR[mode]) }
  sc[mode].push(pair)

  return pair.sc
}


const getUploadNodes = (eth, { fileSize, mode }) => new Promise((resolve, reject) => {
  const sc = getSC(eth, mode)

  sc.methods.getPeers(fileSize).call()
    .then(data => {
      const ids = Object.keys(data)
                    .filter(key => key.startsWith('id'))
                    .map(key => data[key])

      return Promise.all(
        ids.map(node => sc.methods.getNodeAddress(node).call())
      )
    })
    .then(ipPorts => ipPorts.map(ipPort => ipPort[0].replace(/:.*/, '')))
    .then(resolve)
})


const getStoringNodes = (eth, { uuid, mode }) => new Promise((resolve, reject) => {
  const sc = getSC(eth, mode)


  const fileHash = uuidToHash(uuid)
  sc.methods.showStoringPeers(fileHash).call()
    .then(data => {
      const nodeHashes = []
      for(let key in data) {
        const hash = data[key]
        if(hash.length) nodeHashes.push(hash)
      }

      return Promise.all(
        nodeHashes.map(node => sc.methods.getNodeAddress(node).call())
      )
    })
    .then(ipPorts => ipPorts.map(ipPort => ipPort[0].replace(/:.*/, '')))
    .then(resolve)
})


module.exports = {
  getUploadNodes,
  getStoringNodes
}