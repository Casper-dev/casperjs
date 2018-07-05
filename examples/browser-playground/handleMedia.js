const type2tag = {
  image: 'img',
  video: 'video',
  audio: 'audio'
}

const handleMedia = type => async event => {
  // no need to overcomplicate this
  const uuid = document.getElementById('uuid').value

  if( ! uuid)

  try {
    const url = await casper.getLink(uuid)
                            .on('sc-connected', () => log('Connected to SC'))

    const $container = document.getElementById('media-container')
    const $content = document.createElement(type2tag[type])
    $content.setAttribute('src', url)
  
    $container.innerHTML = ''
    $container.appendChild($content)
  } catch(err) {
    $container.innerHTML = 'An error occurred while showing ' + uuid
  }
}

export default handleMedia