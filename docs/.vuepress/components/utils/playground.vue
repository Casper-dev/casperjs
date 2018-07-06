<template>
  <div> <strong>Playground status:</strong> {{stateMessage}} </div>
</template>


<script>
import CasperApi from 'casperapi'

const stateMessageLookup = {
  loading: 'Web3 is being loaded',
  web3err: 'Error loading web3, please check your internet connection',
  testing: 'Web3 loaded, testing connection to the casper network',
  caspererr: 'Error connecting to the casper network, please see the console',
  tested: 'Playground is ready! Check global variable `casper`',
}


window.global = {}
  window.process = {
    browser: true
  }


export default {
  data() {
    return {
      state: 'loading'
    }
  },

  methods: {
    init(Web3) {
      Web3 = Web3.default || Web3
      this.state = 'testing'
      const web3 = new Web3('http://94.130.182.144:8775')
      const casper = new CasperApi(web3)

      window.casper = casper
      console.log('[Playground] Injected casper to the window')

      casper.save(new Blob(['Playground example'], { type: 'text/plain' }))
            .then(uuid => {
              this.state = 'tested'
              console.log('[Playground] checked upload, successful')
              console.log(`[Playground] Try running casper.getLink('XxHxSMm2Gty6qSNMukw2Du').then(console.log) and open the link that fill show up`)
            })
            .catch(err => {
              console.error(err)
              this.state = 'caspererr'
            })
    }
  },

  mounted() {
    console.log('[Playground] Loading web3, please wait for "Injected Casper" notification')
    import(/* webpackChunkName: "web3-eth" */ 'web3-eth')
      .then(this.init)
      .catch(err => {
        console.error(err)
        this.state = 'web3err'
      })
  },

  computed: {
    stateMessage() {
      return stateMessageLookup[this.state]
    }
  }
}
</script>