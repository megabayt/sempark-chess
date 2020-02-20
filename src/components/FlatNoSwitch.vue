<template>
  <app-switch
    label="Отображать номер квартиры"
    :checked="viewType"
    @change="toggleViewType"
  />
</template>

<script>
import AppSwitch from './Switch';
import eventBus from "../eventBus";

export default {
  components: { AppSwitch },
  methods: {
    toggleViewType(e) {
      eventBus.$data.viewType = e.target.checked;
    }
  },
  computed: {
    viewType() {
      return eventBus.$data.viewType;
    }
  }
};
</script>
