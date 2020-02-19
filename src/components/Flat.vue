<template>
  <div class="chess-floor__flat">
    <app-popper
      trigger="clickToOpen"
      :disabled="!flat.hasUser"
      :options="{
        placement: 'bottom',
      }">
      <div class="popper flat-popper">
        <template v-if="flat.users">
          <AppUser
            v-for="(user, userIndex) in flat.users"
            :key="userIndex"
            :user="user"
          />
        </template>
      </div>
      <div
        :class="{
          flat: true,
          'flat-filled': flat.hasUser,
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
import AppPopper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
  components: { AppPopper, AppUser },
  props: ['flat', 'flatIndex'],
  computed: {
    viewType() {
      return eventBus.$data.viewType;
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