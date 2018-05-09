# Casper JS

[![Build Status][travis-img]][travis-link] [![codecov][codecov-img]][codecov-link]

Isomorphic javascript version of [Casper API][casper-home].


## Installation
### Prerequisites
:heavy_check_mark: Node `v6-v9` stable or a Promise supporting browser (or a polyfill)

:heavy_check_mark: Web3 `v1.*.*` (If you have trouble installing [web3][web3], please follow [this guide][web3-1-guide])

### via npm
```bash
npm install casperapi
```

### via yarn

```bash
yarn add casperapi
```


## Usage

> Casper JS is still early in development, right now it only supports ethereum and dev mode.

### Basic usage
```js
const Web3 = require('web3') // or web3-eth
const CasperApi = require('casperapi')

// http://94.130.182.144:8545 is casper test ethereum http provider
// use it for development, as it is faster than public testnets
const web3 = new Web3('http://94.130.182.144:8545')
const casper = new CasperApi(web3)

casper.save(Buffer.from('Casper api works'))
      .then(uuid => console.log(`My file's uuid: ${uuid}`))
```

### API
#### casper.getFile
Gets file and stores it in memory

##### Example
```js
const file = await casper.getFile(uuid)

const sameFile = await casper.getFile(uuid)
                             .on('sc-connected', () => console.log('sc'))
                             .on('node-found', ip => console.log('got node', ip))
                             .on('progress', done => console.log('progress', done))
```

##### Arguments
`uuid` `{String}` file's uuid (returned form save) 

##### Returns
`{CasperPromise}` that resolves with the file as a `{Buffer}`(node) or a `{Blob}`(browser)

##### Events
| Event        | Callback args                     | Firing condition                    |
|--------------|-----------------------------------|-------------------------------------|
| sc-connected | -                                 | Recived data from smart contract    |
| node-found   | `ip` `{String}` node's ip address | Download has started                |
| progress     | `done` `{Number}` from 0 to 1     | Each time data is recived from node |

---

#### casper.getLink
Generates unique static link to the file (useful for streaming \ downloading \ showing images \ ... )

##### Example
```js
const url = await casper.getLink(uuid)

const anotherUrl = await casper.getLink(uuid)
                               .on('sc-connected', () => console.log('sc'))
```

##### Arguments
`uuid` `{String}` file's uuid (returned form save) 

##### Returns
`{CasperPromise}` that resolves with the link to the file as a `{String}`

##### Events
| Event        | Callback args                     | Firing condition                    |
|--------------|-----------------------------------|-------------------------------------|
| sc-connected | -                                 | Recived data from smart contract    |

---

#### casper.save
Uploads \ Upldates file on casper network

##### Example
```js
const uuid = await casper.save(file)

// updates the file
const sameUuid = await casper.save(anotherFile, uuid)

const anotherUuid = await casper.save(file)
                                .on('sc-connected', () => console.log('sc'))
                                .on('node-found', ip => console.log('got node', ip))
                                .on('progress', done => console.log('progress', done))
```

##### Arguments
`file` `{Buffer | stream.Readable}`(node) `{Blob}`(browser) file to save

`uuid` `{String}` optional file's uuid (returned form save) if present file will be updated

```js
// Tip
console.log(File instanceof Blob) // true in browser
```

##### Returns
`{CasperPromise}` that resolves with the saved file's uuid as a `{String}`

##### Events
| Event        | Callback args                     | Firing condition                       |
|--------------|-----------------------------------|----------------------------------------|
| sc-connected | -                                 | Recived data from smart contract       |
| node-found   | `ip` `{String}` node's ip address | Upload has started                     |
| progress     | `done` `{Number}` from 0 to 1     | Each time data is uploaded to the node |

---

#### casper.delete
Deletes file form casper network

##### Example
```js
await casper.delete(uuid)

await casper.delete(uuid)
            .on('sc-connected', () => console.log('sc'))
```

##### Arguments
`uuid {String}` file's uuid (returned form save) 

##### Returns
`{CasperPromise}` that resolves when the file is deleted

##### Events
| Event        | Callback args                     | Firing condition                    |
|--------------|-----------------------------------|-------------------------------------|
| sc-connected | -                                 | Recived data from smart contract    |


#### CasperPromise
Extends `Promise` and adds simple event system to it.

There is caveat though:
```js
// This works
casper.getFile(uuid)
      .on('sc-connected', console.log)
      .on('progress', console.log)
      .then(cb)
      .catch(handleErr)

const download = casper.getFile(uuid)

download.on('progress', console.log)
downlaod.then(cb)

const file = await casper.getFile(uuid)
                         .on('sc-connected', console.log)
                         .on('progress', console.log)

// This doesn't, because then always returns a new Promise instance
casper.getFile(uuid)
      .then(cb)
      .on('progress', console.log)
```

---

## Coming soon
:hammer: `casper.getLink` support on testnet

:hammer: ES5 browsers support

:hammer: Production mode

:hammer: Better test coverage

:hammer: Support for Buffer upload progress in nodejs


<!-- Links -->
[web3]: http://web3js.readthedocs.io/en/1.0/index.html
[web3-1-guide]: docs/installingWeb3.md

[casper-home]: casperproject.io

<!-- Badges --> 
[codecov-img]:  https://codecov.io/gh/Casper-dev/casperjs/branch/0.0.1-dev/graph/badge.svg
[codecov-link]: https://codecov.io/gh/Casper-dev/casperjs
[travis-link]:  https://travis-ci.org/Casper-dev/casperjs
[travis-img]:   https://travis-ci.org/Casper-dev/casperjs.svg?branch=0.0.1-dev