<template>
  <div id="app">
    <div class="top">
      <app-flat-no-switch />
      <app-minimap />
      <app-logout />
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
import AppFlatNoSwitch from "./components/FlatNoSwitch";
import AppMinimap from "./components/Minimap";
import AppLogout from "./components/Logout";
import eventBus from "./eventBus";

export default {
  components: { AppSection, AppFlatNoSwitch, AppMinimap, AppLogout },
  apollo: {
    me: {
      query: gql`
        query {
          me {
            role {
              id
              name
              description
              type
            }
          }
        }
      `,
      skip() {
        return !this.loggedIn;
      }
    },
    flatsFilled: {
      query: gql`
        query {
          flatsFilled(sort: "flatNo:asc", limit: 650) {
            id
            housing
            section
            floor
            flatNo
            flatType
            hasUser
          }
        }
      `,
      skip() {
        return this.canSeeResidents;
      }
    },
    flats: {
      query: gql`
        query {
          flats(sort: "flatNo:asc", limit: 650) {
            id
            housing
            section
            floor
            flatNo
            flatType
            users {
              username
              name
              vkId
              telegramId
              whatsappPhone
            }
          }
        }
      `,
      skip() {
        return !this.canSeeResidents;
      }
    }
  },
  // data() {
  //   return {
  //     flats: require('../chess.json'),
  //   };
  // },
  computed: {
    loggedIn() {
      return eventBus.$data.loggedIn;
    },
    canSeeResidents() {
      return eventBus.$data.loggedIn
        && this.me
        && this.me.role
        && this.me.role.type === "resident";
    },
    sections() {
      const sections = this.canSeeResidents
        ? groupBy(this.flats, "section")
        : groupBy(this.flatsFilled, "section");
      return Object.values(sections).map(flat => {
        const floors = groupBy(flat, "floor");
        return {
          floors: Object.values(floors).map(flats => {
            return {
              flats
            };
          })
        };
      });
    }
  }
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
