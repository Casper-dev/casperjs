module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/eth/sc.abi.json":
/*!*****************************!*\
  !*** ./src/eth/sc.abi.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, default */
/***/ (function(module) {

module.exports = [{"constant":false,"inputs":[{"name":"nodeID","type":"string"},{"name":"fileID","type":"string"},{"name":"size","type":"uint256"}],"name":"confirmUpload","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"addToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"fileID","type":"string"}],"name":"showStoringPeers","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"confirmDownload","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSystemState","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllPeers","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"nodeID","type":"string"},{"name":"addr","type":"string"}],"name":"updateIpPort","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"nodeID","type":"string"},{"name":"telegram","type":"bytes32"},{"name":"apiIpPort","type":"string"},{"name":"ipPort","type":"string"},{"name":"size","type":"uint256"}],"name":"registerProvider","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"nodeID","type":"string"}],"name":"removeProviderMachine","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"nodeID","type":"string"},{"name":"fileID","type":"string"},{"name":"size","type":"uint256"}],"name":"confirmUpdate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"fileID","type":"string"}],"name":"getStoringPeers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"nodeID","type":"string"},{"name":"n","type":"uint256"}],"name":"getFile","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"clearPrepay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"client","type":"address"}],"name":"isPrepaid","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"size","type":"uint256"},{"name":"seed","type":"uint256"}],"name":"getPeers","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBlockTime","outputs":[{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"nodeID","type":"string"},{"name":"addr","type":"string"}],"name":"updateAPIIpPort","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"fileID","type":"string"},{"name":"consensus","type":"bool[16]"},{"name":"nodeIds","type":"bytes32[4]"}],"name":"checkVerification","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"}],"name":"setBootstrap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pay","type":"uint256"}],"name":"prePay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPingTarget","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"nodeID","type":"string"}],"name":"getNumberOfFiles","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"confirmTransfer","outputs":[],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"getBannedPeers","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"removeAllPeers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"nodeID","type":"string"}],"name":"verifyReplication","outputs":[{"name":"isBanned","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint128"}],"name":"notifyDelete","outputs":[],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"fileID","type":"string"},{"name":"nodeID","type":"string"}],"name":"notifyVerificationTarget","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBootstrap","outputs":[{"name":"id","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"nodeID","type":"string"},{"name":"success","type":"bool"}],"name":"sendPingResult","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"nodeID","type":"string"}],"name":"getBanStats","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"nodeID","type":"string"}],"name":"getNodeAddress","outputs":[{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"nodeID","type":"string"},{"name":"fileID","type":"string"},{"name":"size","type":"uint256"}],"name":"notifySpaceFreed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"nodeID","type":"string"}],"name":"machineInformation","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"}],"name":"Log","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"string"}],"name":"ProviderCheckEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"banned","type":"string"}],"name":"ProviderOffline","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"val","type":"string"}],"name":"ReturnString","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"UUID","type":"string"},{"indexed":false,"name":"id","type":"string"}],"name":"verificationTarget","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"UUID","type":"string"},{"indexed":false,"name":"consensus","type":"bytes32[4]"}],"name":"ConsensusResult","type":"event"}];

/***/ }),

/***/ "./src/eth/sc.js":
/*!***********************!*\
  !*** ./src/eth/sc.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { parseSCString, uuidToHash } = __webpack_require__(/*! ../utils */ "./src/utils/utils.js");

const SC_INTERFACE = __webpack_require__(/*! ./sc.abi.json */ "./src/eth/sc.abi.json");
const SC_ADDR = {
  development: '63477527FBb78D1044426b879eB875883c5600FF',
  production: 'ff89Eb252F1E9C6638823C819DC0b2Ce3bFae7F5'
};
const sc = {
  development: [],
  production: []
};
const getSC = (eth, mode) => {
  // initiing casper-sc is somewhat pricy, so we try to get it from cache
  for (let pair of sc[mode]) {
    if (pair.eth === eth) return pair.sc;
  }

  // conneced to another web3 instance or created for the first time
  const pair = { eth, sc: new eth.Contract(SC_INTERFACE, SC_ADDR[mode]) };
  sc[mode].push(pair);

  return pair.sc;
};

