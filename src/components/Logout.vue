<template>
  <button v-if="loggedIn" @click="logout()">Выйти</button>
</template>

<script>
import eventBus from '../eventBus';
import { GQL_AUTH_TOKEN } from '../contants';

export default {
  computed: {
    loggedIn() {
      return eventBus.$data.loggedIn;
    },
  },
  methods: {
    logout() {
      eventBus.$data.loggedIn = false;
      localStorage.removeItem(GQL_AUTH_TOKEN);
    }
  }
}
</script>