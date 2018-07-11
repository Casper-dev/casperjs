module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/*! exports provided: 0, 1, 2, 3, default */
/***/ (function(module) {

module.exports = [{"constant":true,"inputs":[{"name":"nodeID","type":"bytes32"}],"name":"getNodeAddr","outputs":[{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"fileID","type":"bytes32"}],"name":"getStoringPeers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"fileID","type":"bytes32"}],"name":"showStoringPeers","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"size","type":"uint256"},{"name":"seed","type":"uint256"}],"name":"getPeers","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"}];

/***/ }),

/***/ "./src/eth/sc.js":
/*!***********************!*\
  !*** ./src/eth/sc.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../utils */ "./src/utils/utils.js"),
    parseSCString = _require.parseSCString,
    uuidToHash = _require.uuidToHash;

var SC_INTERFACE = __webpack_require__(/*! ./sc.abi.json */ "./src/eth/sc.abi.json");
var SC_ADDR = {
  development: '70956945E53886f71c7dd8c1543e155d5e069a1A',
  production: 'ff89Eb252F1E9C6638823C819DC0b2Ce3bFae7F5'
};
var sc = {
  development: [],
  production: []
};
var getSC = function getSC(eth, mode) {
  // initiing casper-sc is somewhat pricy, so we try to get it from cache
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = sc[mode][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _pair = _step.value;

      if (_pair.eth === eth) return _pair.sc;
    }

    // conneced to another web3 instance or created for the first time
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var pair = { eth: eth, sc: new eth.Contract(SC_INTERFACE, SC_ADDR[mode]) };
  sc[mode].push(pair);

  return pair.sc;
};

var getUploadNodes = function getUploadNodes(eth, _ref) {
  var fileSize = _ref.fileSize,
      mode = _ref.mode;
  return new Promise(function (resolve, reject) {
    var sc = getSC(eth, mode);
    var entropy = Math.round(Math.random() * 100000);

    sc.methods.getPeers(fileSize, entropy).call().then(function (data) {
      var hashes = Object.values(data);

      return Promise.all(hashes.map(function (hash) {
        return new Promise(function (resolve, reject) {
          return sc.methods.getNodeAddr(hash).call().then(function (ipPort) {
            return resolve({
              ip: ipPort[0].replace(/:.*/, ''), // removing thrift port
              ipfs: ipPort[1],
              hash: hash
            });
          }).catch(reject);
        });
      }));
    }).then(function (nodes) {
      return nodes.filter(function (node) {
        return node.ip;
      });
    }).then(resolve);
  });
};

var getStoringNodes = function getStoringNodes(eth, _ref2) {
  var uuid = _ref2.uuid,
      mode = _ref2.mode;
  return new Promise(function (resolve, reject) {
    var sc = getSC(eth, mode);

    var fileHash = uuidToHash(uuid);
    sc.methods.showStoringPeers(fileHash).call().then(function (data) {
      var nodeHashes = Object.values(data);

      return Promise.all(nodeHashes.map(function (node) {
        return sc.methods.getNodeAddr(node).call();
      }));
    }).then(function (ipPorts) {
      return ipPorts.filter(function (ipPort) {
        return ipPort[0];
      });
    }).then(function (ipPorts) {
      return ipPorts.map(function (ipPort) {
        return ipPort[0].replace(/:.*/, '');
      });
    }).then(resolve);
  });
};

