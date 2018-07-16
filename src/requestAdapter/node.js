const request = require('request')
const Duplex = require('stream').Duplex
const CasperPromise = require('../promise')
const fs = require('fs')
const toStream = require('buffer-to-stream')

const makeRequest = ({
  method = 'GET',
  url,
  data = {},
  file,
  headers,
  encoding
}) => {
  let triggerAbort

  const promise = CasperPromise((resolve, reject, emit) => {
    // preparation
    const requestConfig = {
      method,
      url,
      headers,
      encoding: null,
      formData: data
    }

    // dispatching request
    const req = request(requestConfig, (err, response, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })

    if (file) {
      // upload progress
      let uploaded = 0
      let total = 0
      let filesize = undefined
      if (file instanceof Buffer) {
        filesize = file.byteLength
        file = toStream(file)
      }
  
      const form = req.form()
      form.maxDataSize = Infinity
      form.append('file', file, {
        knownLength: filesize
      })
      
      form.getLength((err, length) => { total = length })
      form.on('data', chunk => {
        // this is form read progress but for fs.createReadStream it's realistic as http reads this in chunks
        uploaded += chunk.length
        if (total) emit('progress', uploaded / total)
      })
    } else {
      // download progress
      let total = 0
      let downloaded = 0
      req.on('response', res => {
        total = res.headers['content-length']
      })
  
      req.on('data', chunk => {
        downloaded += chunk.length
        if (total) emit('progress', downloaded / total)
      })
    }


    // providing abort feature
    triggerAbort = req.abort.bind(req)
  })

  promise.abort = triggerAbort
  return promise
}


module.exports = makeRequest