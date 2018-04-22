const hexToString = hash => {
  const val = hash.substring(2)
  const codes = []

  for(let i=0; i < val.length; i += 2) {
    codes.push(parseInt(val.substr(i, 2), 16))
  }

  return String.fromCharCode(...codes)
}


const isFile = file => {
  if(file instanceof ArrayBuffer ) return true
  
  if(CASPER_BUNDLE_TARGET === 'node') {
    if(file instanceof Buffer) return true 
  }

  if(CASPER_BUNDLE_TARGET === 'browser') {
    if(file instanceof Blob) return true
  }
}


const getFileSize = file => {
  if (file instanceof ArrayBuffer) return file.byteLength / 8
  
  if(CASPER_BUNDLE_TARGET === 'browser') {
    if (file instanceof Blob) return file.size / 8
  }

  if (CASPER_BUNDLE_TARGET === 'node') {
    if(file instanceof Buffer) return file.byteLength / 8
  }
}


module.exports = {
  hexToString,
  isFile,
  getFileSize
}