const getUploadNodes = (eth, { fileSize, mode }) => new Promise((resolve, reject) => {
  const sc = getSC(eth, mode);
  const entropy = Math.round(Math.random() * 100000);

  sc.methods.getPeers(fileSize, entropy).call().then(data => {
    const hashes = Object.values(data);

    return Promise.all(hashes.map(hash => new Promise((resolve, reject) => sc.methods.getNodeAddress(hash).call().then(ipPort => resolve({
      ip: ipPort[0].replace(/:.*/, ''), // removing thrift port
      ipfs: ipPort[1],
      hash
    })).catch(reject))));
  }).then(resolve);
});

const getStoringNodes = (eth, { uuid, mode }) => new Promise((resolve, reject) => {
  const sc = getSC(eth, mode);

  const fileHash = uuidToHash(uuid);
  sc.methods.showStoringPeers(fileHash).call().then(data => {
    const nodeHashes = [];
    for (let key in data) {
      const hash = data[key];
      if (hash.length) nodeHashes.push(hash);
    }

    return Promise.all(nodeHashes.map(node => sc.methods.getNodeAddress(node).call()));
  }).then(ipPorts => ipPorts.map(ipPort => ipPort[0].replace(/:.*/, ''))).then(resolve);
});

module.exports = {
  getUploadNodes,
  getStoringNodes
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// we use commonsjs for node export
const scEth = __webpack_require__(/*! ./eth/sc */ "./src/eth/sc.js");
const CasperPromise = __webpack_require__(/*! ./promise */ "./src/promise.js");
const requestAny = __webpack_require__(/*! ./requestAny */ "./src/requestAny.js");
const utils = __webpack_require__(/*! ./utils */ "./src/utils/utils.js");

const REST_PORT = 5001;
const sc = {
  eth: scEth
};

class Casper {
  constructor(api, { blockchain = 'eth', mode = 'development' } = {}) {
    // Later we will add more blockchains and use autodetection, etherium is the default mode
    this.blockchain = blockchain;
    this.mode = mode;
    if (this.blockchain === 'eth') this.blockchainAPI = api.eth || api;
  }

  /**
   * Writes file into casper storage.
   * If uuid is present file is overwritten
   * @param {(Blob | Buffer | stream.Readable)} file
   * @param {String} uuid file's unique id (from previous upload)
   * @return {CasperPromise} resolves with uuid
   */
  save(file, uuid = false) {
    return CasperPromise((resolve, reject, emit) => {
      if (!utils.isFile(file)) {
        throw new TypeError('casperapi: file type must be File | Blob | Buffer | stream.Readable');
      }

      utils.getFileSize(file).then(fileSize => {
        return sc[this.blockchain].getUploadNodes(this.blockchainAPI, { fileSize, mode: this.mode });
      }).then(nodes => {
        emit('sc-connected');

        const ips = nodes.map(x => x.ip);
        const peers = nodes.map(x => `${x.ipfs}/ipfs/${x.hash}`);
        const headers = {
          'X-Peers': JSON.stringify(peers)
        };

        let method, url;
        if (uuid) {
          // Update
          method = 'PUT';
          url = `http://{host}:${REST_PORT}/casper/v0/file/${uuid}`;
        } else {
          // Save new
          method = 'POST';
          url = `http://{host}:${REST_PORT}/casper/v0/file`;
        }

        requestAny(method, url, ips, { file, headers }).on('progress', event => emit('progress', event)).on('new-champion', ip => emit('node-found', ip)).then(data => {
          resolve(JSON.parse(data).UUID);
        }).catch(reject);
      }).catch(reject);
    });
  }

  /**
   * Deletes file from casper storage.
   * @param {String} uuid file's unique id (returned from upload)
   * @return {CasperPromise} resolves with void
   */
  delete(uuid) {
    return CasperPromise((resolve, reject, emit) => {
      sc[this.blockchain].getStoringNodes(this.blockchainAPI, { uuid, mode: this.mode }).then(ips => {
        emit('sc-connected');
        requestAny('DELETE', `http://{host}:${REST_PORT}/casper/v0/file/${uuid}`, ips).on('new-champion', ip => emit('node-found', ip)).then(resolve).catch(reject);
      }).catch(reject);
    });
  }

  /**
   * Gets file from casper storage.
   * @param {String} uuid file's unique id (from upload)
   * @return {CasperPromise} resolves with Blob | Buffer, after the whole file is downloaded
   */
  getFile(uuid) {
    return CasperPromise((resolve, reject, emit) => {
      sc[this.blockchain].getStoringNodes(this.blockchainAPI, { uuid, mode: this.mode }).then(ips => {
        emit('sc-connected');
        return ips;
      }).then(ips => {
        requestAny('GET', `http://{host}:${REST_PORT}/casper/v0/file/${uuid}`, ips, { encoding: null }).on('progress', event => emit('progress', event)).on('new-champion', ip => emit('node-found', ip)).then(resolve).catch(reject);
      }).catch(reject);
    });
  }

  /**
   * Generates http link that allows to work with file the usual web way
   * @param {String} uuid file's unique id (from upload)
   */
  getLink(uuid) {
    return CasperPromise((resolve, reject, emit) => {
      let sharingNode = '';
      sc[this.blockchain].getStoringNodes(this.blockchainAPI, { uuid, mode: this.mode }).then(ips => {
        emit('sc-connected');
        requestAny('POST', `http://{host}:${REST_PORT}/casper/v0/share/${uuid}`, ips).on('new-champion', ip => sharingNode = ip).then(path => resolve(`http://${sharingNode}:${REST_PORT}${path}`)).catch(reject);
      }).catch(reject);
    });
  }
}

module.exports = Casper;

/***/ }),

