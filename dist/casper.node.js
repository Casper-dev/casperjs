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
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, default */
/***/ (function(module) {

module.exports = [{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"hash","type":"string"},{"name":"size","type":"uint256"}],"name":"confirmUpload","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"addToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"srcID","type":"string"}],"name":"getPingTarget","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"string"}],"name":"showStoringPeers","outputs":[{"name":"","type":"bytes32[4]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ipfsAddr","type":"string"}],"name":"getIpPort","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"confirmDownload","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSystemState","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllPeers","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"nodeHash","type":"string"},{"name":"telegram","type":"bytes32"},{"name":"udpIpPort","type":"string"},{"name":"ipPort","type":"string"},{"name":"id","type":"string"},{"name":"size","type":"uint256"}],"name":"registerProvider","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ipfsAddr","type":"string"},{"name":"newIpPort","type":"string"}],"name":"updateIpPort","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"}],"name":"removeProviderMachine","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"hash","type":"string"},{"name":"size","type":"uint256"}],"name":"confirmUpdate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"ipfsAddr","type":"string"}],"name":"getUDPIpPort","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"string"}],"name":"getStoringPeers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"string"},{"name":"n","type":"uint256"}],"name":"getFile","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"clearPrepay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"client","type":"address"}],"name":"isPrepaid","outputs":[{"name":"prepaid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"size","type":"uint256"}],"name":"getPeers","outputs":[{"name":"id1","type":"string"},{"name":"id2","type":"string"},{"name":"id3","type":"string"},{"name":"id4","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"UUID","type":"string"},{"name":"consensus","type":"bool[16]"},{"name":"nodeIds","type":"bytes32[4]"}],"name":"checkVerification","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"}],"name":"setBootstrap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pay","type":"uint256"}],"name":"prePay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"string"}],"name":"getNumberOfFiles","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"confirmTransfer","outputs":[],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"ipfsAddr","type":"string"}],"name":"getNodeHash","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBannedPeers","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"removeAllPeers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"string"}],"name":"verifyReplication","outputs":[{"name":"isBanned","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"nodeHash","type":"string"},{"name":"telegram","type":"bytes32"},{"name":"udpIpPort","type":"string"},{"name":"ipPort","type":"string"},{"name":"id","type":"string"},{"name":"size","type":"uint256"}],"name":"addProviderMachine","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"uuid","type":"uint128"}],"name":"notifyDelete","outputs":[],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"uuid","type":"string"},{"name":"id","type":"string"}],"name":"notifyVerificationTarget","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBootstrap","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"success","type":"bool"}],"name":"sendPingResult","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ipfsAddr","type":"string"},{"name":"newUDPIpPort","type":"string"}],"name":"updateUDPIpPort","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"hash","type":"string"},{"name":"size","type":"uint256"}],"name":"notifySpaceFreed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"string"}],"name":"machineInformation","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"}],"name":"Log","type":"event"},{"anonymous":false,"inputs":[],"name":"ProviderCheckEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"banned","type":"string"}],"name":"ProviderOffline","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"val","type":"string"}],"name":"ReturnString","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"UUID","type":"string"},{"indexed":false,"name":"id","type":"string"}],"name":"verificationTarget","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"UUID","type":"string"},{"indexed":false,"name":"consensus","type":"bytes32[4]"}],"name":"ConsensusResult","type":"event"}];

/***/ }),

/***/ "./src/eth/sc.js":
/*!***********************!*\
  !*** ./src/eth/sc.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { parseSCString, uuidToHash } = __webpack_require__(/*! ../utils */ "./src/utils.js");

const SC_INTERFACE = __webpack_require__(/*! ./sc.abi.json */ "./src/eth/sc.abi.json");
const SC_ADDR = 'Cb4d87043e63EB3F7B605f79906911C498A31B33';
let sc;
const ensureSC = eth => {
  if (!sc) sc = new eth.Contract(SC_INTERFACE, SC_ADDR);
};

const getUploadNodes = (eth, { fileSize }) => new Promise((resolve, reject) => {
  ensureSC(eth);

  sc.methods.getPeers(fileSize).call().then(data => {
    const ids = Object.keys(data).filter(key => key.startsWith('id')).map(key => data[key]);

    return Promise.all(ids.map(node => sc.methods.getIpPort(node).call()));
  }).then(ipPorts => ipPorts.map(ipPort => ipPort.replace(/:.*/, ''))).then(resolve).catch(err => console.error(err));
});

