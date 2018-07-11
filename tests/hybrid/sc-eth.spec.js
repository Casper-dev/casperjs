const { mockEth, testScWrapperApi } = require('../sc_testing_utils')
const { getFileSize, uuidToHash, nodeIdToBytes } = require('../../src/utils')
const wrapper = require('../../src/eth/sc')

describe('sc-wrappers', () => {
  describe('eth', () => {
    const mode = 'development'
    const ips = ['0.12.24.24:4001', '120.12.24.24:4001', '1.2.3.4:4001']
    const IPFS_IPPORT = { v: 'ipfs-ipport' }

    it('Matches api schema', () => {
      testScWrapperApi(wrapper)
    })

    it('gets stroing nodes the Contract', async done => {
      const uuid = '12sdadsa21414sdad5'
      const showStoringPeers = jest.fn().mockReturnValue({
        id1: '0',
        id2: '1',
        id3: '2'
      })
      const getNodeAddr = id => [ips[parseInt(id)], IPFS_IPPORT]
      const web3 = {eth: mockEth({
        showStoringPeers,
        getNodeAddr
      })}
      
      const result = await wrapper.getStoringNodes(web3.eth, { uuid, mode })

      expect(showStoringPeers).toHaveBeenCalledWith(uuidToHash(uuid))
      
      expect(result.length).toEqual(ips.length)
      result.forEach((node, idx) => {
        expect(node).toEqual(ips[idx].replace(/:.*/, ''))
      })

      done()
    })

    it('filters out empty ips in getStoringNodes', async done => {
      const uuid = '12sdadsa21414sdad5'
      const showStoringPeers = jest.fn().mockReturnValue({
        id1: '0',
        id2: '1',
        id3: '2'
      })
      const getNodeAddr = id => [
        id === '1' ? '' : ips[parseInt(id)], 
        IPFS_IPPORT
      ]
      const web3 = {eth: mockEth({
        showStoringPeers,
        getNodeAddr
      })}
      
      const result = await wrapper.getStoringNodes(web3.eth, { uuid, mode })
      
      expect(result.length).toEqual(ips.length - 1)
      expect(result[0]).toEqual(ips[0].replace(/:.*/, ''))
      expect(result[1]).toEqual(ips[2].replace(/:.*/, ''))

      done()
    })

    it('gets upload nodes from the Contract', async done => {
      const fileSize = 156
      const getPeers = jest.fn().mockReturnValue({
        id1: '0x10',
        id3: '0x11',
        id2: '0x12',
      })
      const getNodeAddr = id => [ips[parseInt(id.substr(2)) - 10], IPFS_IPPORT]
      const web3 = {eth: mockEth({
        getPeers,
        getNodeAddr
      })}
      
      const result = await wrapper.getUploadNodes(web3.eth, { fileSize, mode })

      expect(getPeers).toHaveBeenCalledWith(fileSize, expect.any(Number))
      
      expect(result.length).toEqual(ips.length)
      result.forEach((node, idx) => {
        expect(node.ip).toEqual(ips[idx].replace(/:.*/, ''))
        expect(node.ipfs).toEqual(IPFS_IPPORT)
        expect(node.hash).toEqual(nodeIdToBytes(`0x1${idx}`))
      })

      done()
    })

    it('filters out empty ips in getUploadNodes', async done => {
      const fileSize = 156
      const getPeers = jest.fn().mockReturnValue({
        id1: '0x10',
        id3: '0x11',
        id2: '0x12',
      })
      const getNodeAddr = id => [
        (id === '0x11') ? '' : ips[parseInt(id.substr(2)) - 10],
        IPFS_IPPORT
      ]
      
      const web3 = {eth: mockEth({
        getPeers,
        getNodeAddr
      })}
      
      const result = await wrapper.getUploadNodes(web3.eth, { fileSize, mode })

      expect(getPeers).toHaveBeenCalledWith(fileSize, expect.any(Number))
      
      expect(result.length).toEqual(ips.length - 1)
      expect(result[0].ip).toEqual(ips[0].replace(/:.*/, ''))
      expect(result[0].ipfs).toEqual(IPFS_IPPORT)
      expect(result[0].hash).toEqual(nodeIdToBytes(`0x10`))
      expect(result[1].ip).toEqual(ips[2].replace(/:.*/, '')) 

      done()
    })
  })
})