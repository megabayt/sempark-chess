<template>
  <div class="chess-section__floor">
    <div class="chess-floor">
      <div class="chess-floor__number">{{ floorIndex + 2 }}</div>
      <div class="chess-floor__body">
        <app-flat
          v-for="(flat, flatIndex) in floor.flats"
          :key="flatIndex"
          :flatIndex="flatIndex"
          :flat="flat"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppFlat from './Flat';

export default {
  components: { AppFlat },
  props: ['floor', 'floorIndex'],
}
</script>

<style scoped>
.chess-floor {
  position: relative;
  padding: 8px;
}
.chess-floor__body {
  display: flex;
}
.chess-floor__number {
  position: absolute;
  top: 50%;
  left: -40px;
  width: 20px;
  text-align: center;
  font-size: 10px;
  color: rgba(0,0,0,.5);
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.chess-floor__body {
  display: flex;
}
.chess-floor__flat {
  position: relative;
  margin-right: 8px;
}
</style>