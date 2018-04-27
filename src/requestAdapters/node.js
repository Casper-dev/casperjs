const request = require('request')
const Duplex = require('stream').Duplex
const CasperPromise = require('../promise')
const fs = require('fs')

const bufferToStream = buffer => {  
  const stream = new Duplex()
  stream.push(buffer)
  stream.push(null)
  return stream
}


const makeRequest = ({
  method = 'GET',
  url,
  data = {},
  file,
  headers,
  encoding
}) => {
  let triggerAbort

  const promise = new CasperPromise((resolve, reject, emit) => {
    // preparation
    const requestConfig = {
      method,
      url,
      headers,
      encoding: null,
      formData: Object.assign({}, data, file ? { attachments: [file] } : {})
    }


    // dispatching request
    const req = request(requestConfig, (err, response, data) => {
      if(err) {
        return reject(err)
      }
      resolve(data)
    })

    if(file) {
      // upload progress
      let uploaded = 0
      let total = 0
  
      const form = req.form()
      form.append('file', file)
      
      form.getLength((err, length) => { total = length })
      form.on('data', chunk => {
        // this is form read progress but for fs.createReadStream it's realistic as http reads this in chunks
        uploaded += chunk.length
        if(total) emit('progress', uploaded / total)
      })
    } else {
      // download progress
      let total = 0
      let downloaded = 0
      req.on('response', res => {
        total = res.headers['x-content-length']
      })
  
      req.on('data', chunk => {
        downloaded += chunk.length
        if(total) emit('progress', downloaded / total)
      })
    }

    
    // req.on('drain', () => {
    //   const nativeHttpReq = req.req
    //   const dispatched = nativeHttpReq.connection._bytesDispatched 
    //   const total = nativeHttpReq._headers['content-length']

    //   // console.log(nativeHttpReq, dispatched, total)

    //   if(dispatched) {
    //     emit('progress', dispatched / total)
    //   }
    // })

    // setInterval(() => {
    //   const nativeHttpReq = req.req
    //   const dispatched = nativeHttpReq.connection._bytesDispatched 
    //   const total = nativeHttpReq._headers['content-length']

    //   console.log('in interval', nativeHttpReq, dispatched, total)

    //   if(dispatched) {
    //     // emit('progress', dispatched / total)
    //   }
    // }, 1000)

    triggerAbort = req.abort.bind(req)
  })

  promise.abort = triggerAbort
  return promise
}


module.exports = makeRequest