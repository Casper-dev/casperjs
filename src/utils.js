const bs58 = require('bs58')
const sha256 = require('js-sha256')
const { isFile, getFileSize } = require('./fileUitls')


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
  const sha = Buffer.from(sha256.array(bytes))
  const encoded = Buffer.concat([
    Buffer.from([18]), 
    Buffer.from([sha.length]), 
    sha
  ])
  const hash = bs58.encode(encoded)

  return hash
}


module.exports = {
  parseSCString,
  isFile,
  getFileSize,
  uuidToHash
}