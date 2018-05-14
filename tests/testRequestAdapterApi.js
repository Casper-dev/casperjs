const CasperPromise = require('../src/promise')


const testRequestAdapterApi = requestAdapter => {
  it('matches API', () => {
    const request = requestAdapter({
      method: 'GET',
      url: 'http://127.0.0.1'
    })
  
    // it's expected to fail
    request.catch(() => {})
  
    expect(request instanceof Promise).toBe(true)
    expect(request.abort instanceof Function).toBe(true)
    expect(request.on instanceof Function).toBe(true)
  
    request.abort()
  })
}


module.exports = testRequestAdapterApi