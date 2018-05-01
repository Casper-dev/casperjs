import { resolve } from 'url';

let stream, getStreamLength

if(CASPER_BUNDLE_TARGET === 'node') {
  stream = require('stream')
  getStreamLength = require('stream-length')
}

const hexToString = hash => {
  const val = hash.substring(2)
  const codes = []

  for(let i=0; i < val.length; i += 2) {
    codes.push(parseInt(val.substr(i, 2), 16))
  }

  return String.fromCharCode(...codes)
}


const isFile = file => {
  if(file instanceof ArrayBuffer) return true
  
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
  if (file instanceof ArrayBuffer) resolve(file.byteLength / 8)
  
  if(CASPER_BUNDLE_TARGET === 'browser') {
    if (file instanceof Blob) resolve(file.size / 8)
  }
  
  if (CASPER_BUNDLE_TARGET === 'node') {
    if(file instanceof stream.Readable) getStreamLength(file).then(resolve)
    if(file instanceof Buffer) resolve(file.byteLength / 8)
  }
})


module.exports = {
  hexToString,
  isFile,
  getFileSize
}