// we use commonsjs for node export
const scEth = require('./eth/sc')
const CasperPromise = require('./promise').default
const requestAny = require('./requestAny').default
const utils = require('./utils')
const FormData = typeof window !== 'undefined' ? window.FormData : require('form-data')


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
   * @param {(Blob | Buffer | ArrayBuffer)} file 
   * @param {String} uuid file's unique id (from previous upload)
   * @return {CasperPromise} resolves with uuid
   */
  save(file, uuid = false) {
    return new CasperPromise((resolve, reject, emit) => {
      if( ! utils.isFile(file)) {
        throw new TypeError('Casper: file type must be File | Blob | ArrayBuffer | Buffer')
      }

      const fileSize = utils.getFileSize(file)

  
      sc[this.blockchain]
        .getUploadNode(this.blockchainAPI, { fileSize: fileSize })
        .then(ips => {
          emit('sc-connected')
          return ips
        })
        .then(ips => new Promise((resolve, reject) => {
          const form = new FormData()
          form.append('file', file)

          let method, url
          if(uuid) {
            // Update
            method = 'PUT'
            url = `https://{host}:5001/casper/v0/file/${uuid}`
          } else {
            method = 'POST'
            url = 'https://{host}:5001/casper/v0/file'
          }

          requestAny(method, url, ips, form)
            .on('progress', (ip, event) => emit('progress', event))
            .on('node-found', ip => emit('node-found', ip))
            .then(resolve)
            .catch(reject)
        }))
        .then(resolve)
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
  getFile(uuid) {
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