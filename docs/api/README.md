---
title: API Docs
lang: en-US
---

# API Docs

## CasperApi Constructor
Let's assume you have imported casperapi like
```js
const CasperApi = require('casperapi')
```

Now you can do
```js
const casper = new CasperApi(web3)
```

Let's see what more can be done here
```js
new CasperApi(blockchainProvider [, options])
```
#### Parameters
1. `Object` — Blockchain provider, for ethereum this would be `web3` or `web3-eth` (:hammer: neo coming soon). <br />
2. `Object` — Options object.
##### Options
##### blockchain
Which blockchain to use, currently only eth is supported.

*type*:    `String` <br />
*default*: `'eth'`

##### mode
`'development'`mode runs on the test nodes in casper test network. This works a bit faster and we could pull up some logs if you'll need it. <br />
`'production'` mode will make request to production smart contract and store data on real provider nodes. (this will be happen on testnet before alpha version is launched)

*type*:    `String` <br />
*default*: `'development'`


#### Returns
Casper instance.
You can call `.save`, `.getFile`, `.getLink`, `.delete`


#### Example
```js
const casper = new CasperApi(web3, { mode: 'production' })
```


<ui-divider />



## CasperPromise & Events
### Table of contentes
- [CasperPromise](#casperpromise)
- [progress](#progress)
- [sc-connected](#sc-connected)
- [node-found](#node-found)
- [Usage & Caveats](#usage--caveats)

### CasperPromise
Methods of casperapi instance return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) extended with an event system, to keep things simple for most use cases and support new language features like async\await. <br />
Events are mostly useful for tracking progress. They can be used like 
```js
casper.getFile(uuid)
      .on('progress', done => console.log('download progress', done))
      .then(data => { /* do something with the downloaded file */ })
```

### progress
#### Description
Fires each time chunk of data was uploaded \ downloaded. <br />
This event is only available for `casper.save` and `casper.getFile`. 

#### Callback args
1. `Nubmer` Indication of how much data was transferred on a scale from 0 (nothing) to 1 (whole file, which means that operation was completed)

#### Example
```js
casper.getFile(uuid)
      .on('progress', done => console.log('download progress', done))
      .then(data => { /* do something with the downloaded file */ })
```

### sc-connected
#### Description
Fires when web3 has received the response from the smart contract. Only fires once. <br />
This event is available for all methods. 

#### Callback args
none

#### Example
```js
casper.save(new Buffer.from('something'))
      .on('sc-connected', () => console.log('got necessary data from smart contract'))
```

### node-found
#### Description
Fires when some node has responded to the request, can fire multiple times. Last result has node on which operation has completed successfully. <br />
This event is available for all methods.

#### Callback args
1. `String` Node's ip address.

#### Example
```js
casper.save(new Buffer.from('something'))
      .on('node-found', ip => console.log('uploading to', ip))
```

### Usage & Caveats
Events can be chained, but `.on` should be called on initial promise.
```js
// this works
casper.getFile(uuid)
      .on('node-found', ip => console.log('uploading to', ip))
      .on('progress', done => console.log('download progress', done))
      .then(() => console.log('done'))


// this works
const getPromise = casper.getFile(uuid)
getPromise.then(() => console.log('done'))
getPromise
      .on('node-found', ip => console.log('uploading to', ip))
      .on('progress', done => console.log('download progress', done))


// this works
const get = async () => {
   const file = await casper.getFile(uuid)
                            .on('progress', done => console.log('download progress', done))
   return file
}

// this doesn't
casper.getFile(uuid).then(() => console.log('done'))
                    .on('progress', done => console.log('download progress', done))
```



<ui-divider />



## casper.save
```js
casper.save(file [, uuid])
```

Creates new file if no uuid was passed. <br />
Overwrites the file if uuid was passed.

#### Parameters
##### Node
1. `stream.Readable | Buffer` — file to save. <br />
2. `String` — uuid returned by previous save. 
##### Browser
1. `File | Blob` — file to save. <br />
2. `String` — uuid returned by previous save. 

#### Returns
`CasperPromise` that resolves with file's uuid as a `String`.

#### Example
```js
casper.save(file)
      .on('progress', event => console.log('save progress', event))
      .then(uuid => console.log('uploaded as', uuid)
```



<ui-divider />



## casper.getFile
```js
casper.getFile(uuid)
```
Downloads the file from casper network, stores it in memory.

#### Parameters
1. `String` — uuid returned by `casper.save`. 

#### Returns
##### Node
`CasperPromise` that resolves with file's content as a [`Buffer`](https://nodejs.org/docs/latest-v9.x/api/buffer.html).

##### Browser
`CasperPromise` that resolves with file's content as a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob).

#### Example
```js
casper.getFile(uuid)
      .on('progress', done => console.log('download progress', done))
      .then(data => { /* do something with the downloaded file */ })
```



<ui-divider />



## casper.getLink
```js
casper.getLink(uuid)
```
Creates a temporary url that can be used to access file's contents.

#### Parameters
1. `String` — uuid returned by `casper.save`. 

#### Returns
`CasperPromise` that resolves with temporary url for the file as a `String`. 
This link can be used via http in any way you like. For example `<img src={returnedUrl} />` or fetching it as a stream in nodejs.

#### Example
```js
casper.getLink(uuid)
      .then(data => { /* do something with file's temporary  url */ })
```



<ui-divider />



## casper.delete
```js
casper.delete(uuid)
```
Deletes the file from the casper network.

#### Parameters
1. `String` — uuid returned by `casper.save`. 

#### Returns
`CasperPromise` that resolves when file is deleted.

#### Example
```js
casper.delete(uuid)
      .then(() => console.log(uuid, 'was deleted'))
```