# Installing web3 `1.*.*`

This guide is assuming that you have tried to `npm install web3` and it didn't work

---

Most of the time this is device-specific issue, due to web3 using c++ and python to build itself in postinstall time


### Windows
Install https://www.npmjs.com/package/windows-build-tools and try again

> It will need admin rights and take a while to install


### MacOS \ Linux
Make sure you have git, gcc and python installed

If that didn't help check out https://github.com/ethereum/web3.js/issues/950