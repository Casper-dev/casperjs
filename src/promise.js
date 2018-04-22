class CasperPromise extends Promise {
  constructor(cb) {
    let realResolve
    let realReject

    const hijackControls = (resolve, reject) => {
      realResolve = resolve
      realReject = reject
    }
    
    super(hijackControls)
    this.subscribers = {}

    this.on = this.on.bind(this)
    this.emit = this.emit.bind(this)

    cb(realResolve, realReject, this.emit)
  }

  on(event, cb) {
    if(!this.subscribers[event]) this.subscribers[event] = []
    this.subscribers[event].push(cb)
    return this
  }

  emit(event, message) {
    if(this.subscribers[event]) this.subscribers[event].forEach(cb => cb(message))
  }
}


export default CasperPromise