function on(event, cb) {
  if ( ! this.subscribers[event]) this.subscribers[event] = []
  this.subscribers[event].push(cb)
  return this
}


function emit(event, message) {
  if (this.subscribers[event]) this.subscribers[event].forEach(cb => cb(message))
}


function CasperPromise(cb) {
  let realResolve
  let realReject

  const hijackControls = (resolve, reject) => {
    realResolve = resolve
    realReject = reject
  }

  let p = new Promise(hijackControls)

  p.subscribers = {}
  p.emit = emit.bind(p)
  p.on = on.bind(p)

  cb(realResolve, realReject, p.emit)
  return p
}

module.exports = CasperPromise