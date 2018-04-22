import axios from 'axios'
import CasperPromise from './promise'


const requestAny = (method, url, hosts, data) => new CasperPromise((resolve, reject, emit) => {
  if(hosts.length === 0) reject(new Error('No hosts to handle request'))

  let championHost = ''
  
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

  controllers.forEach(controller => {
    axios({
      method,
      url: url.replace('{host}', controller.host),

      headers: data ? data.getHeaders() : {},
      
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
        }

        if(controllers.filter(x => !x.rejected).length === 0) {
          // All given nodes failed
          reject(new Error('All hosts are unreachable'))
        }
      })
  })
})


export default requestAny