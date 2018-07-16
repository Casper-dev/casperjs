const CasperPromise = require('../promise')


const makeRequest = ({
  method = 'GET',
  url,
  data = {},
  file,
  headers = {},
  encoding
}) => {
  let triggerAbort

  const promise = CasperPromise((resolve, reject, emit) => {
    // helpers
    const handleProgress = event => {
      const done = event.loaded / event.total
      if (done && 0 < done && done <= 1) emit('progress', done)
    }
    
    // preparation
    const form = new FormData()
    for(let key in data) {
      form.append(key, data[key])
    }
    if (file) form.append('file', file)


    // dispatching request
    const req = new XMLHttpRequest()
    if (encoding === null) req.responseType = 'blob'
    
    if (file) {
      req.upload.onprogress = handleProgress
    } else {
      req.onprogress = handleProgress
    }
  
    req.onload = event => resolve(req.response)
    req.onerror = err => reject(err)

    req.open(method, url)
    for(let header in headers) {
      req.setRequestHeader(header, headers[header])
    }
    req.send(form)

    // providing abort feature
    triggerAbort = req.abort.bind(req)
  })

  promise.abort = triggerAbort
  return promise
}


module.exports = makeRequest