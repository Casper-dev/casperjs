const { parseSCString, uuidToHash } = require('../utils')


const SC_INTERFACE = require('./sc.abi.json')
const SC_ADDR = {
  development: '7ccf0E113e84593f0977Cd05Ff4bebd985a73963',
  production: 'ff89Eb252F1E9C6638823C819DC0b2Ce3bFae7F5'
}
const sc = {
  development: [],
  production: []
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
      const hashes = Object.keys(data)
                    .filter(key => key.startsWith('id'))
                    .map(key => data[key])

      return Promise.all(
        hashes.map(hash => new Promise((resolve, reject) =>
          sc.methods.getNodeAddress(hash)
            .call()
            .then(ipPort => resolve({
              ip: ipPort[0].replace(/:.*/, ''), // removing thrift port
              ipfs: ipPort[1],
              hash
            }))
            .catch(reject)
        ))
      )
    })
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