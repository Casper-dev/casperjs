const hexToString = require('../utils').hexToString


const SC_INTERFACE = require('./sc.abi.json')
const SC_ADDR = 'F837c5CdE708c05E39169E3aE0343B9f0dBB4DF2'
let sc
const ensureSC = eth => { if( ! sc) sc = new eth.Contract(SC_INTERFACE, SC_ADDR) }


const getAllNodes = eth => new Promise((resolve, reject) => {
  ensureSC(eth)

  sc.methods.getAllPeers().call()
    .then(data => {
      const hex = data[0]
      const nodeHashes = hex.map(s => s.substring(0, s.length - 2))
                            .map(hexToString)

      return Promise.all(
        nodeHashes.map(node => sc.methods.getIpPort(node).call())
      )
    })
    .then(resolve)
})


const getUploadNodes = (eth, { fileSize }) => new Promise((resolve, reject) => {
  ensureSC(eth)

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
    .catch(err => console.error(err))
})


const getStoringNodes = (eth, { uuid }) => new Promise((resolve, reject) => {
  ensureSC(eth)

  sc.methods.showStoringPeers(uuid).call()
    .then(data => {
      console.log('peers for', uuid, data)
      const nodeHashes = data.map(s => s.substring(0, s.length - 2))
                             .map(hexToString)
      
      return Promise.all(
        nodeHashes.map(node => sc.methods.getIpPort(node).call())
      )
    })
    .then(ipPorts => ipPorts.map(ipPort => ipPort.replace(/:.*/, '')))
    .then(resolve)
    .catch(err => console.error(err))
})


module.exports = {
  getAllNodes,
  getUploadNodes,
  getStoringNodes
}