/***/ "./src/promise.js":
/*!************************!*\
  !*** ./src/promise.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function on(event, cb) {
  if (!this.subscribers[event]) this.subscribers[event] = [];
  this.subscribers[event].push(cb);
  return this;
}

function emit(event, message) {
  if (this.subscribers[event]) this.subscribers[event].forEach(cb => cb(message));
}

function CasperPromise(cb) {
  let realResolve;
  let realReject;

  const hijackControls = (resolve, reject) => {
    realResolve = resolve;
    realReject = reject;
  };

  let p = new Promise(hijackControls);

  p.subscribers = {};
  p.emit = emit.bind(p);
  p.on = on.bind(p);

  cb(realResolve, realReject, p.emit);
  return p;
}

module.exports = CasperPromise;

/***/ }),

/***/ "./src/requestAdapter/node.js":
/*!************************************!*\
  !*** ./src/requestAdapter/node.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const request = __webpack_require__(/*! request */ "request");
const Duplex = __webpack_require__(/*! stream */ "stream").Duplex;
const CasperPromise = __webpack_require__(/*! ../promise */ "./src/promise.js");
const fs = __webpack_require__(/*! fs */ "fs");

const makeRequest = ({
  method = 'GET',
  url,
  data = {},
  file,
  headers,
  encoding
}) => {
  let triggerAbort;

  const promise = CasperPromise((resolve, reject, emit) => {
    // preparation
    const requestConfig = {
      method,
      url,
      headers,
      encoding: null,
      formData: data

      // dispatching request
    };const req = request(requestConfig, (err, response, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });

    if (file) {
      // upload progress
      let uploaded = 0;
      let total = 0;

      const form = req.form();
      form.maxDataSize = Infinity;
      form.append('file', file);

      form.getLength((err, length) => {
        total = length;
      });
      form.on('data', chunk => {
        // this is form read progress but for fs.createReadStream it's realistic as http reads this in chunks
        uploaded += chunk.length;
        if (total) emit('progress', uploaded / total);
      });
    } else {
      // download progress
      let total = 0;
      let downloaded = 0;
      req.on('response', res => {
        total = res.headers['content-length'];
      });

      req.on('data', chunk => {
        downloaded += chunk.length;
        if (total) emit('progress', downloaded / total);
      });
    }

    // providing abort feature
    triggerAbort = req.abort.bind(req);
  });

  promise.abort = triggerAbort;
  return promise;
};

