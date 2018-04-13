import * as scEth from './eth/sc'
import CasperPromise from './promise'


const sc = {
  eth: scEth
}


class Casper {
  constructor(api, mode) {
    // Later we will add more blockchains and use autodetection, etherium is default mode 
    this.blockchain = mode || 'eth'
    if(this.blockchain === 'eth') this.blockchainAPI = api.eth
  }

  save(file, uuid) {
    return new CasperPromise((resolve, reject, emit) => {
    })
  }

  delete(uuid) {
    return new CasperPromise((resolve, reject, emit) => {
    })
  }

  fetch(uuid) {
    return new CasperPromise((resolve, reject, emit) => {
    })
  }

  getLink(uuid) {
    return new CasperPromise((resolve, reject, emit) => {
    })
  }

  // REMOVE
  getNodes() {
    return sc[this.blockchain].getAllNodes(this.blockchainAPI)
  }
}


export default Casper