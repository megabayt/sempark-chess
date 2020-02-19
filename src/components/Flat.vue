<template>
  <div class="chess-floor__flat">
    <app-popper
      trigger="clickToOpen"
      :options="{
        placement: 'bottom',
      }">
      <div class="popper flat-popper">
        <app-user
          v-for="(user, userIndex) in flat.users"
          :key="userIndex"
          :user="user"
        />
        <app-login v-if="!loggedIn" :flatId="flat.id" />
      </div>
      <div
        :class="{
          flat: true,
          'flat-filled': filled,
        }"
        slot="reference"
      >
        {{ this.viewType ? flat.flatNo : flat.flatType }}
      </div>
    </app-popper>
  </div>
</template>

<script>
import eventBus from '../eventBus';
import AppUser from './User';
import AppLogin from './Login';
import AppPopper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
  components: { AppPopper, AppUser, AppLogin },
  props: ['flat', 'flatIndex'],
  computed: {
    viewType() {
      return eventBus.$data.viewType;
    },
    loggedIn() {
      return eventBus.$data.loggedIn;
    },
    filled() {
      return this.flat.hasUser || (this.flat.users && this.flat.users.length > 0);
    }
  }
}
</script>

<style scoped>
.flat {
  position: relative;
  border: 1px solid #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 22px;
  font-size: 12px;
  font-weight: 500;
  color: #c11f36;
  background-color: #f8f8f8;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.flat-filled {
  background-color: #5BB31D;
  color: #fff;
}
.flat:hover {
  background-color: #c11f36;
  color: #fff;
}
.flat-popper {
  padding: 10px;
  background: #fff;
}
</style>