module.exports = makeRequest;

/***/ }),

/***/ "./src/requestAny.js":
/*!***************************!*\
  !*** ./src/requestAny.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const request = __webpack_require__(/*! ./requestAdapter */ "./src/requestAdapter/node.js");
const CasperPromise = __webpack_require__(/*! ./promise */ "./src/promise.js");

const hostWorthTrying = host => !host.rejected || host.canceled;

const requestAny = (method, url, ips, config = {}) => CasperPromise((resolve, reject, emit) => {
  ips = ips.filter(ip => ip !== '0.0.0.0');
  if (ips.length === 0) reject(new Error('casperapi: No hosts to handle request'));

  // preparation
  const hosts = ips.map(ip => ({
    ip,
    rejected: false,
    canceled: false,
    abortRequest: null
  }));

  let championHost = '';

  const setChampion = host => {
    championHost = host;
    emit('new-champion', host.ip);
  };

  const handleProgress = progressHost => event => {
    if (!championHost) setChampion(progressHost);

    hosts.filter(host => host !== championHost).map(host => host.abortRequest());

    if (progressHost === championHost) {
      emit('progress', event);
    }
  };

  // dispatching requests
  hosts.forEach(host => {
    // would introcduce babel later
    const req = request(Object.assign({}, config, {
      method,
      url: url.replace('{host}', host.ip)
    }));
    host.abortRequest = req.abort;

    req.on('progress', handleProgress(host)).then(response => {
      // avoiding multiple resolves
      if (!championHost) setChampion(host);
      if (host === championHost) resolve(response);
    }).catch(err => {
      // console.log('Host err', err, host)
      host.rejected = true;

      if (host === championHost) {
        // trying other requests that didn't fail
        const possibleIps = hosts.filter(hostWorthTrying).map(host => host.ip);

        requestAny(method, url, possibleIps, config).on('progress', done => emit('progress', done)).on('new-champion', ip => emit('new-champion', ip)).then(resolve).catch(err => {
          reject(new Error('casperapi: All hosts are unreachable'));
        });
      } else if (hosts.filter(hostWorthTrying).length === 0) {
        reject(new Error('casperapi: All hosts are unreachable'));
      }
    });
  });
});

module.exports = requestAny;

/***/ }),

