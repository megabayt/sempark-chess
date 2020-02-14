<template>
  <div class="chess-floor__flat">
    <app-popper
      trigger="clickToOpen"
      :disabled="!flat.residents.length"
      :options="{
        placement: 'bottom',
      }">
      <div class="popper flat-popper">
        <AppResident
          v-for="(resident, residentIndex) in flat.residents"
          :key="residentIndex"
          :resident="resident"
        />
      </div>
      <div
        :class="{
          flat: true,
          'flat-filled': flat.residents.length !== 0,
        }"
        slot="reference"
      >
        {{ this.viewType ? flat.roomNo : flat.roomType }}
      </div>
    </app-popper>
  </div>
</template>

<script>
import eventBus from '../eventBus';
import AppResident from './Resident';
import AppPopper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
  components: { AppPopper, AppResident },
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