module.exports = {
  getUploadNodes: getUploadNodes,
  getStoringNodes: getStoringNodes
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// we use commonsjs for node export
var scEth = __webpack_require__(/*! ./eth/sc */ "./src/eth/sc.js");
var CasperPromise = __webpack_require__(/*! ./promise */ "./src/promise.js");
var requestAny = __webpack_require__(/*! ./requestAny */ "./src/requestAny.js");
var utils = __webpack_require__(/*! ./utils */ "./src/utils/utils.js");

var REST_PORT = 5001;
var sc = {
  eth: scEth
};

var Casper = function () {
  function Casper(api) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$blockchain = _ref.blockchain,
        blockchain = _ref$blockchain === undefined ? 'eth' : _ref$blockchain,
        _ref$mode = _ref.mode,
        mode = _ref$mode === undefined ? 'development' : _ref$mode;

    _classCallCheck(this, Casper);

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


  _createClass(Casper, [{
    key: 'save',
    value: function save(file) {
      var _this = this;

      var uuid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return CasperPromise(function (resolve, reject, emit) {
        if (!utils.isFile(file)) {
          throw new TypeError('casperapi: file type must be File | Blob | Buffer | stream.Readable');
        }

        utils.getFileSize(file).then(function (fileSize) {
          return sc[_this.blockchain].getUploadNodes(_this.blockchainAPI, { fileSize: fileSize, mode: _this.mode });
        }).then(function (nodes) {
          emit('sc-connected');

          var ips = nodes.map(function (x) {
            return x.ip;
          });
          var peers = nodes.map(function (x) {
            return x.ipfs + '/ipfs/' + x.hash;
          });
          var headers = {
            'X-Peers': JSON.stringify(peers)
          };

          var method = void 0,
              url = void 0;
          if (uuid) {
            // Update
            method = 'PUT';
            url = 'http://{host}:' + REST_PORT + '/casper/v0/file/' + uuid;
          } else {
            // Save new
            method = 'POST';
            url = 'http://{host}:' + REST_PORT + '/casper/v0/file';
          }

          requestAny(method, url, ips, { file: file, headers: headers }).on('progress', function (event) {
            return emit('progress', event);
          }).on('new-champion', function (ip) {
            return emit('node-found', ip);
          }).then(function (data) {
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

  }, {
    key: 'delete',
    value: function _delete(uuid) {
      var _this2 = this;

      return CasperPromise(function (resolve, reject, emit) {
        sc[_this2.blockchain].getStoringNodes(_this2.blockchainAPI, { uuid: uuid, mode: _this2.mode }).then(function (ips) {
          emit('sc-connected');
          requestAny('DELETE', 'http://{host}:' + REST_PORT + '/casper/v0/file/' + uuid, ips).on('new-champion', function (ip) {
            return emit('node-found', ip);
          }).then(resolve).catch(reject);
        }).catch(reject);
      });
    }

    /**
     * Gets file from casper storage.
     * @param {String} uuid file's unique id (from upload)
     * @return {CasperPromise} resolves with Blob | Buffer, after the whole file is downloaded
     */

  }, {
    key: 'getFile',
    value: function getFile(uuid) {
      var _this3 = this;

      return CasperPromise(function (resolve, reject, emit) {
        sc[_this3.blockchain].getStoringNodes(_this3.blockchainAPI, { uuid: uuid, mode: _this3.mode }).then(function (ips) {
          emit('sc-connected');
          return ips;
        }).then(function (ips) {
          requestAny('GET', 'http://{host}:' + REST_PORT + '/casper/v0/file/' + uuid, ips, { encoding: null }).on('progress', function (event) {
            return emit('progress', event);
          }).on('new-champion', function (ip) {
            return emit('node-found', ip);
          }).then(resolve).catch(reject);
        }).catch(reject);
      });
    }

    /**
     * Generates http link that allows to work with file the usual web way
     * @param {String} uuid file's unique id (from upload)
     */

  }, {
    key: 'getLink',
    value: function getLink(uuid) {
      var _this4 = this;

      return CasperPromise(function (resolve, reject, emit) {
        var sharingNode = '';
        sc[_this4.blockchain].getStoringNodes(_this4.blockchainAPI, { uuid: uuid, mode: _this4.mode }).then(function (ips) {
          emit('sc-connected');
          requestAny('POST', 'http://{host}:' + REST_PORT + '/casper/v0/share/' + uuid, ips).on('new-champion', function (ip) {
            return sharingNode = ip;
          }).then(function (path) {
            return resolve('http://' + sharingNode + ':' + REST_PORT + path);
          }).catch(reject);
        }).catch(reject);
      });
    }
  }]);

  return Casper;
}();

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
  if (this.subscribers[event]) this.subscribers[event].forEach(function (cb) {
    return cb(message);
  });
}

function CasperPromise(cb) {
  var realResolve = void 0;
  var realReject = void 0;

  var hijackControls = function hijackControls(resolve, reject) {
    realResolve = resolve;
    realReject = reject;
  };

  var p = new Promise(hijackControls);

  p.subscribers = {};
  p.emit = emit.bind(p);
  p.on = on.bind(p);

  cb(realResolve, realReject, p.emit);
  return p;
}

module.exports = CasperPromise;

/***/ }),

/***/ "./src/requestAdapter/browser.js":
/*!***************************************!*\
  !*** ./src/requestAdapter/browser.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CasperPromise = __webpack_require__(/*! ../promise */ "./src/promise.js");

var makeRequest = function makeRequest(_ref) {
  var _ref$method = _ref.method,
      method = _ref$method === undefined ? 'GET' : _ref$method,
      url = _ref.url,
      _ref$data = _ref.data,
      data = _ref$data === undefined ? {} : _ref$data,
      file = _ref.file,
      _ref$headers = _ref.headers,
      headers = _ref$headers === undefined ? {} : _ref$headers,
      encoding = _ref.encoding;

  var triggerAbort = void 0;

  var promise = CasperPromise(function (resolve, reject, emit) {
    // helpers
    var handleProgress = function handleProgress(event) {
      var done = event.loaded / event.total;
      if (done && 0 < done && done <= 1) emit('progress', done);
    };

    // preparation
    var form = new FormData();
    for (var key in data) {
      form.append(key, data[key]);
    }
    if (file) form.append('file', file);

    // dispatching request
    var req = new XMLHttpRequest();
    if (encoding === null) req.responseType = 'blob';

    if (file) {
      req.upload.onprogress = handleProgress;
    } else {
      req.onprogress = handleProgress;
    }

    req.onload = function (event) {
      return resolve(req.response);
    };
    req.onerror = function (err) {
      return reject(err);
    };

    req.open(method, url);
    for (var header in headers) {
      req.setRequestHeader(header, headers[header]);
    }
    req.send(form);

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


var request = __webpack_require__(/*! ./requestAdapter */ "./src/requestAdapter/browser.js");
var CasperPromise = __webpack_require__(/*! ./promise */ "./src/promise.js");

var hostWorthTrying = function hostWorthTrying(host) {
  return !host.rejected || host.canceled;
};

var requestAny = function requestAny(method, url, ips) {
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return CasperPromise(function (resolve, reject, emit) {
    ips = ips.filter(function (ip) {
      return ip !== '0.0.0.0';
    });
    if (ips.length === 0) reject(new Error('casperapi: No hosts to handle request'));

    // preparation
    var hosts = ips.map(function (ip) {
      return {
        ip: ip,
        rejected: false,
        canceled: false,
        abortRequest: null
      };
    });

    var championHost = '';

    var setChampion = function setChampion(host) {
      championHost = host;
      emit('new-champion', host.ip);
    };

    var handleProgress = function handleProgress(progressHost) {
      return function (event) {
        if (!championHost) setChampion(progressHost);

        hosts.filter(function (host) {
          return host !== championHost;
        }).map(function (host) {
          return host.abortRequest();
        });

        if (progressHost === championHost) {
          emit('progress', event);
        }
      };
    };

    // dispatching requests
    hosts.forEach(function (host) {
      // would introcduce babel later
      var req = request(Object.assign({}, config, {
        method: method,
        url: url.replace('{host}', host.ip)
      }));
      host.abortRequest = req.abort;

      req.on('progress', handleProgress(host)).then(function (response) {
        // avoiding multiple resolves
        if (!championHost) setChampion(host);
        if (host === championHost) resolve(response);
      }).catch(function (err) {
        // console.log('Host err', err, host)
        host.rejected = true;

        if (host === championHost) {
          // trying other requests that didn't fail
          var possibleIps = hosts.filter(hostWorthTrying).map(function (host) {
            return host.ip;
          });

          requestAny(method, url, possibleIps, config).on('progress', function (done) {
            return emit('progress', done);
          }).on('new-champion', function (ip) {
            return emit('new-champion', ip);
          }).then(resolve).catch(function (err) {
            reject(new Error('casperapi: All hosts are unreachable'));
          });
        } else if (hosts.filter(hostWorthTrying).length === 0) {
          reject(new Error('casperapi: All hosts are unreachable'));
        }
      });
    });
  });
};

module.exports = requestAny;

/***/ }),

/***/ "./src/utils/crypto/bs58.js":
/*!**********************************!*\
  !*** ./src/utils/crypto/bs58.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var A = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
var bs58 = {};

bs58.decode = function (S) {
    var d = [],
        //the array for storing the stream of decoded bytes
    b = [],
        //the result byte array that will be returned
    i = void 0,
        //the iterator variable for the base58 string
    j = void 0,
        //the iterator variable for the byte array (d)
    c = void 0,
        //the carry amount variable that is used to overflow from the current byte to the next byte
    n = void 0; //a temporary placeholder variable for the current byte
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
    while (j--) {
        //since the byte array is backwards, loop through it in reverse order
        b.push(d[j]);
    } //append each byte to the result
    return new Uint8Array(b); //return the final byte array in Uint8Array format
};

// bs58.encode = B => {
//   let d = [],   //the array for storing the stream of base58 digits
//       s = "",   //the result string variable that will be returned
//       i,        //the iterator variable for the byte input
//       j,        //the iterator variable for the base58 digit array (d)
//       c,        //the carry amount variable that is used to overflow from the current base58 digit to the next base58 digit
//       n;        //a temporary placeholder variable for the current base58 digit
//   for(i in B) { //loop through each byte in the input stream
//       j = 0,                           //reset the base58 digit iterator
//       c = B[i];                        //set the initial carry amount equal to the current byte amount
//       s += c || s.length ^ i ? "" : 1; //prepend the result string with a "1" (0 in base58) if the byte stream is zero and non-zero bytes haven't been seen yet (to ensure correct decode length)
//       while(j in d || c) {             //start looping through the digits until there are no more digits and no carry amount
//           n = d[j];                    //set the placeholder for the current base58 digit
//           n = n ? n * 256 + c : c;     //shift the current base58 one byte and add the carry amount (or just add the carry amount if this is a new digit)
//           c = n / 58 | 0;              //find the new carry amount (floored integer of current digit divided by 58)
//           d[j] = n % 58;               //reset the current base58 digit to the remainder (the carry amount will pass on the overflow)
//           j++                          //iterate to the next base58 digit
//       }
//   }
//   while(j--)        //since the base58 digits are backwards, loop through them in reverse order
//       s += A[d[j]]; //lookup the character associated with each base58 digit
//   return s          //return the final base58 string
// }

module.exports = bs58;

/***/ }),

/***/ "./src/utils/file/browser.js":
/*!***********************************!*\
  !*** ./src/utils/file/browser.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFile = function isFile(file) {
  if (file instanceof Blob) return true;
  return false;
};

var getFileSize = function getFileSize(file) {
  return new Promise(function (resolve) {
    if (file instanceof Blob) return resolve(file.size);
    reject(new Error('casperapi: Cannot compute file size'));
  });
};

module.exports = {
  isFile: isFile,
  getFileSize: getFileSize
};

/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sha256 = __webpack_require__(/*! js-sha256 */ "js-sha256");
var bs58 = __webpack_require__(/*! ./crypto/bs58 */ "./src/utils/crypto/bs58.js");

var _require = __webpack_require__(/*! ./file */ "./src/utils/file/browser.js"),
    isFile = _require.isFile,
    getFileSize = _require.getFileSize;

var parseSCString = function parseSCString(hash) {
  var val = hash.substring(2);
  var codes = [];

  for (var i = 0; i < val.length; i += 2) {
    codes.push(parseInt(val.substr(i, 2), 16));
  }

  return String.fromCharCode.apply(0, codes.filter(function (code) {
    return code !== 0;
  }));
};

var uuidToHash = function uuidToHash(uuid) {
  var bytes = bs58.decode(uuid);
  var sha = sha256(bytes);
  return '0x' + sha;
};

module.exports = {
  parseSCString: parseSCString,
  isFile: isFile,
  getFileSize: getFileSize,
  uuidToHash: uuidToHash
};

/***/ }),

/***/ "js-sha256":
/*!****************************!*\
  !*** external "js-sha256" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("js-sha256");

/***/ })

/******/ });
//# sourceMappingURL=casper.js.map