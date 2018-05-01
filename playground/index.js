const Web3 = require('web3')
const Casper = require('../dist/casper')


window.addEventListener('load', () => {
  const $log = document.getElementById('log')
  
  const $file = document.getElementById('file')
  const $uuid = document.getElementById('uuid')

  const $save = document.getElementById('save')
  const $delete = document.getElementById('delete')

  const $download = document.getElementById('download')
  const $getLink  = document.getElementById('get-link')


  const log = (message, payload) => {
    $log.value += `${message}: '${payload}\n`
  }

  const web3js = new Web3(web3.currentProvider)
  const casper = new Casper(web3js)

  $save.addEventListener('click', () => {
    const file = $file.files[0]
    casper.save(file, $uuid.value || undefined)
          .on('sc-connected', () => log('SC reached', 'while saving'))
          .on('node-found', ip => log('Node found', `${ip} (while saving ${uuid})`))
          .on('progress', done => log('Upload progress', done))
          .then(uuid => log('Upload done', 'file uuid -- ' + uuid))
          .catch(err => {
            log('SAVE ERROR', err)
            console.error(err)
          })
  })

  $delete.addEventListener('click', () => {
    const uuid = $uuid.value
    casper.delete(uuid)
          .on('sc-connected', () => log('SC reached', 'while deleting ' + uuid))
          .on('node-found', ip => log('Node found', `${ip} (while deleting ${uuid})`))
          .then(() => log('Deleted', uuid))
          .catch(err => {
            log('DELETE ERROR', err)
            console.error(err)
          })
  })

  $download.addEventListener('click', () => {
    const uuid = $uuid.value
    casper.getFile($uuid.value)
          .on('progress', done => log('Download progress', done))
          .on('sc-connected', () => log('SC reached', 'while downloading ' + uuid))
          .on('node-found', ip => log('Node found', `${ip} (while downloading ${uuid})`))
          .then(file => {
            log('Downloaded', uuid)
            console.log(file)
          })
          .catch(err => {
            log('DELETE ERROR', err)
            console.error(err)
          })
  })

  $getLink.addEventListener('click', () => {
    const uuid = $uuid.value
    casper.getLink(uuid)
          .on('sc-connected', () => log('SC reached', 'while getting link for ' + uuid))
          .on('node-found', ip => log('Node found', `${ip} (while getting link for ${uuid})`))
          .then(link => log('Got link', link))
          .catch(err => {
            log('DELETE ERROR', err)
            console.error(err)
          })
  })
})