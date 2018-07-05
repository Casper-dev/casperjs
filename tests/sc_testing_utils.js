const makeMockMethod = handler => function() {
  return {
    call: ctx => new Promise(resolve => {
      resolve(handler.apply(ctx, arguments))
    })
  }
}

const mockEth = ({
  getPeers = () => {},
  getNodeAddr = () => {},
  showStoringPeers = () => {},
}) => {
  const mockSC = {
    methods: {
      getPeers: makeMockMethod(getPeers),
      getNodeAddr: makeMockMethod(getNodeAddr),
      showStoringPeers: makeMockMethod(showStoringPeers),
    }
  }

  Contract = function() {
    this.methods = mockSC.methods
  }

  Contract.prototype = Object.prototype

  const eth = {
    Contract
  }

  eth.cool = getPeers.cool

  return eth
}

const testScWrapperApi = wrapper => {
  expect(wrapper.getUploadNodes instanceof Function).toBe(true)
  expect(wrapper.getStoringNodes instanceof Function).toBe(true)

  expect(wrapper.getUploadNodes.length).toBe(2)
  expect(wrapper.getStoringNodes.length).toBe(2)
}

module.exports = {
  mockEth,
  testScWrapperApi
}