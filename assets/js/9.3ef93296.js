(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{392:function(e,t,n){"use strict";n.r(t);var o=n(382),s=n.n(o),r={loading:"Web3 is being loaded",web3err:"Error loading web3, please check your internet connection",testing:"Web3 loaded, testing connection to the casper network",caspererr:"Error connecting to the casper network, please see the console",tested:"Playground is ready! Check global variable `casper`"};window.global={},window.process={browser:!0};var a={data:function(){return{state:"loading"}},methods:{init:function(e){var t=this;e=e.default||e,this.state="testing";var n=new e("http://94.130.182.144:8775"),o=new s.a(n);window.casper=o,console.log("[Playground] Injected casper to the window"),o.save(new Blob(["Playground example"],{type:"text/plain"})).then(function(e){t.state="tested",console.log("[Playground] checked upload, successful"),console.log("[Playground] Try running casper.getLink('KoVpDR5ZQ4HV6zxjKFj5zY').then(console.log) and open the link that be will be returned")}).catch(function(e){console.error(e),t.state="caspererr"})}},mounted:function(){var e=this;console.log('[Playground] Loading web3, please wait for "Injected Casper" notification'),Promise.all([n.e(11),n.e(12)]).then(n.t.bind(null,393,7)).then(this.init).catch(function(t){console.error(t),e.state="web3err"})},computed:{stateMessage:function(){return r[this.state]}}},i=n(0),l=Object(i.a)(a,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("strong",[this._v("Playground status:")]),this._v(" "+this._s(this.stateMessage)+" ")])},[],!1,null,null,null);t.default=l.exports}}]);