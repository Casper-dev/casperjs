const isFile = file => {
  if(file instanceof Blob) return true
  return false
}

const getFileSize = file => new Promise(resolve => {
  if (file instanceof Blob) return resolve(file.size)
  reject(new Error('casperapi: Cannot compute file size'))
})


module.exports = {
  isFile,
  getFileSize
}