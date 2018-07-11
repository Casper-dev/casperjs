(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{380:function(t,e){(function(e){t.exports=e}).call(this,{})},381:function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_RESULT__;
/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";var ERROR="input is invalid type",WINDOW="object"==typeof window,root=WINDOW?window:{};root.JS_SHA256_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&"object"==typeof self,NODE_JS=!root.JS_SHA256_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS?root=global:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_SHA256_NO_COMMON_JS&&"object"==typeof module&&module.exports,AMD=__webpack_require__(380),ARRAY_BUFFER=!root.JS_SHA256_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[-2147483648,8388608,32768,128],SHIFT=[24,16,8,0],K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],OUTPUT_TYPES=["hex","array","digest","arrayBuffer"],blocks=[];!root.JS_SHA256_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!ARRAY_BUFFER||!root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var createOutputMethod=function(t,e){return function(r){return new Sha256(e,!0).update(r)[t]()}},createMethod=function(t){var e=createOutputMethod("hex",t);NODE_JS&&(e=nodeWrap(e,t)),e.create=function(){return new Sha256(t)},e.update=function(t){return e.create().update(t)};for(var r=0;r<OUTPUT_TYPES.length;++r){var n=OUTPUT_TYPES[r];e[n]=createOutputMethod(n,t)}return e},nodeWrap=function(method,is224){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),algorithm=is224?"sha224":"sha256",nodeMethod=function(t){if("string"==typeof t)return crypto.createHash(algorithm).update(t,"utf8").digest("hex");if(null===t||void 0===t)throw new Error(ERROR);return t.constructor===ArrayBuffer&&(t=new Uint8Array(t)),Array.isArray(t)||ArrayBuffer.isView(t)||t.constructor===Buffer?crypto.createHash(algorithm).update(new Buffer(t)).digest("hex"):method(t)};return nodeMethod},createHmacOutputMethod=function(t,e){return function(r,n){return new HmacSha256(r,e,!0).update(n)[t]()}},createHmacMethod=function(t){var e=createHmacOutputMethod("hex",t);e.create=function(e){return new HmacSha256(e,t)},e.update=function(t,r){return e.create(t).update(r)};for(var r=0;r<OUTPUT_TYPES.length;++r){var n=OUTPUT_TYPES[r];e[n]=createHmacOutputMethod(n,t)}return e};function Sha256(t,e){e?(blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}function HmacSha256(t,e,r){var n,i=typeof t;if("string"===i){var o,s=[],h=t.length,a=0;for(n=0;n<h;++n)(o=t.charCodeAt(n))<128?s[a++]=o:o<2048?(s[a++]=192|o>>6,s[a++]=128|63&o):o<55296||o>=57344?(s[a++]=224|o>>12,s[a++]=128|o>>6&63,s[a++]=128|63&o):(o=65536+((1023&o)<<10|1023&t.charCodeAt(++n)),s[a++]=240|o>>18,s[a++]=128|o>>12&63,s[a++]=128|o>>6&63,s[a++]=128|63&o);t=s}else{if("object"!==i)throw new Error(ERROR);if(null===t)throw new Error(ERROR);if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||ARRAY_BUFFER&&ArrayBuffer.isView(t)))throw new Error(ERROR)}t.length>64&&(t=new Sha256(e,!0).update(t).array());var c=[],u=[];for(n=0;n<64;++n){var f=t[n]||0;c[n]=92^f,u[n]=54^f}Sha256.call(this,e,r),this.update(u),this.oKeyPad=c,this.inner=!0,this.sharedMemory=r}Sha256.prototype.update=function(t){if(!this.finalized){var e,r=typeof t;if("string"!==r){if("object"!==r)throw new Error(ERROR);if(null===t)throw new Error(ERROR);if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||ARRAY_BUFFER&&ArrayBuffer.isView(t)))throw new Error(ERROR);e=!0}for(var n,i,o=0,s=t.length,h=this.blocks;o<s;){if(this.hashed&&(this.hashed=!1,h[0]=this.block,h[16]=h[1]=h[2]=h[3]=h[4]=h[5]=h[6]=h[7]=h[8]=h[9]=h[10]=h[11]=h[12]=h[13]=h[14]=h[15]=0),e)for(i=this.start;o<s&&i<64;++o)h[i>>2]|=t[o]<<SHIFT[3&i++];else for(i=this.start;o<s&&i<64;++o)(n=t.charCodeAt(o))<128?h[i>>2]|=n<<SHIFT[3&i++]:n<2048?(h[i>>2]|=(192|n>>6)<<SHIFT[3&i++],h[i>>2]|=(128|63&n)<<SHIFT[3&i++]):n<55296||n>=57344?(h[i>>2]|=(224|n>>12)<<SHIFT[3&i++],h[i>>2]|=(128|n>>6&63)<<SHIFT[3&i++],h[i>>2]|=(128|63&n)<<SHIFT[3&i++]):(n=65536+((1023&n)<<10|1023&t.charCodeAt(++o)),h[i>>2]|=(240|n>>18)<<SHIFT[3&i++],h[i>>2]|=(128|n>>12&63)<<SHIFT[3&i++],h[i>>2]|=(128|n>>6&63)<<SHIFT[3&i++],h[i>>2]|=(128|63&n)<<SHIFT[3&i++]);this.lastByteIndex=i,this.bytes+=i-this.start,i>=64?(this.block=h[16],this.start=i-64,this.hash(),this.hashed=!0):this.start=i}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Sha256.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[16]=this.block,t[e>>2]|=EXTRA[3&e],this.block=t[16],e>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},Sha256.prototype.hash=function(){var t,e,r,n,i,o,s,h,a,c=this.h0,u=this.h1,f=this.h2,p=this.h3,l=this.h4,d=this.h5,H=this.h6,S=this.h7,_=this.blocks;for(t=16;t<64;++t)e=((i=_[t-15])>>>7|i<<25)^(i>>>18|i<<14)^i>>>3,r=((i=_[t-2])>>>17|i<<15)^(i>>>19|i<<13)^i>>>10,_[t]=_[t-16]+e+_[t-7]+r<<0;for(a=u&f,t=0;t<64;t+=4)this.first?(this.is224?(o=300032,S=(i=_[0]-1413257819)-150054599<<0,p=i+24177077<<0):(o=704751109,S=(i=_[0]-210244248)-1521486534<<0,p=i+143694565<<0),this.first=!1):(e=(c>>>2|c<<30)^(c>>>13|c<<19)^(c>>>22|c<<10),n=(o=c&u)^c&f^a,S=p+(i=S+(r=(l>>>6|l<<26)^(l>>>11|l<<21)^(l>>>25|l<<7))+(l&d^~l&H)+K[t]+_[t])<<0,p=i+(e+n)<<0),e=(p>>>2|p<<30)^(p>>>13|p<<19)^(p>>>22|p<<10),n=(s=p&c)^p&u^o,H=f+(i=H+(r=(S>>>6|S<<26)^(S>>>11|S<<21)^(S>>>25|S<<7))+(S&l^~S&d)+K[t+1]+_[t+1])<<0,e=((f=i+(e+n)<<0)>>>2|f<<30)^(f>>>13|f<<19)^(f>>>22|f<<10),n=(h=f&p)^f&c^s,d=u+(i=d+(r=(H>>>6|H<<26)^(H>>>11|H<<21)^(H>>>25|H<<7))+(H&S^~H&l)+K[t+2]+_[t+2])<<0,e=((u=i+(e+n)<<0)>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10),n=(a=u&f)^u&p^h,l=c+(i=l+(r=(d>>>6|d<<26)^(d>>>11|d<<21)^(d>>>25|d<<7))+(d&H^~d&S)+K[t+3]+_[t+3])<<0,c=i+(e+n)<<0;this.h0=this.h0+c<<0,this.h1=this.h1+u<<0,this.h2=this.h2+f<<0,this.h3=this.h3+p<<0,this.h4=this.h4+l<<0,this.h5=this.h5+d<<0,this.h6=this.h6+H<<0,this.h7=this.h7+S<<0},Sha256.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,r=this.h2,n=this.h3,i=this.h4,o=this.h5,s=this.h6,h=this.h7,a=HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[n>>28&15]+HEX_CHARS[n>>24&15]+HEX_CHARS[n>>20&15]+HEX_CHARS[n>>16&15]+HEX_CHARS[n>>12&15]+HEX_CHARS[n>>8&15]+HEX_CHARS[n>>4&15]+HEX_CHARS[15&n]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]+HEX_CHARS[o>>28&15]+HEX_CHARS[o>>24&15]+HEX_CHARS[o>>20&15]+HEX_CHARS[o>>16&15]+HEX_CHARS[o>>12&15]+HEX_CHARS[o>>8&15]+HEX_CHARS[o>>4&15]+HEX_CHARS[15&o]+HEX_CHARS[s>>28&15]+HEX_CHARS[s>>24&15]+HEX_CHARS[s>>20&15]+HEX_CHARS[s>>16&15]+HEX_CHARS[s>>12&15]+HEX_CHARS[s>>8&15]+HEX_CHARS[s>>4&15]+HEX_CHARS[15&s];return this.is224||(a+=HEX_CHARS[h>>28&15]+HEX_CHARS[h>>24&15]+HEX_CHARS[h>>20&15]+HEX_CHARS[h>>16&15]+HEX_CHARS[h>>12&15]+HEX_CHARS[h>>8&15]+HEX_CHARS[h>>4&15]+HEX_CHARS[15&h]),a},Sha256.prototype.toString=Sha256.prototype.hex,Sha256.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,r=this.h2,n=this.h3,i=this.h4,o=this.h5,s=this.h6,h=this.h7,a=[t>>24&255,t>>16&255,t>>8&255,255&t,e>>24&255,e>>16&255,e>>8&255,255&e,r>>24&255,r>>16&255,r>>8&255,255&r,n>>24&255,n>>16&255,n>>8&255,255&n,i>>24&255,i>>16&255,i>>8&255,255&i,o>>24&255,o>>16&255,o>>8&255,255&o,s>>24&255,s>>16&255,s>>8&255,255&s];return this.is224||a.push(h>>24&255,h>>16&255,h>>8&255,255&h),a},Sha256.prototype.array=Sha256.prototype.digest,Sha256.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),e=new DataView(t);return e.setUint32(0,this.h0),e.setUint32(4,this.h1),e.setUint32(8,this.h2),e.setUint32(12,this.h3),e.setUint32(16,this.h4),e.setUint32(20,this.h5),e.setUint32(24,this.h6),this.is224||e.setUint32(28,this.h7),t},HmacSha256.prototype=new Sha256,HmacSha256.prototype.finalize=function(){if(Sha256.prototype.finalize.call(this),this.inner){this.inner=!1;var t=this.array();Sha256.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(t),Sha256.prototype.finalize.call(this)}};var exports=createMethod();exports.sha256=exports,exports.sha224=createMethod(!0),exports.sha256.hmac=createHmacMethod(),exports.sha224.hmac=createHmacMethod(!0),COMMON_JS?module.exports=exports:(root.sha256=exports.sha256,root.sha224=exports.sha224,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))}()},382:function(t,e,r){t.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},r.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s="./src/index.js")}({"./src/eth/sc.abi.json":
/*!*****************************!*\
  !*** ./src/eth/sc.abi.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, default */function(t){t.exports=[{constant:!0,inputs:[{name:"nodeID",type:"bytes32"}],name:"getNodeAddr",outputs:[{name:"",type:"string"},{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"fileID",type:"bytes32"}],name:"getStoringPeers",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"fileID",type:"bytes32"}],name:"showStoringPeers",outputs:[{name:"",type:"bytes32[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"size",type:"uint256"},{name:"seed",type:"uint256"}],name:"getPeers",outputs:[{name:"",type:"bytes32[]"}],payable:!1,stateMutability:"view",type:"function"}]},"./src/eth/sc.js":
/*!***********************!*\
  !*** ./src/eth/sc.js ***!
  \***********************/
/*! no static exports found */function(t,e,r){"use strict";var n=r(/*! ../utils */"./src/utils/utils.js"),i=(n.parseSCString,n.uuidToHash),o=n.nodeIdToBytes,s=r(/*! ./sc.abi.json */"./src/eth/sc.abi.json"),h={development:"b4854255e34a089FBae02709A35ddc854D238d0C",production:"ff89Eb252F1E9C6638823C819DC0b2Ce3bFae7F5"},a={development:[],production:[]},c=function(t,e){var r=!0,n=!1,i=void 0;try{for(var o,c=a[e][Symbol.iterator]();!(r=(o=c.next()).done);r=!0){var u=o.value;if(u.eth===t)return u.sc}}catch(t){n=!0,i=t}finally{try{!r&&c.return&&c.return()}finally{if(n)throw i}}var f={eth:t,sc:new t.Contract(s,h[e])};return a[e].push(f),f.sc};t.exports={getUploadNodes:function(t,e){var r=e.fileSize,n=e.mode;return new Promise(function(e,i){var s=c(t,n),h=Math.round(1e5*Math.random());s.methods.getPeers(r,h).call().then(function(t){var e=Object.values(t);return Promise.all(e.map(function(t){return new Promise(function(e,r){return s.methods.getNodeAddr(t).call().then(function(r){return e({ip:r[0].replace(/:.*/,""),ipfs:r[1],hash:o(t)})}).catch(r)})}))}).then(function(t){return t.filter(function(t){return t.ip})}).then(e)})},getStoringNodes:function(t,e){var r=e.uuid,n=e.mode;return new Promise(function(e,o){var s=c(t,n),h=i(r);s.methods.showStoringPeers(h).call().then(function(t){var e=Object.values(t);return Promise.all(e.map(function(t){return s.methods.getNodeAddr(t).call()}))}).then(function(t){return t.filter(function(t){return t[0]})}).then(function(t){return t.map(function(t){return t[0].replace(/:.*/,"")})}).then(e)})}}},"./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */function(t,e,r){"use strict";var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();var i=r(/*! ./eth/sc */"./src/eth/sc.js"),o=r(/*! ./promise */"./src/promise.js"),s=r(/*! ./requestAny */"./src/requestAny.js"),h=r(/*! ./utils */"./src/utils/utils.js"),a={eth:i},c=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.blockchain,i=void 0===n?"eth":n,o=r.mode,s=void 0===o?"development":o;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.blockchain=i,this.mode=s,"eth"===this.blockchain&&(this.blockchainAPI=e.eth||e)}return n(t,[{key:"save",value:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return o(function(n,i,o){if(!h.isFile(t))throw new TypeError("casperapi: file type must be File | Blob | Buffer | stream.Readable");h.getFileSize(t).then(function(t){return a[e.blockchain].getUploadNodes(e.blockchainAPI,{fileSize:t,mode:e.mode})}).then(function(e){o("sc-connected");var h=e.map(function(t){return t.ip}),a=e.map(function(t){return t.ipfs+"/ipfs/"+t.hash}),c={"X-Peers":JSON.stringify(a)},u=void 0,f=void 0;r?(u="PUT",f="http://{host}:5001/casper/v0/file/"+r):(u="POST",f="http://{host}:5001/casper/v0/file"),s(u,f,h,{file:t,headers:c}).on("progress",function(t){return o("progress",t)}).on("new-champion",function(t){return o("node-found",t)}).then(function(t){n(JSON.parse(t).UUID)}).catch(i)}).catch(i)})}},{key:"delete",value:function(t){var e=this;return o(function(r,n,i){a[e.blockchain].getStoringNodes(e.blockchainAPI,{uuid:t,mode:e.mode}).then(function(e){i("sc-connected"),s("DELETE","http://{host}:5001/casper/v0/file/"+t,e).on("new-champion",function(t){return i("node-found",t)}).then(r).catch(n)}).catch(n)})}},{key:"getFile",value:function(t){var e=this;return o(function(r,n,i){a[e.blockchain].getStoringNodes(e.blockchainAPI,{uuid:t,mode:e.mode}).then(function(t){return i("sc-connected"),t}).then(function(e){s("GET","http://{host}:5001/casper/v0/file/"+t,e,{encoding:null}).on("progress",function(t){return i("progress",t)}).on("new-champion",function(t){return i("node-found",t)}).then(r).catch(n)}).catch(n)})}},{key:"getLink",value:function(t){var e=this;return o(function(r,n,i){var o="";a[e.blockchain].getStoringNodes(e.blockchainAPI,{uuid:t,mode:e.mode}).then(function(e){i("sc-connected"),s("POST","http://{host}:5001/casper/v0/share/"+t,e).on("new-champion",function(t){return o=t}).then(function(t){return r("http://"+o+":5001"+t)}).catch(n)}).catch(n)})}}]),t}();t.exports=c},"./src/promise.js":
/*!************************!*\
  !*** ./src/promise.js ***!
  \************************/
/*! no static exports found */function(t,e,r){"use strict";t.exports=function(t){var e=void 0,r=void 0,n=new Promise(function(t,n){e=t,r=n});return n.subscribers={},n.emit=function(t,e){this.subscribers[t]&&this.subscribers[t].forEach(function(t){return t(e)})}.bind(n),n.on=function(t,e){return this.subscribers[t]||(this.subscribers[t]=[]),this.subscribers[t].push(e),this}.bind(n),t(e,r,n.emit),n}},"./src/requestAdapter/browser.js":
/*!***************************************!*\
  !*** ./src/requestAdapter/browser.js ***!
  \***************************************/
/*! no static exports found */function(t,e,r){"use strict";var n=r(/*! ../promise */"./src/promise.js");t.exports=function(t){var e=t.method,r=void 0===e?"GET":e,i=t.url,o=t.data,s=void 0===o?{}:o,h=t.file,a=t.headers,c=void 0===a?{}:a,u=t.encoding,f=void 0,p=n(function(t,e,n){var o=function(t){var e=t.loaded/t.total;e&&0<e&&e<=1&&n("progress",e)},a=new FormData;for(var p in s)a.append(p,s[p]);h&&a.append("file",h);var l=new XMLHttpRequest;for(var d in null===u&&(l.responseType="blob"),h?l.upload.onprogress=o:l.onprogress=o,l.onload=function(e){return t(l.response)},l.onerror=function(t){return e(t)},l.open(r,i),c)l.setRequestHeader(d,c[d]);l.send(a),f=l.abort.bind(l)});return p.abort=f,p}},"./src/requestAny.js":
/*!***************************!*\
  !*** ./src/requestAny.js ***!
  \***************************/
/*! no static exports found */function(t,e,r){"use strict";var n=r(/*! ./requestAdapter */"./src/requestAdapter/browser.js"),i=r(/*! ./promise */"./src/promise.js"),o=function(t){return!t.rejected||t.canceled};t.exports=function t(e,r,s){var h=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return i(function(i,a,c){0===(s=s.filter(function(t){return"0.0.0.0"!==t})).length&&a(new Error("casperapi: No hosts to handle request"));var u=s.map(function(t){return{ip:t,rejected:!1,canceled:!1,abortRequest:null}}),f="",p=function(t){f=t,c("new-champion",t.ip)};u.forEach(function(s){var l=n(Object.assign({},h,{method:e,url:r.replace("{host}",s.ip)}));s.abortRequest=l.abort,l.on("progress",function(t){return function(e){f||p(t),u.filter(function(t){return t!==f}).map(function(t){return t.abortRequest()}),t===f&&c("progress",e)}}(s)).then(function(t){f||p(s),s===f&&i(t)}).catch(function(n){if(s.rejected=!0,s===f){var p=u.filter(o).map(function(t){return t.ip});t(e,r,p,h).on("progress",function(t){return c("progress",t)}).on("new-champion",function(t){return c("new-champion",t)}).then(i).catch(function(t){a(new Error("casperapi: All hosts are unreachable"))})}else 0===u.filter(o).length&&a(new Error("casperapi: All hosts are unreachable"))})})})}},"./src/utils/crypto/bs58.js":
/*!**********************************!*\
  !*** ./src/utils/crypto/bs58.js ***!
  \**********************************/
/*! no static exports found */function(t,e,r){"use strict";var n="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",i={decode:function(t){var e=[],r=[],i=void 0,o=void 0,s=void 0,h=void 0;for(i in t)for(o=0,(s=n.indexOf(t[i]))||r.length^i||r.push(0);o in e||s;)s=(h=(h=e[o])?58*h+s:s)>>8,e[o]=h%256,o++;for(;o--;)r.push(e[o]);return new Uint8Array(r)},encode:function(t){var e=[],r="",i=void 0,o=void 0,s=void 0,h=void 0;for(i in t)for(o=0,r+=(s=t[i])||r.length^i?"":1;o in e||s;)s=(h=(h=e[o])?256*h+s:s)/58|0,e[o]=h%58,o++;for(;o--;)r+=n[e[o]];return r}};t.exports=i},"./src/utils/crypto/hex.js":
/*!*********************************!*\
  !*** ./src/utils/crypto/hex.js ***!
  \*********************************/
/*! no static exports found */function(t,e,r){"use strict";t.exports={toBytes:function(t){for(var e=[];t.length>=2;)e.push(parseInt(t.substring(0,2),16)),t=t.substring(2,t.length);return e}}},"./src/utils/file/browser.js":
/*!***********************************!*\
  !*** ./src/utils/file/browser.js ***!
  \***********************************/
/*! no static exports found */function(t,e,r){"use strict";t.exports={isFile:function(t){return t instanceof Blob},getFileSize:function(t){return new Promise(function(e){if(t instanceof Blob)return e(t.size);reject(new Error("casperapi: Cannot compute file size"))})}}},"./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! no static exports found */function(t,e,r){"use strict";var n=r(/*! js-sha256 */"js-sha256"),i=r(/*! ./crypto/bs58 */"./src/utils/crypto/bs58.js"),o=r(/*! ./crypto/hex */"./src/utils/crypto/hex.js"),s=r(/*! ./file */"./src/utils/file/browser.js"),h=s.isFile,a=s.getFileSize;t.exports={parseSCString:function(t){for(var e=t.substring(2),r=[],n=0;n<e.length;n+=2)r.push(parseInt(e.substr(n,2),16));return String.fromCharCode.apply(0,r.filter(function(t){return 0!==t}))},isFile:h,getFileSize:a,uuidToHash:function(t){var e=i.decode(t);return"0x"+n(e)},nodeIdToBytes:function(t){var e=t.substr(2),r=o.toBytes("1220"+e);return i.encode(r)}}},"js-sha256":
/*!****************************!*\
  !*** external "js-sha256" ***!
  \****************************/
/*! no static exports found */function(t,e){t.exports=r(381)}})}}]);