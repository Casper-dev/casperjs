// Mocking request
let mockRequest = jest.fn()

jest.mock('../../src/requestAdapters/node', () => function() {
  return mockRequest.apply(this, arguments)
})


// Module to test
global.CASPER_BUNDLE_TARGET = 'node'
const requestStrategy = require('../../src/requestAny')


// Helpers
const CasperPromise = require('../../src/promise')
const wrapAsReq = promise => {
  promise.abort = jest.fn()
  return promise
}
const failOnce = () => {
  mockRequest.mockReturnValueOnce(wrapAsReq(
    new CasperPromise((_, reject) => reject(
      new Error('This should fail')
    ))
  ))
}


// tests
describe('requestStrategy', () => {    
  beforeEach(() => {
    mockRequest = jest.fn()
  })
  
  it('calls request at least once with url and host provided', () => {
    mockRequest.mockReturnValueOnce(wrapAsReq(
      new CasperPromise(resolve => resolve())
    ))
    requestStrategy('GET', 'http://{host}/bla', ['localhost'])

    const params = mockRequest.mock.calls[0][0]
    
    expect(params.method).toBe('GET')
    expect(params.url).toBe('http://localhost/bla')
  })

  
  it('always reaches a node', async done => {
    let ips = ['1.1.1.1', '2.2.2.2', '3.3.3.3', '4.4.4.4']
    let requests = []

    const makeRequest = currentOk => {
      mockRequest = jest.fn()

      for(let i = 0; i < currentOk; ++i) failOnce()
      mockRequest.mockReturnValueOnce(
        new CasperPromise((resolve, reject, emit) => {
          emit('progress', 1)
          resolve(ips[currentOk])
        })
      )
      for(let i = currentOk+1; i < ips.length; ++i) failOnce()
      
      return requestStrategy('GET', 'http://{host}/bla', ips)
    }

    for(let i = 0; i < ips.length; ++i) {
      const result = await makeRequest(i)
      expect(result).toBe(ips[i])
    }

    done()
  })

  it('emits progress', async done => {
    const progressChunks = 10
    const threshold = 5
    const targetResult = {}

    mockRequest.mockReturnValueOnce(
      new CasperPromise((resolve, reject, emit) => {
        for(let i = 1; i < progressChunks; ++i) {
          setTimeout(() => emit('progress', i * 1/progressChunks), i * threshold)
        }

        setTimeout(() => {
          emit('progress', 1)
          resolve(targetResult)
        }, progressChunks * threshold)
      })
    )

    const log = []
    const result = await requestStrategy('GET', 'http://{host}/bla', ['localhost'])
                            .on('progress', done => log.push(done))
    
    expect(log.length).toBe(progressChunks)
    log.forEach((chunk, idx) => {
      expect(chunk).toBe((idx + 1) * 1/progressChunks)
    })
    expect(result).toBe(targetResult)

    done()
  })

  it('only emits progress of one request', async done => {
    const progressChunks = 10
    const threshold = 5
    const targetResult = {}

    failOnce()
    mockRequest.mockReturnValueOnce(wrapAsReq(
      new CasperPromise((resolve, reject, emit) => {
        for(let i = 1; i < progressChunks; ++i) {
          setTimeout(() => emit('progress', i * 1/progressChunks), i * threshold)
        }

        setTimeout(() => {
          emit('progress', 1)
          resolve(targetResult)
        }, progressChunks * threshold)
      })
    ))
    mockRequest.mockReturnValueOnce(wrapAsReq(
      new CasperPromise((resolve, reject, emit) => {
        setTimeout(() => {
          emit('progress', 0.53)
          resolve(targetResult)
        }, Math.round(threshold * (progressChunks/2 + 0.5)))
      })
    ))
    
    const log = []
    const result = await requestStrategy(
                           'GET', 'http://{host}/bla', 
                           ['1.1.1.1', '2.2.2.2', '3.3.3.3']
                         )
                         .on('progress', done => log.push(done))
    
    expect(log.length).toBe(progressChunks)
    log.forEach((chunk, idx) => {
      expect(chunk).toBe((idx + 1) * 1/progressChunks)
    })
    expect(result).toBe(targetResult)

    done()
  })

  it('emits champion-found', async done => {
    let champIp = 0
    let targetChamp = '123.1.1.1'

    mockRequest.mockReturnValueOnce(wrapAsReq(
      new CasperPromise((resolve, reject, emit) => {
        emit('progress', 1)
        resolve()
      })
    ))

    const result = await requestStrategy(
                           'GET', 'http://{host}/bla', 
                           [targetChamp]
                         )
                         .on('new-champion', ip => champIp = ip)

    expect(champIp).toBe(targetChamp)
    done()
  })

  it('switches request if chamion rejects', async done => {
    const ips = ['1.1.1.1', '2.2.2.2']
    const progressExpected1 = [0.2, 0.4]
    const progressExpected2 = [0.3, 0.6, 1]

    const progressLog = []
    const champLog = []

    const targetResult = 'done'
    const failThreshold = 10

    

    mockRequest.mockImplementation(({ url }) => {
      if(url === 'http://1.1.1.1/bla') {
        return wrapAsReq(new CasperPromise((resolve, reject, emit) => {
          // slow, but it resolves
          setTimeout(() => {
            progressExpected2.forEach(x => emit('progress', x))
            resolve(targetResult)
          }, failThreshold * 2)
        }))
      }
      else {
        return wrapAsReq(new CasperPromise((resolve, reject, emit) => {
          // fast, but it fails
          setTimeout(() => {
            progressExpected1.forEach(x => emit('progress', x))
          }, 0)
          setTimeout(reject, failThreshold)
        }))
      }
    })

    const result = await requestStrategy('GET', 'http://{host}/bla', ips)
                           .on('progress', done => progressLog.push(done))
                           .on('new-champion', ip => champLog.push(ip))

    expect(result).toBe(targetResult)
    expect(progressLog).toEqual(progressExpected1.concat(progressExpected2))
    expect(champLog).toEqual(ips.reverse())

    done()
  })
})