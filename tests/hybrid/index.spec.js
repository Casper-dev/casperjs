const { mockEth } = require('../sc_testing_utils')
const { getFileSize, uuidToHash } = require('../../src/utils')
const CasperPromise = require('../../src/promise')

let mockRequest = jest.fn()
jest.mock('../../src/requestAny', () => function() {
  return mockRequest.apply(this, arguments)
})

const Casper = require('../../src/index')


const testGettingStoringNodes = method => {
  it('gets stroing nodes from sc', async done => {
    const uuid = '12sdadsa21414sdad5'
    const showStoringPeers = jest.fn().mockReturnValue([])
    const web3 = {eth: mockEth({
      showStoringPeers
    })}
    
    const casperapi = new Casper(web3)
    await casperapi[method](uuid)

    expect(showStoringPeers).toHaveBeenCalledWith(uuidToHash(uuid))
    done()
  })
}


// Would separate this into 2 more atomic test suites later
describe('casperapi', () => {
  let file
  let uuid = '12sdadsa21414sdad5'
  beforeEach(() => {
    file = new Buffer('sample')
    mockRequest = jest.fn().mockReturnValueOnce(CasperPromise(r => r('{}')))
  })
  

  it('passes web3 to sc', async done => {
    const getPeers = jest.fn().mockReturnValue({})
    const web3 = {eth: mockEth({
      getPeers
    })}
    
    const casperapi = new Casper(web3)
    await casperapi.save(file)

    expect(getPeers).toHaveBeenCalled()
    done()
  })


  describe('save', () => {
    let web3, casperapi, getPeers

    beforeEach(() => {
      getPeers = jest.fn().mockReturnValue({})
      web3 = {eth: mockEth({
        getPeers
      })}
      casperapi = new Casper(web3)
    })

    it('calculates file size and passes it to sc (if file is new)', async done => {
      const size = await getFileSize(file)
      
      await casperapi.save(file)
  
      expect(getPeers).toHaveBeenCalledWith(size)
      done()  
    })

    it('passes the file to request strategy', async done => {
      await casperapi.save(file)

      expect(mockRequest.mock.calls[0][3].file).toBe(file)
      done()
    })

    it('passes the hosts from sc to request strategy', async done => {
      const ips = ['1.1.1.1', '2.2.2.2']
      const getPeers = jest.fn().mockReturnValueOnce({
        id1: 0,
        id2: 1
      })
      const getNodeAddress = id => [ips[id], 0]
      const localWeb3 = {eth: mockEth({
        getPeers,
        getNodeAddress
      })}
      const casperapi = new Casper(localWeb3)

      await casperapi.save(file)

      expect(mockRequest.mock.calls[0][2]).toEqual(ips)

      done()
    })

    it('requests save from nodes (if file is new)', async done => {
      await casperapi.save(file)
      
      expect(getPeers).toHaveBeenCalled()
      expect(mockRequest.mock.calls[0][0]).toBe('POST')
      done()
    })

    it('requests update from storing peers if (if file exists)', async done => {
      const ips = ['1.1.1.1', '2.2.2.2']
      const getPeers = jest.fn().mockReturnValueOnce({
        id1: 0,
        id2: 1
      })
      const getNodeAddress = id => [ips[id], '']
      const localWeb3 = {eth: mockEth({
        getPeers,
        getNodeAddress
      })}
      const casperapi = new Casper(localWeb3)

      await casperapi.save(file, uuid)

      const call = mockRequest.mock.calls[0]
      expect(call[0]).toBe('PUT')
      expect(call[1].endsWith('file/' + uuid)).toBe(true)
      expect(mockRequest.mock.calls[0][2]).toEqual(ips)
      done()
    })

    it(`resolves with file's uuid`, async done => {
      const uuid = '12sdadsa21414sdad5'
      mockRequest = jest.fn().mockReturnValueOnce(CasperPromise(r => r(`{ "UUID": "${uuid}" }`)))
      
      const returned = await casperapi.save(file)
      
      expect(returned).toEqual(uuid)
      done()
    })

    it('emts upload progress', async done => {
      mockRequest = jest.fn().mockImplementation(
        () => CasperPromise((resolve, _, emit) => {
          setTimeout(() => emit('progress', 0.1), 10)
          setTimeout(() => {
            emit('progress', 1)  
            resolve('{}')
          }, 20)
        })
      )
      const logProgress = jest.fn()
      await casperapi.save(file)
                     .on('progress', logProgress)

      expect(logProgress.mock.calls[0][0]).toBe(0.1)
      expect(logProgress.mock.calls[1][0]).toBe(1)
      done()
    })

    it('throws if file type is unsupported', () => {
      expect(() => casperapi.save(10)).toThrow()
      expect(getPeers).not.toHaveBeenCalled()
    })
  })

  describe('delete', () => {
    beforeEach(() => {
      showStoringPeers = jest.fn().mockReturnValue([])
      web3 = {eth: mockEth({
        showStoringPeers
      })}
      casperapi = new Casper(web3)
    })

    testGettingStoringNodes('delete')

    it('requests file deletion', async done => {
      await casperapi.delete(uuid)

      const call = mockRequest.mock.calls[0]
      expect(call[0]).toBe('DELETE')
      expect(call[1].endsWith('file/' + uuid)).toBe(true)
      done()
    })
  })

  describe('getFile', () => {
    let web3, casperapi, getPeers

    beforeEach(() => {
      showStoringPeers = jest.fn().mockReturnValue([])
      web3 = {eth: mockEth({
        showStoringPeers
      })}
      casperapi = new Casper(web3)
    })

    testGettingStoringNodes('getFile')

    it('requests the file', async done => {
      await casperapi.getFile(uuid)

      const call = mockRequest.mock.calls[0]
      expect(call[0]).toBe('GET')
      expect(call[1].endsWith('file/' + uuid)).toBe(true)
      done()
    })

    it('resolves with data returned from requestStrategy', async done => {
      mockRequest = jest.fn().mockReturnValueOnce(CasperPromise(r => r(file)))

      const returned = await casperapi.getFile(uuid)

      expect(returned).toBe(file)
      done()
    })

    it('emts download progress', async done => {
      mockRequest = jest.fn().mockImplementation(
        () => CasperPromise((resolve, _, emit) => {
          setTimeout(() => emit('progress', 0.1), 10)
          setTimeout(() => {
            emit('progress', 1)  
            resolve(file)
          }, 20)
        })
      )
      const logProgress = jest.fn()
      await casperapi.getFile(uuid)
                     .on('progress', logProgress)

      expect(logProgress.mock.calls[0][0]).toBe(0.1)
      expect(logProgress.mock.calls[1][0]).toBe(1)
      done()
    })
  })

  describe('getLink', () => {
    beforeEach(() => {
      showStoringPeers = jest.fn().mockReturnValue([])
      web3 = {eth: mockEth({
        showStoringPeers
      })}
      casperapi = new Casper(web3)
    })

    testGettingStoringNodes('getLink')

    it('requests the sharing link', async done => {
      await casperapi.getLink(uuid)

      const call = mockRequest.mock.calls[0]
      expect(call[0]).toBe('POST')
      expect(call[1].endsWith('share/' + uuid)).toBe(true)
      done()
    })
    it('resovle with the link returned form request strategy', async done => {
      mockRequest = jest.fn().mockReturnValueOnce(CasperPromise(r => r(file)))

      const returned = await casperapi.getFile(uuid)

      expect(returned).toBe(file)
      done()
    })
  })
})