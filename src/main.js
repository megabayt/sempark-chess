import Vue from 'vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import App from './App.vue'


const apolloClient = new ApolloClient({
  uri: 'http://localhost:1337/graphql'
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
