import Vue from 'vue'

import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

import get from 'lodash/get';

import App from './App.vue'
import { GQL_AUTH_TOKEN } from './contants';
import eventBus from './eventBus';

const uri = process.env.NODE_ENV === 'production'
? 'https://api.sempark.xyz/graphql'
: 'http://localhost:1337/graphql';

const httpLink = new HttpLink({ uri });

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(GQL_AUTH_TOKEN);

  eventBus.$data.loggedIn = Boolean(token);

  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      }
    });
  }

  return forward(operation)
})

const errorMiddleware = onError((params) => {
  const statusCode = get(params, 'graphQLErrors[0].extensions.exception.output.statusCode');
  if (statusCode === 403 || statusCode === 401) {
    eventBus.$data.loggedIn = false;
    localStorage.removeItem(GQL_AUTH_TOKEN);
  }
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorMiddleware, authMiddleware, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

const vuetify = new Vuetify({})

Vue.use(VueApollo)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  vuetify,
  render: h => h(App),
}).$mount('#app')
