const { parseSCString, uuidToHash } = require('../utils')


const SC_INTERFACE = require('./sc.abi.json')
const SC_ADDR = {
  dev: 'Cb4d87043e63EB3F7B605f79906911C498A31B33',
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
        ids.map(node => sc.methods.getIpPort(node).call())
      )
    })
    .then(ipPorts => ipPorts.map(ipPort => ipPort.replace(/:.*/, '')))
    .then(resolve)
})


const getStoringNodes = (eth, { uuid, mode }) => new Promise((resolve, reject) => {
  const sc = getSC(eth, mode)


  const fileHash = uuidToHash(uuid)
  sc.methods.showStoringPeers(fileHash).call()
    .then(data => {
      const nodeHashes = data.filter(hash => !/^0x0*$/.test(hash))
                             .map(s => s.substring(0, s.length - 2))
                             .map(parseSCString)

      return Promise.all(
        nodeHashes.map(node => sc.methods.getIpPort(node).call())
      )
    })
    .then(ipPorts => ipPorts.map(ipPort => ipPort.replace(/:.*/, '')))
    .then(resolve)
})


module.exports = {
  getUploadNodes,
  getStoringNodes
}