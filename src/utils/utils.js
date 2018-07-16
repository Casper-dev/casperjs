const sha256 = require('js-sha256')
const bs58 = require('./crypto/bs58')
const hex = require('./crypto/hex')
const { isFile, getFileSize } = require('./file')

const parseSCString = hash => {
  const val = hash.substring(2)
  const codes = []

  for(let i=0; i < val.length; i += 2) {
    codes.push(parseInt(val.substr(i, 2), 16))
  }

  return String.fromCharCode.apply(0, codes.filter(code => code !== 0))
}

const uuidToHash = uuid => {
  const bytes = bs58.decode(uuid)
  const sha = sha256(bytes)
  return '0x' + sha
}

const nodeIdToBytes = id => {
  const value = id.substr(0, 2) === '0x' ? id.substr(2) : id
  const bytes = hex.toBytes('1220' + value)
  const base58 = bs58.encode(bytes)

  return base58
}

const entropy = () => Math.round(Math.random() * 100000)

const neoDecodeOne = (neo, type, res) => {
  switch (type) {
  case Number:
    switch (res.type) {
    case 'Integer':
      return parseInt(res.value)
    case 'ByteArray':
      const hex = neo.u.reverseHex(res.value)
      return parseInt(hex, 16)
    }
  
  case String:
    return neo.u.hexstring2str(res.value)

  default:
    throw new Error(`casperapi: Unsupported neo decode pair: ${res.type} -> ${typeof type()}`)
  }
}
const neoDecode = (neo, desiredTypes, results) => {
  if (Array.isArray(desiredTypes)) {
    if (results.length < desiredTypes.length) throw new Error(`casperapi: Result to short, cannont convert ${results.length} of ${desiredTypes.length}`) 
    return desiredTypes.map((type, idx) => neoDecodeOne(neo, type, results[idx]))
  }

  return neoDecodeOne(neo, desiredTypes, results)
}

const detectBlockchain = api => {
  if ( ! api instanceof Object) return

  if (api.eth
  || (api.sign && api.sign.call === 'eth_sign')
  ) {
    return 'eth'
  } else if (
    // neon-js
    api.CONST && api.CONST.NEO_NETWORK
  ) {
    return 'neo'
  }
}

module.exports = {
  parseSCString,
  isFile,
  getFileSize,
  uuidToHash,
  nodeIdToBytes,
  entropy,
  neoDecode,
  detectBlockchain
}