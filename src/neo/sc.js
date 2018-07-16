const { uuidToHash, nodeIdToBytes, entropy, neoDecode } = require('../utils') 

const SC_ADDR = {
  development: 'afbbe56378cd68fe045463bd5e3a2978f0ff37bb',
  production:  'ff89Eb252F1E9C6638823C819DC0b2Ce3bFae7F5'
}

const RPC_ADDR = {
  development: 'http://195.201.96.242:30333',
  production:  'http://195.201.96.242:30333'
}

const getUploadNodes = (neo, { fileSize, mode }) => new Promise((resolve, reject) => {
  const script = neo.sc.createScript({
    scriptHash: SC_ADDR[mode],
    operation: 'getpeers',
    args: [fileSize, 1]
  })

  neo.rpc.Query.invokeScript(script)
    .execute(RPC_ADDR[mode])
    .then(res => {
      const result = res.result.stack[0].value
      const nodeIds = result.filter(x => x.value.length).map(x => x.value)
      return nodeIds
    })
    .then(nodeIds => Promise.all(
      nodeIds.map(id => {
        const script = neo.sc.createScript({
          scriptHash: SC_ADDR[mode],
          operation: 'getinfo',
          args: [id]
        })

        return neo.rpc.Query.invokeScript(script)
          .execute(RPC_ADDR[mode])
          .then(res => {
            const result = res.result.stack[0].value
            const [ip, ipfs] = neoDecode(neo, [String, String], result.slice(2))
            return {
              ip: ip.replace(/:.*/, ''),
              ipfs,
              hash: neo.u.hexstring2str(id)
            }
          })
      }
    )))
    .then(resolve)
})

const getStoringNodes = (neo, { uuid, mode }) => new Promise((resolve, reject) => {
  const fileHash = uuidToHash(uuid)
  const script = neo.sc.createScript({
    scriptHash: SC_ADDR[mode],
    operation: 'getstoringpeers',
    args: [fileHash.substr(2)] // neo dislikes 0x
  })


  neo.rpc.Query.invokeScript(script)
    .execute(RPC_ADDR[mode])
    .then(res => {
      const result = res.result.stack[0].value
      const nodeIds = result.filter(x => x.value.length).map(x => x.value)
      return nodeIds
    })
    .then(nodeIds => Promise.all(
      nodeIds.map(id => {
        const script = neo.sc.createScript({
          scriptHash: SC_ADDR[mode],
          operation: 'getinfo',
          args: [id]
        })

        return neo.rpc.Query.invokeScript(script)
          .execute(RPC_ADDR[mode])
          .then(res => neoDecode(String, res.result.stack[0].value[2]))
      }
    )))
    .then(ips => ips.filter(ip => ip.length))
    .then(ips => ips.map(ip => ip.replace(/:.*/, '')))
    .then(resolve)
})

module.exports = {
  getUploadNodes,
  getStoringNodes
}