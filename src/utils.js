const bs58 = require('bs58')
const sha256 = require('js-sha256')

let stream, getStreamLength

if(CASPER_BUNDLE_TARGET === 'node') {
  stream = require('stream')
  getStreamLength = require('stream-length')
}

const parseSCString = hash => {
  const val = hash.substring(2)
  const codes = []

  for(let i=0; i < val.length; i += 2) {
    codes.push(parseInt(val.substr(i, 2), 16))
  }

  return String.fromCharCode.apply(0, codes.filter(code => code !== 0))
}


const isFile = file => {
  if(CASPER_BUNDLE_TARGET === 'browser') {
    if(file instanceof Blob) return true
  }

  if(CASPER_BUNDLE_TARGET === 'node') {
    if(file instanceof Buffer) return true
    if(file instanceof stream.Readable) return true
  }
  return false
}


const getFileSize = file => new Promise(resolve => {
  if(CASPER_BUNDLE_TARGET === 'browser') {
    if (file instanceof Blob) resolve(file.size)
  }
  
  if (CASPER_BUNDLE_TARGET === 'node') {
    if(file instanceof stream.Readable) getStreamLength(file).then(resolve)
    if(file instanceof Buffer) resolve(file.byteLength)
  }
})


const uuidToHash = uuid => {
  const bytes = bs58.decode(uuid)
  const sha = new Buffer(sha256.array(bytes))
  const encoded = Buffer.concat([
    new Buffer([18]), 
    new Buffer([sha.length]), 
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