<template>
  <div
    class="chess-section"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
  >
    <span class="chess-section__title">
      Секция {{ sectionIndex + 1 }}
    </span>
    <div class="chess-section__body">
      <app-floor
        v-for="(floor, floorIndex) in section.floors"
        :key="floorIndex"
        :floor="floor"
        :floorIndex="floorIndex"
      />
    </div>
  </div>
</template>

<script>
import AppFloor from './Floor';
import eventBus from '../eventBus';

export default {
  components: { AppFloor },
  props: ['section', 'sectionIndex'],
  methods: {
    mouseOver() {
      eventBus.$data.hoveredSection = this.sectionIndex + 1;
    },
    mouseLeave() {
      eventBus.$data.hoveredSection = null;
    },
  },
}
</script>

<style scoped>
.chess-section {
  margin-right: 80px;
}
.chess-section__title {
  display: block;
  margin-bottom: 32px;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
}
.chess-section__body {
  display: flex;
  flex-direction: column-reverse;
  padding: 8px;
  background-color: #fff;
}
</style>