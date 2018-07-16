const stream = require('stream')
const getStreamLength = require('stream-length')


const isFile = file => ( file instanceof Buffer
                      || file instanceof stream.Readable
)

const getFileSize = file => {
  if (file instanceof stream.Readable) return getStreamLength(file)
  if (file instanceof Buffer) return new Promise((resolve => resolve(file.byteLength)))
}


module.exports = {
  isFile,
  getFileSize
}