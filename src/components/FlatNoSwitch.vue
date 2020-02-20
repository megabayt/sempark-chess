<template>
  <v-switch
    :checked="viewType"
    @change="toggleViewType"
  />
</template>

<script>
import eventBus from "../eventBus";

export default {
  methods: {
    toggleViewType(e) {
      eventBus.$data.viewType = e;
    }
  },
  computed: {
    viewType() {
      return eventBus.$data.viewType;
    }
  }
};
</script>
