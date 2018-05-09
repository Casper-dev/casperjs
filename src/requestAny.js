let request

if(CASPER_BUNDLE_TARGET === 'node') {
  request = require('./requestAdapters/node')
} else {
  request = require('./requestAdapters/browser')
}

const CasperPromise = require('./promise')

const hostWorthTrying = host => ( ! host.rejected) || host.canceled


const requestAny = (
  method, url, 
  ips, 
  config = {}
) => new CasperPromise((resolve, reject, emit) => {
  if(ips.length === 0) reject(new Error('No hosts to handle request'))

  // preparation
  const hosts = ips.map(ip => ({
    ip,
    rejected: false,
    canceled: false,
    abortRequest: null
  }))
  
  let championHost = ''
  
  const setChampion = host => {
    championHost = host
    emit('new-champion', host.ip)
  }

  const handleProgress = progressHost => event => {
    if( ! championHost) setChampion(progressHost)
    
    hosts
      .filter(host => host !== championHost)
      .map(host => host.abortRequest())
    
    if(progressHost === championHost) {
      emit('progress', event)
    }
  }


  // dispatching requests
  hosts.forEach(host => {
    // would introcduce babel later
    const req = request(Object.assign({}, config, {
      method,
      url: url.replace('{host}', host.ip),
    }))
    host.abortRequest = req.abort

    req
      .on('progress', handleProgress(host))
      .then(response => {
        // avoiding multiple resolves
        if( ! championHost) setChampion(host)
        if(host === championHost) resolve(response)
      })
      .catch(err => {
        // console.log('Host err', err)
        host.rejected = true

        if(host === championHost) {
          // trying other requests that didn't fail
          const possibleIps = hosts
                                .filter(hostWorthTrying)
                                .map(host => host.ip)
          

          requestAny(method, url, possibleIps, config)
            .on('progress', done => emit('progress', done))
            .on('new-champion', ip => emit('new-champion', ip))
            .then(resolve)
            .catch(err => {
              reject(new Error('All hosts are unreachable'))
            })
        } else if(hosts.filter(hostWorthTrying).length === 0) {
          reject(new Error('All hosts are unreachable'))
        }
      })
  })
})


module.exports = requestAny