/***/ "./src/utils/crypto/bs58.js":
/*!**********************************!*\
  !*** ./src/utils/crypto/bs58.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const A = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const bs58 = {};

bs58.encode = B => {
    let d = [],
        //the array for storing the stream of base58 digits
    s = "",
        //the result string variable that will be returned
    i,
        //the iterator variable for the byte input
    j,
        //the iterator variable for the base58 digit array (d)
    c,
        //the carry amount variable that is used to overflow from the current base58 digit to the next base58 digit
    n; //a temporary placeholder variable for the current base58 digit
    for (i in B) {
        //loop through each byte in the input stream
        j = 0, //reset the base58 digit iterator
        c = B[i]; //set the initial carry amount equal to the current byte amount
        s += c || s.length ^ i ? "" : 1; //prepend the result string with a "1" (0 in base58) if the byte stream is zero and non-zero bytes haven't been seen yet (to ensure correct decode length)
        while (j in d || c) {
            //start looping through the digits until there are no more digits and no carry amount
            n = d[j]; //set the placeholder for the current base58 digit
            n = n ? n * 256 + c : c; //shift the current base58 one byte and add the carry amount (or just add the carry amount if this is a new digit)
            c = n / 58 | 0; //find the new carry amount (floored integer of current digit divided by 58)
            d[j] = n % 58; //reset the current base58 digit to the remainder (the carry amount will pass on the overflow)
            j++; //iterate to the next base58 digit
        }
    }
    while (j--) //since the base58 digits are backwards, loop through them in reverse order
    s += A[d[j]]; //lookup the character associated with each base58 digit
    return s; //return the final base58 string
};

bs58.decode = S => {
    let d = [],
        //the array for storing the stream of decoded bytes
    b = [],
        //the result byte array that will be returned
    i,
        //the iterator variable for the base58 string
    j,
        //the iterator variable for the byte array (d)
    c,
        //the carry amount variable that is used to overflow from the current byte to the next byte
    n; //a temporary placeholder variable for the current byte
    for (i in S) {
        //loop through each base58 character in the input string
        j = 0, //reset the byte iterator
        c = A.indexOf(S[i]); //set the initial carry amount equal to the current base58 digit
        c || b.length ^ i ? i : b.push(0); //prepend the result array with a zero if the base58 digit is zero and non-zero characters haven't been seen yet (to ensure correct decode length)
        while (j in d || c) {
            //start looping through the bytes until there are no more bytes and no carry amount
            n = d[j]; //set the placeholder for the current byte
            n = n ? n * 58 + c : c; //shift the current byte 58 units and add the carry amount (or just add the carry amount if this is a new byte)
            c = n >> 8; //find the new carry amount (1-byte shift of current byte value)
            d[j] = n % 256; //reset the current byte to the remainder (the carry amount will pass on the overflow)
            j++; //iterate to the next byte
        }
    }
    while (j--) //since the byte array is backwards, loop through it in reverse order
    b.push(d[j]); //append each byte to the result
    return new Uint8Array(b); //return the final byte array in Uint8Array format
};

module.exports = bs58;

/***/ }),

/***/ "./src/utils/file/node.js":
/*!********************************!*\
  !*** ./src/utils/file/node.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const stream = __webpack_require__(/*! stream */ "stream");
const getStreamLength = __webpack_require__(/*! stream-length */ "stream-length");

const isFile = file => file instanceof Buffer || file instanceof stream.Readable;

const getFileSize = file => {
  if (file instanceof stream.Readable) return getStreamLength(file);
  if (file instanceof Buffer) return new Promise(resolve => resolve(file.byteLength));
};

module.exports = {
  isFile,
  getFileSize
};

/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const sha256 = __webpack_require__(/*! js-sha256 */ "js-sha256");
const bs58 = __webpack_require__(/*! ./crypto/bs58 */ "./src/utils/crypto/bs58.js");
const { isFile, getFileSize } = __webpack_require__(/*! ./file */ "./src/utils/file/node.js");

const parseSCString = hash => {
  const val = hash.substring(2);
  const codes = [];

  for (let i = 0; i < val.length; i += 2) {
    codes.push(parseInt(val.substr(i, 2), 16));
  }

  return String.fromCharCode.apply(0, codes.filter(code => code !== 0));
};

const uuidToHash = uuid => {
  const bytes = bs58.decode(uuid);
  const sha = sha256.array(bytes);

  const encoded = new Uint8Array([18, sha.length].concat(sha));
  const hash = bs58.encode(encoded);

  return hash;
};

module.exports = {
  parseSCString,
  isFile,
  getFileSize,
  uuidToHash
};

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "js-sha256":
/*!****************************!*\
  !*** external "js-sha256" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("js-sha256");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "stream-length":
/*!********************************!*\
  !*** external "stream-length" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream-length");

/***/ })

/******/ });
//# sourceMappingURL=casper.node.js.map