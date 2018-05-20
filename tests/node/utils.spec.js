const utils = require('../../src/utils')
const fs = require('fs')


describe('utils', () => {
  const testFilePath = __dirname + '/../testFile.txt'
  const sampleBuffer = fs.readFileSync(testFilePath)
  const sampleFile = fs.createReadStream(testFilePath)
  const sampleFileSize = sampleBuffer.byteLength

  it('has isFile that matches ArrayBuffer, Buffer, stream.Readable', () => {
    expect(utils.isFile(sampleBuffer)).toBe(true)
    expect(utils.isFile(sampleFile)).toBe(true)

    expect(utils.isFile(15)).toBe(false)
    expect(utils.isFile(new Object())).toBe(false)
    expect(utils.isFile('a string, not file at all')).toBe(false)
  })

  it('has getFileSize that mesures Buffer, stream.Readable', 
      done => {
    Promise.all([
      utils.getFileSize(sampleBuffer),
      utils.getFileSize(sampleFile)
    ]).then(sizes => {
      sizes.forEach(size => {
        expect(size).toBe(sampleFileSize)
      })
      
      done()
    }).catch(err => {
      console.error(err)
      done(err)
    })
  })
})