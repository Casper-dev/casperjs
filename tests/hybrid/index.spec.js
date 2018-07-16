const { getFileSize, uuidToHash } = require('../../src/utils')
const CasperPromise = require('../../src/promise')

let mockRequest = jest.fn()
jest.mock('../../src/requestAny', () => function() {
  return mockRequest.apply(this, arguments)
})


// mock web3 and sc
const web3 = { eth: {} }
let mockGetUploadNodes = jest.fn()
let mockGetStoringNodes = jest.fn()
jest.mock('../../src/eth/sc.js', () => ({
  getUploadNodes: function() {
    return mockGetUploadNodes.call(this, ...arguments)
  },
  getStoringNodes: function() {
    return mockGetStoringNodes.call(this, ...arguments)
  }
}))

const Casper = require('../../src/index')


describe('casperapi', () => {
  let file, casperapi
  const uuid = '12sdadsa21414sdad5'

  beforeEach(() => {
    file = new Buffer('sample')
    mockRequest = jest.fn().mockReturnValueOnce(CasperPromise(r => r('{}')))
    mockGetUploadNodes = jest.fn().mockReturnValueOnce(Promise.resolve([]))
    mockGetStoringNodes = jest.fn().mockReturnValueOnce(Promise.resolve([]))
  })
  

  it('passes web3 to sc', async done => {
    const casperapi = new Casper(web3)
    await casperapi.save(file)

    expect(mockGetUploadNodes.mock.calls[0][0]).toEqual(web3.eth)
    done()
  })


  describe('save', () => {
    beforeEach(() => {
      casperapi = new Casper(web3)
    })

    it('calculates file size and passes it to sc (if file is new)', async done => {
      const size = await getFileSize(file)
      
      await casperapi.save(file)
  
      expect(mockGetUploadNodes.mock.calls[0][1].fileSize)
        .toEqual(size)
      done()  
    })

    it('passes the file to request strategy', async done => {
      await casperapi.save(file)

      expect(mockRequest.mock.calls[0][3].file).toBe(file)
      done()
    })

    it('passes the hosts from sc to request strategy', async done => {
      const ips = ['1.1.1.1', '2.2.2.2']
      const scReturn = ips.map(ip => ({ ip, ipfs: '', hash: '' }))
      mockGetUploadNodes = jest.fn().mockReturnValueOnce(scReturn)
      const casperapi = new Casper(web3)

      await casperapi.save(file)

      expect(mockRequest.mock.calls[0][2]).toEqual(ips)

      done()
    })

    it('requests save from nodes (if file is new)', async done => {
      await casperapi.save(file)
      
      expect(mockGetUploadNodes).toHaveBeenCalled()
      expect(mockRequest.mock.calls[0][0]).toBe('POST')
      done()
    })

    it('requests update from storing peers if (if file exists)', async done => {
      const ips = ['1.1.1.1', '2.2.2.2']
      const scReturn = ips.map(ip => ({ ip, ipfs: '', hash: '' }))
      mockGetUploadNodes = jest.fn().mockReturnValueOnce(scReturn)
      const casperapi = new Casper(web3)

      await casperapi.save(file, uuid)

      const call = mockRequest.mock.calls[0]
      expect(call[0]).toBe('PUT')
      expect(call[1].endsWith('file/' + uuid)).toBe(true)
      expect(mockRequest.mock.calls[0][2]).toEqual(ips)
      done()
    })

    it('resolves with file\'s uuid', async done => {
      const uuid = '12sdadsa21414sdad5'
      mockRequest = jest.fn().mockReturnValueOnce(
        CasperPromise(r => r(`{ "UUID": "${uuid}" }`))
      )
      
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
      expect(mockGetUploadNodes).not.toHaveBeenCalled()
    })
  })

  describe('delete', () => {
    beforeEach(() => {
      showStoringPeers = jest.fn().mockReturnValue([])
      casperapi = new Casper(web3)
    })

    it('requests file deletion', async done => {
      await casperapi.delete(uuid)

      expect(mockGetStoringNodes).toHaveBeenCalledTimes(1)
      const call = mockRequest.mock.calls[0]
      expect(call[0]).toBe('DELETE')
      expect(call[1].endsWith('file/' + uuid)).toBe(true)
      done()
    })
  })

  describe('getFile', () => {
    beforeEach(() => {
      casperapi = new Casper(web3)
    })

    it('requests the file', async done => {
      await casperapi.getFile(uuid)

      expect(mockGetStoringNodes).toHaveBeenCalledTimes(1)
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
      casperapi = new Casper(web3)
    })

    it('requests the sharing link', async done => {
      await casperapi.getLink(uuid)
  
      expect(mockGetStoringNodes).toHaveBeenCalledTimes(1)
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