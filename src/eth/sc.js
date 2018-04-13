import { hexToString } from '../utils'

import SC_INTERFACE from './sc.abi.json'
const SC_ADDR = '8ED0B1823E0977B88793E69D515ABb041785585d'

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