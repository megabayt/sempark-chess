import Vue from 'vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import VTooltip from 'v-tooltip'
import App from './App.vue'


const apolloClient = new ApolloClient({
  uri: 'https://api.sempark.xyz/graphql'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VTooltip)
Vue.use(VueApollo)

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
