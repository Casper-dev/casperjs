const request = require('../../src/requestAdapter')
const testRequestAdapterApi = require('../testRequestAdapterApi')
const makeCbServer = require('../requestAdapterTestNode')


testRequestAdapterApi(request)
const TEST_PORT = 9001


describe('node', () => {
  describe('requestAdapter', () => {
    let logger = jest.fn().mockImplementation(ctx => ctx.status = 200)
    let killTestNode = () => {}

    beforeEach(() => {
      logger = jest.fn()
      killTestNode = makeCbServer(TEST_PORT, logger)
    })
    afterEach(() => {
      killTestNode()
    })

    it('makes simple requests', async done => {
      const response = await request({
        method: 'GET',
        url: 'http://127.0.0.1:9001'
      })

      expect(logger).toHaveBeenCalled()
      done()
    })
  })
})