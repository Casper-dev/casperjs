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

module.exports = {
  mockEth
}