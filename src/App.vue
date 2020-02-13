<template>
  <div id="app">
    <div class="top">
      <app-room-no-switch />
      <app-minimap />
    </div>
    <div class="chessboard">
      <app-section
        v-for="(section, sectionIndex) in sections"
        :key="sectionIndex"
        :sectionIndex="sectionIndex"
        :section="section"
      />
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import AppSection from "./components/Section";
import AppRoomNoSwitch from "./components/RoomNoSwitch";
import AppMinimap from "./components/Minimap";

export default {
  components: { AppSection, AppRoomNoSwitch, AppMinimap },
  apollo: {
    sections: gql`
      query {
        sections (sort: "number:asc") {
          id
          number
          floors (sort: "number:asc") {
            id
            number
            flats (sort: "roomNo:asc") {
              id
              roomNo
              roomType
              contactInfo
            }
          }
        }
      }
    `
  },
};
</script>

<style scoped>
#app {
  padding-top: 214px;
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  padding: 40px;
}
.chessboard {
  display: flex;
  align-items: flex-end;
  background: #f8f8f8;
  padding: 20px 40px;
}
</style>
