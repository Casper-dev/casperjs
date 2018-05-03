const CasperPromise = require('../promise')


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
    const form = new FormData()
    for(let key in data) {
      form.append(key, data[key])
    }
    if(file) form.append('file', file)


    // dispatching request
    const req = new XMLHttpRequest()
    if(encoding === null) req.responseType = 'blob'
    
    if(file) {
      req.upload.onprogress = event => emit('progress', event.loaded / event.total)
    } else {
      req.onprogress = event => emit('progress', event.loaded / event.total)
    }
  
    req.onload = event => resolve(req.response)
    req.onerror = error => reject(error)

    req.open(method, url)
    req.send(form)

    // providing abort feature
    triggerAbort = req.abort.bind(req)
  })

  promise.abort = triggerAbort
  return promise
}


module.exports = makeRequest