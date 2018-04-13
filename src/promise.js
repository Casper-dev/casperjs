class CasperPromise extends Promise {
  constructor(cb) {
    super((resolve, reject) => cb(resolve, reject, this.emit))
    this.subscribers = {}

    this.on = this.on.bind(this)
    this.emit = this.emit.bind(this)
  }

  on(event, cb) {
    if(!this.subscribers[event]) this.subscribers[event] = []
    this.subscribers[event].push(cb)
    return this
  }

  emit(event, message) {
    if( ! this.subscribers[event]) this.subscribers.forEach(cb => cb(message))
  }
}


export default CasperPromise