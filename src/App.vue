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
import groupBy from "lodash/groupBy";
import AppSection from "./components/Section";
import AppRoomNoSwitch from "./components/RoomNoSwitch";
import AppMinimap from "./components/Minimap";

export default {
  components: { AppSection, AppRoomNoSwitch, AppMinimap },
  apollo: {
    flats: gql`
      query {
        flats (sort: "roomNo:asc", limit: 650) {
          id
          housing
          section
          floor
          roomNo
          roomType
          residents {
            id
            # name
            # vkId
            # telegramId
            # whatsappPhone
          }
        }
      }
    `
  },
  // data() {
  //   return {
  //     flats: require('../chess.json'),
  //   };
  // },
  computed: {
    sections() {
      const sections = groupBy(this.flats, 'section');
      return Object.values(sections).map((flat) => {
        const floors = groupBy(flat, 'floor');
        return {
          floors: Object.values(floors).map((flats) => {
            return {
              flats,
            };
          }),
        }
      });
    }
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
  padding: 20px 40px;
}
</style>
