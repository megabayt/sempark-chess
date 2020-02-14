<template>
  <div class="chess-floor__flat">
    <div
      :class="{
        flat: true,
        'flat-filled': flat.contactInfo !== '',
      }"
      v-tooltip="flat.contactInfo"
    >
      {{ this.viewType ? flat.roomNo : flat.roomType }}
    </div>
  </div>
</template>

<script>
import eventBus from '../eventBus';

export default {
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
</style>