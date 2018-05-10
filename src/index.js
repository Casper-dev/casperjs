// we use commonsjs for node export
const scEth = require('./eth/sc')
const CasperPromise = require('./promise')
const requestAny = require('./requestAny')
const utils = require('./utils')


const REST_PORT = 5001
const sc = {
  eth: scEth
}


class Casper {
  constructor(api, mode) {
    // Later we will add more blockchains and use autodetection, etherium is default mode 
    this.blockchain = mode || 'eth'
    if(this.blockchain === 'eth') this.blockchainAPI = api.eth || api
  }

  /**
   * Writes file into casper storage.
   * If uuid is present file is overwritten
   * @param {(Blob | Buffer | stream.Readable)} file 
   * @param {String} uuid file's unique id (from previous upload)
   * @return {CasperPromise} resolves with uuid
   */
  save(file, uuid = false) {
    return new CasperPromise((resolve, reject, emit) => {
      if( ! utils.isFile(file)) {
        throw new TypeError('casperapi: file type must be File | Blob | ArrayBuffer | Buffer')
      }

      utils.getFileSize(file)
        .then(fileSize => {
          return sc[this.blockchain].getUploadNodes(this.blockchainAPI, { fileSize })
        })
        .then(ips => {
          emit('sc-connected')         
          let method, url
          if(uuid) {
            // Update
            method = 'PUT'
            url = `http://{host}:${REST_PORT}/casper/v0/file/${uuid}`
          } else {
            // Save new
            method = 'POST'
            url = `http://{host}:${REST_PORT}/casper/v0/file`
          }

          requestAny(method, url, ips, { file })
            .on('progress', event => emit('progress', event))
            .on('new-champion', ip => emit('node-found', ip))
            .then(data => {
              resolve(JSON.parse(data).UUID)
            })
            .catch(reject)
        })
        .catch(reject)
    })
  }

  /**
   * Deletes file from casper storage.  
   * @param {String} uuid file's unique id (returned from upload)
   * @return {CasperPromise} resolves with void
   */
  delete(uuid) {
    return new CasperPromise((resolve, reject, emit) => {
      sc[this.blockchain]
        .getStoringNodes(this.blockchainAPI, { uuid })
        .then(ips => {
          emit('sc-connected')
          requestAny('DELETE', `http://{host}:${REST_PORT}/casper/v0/file/${uuid}`, ips)
            .on('new-champion', ip => emit('node-found', ip))
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)
    })
  }

  /**
   * Gets file from casper storage.
   * @param {String} uuid file's unique id (from upload)
   * @return {CasperPromise} resolves with Blob | Buffer, after the whole file is downloaded
   */
  getFile(uuid) {
    return new CasperPromise((resolve, reject, emit) => {
      sc[this.blockchain]
        .getStoringNodes(this.blockchainAPI, { uuid })
        .then(ips => {
          emit('sc-connected')
          return ips
        })
        .then(ips => {
          requestAny('GET', `http://{host}:${REST_PORT}/casper/v0/file/${uuid}`, ips, { encoding: null })
            .on('progress', event => emit('progress', event))
            .on('new-champion', ip => emit('node-found', ip))
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)
    })
  }

  /**
   * Generates http link that allows to work with file the usual web way
   * @param {String} uuid file's unique id (from upload)
   */
  getLink(uuid) {
    return new CasperPromise((resolve, reject, emit) => {
      let sharingNode = ''
      sc[this.blockchain]
        .getStoringNodes(this.blockchainAPI, { uuid })
        .then(ips => {
          emit('sc-connected')
          requestAny('POST', `http://{host}:${REST_PORT}/casper/v0/share/${uuid}`, ips)
            .on('new-champion', ip => sharingNode = ip)
            .then(path => resolve(
              `http://${sharingNode}:${REST_PORT}${path}`
            ))
            .catch(reject)
        })
        .catch(reject)
    })
  }
}


module.exports = Casper