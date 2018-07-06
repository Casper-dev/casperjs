---
title: Setup
lang: en-US
---

# Setup

Futher guide will have browser examples, you can try them in the docs.
However setting up locally to have more flexibility is recommended.

## Browser

### Bundler usage
This guide assumes that you are already using webpack, parcel or roullup to bundle your app and have it installed and configured.

#### 1. Install web3 in your project
```bash
npm install web3
```
We've colleced [solutions for common issues with installing web3](/web3-installation/). This might help if `npm install web3` didn't work.

#### 2. Install casperapi
```bash
npm install casperapi
```

### Drop-in usage
Copy /dist/casper.min.js it's a UMD build. Module name: `casperapi`. You'll have to provide Web3 v1 by yourself.
Please note that most CDNs serve web3 v0.20.


## Node

#### 1. Install Nodejs
Casper API requires nodejs version `v6.10 - v9.*` stable (read [the official node installation guide](https://nodejs.org/en/download/package-manager/) if this is your first time installing nodejs)

#### 2. Install web3 in your project
```bash
npm install web3
```
We've colleced [solutions for common issues with installing web3](/web3-installation/). This might help if `npm install web3` didn't work.

#### 3. Install casperapi
```bash
npm install casperapi
```