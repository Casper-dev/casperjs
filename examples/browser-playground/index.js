import Web3 from 'web3-eth'
import Casper from 'casperapi'

import log from './log'


// waiting for the whole thing to load
window.addEventListener('load', () => {
  // getting dom nodes from UI
  const $file = document.getElementById('file')
  const $uuid = document.getElementById('uuid')
  const $actions = document.getElementById('actions')

  const $save = document.getElementById('save')
  const $delete = document.getElementById('delete')

  const $download = document.getElementById('download')
  const $getLink  = document.getElementById('get-link')


  // connecting to casper private blockchain
  const web3js = new Web3('http://94.130.182.144:8775')
  const casper = new Casper(web3js)

  $save.addEventListener('click', () => {
    // getting the file object form file input
    const file = $file.files[0]

    /* simple alternative w/ progress, 
       1) make this function async
       2) const uuid = casper.save(file) 
                          .on('progress', done => log('Download progress', done)) 
       
       This appliies to all other functions too. You can find more infromation about async / await here
       https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    */

    // saving it (if uuid is present file will be updated)
    casper.save(file, $uuid.value || undefined)
          .on('sc-connected', () => log('Connected to SC', 'while saving'))
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
          .on('sc-connected', () => log('Connected to SC', 'while deleting ' + uuid))
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
          .on('sc-connected', () => log('Connected to SC', 'while downloading ' + uuid))
          .on('node-found', ip => log('Node found', `${ip} (while downloading ${uuid})`))
          .then(file => {
            // note that file is a Blobs
            log('Downloaded', uuid)
            console.log(file instanceof Blob, file)

            // downloading the file to the client
            // Promting filename the simplest way possible
            const filename = prompt('Filename for downloaded file')

            // Creating a from-memory-download link
            const url = window.encodeURIComponent(file)
            const $link = document.createElement('a')
            $link.setAttribute('href', url)
            $link.setAttribute('download', filename)

            // Calling the link
            document.body.appendChild($link)
            $link.click()

            // cleaning up
            document.body.removeChild($link)
          })
          .catch(err => {
            log('DOWNLOAD ERROR', err)
            console.error(err)
          })
  })

  $getLink.addEventListener('click', () => {
    const uuid = $uuid.value
    casper.getLink(uuid)
          .on('sc-connected', () => log('Connected to SC', 'while getting link for ' + uuid))
          .on('node-found', ip => log('Node found', `${ip} (while getting link for ${uuid})`))
          .then(link => log('Got link', link))
          .catch(err => {
            log('GET ERROR', err)
            console.error(err)
          })
  })

  // Media handling
  const mediaTypes = ['image', 'video', 'audio']
  const type2tag = {
    image: 'img',
    video: 'video',
    audio: 'audio'
  }
  
  mediaTypes.forEach(type => {
    const $btn = document.createElement('button')
    $btn.textContent = 'Get as ' + type

    $actions.appendChild($btn)
    $btn.addEventListener('click', async event => {
      // no need to overcomplicate this
      const uuid = document.getElementById('uuid').value
      const $container = document.getElementById('media-container')
      console.log('handling media')
    
      try {
        const url = await casper.getLink(uuid)
                                .on('sc-connected', () => log('Connected to SC'))
    
        const $content = document.createElement(type2tag[type])
        $content.setAttribute('src', url)
        $content.setAttribute('controls', true)
      
        $container.innerHTML = ''
        $container.appendChild($content)
      } catch(err) {
        console.error(err)
        $container.innerHTML = 'An error occurred while showing ' + uuid
      }
    })
  })
})