const getStoringNodes = (eth, { uuid }) => new Promise((resolve, reject) => {
  ensureSC(eth);

  const fileHash = uuidToHash(uuid);
  sc.methods.showStoringPeers(fileHash).call().then(data => {
    const nodeHashes = data.filter(hash => !/^0x0*$/.test(hash)).map(s => s.substring(0, s.length - 2)).map(parseSCString);

    return Promise.all(nodeHashes.map(node => sc.methods.getIpPort(node).call()));
  }).then(ipPorts => ipPorts.map(ipPort => ipPort.replace(/:.*/, ''))).then(resolve).catch(err => console.error(err));
});

module.exports = {
  getUploadNodes,
  getStoringNodes
};

/***/ }),

/***/ "./src/fileUitls/node.js":
/*!*******************************!*\
  !*** ./src/fileUitls/node.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


stream = __webpack_require__(/*! stream */ "stream");
getStreamLength = __webpack_require__(/*! stream-length */ "stream-length");

const isFile = file => file instanceof Buffer || file instanceof stream.Readable;

const getFileSize = file => new Promise((resolve, reject) => {
  if (file instanceof stream.Readable) return getStreamLength(file).then(resolve);
  if (file instanceof Buffer) return resolve(file.byteLength);

  reject(new Error('casperapi: Cannot compute file size'));
});

module.exports = {
  isFile,
  getFileSize
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
const utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

const REST_PORT = 5001;
const sc = {
  eth: scEth
};

class Casper {
  constructor(api, mode) {
    // Later we will add more blockchains and use autodetection, etherium is default mode 
    this.blockchain = mode || 'eth';
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
    return new CasperPromise((resolve, reject, emit) => {
      if (!utils.isFile(file)) {
        throw new TypeError('casperapi: file type must be File | Blob | ArrayBuffer | Buffer');
      }

      utils.getFileSize(file).then(fileSize => {
        return sc[this.blockchain].getUploadNodes(this.blockchainAPI, { fileSize });
      }).then(ips => {
        emit('sc-connected');
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

        requestAny(method, url, ips, { file }).on('progress', event => emit('progress', event)).on('new-champion', ip => emit('node-found', ip)).then(data => {
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
    return new CasperPromise((resolve, reject, emit) => {
      sc[this.blockchain].getStoringNodes(this.blockchainAPI, { uuid }).then(ips => {
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
    return new CasperPromise((resolve, reject, emit) => {
      sc[this.blockchain].getStoringNodes(this.blockchainAPI, { uuid }).then(ips => {
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
    return new CasperPromise((resolve, reject, emit) => {
      let sharingNode = '';
      sc[this.blockchain].getStoringNodes(this.blockchainAPI, { uuid }).then(ips => {
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
/***/ (function(module, exports) {

class CasperPromise extends Promise {
  constructor(cb) {
    let realResolve
    let realReject

    const hijackControls = (resolve, reject) => {
      realResolve = resolve
      realReject = reject
    }
    
    super(hijackControls)
    this.subscribers = {}

    this.on = this.on.bind(this)
    this.emit = this.emit.bind(this)

    cb(realResolve, realReject, this.emit)
  }

  on(event, cb) {
    if(!this.subscribers[event]) this.subscribers[event] = []
    this.subscribers[event].push(cb)
    return this
  }

  emit(event, message) {
    if(this.subscribers[event]) this.subscribers[event].forEach(cb => cb(message))
  }
}


module.exports = CasperPromise

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

  const promise = new CasperPromise((resolve, reject, emit) => {
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
        total = res.headers['x-content-length'];
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

const requestAny = (method, url, ips, config = {}) => new CasperPromise((resolve, reject, emit) => {
  if (ips.length === 0) reject(new Error('casperapi: No hosts to handle request'));

  ips = ips.filter(ip => ip !== '0.0.0.0');

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
      // console.log('Host err', err)
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

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const bs58 = __webpack_require__(/*! bs58 */ "bs58");
const sha256 = __webpack_require__(/*! js-sha256 */ "js-sha256");
const { isFile, getFileSize } = __webpack_require__(/*! ./fileUitls */ "./src/fileUitls/node.js");

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
  const sha = Buffer.from(sha256.array(bytes));
  const encoded = Buffer.concat([Buffer.from([18]), Buffer.from([sha.length]), sha]);
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

/***/ "bs58":
/*!***********************!*\
  !*** external "bs58" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bs58");

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