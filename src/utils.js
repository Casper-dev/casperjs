import { DEFAULT_ECDH_CURVE } from "tls";

export const hexToString = hash => {
  const val = hash.substring(2)
  const codes = []

  for(let i=0; i < val.length; i += 2) {
    codes.push(parseInt(val.substr(i, 2), 16))
  }

  return String.fromCharCode(...codes)
}


export const isFile = file => {
  return (file instanceof ArrayBuffer 
    || (typeof Blob !== 'undefined' && file instanceof Blob)
    || (typeof Buffer !== 'undefined' && file instanceof Buffer))
}


export const getFileSize = file => {
  // Hybrid
  if ( file instanceof ArrayBuffer) return file.byteLength / 8
  
  // Browser
  if(typeof Blob !== 'undefined' && file instanceof Blob ) return file.size / 8
  
  // Node
  if ( file instanceof Buffer ) return file.byteLength / 8
}