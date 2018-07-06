# Web3 installation issues and fixes

This guide is assuming that you have tried to `npm install web3` and it didn't work


Most of the time this is a device-specific issue, due to web3 using c++ and python to build itself in postinstall time.
If you have trouble with `EACCES` error even while using `sudo` see [#2 in Mac OS \ Linux](#_2-2).

## Windows
#### 1
Install https://www.npmjs.com/package/windows-build-tools and try again

> It will need admin rights and might take a while to install
#### 2
If you are getting `ENIVAL invalid argument read` consider using yarn.
```bash
npm install --global yarn
```
```bash
yarn add web3
```

## Mac OS \ Linux
#### 1
Make sure you have git, gcc and python installed
#### 2 
There is an issue with npm not passing sudo rights to the postinstall script.
Try installing using yarn.
```bash
npm install --global yarn
```
```bash
sudo yarn add web3
```

### Other issues.
If that didn't help check out [this issue in web3 repo](https://github.com/ethereum/web3.js/issues/950).