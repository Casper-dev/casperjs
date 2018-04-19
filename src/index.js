// we use commonsjs for node export
const scEth = require('./eth/sc')
const CasperPromise = require('./promise')
const axios = require('axios')


const DEFAULT_LINK_LIFETIME = 1000 * 60 * 60 * 5

const sc = {
  eth: scEth
}


class Casper {
  constructor(api, mode) {
    // Later we will add more blockchains and use autodetection, etherium is default mode 
    this.blockchain = mode || 'eth'
    if(this.blockchain === 'eth') this.blockchainAPI = api.eth
  }

  /**
   * Writes file into casper storage.
   * If uuid is present file is overwritten
   * @param {(File | Blob)} file 
   * @param {String} uuid file's unique id (from previous upload)
   * @return {CasperPromise} resolves with uuid
   */
  save(file, uuid = false) {
    return new CasperPromise((resolve, reject, emit) => {
      sc[this.blockchain]
        .getUploadNode(this.blockchainAPI)
        .then(ip => {
          console.log(targetIp)
          // const nodeAddr = ''
          // emit('node-found')
          
          // // Uploading to the node
          // const data = null
          // const config = {
          //   onUploadProgress: event => emit('progress', event)
          // }

          // let axiosPromise
          // if(uuid) {
          //   axiosPromise = axios.post(`https://${nodeAddr}/api/v0/file/`, data, config)
          // } else {
          //   axiosPromise = axios.put(`https://${nodeAddr}/api/v0/file/${uuid}`, data, config)
          // }

          // axiosPromise
          //   .then(resolve)
          //   .catch(reject) // actually manual handling would be there
        })
        .catch(reject)
    })
  }

  /**
   * Deletes file from casper storage.
   * @param {String} uuid file's unique id (from upload)
   * @return {CasperPromise} resolves with void
   */
  delete(uuid) {
    return new CasperPromise((resolve, reject, emit) => {
    })
  }

  /**
   * Gets file from casper storage.
   * @param {String} uuid file's unique id (from upload)
   * @return {CasperPromise} resolves with Blob, after the whole file is downloaded
   */
  fetch(uuid) {
    return new CasperPromise((resolve, reject, emit) => {
    })
  }

  /**
   * 
   * @param {String} uuid file's unique id (from upload)
   * @param {Number} time how long magic link should be active (ms)
   */
  getLink(uuid, time = DEFAULT_LINK_LIFETIME) {
    return new CasperPromise((resolve, reject, emit) => {
    })
  }

  // REMOVE
  getNodes() {
    return sc[this.blockchain].getAllNodes(this.blockchainAPI)
  }
}


module.exports = Casper