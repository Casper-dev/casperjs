stream = require('stream')
getStreamLength = require('stream-length')


const isFile = file => ( file instanceof Buffer
                      || file instanceof stream.Readable
)

const getFileSize = file => new Promise((resolve, reject) => {
  if(file instanceof stream.Readable) return getStreamLength(file).then(resolve)
  if(file instanceof Buffer) return resolve(file.byteLength)

  reject(new Error('casperapi: Cannot compute file size'))
})


module.exports = {
  isFile,
  getFileSize
}