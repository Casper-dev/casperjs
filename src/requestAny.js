const axios = require('axios')
const CasperPromise = require('./promise')


const requestAny = (method, url, hosts, data) => new CasperPromise((resolve, reject, emit) => {
  if(hosts.length === 0) reject(new Error('No hosts to handle request'))
  
  
  const controllers = hosts.map(host => ({
    host,
    
    rejected: false,
    canceled: false,
    
    canceller: axios.CancelToken.source(),
    cancel() {
      if(this.canceled) return 
      
      this.canceled = true
      this.canceller.cancel()
    },
  }))
  
  let championHost = ''
  const handleProgress = progressHost => event => {
    if( ! championHost) {
      championHost = progressHost
      emit('node-found', championHost)
    }
    
    controllers
    .filter(controller.host !== championHost)
    .map(controller => controller.cancel())
    
    emit('progress', { progressHost, event })
  }
  if(CASPER_BUNDLE_TARGET === 'node') {
    // we want headers to hoist
    if(data) var headers = data.getHeaders()
  }


  controllers.forEach(controller => {
    axios({
      method,
      url: url.replace('{host}', controller.host),

      headers,
      data,

      cancelToken: controller.canceller.token,
      
      // only one will trigger anyway
      onUploadProgress: handleProgress(controller.host),
      onDownloadProgress: handleProgress(controller.host)
    })
      .then(data => {
        // console.log('wow')
        // avoiding multiple resolves
        if(controller.host === championHost) resolve(data)
      })
      .catch(err => {
        // console.log('meh', err)
        controller.rejected = true

        if(controller.host === championHost) {
          // trying other requests that didn't fail
          const possibleHosts = controllers
                                  .filter(controller => controller.canceled)
                                  .map(controller => controller.host)

          requestAny(method, url, possibleHosts, data)
            .then(resolve)
            .catch(err => {
              reject(new Error('All hosts are unreachable'))
            })
        } else if(controllers.filter(x => !x.rejected || x.canceled).length === 0) {
          reject(new Error('All hosts are unreachable'))
        }
      })
  })
})


module.exports = requestAny