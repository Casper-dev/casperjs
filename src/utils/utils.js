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
  const value = id.substr(2)
  const bytes = hex.toBytes('1220' + value)
  const base58 = bs58.encode(bytes)

  return base58
}

module.exports = {
  parseSCString,
  isFile,
  getFileSize,
  uuidToHash,
  nodeIdToBytes
}