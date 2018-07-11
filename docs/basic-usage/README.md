---
title: Basic usage
lang: en-US
---

# Basic usage

Import web3 and Casper libriraies
```js
const Web3 = require('web3') // or web3-eth
const CasperApi = require('casperapi')
```

Create web3 instance and connect it to casper test network via http
```js
const web3 = new Web3('http://94.130.182.144:8775')
```

CasperApi needs to be passed blockchain provider directly, as more blockchains would be available soon
```js
const casper = new CasperApi(web3)
```

Let's create a sample file and save it on the casper network
```js
const myFile = new Blob(['My file'], { type: 'text/plain' })
const savePromise = casper.save(myFile)
```
The value of `savePromise` is an extended native [Promise][using-promises].

[`casper.save`](/api/#casper-save) makes requests to smart contract and provider nodes, uploading file on the with highest speed & stablity. `savePromise` would only resolve after the file has been fully uploaded.

```js
savePromise
  .then(uuid => casper.getFile(uuid))
  .then(file => console.log(file.toString()))
```
Let's break down this one:

`savePromise` resolves with `uuid`: file's unique identifier in casper network.
You'll use it to fetch, modifiy and delete the file.

Then we use [`casper.getFile`](/api/#casper-getFile) that fetches the file as a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) and returns it.

## Playground
There is an initialized casperapi instance available in the global scope of this tab, feel free to play around with it in the console.

<client-only>
  <utils-playground />
</client-only>

[Playground with UI][playground]

[using-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
[playground]: /browser-playground.html