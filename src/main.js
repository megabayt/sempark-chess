import Vue from 'vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import App from './App.vue'

const uri = process.env.NODE_ENV === 'production'
  ? 'https://api.sempark.xyz/graphql'
  : 'http://localhost:1337/graphql';

const apolloClient = new ApolloClient({
  uri,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VueApollo)

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
