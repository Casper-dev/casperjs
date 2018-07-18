<template>
  <div class="playground">
    <div class="playground__col">
      <strong>Playground status:</strong>
    </div>
    <div class="playground__col">
      <vue-markdown :source="stateMessage" />
    </div>
  </div>
</template>


<script>
import CasperApi from 'casperapi'

const stateMessageLookup = {
  loading: 'Web3 is being loaded',
  web3err: 'Error loading web3, please check your internet connection',
  testing: 'Web3 loaded, testing connection to the casper network',
  caspererr: 'Error connecting to the casper network, please take a look in the console output `F12`',
  tested: 'Playground is ready! Check global variable `casper`<br />*(you can do it using console `F12`)*',
}


window.global = {}
window.process = {
  browser: true
}
const VueMarkdown = require('vue-markdown').default


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
              console.log(`[Playground] Try running casper.getLink('2RND9u6d2nGy9vEDmAnikB').then(console.log) and open the link that be will be returned`)
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
  },

  components: {
    VueMarkdown
  }
}
</script>

<style>
.playground {
  display: flex;
  align-items: baseline;
}

.playground p {
  margin: 0;
}

.playground__col + .playground__col {
  margin-left: 10px;
}

@media screen and (max-width: 500px) {
  .playground {
    display: block;
  }

  .playground__col + .playground__col {
    margin-left: 0;
  }
}
</style>
