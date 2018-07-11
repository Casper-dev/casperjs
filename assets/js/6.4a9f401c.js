(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{562:function(t,s,a){"use strict";a.r(s);var e=a(0),n=Object(e.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),a("p",[t._v("Import web3 and Casper libriraies")]),t._m(1),a("p",[t._v("Create web3 instance and connect it to casper test network via http")]),t._m(2),a("p",[t._v("CasperApi needs to be passed blockchain provider directly, as more blockchains would be available soon")]),t._m(3),a("p",[t._v("Let's create a sample file and save it on the casper network")]),t._m(4),a("p",[t._v("The value of "),a("code",[t._v("savePromise")]),t._v(" is an extended native "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",target:"_blank",rel:"noopener noreferrer"}},[t._v("Promise"),a("OutboundLink")],1),t._v(".")]),a("p",[a("router-link",{attrs:{to:"/api/#casper-save"}},[a("code",[t._v("casper.save")])]),t._v(" makes requests to smart contract and provider nodes, uploading file on the with highest speed & stablity. "),a("code",[t._v("savePromise")]),t._v(" would only resolve after the file has been fully uploaded.")],1),t._m(5),a("p",[t._v("Let's break down this one:")]),t._m(6),a("p",[t._v("Then we use "),a("router-link",{attrs:{to:"/api/#casper-getFile"}},[a("code",[t._v("casper.getFile")])]),t._v(" that fetches the file as a "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/Blob",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("Blob")]),a("OutboundLink")],1),t._v(" and returns it.")],1),t._m(7),a("p",[t._v("There is an initialized casperapi instance available in the global scope of this tab, feel free to play around with it in the console.")]),a("client-only",[a("utils-playground")],1),a("p",[a("a",{attrs:{href:"http://docs.casperproject.io/browser-playground.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Playground with UI"),a("OutboundLink")],1)])],1)},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"basic-usage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#basic-usage","aria-hidden":"true"}},[this._v("#")]),this._v(" Basic usage")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Web3 "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'web3'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// or web3-eth")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" CasperApi "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'casperapi'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" web3 "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Web3")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'http://94.130.182.144:8775'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" casper "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("CasperApi")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("web3"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" myFile "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Blob")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token string"}},[t._v("'My file'")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" type"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'text/plain'")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" savePromise "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" casper"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("save")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("myFile"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("savePromise\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("then")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("uuid "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" casper"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("getFile")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("uuid"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("then")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("file "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" console"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("log")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("file"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("toString")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("savePromise")]),this._v(" resolves with "),s("code",[this._v("uuid")]),this._v(": file's unique identifier in casper network.\nYou'll use it to fetch, modifiy and delete the file.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"playground"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#playground","aria-hidden":"true"}},[this._v("#")]),this._v(" Playground")])}],!1,null,null,null);s.default=n.exports}}]);