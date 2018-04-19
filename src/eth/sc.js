import { hexToString } from '../utils'

import SC_INTERFACE from './sc.abi.json'
const SC_ADDR = 'Ad91359bd71F0cb0A711458B4b69Ac10C4CfE515'

let sc


export const getAllNodes = eth => new Promise((resolve, reject) => {
  if( ! sc) sc = new eth.Contract(SC_INTERFACE, SC_ADDR)

  
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

export const getUploadNode = eth => new Promise((resolve, reject) => {
  if( ! sc) sc = new eth.Contract(SC_INTERFACE, SC_ADDR)

  
  sc.methods.getBootstrap().call()
    .then(data => {
      console.log('scDATA', data)
      // const hex = data[0]
      // const nodeHashes = hex.map(s => s.substring(0, s.length - 2))
      //                       .map(hexToString)
      // return sc.methods.getIpPort(data).call()
    })
    .then(resolve)
})