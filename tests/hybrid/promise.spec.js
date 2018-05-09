const CasperPromise = require('../../src/promise')


describe('CasperPromise', () => {
  it('Is a promise', () => {
    expect(new CasperPromise(() => {}) instanceof Promise).toBe(true)
  })

  it('Can resovle', done => {
    const targetValue = {}
    new CasperPromise((resolve, reject) => resolve(targetValue))
      .then(recived => {
        expect(recived).toBe(targetValue)
        done()
      })
  })

  it('Can reject', done => {
    const targetValue = {}
    new CasperPromise((resolve, reject) => reject(targetValue))
      .catch(recived => {
        expect(recived).toBe(targetValue)
        done()
      })
  })

  it('Has event system', done => {
    const targetValue = {}
    const promise = new CasperPromise((resolve, reject, emit) => {
      setTimeout(() => {
        emit('event', targetValue)
        emit('progress', 0.1)
        resolve()
      }, 0)
    })

    promise.on('event', data => expect(data).toBe(targetValue))
           .on('progress', done => expect(done).toBe(0.1))
           .then(() => done())
  })
})