<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app width="350">
      <v-list dense>
        <template>
          <v-list-item link>
            <v-list-item-action>
              <app-flat-no-switch />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Отображать номер квартиры</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link v-if="!loggedIn">
            <v-list-item-action>
              <v-icon>fa-user</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Войти</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link v-if="loggedIn">
            <v-list-item-action>
              <v-icon>fa-user-alt-slash</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Выйти</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Шахматка Семеновский парк 1 корпус</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-content class="content">
      <div class="chessboard">
        <div class="chessboard__inner">
          <app-section
            v-for="(section, sectionIndex) in sections"
            :key="sectionIndex"
            :sectionIndex="sectionIndex"
            :section="section"
          />
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import gql from "graphql-tag";
import groupBy from "lodash/groupBy";
import AppSection from "./components/Section";
import eventBus from "./eventBus";
import AppFlatNoSwitch from "./components/FlatNoSwitch";

export default {
  components: { AppSection, AppFlatNoSwitch },
  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-contacts", text: "Contacts" },
      { icon: "mdi-history", text: "Frequently contacted" },
      { icon: "mdi-content-copy", text: "Duplicates" },
      { icon: "mdi-settings", text: "Settings" },
      { icon: "mdi-message", text: "Send feedback" },
      { icon: "mdi-help-circle", text: "Help" },
      { icon: "mdi-cellphone-link", text: "App downloads" },
      { icon: "mdi-keyboard", text: "Go to the old version" }
    ]
    // flats: require('../chess.json'),
  }),
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
  computed: {
    loggedIn() {
      return eventBus.$data.loggedIn;
    },
    canSeeResidents() {
      return (
        eventBus.$data.loggedIn &&
        this.me &&
        this.me.role &&
        this.me.role.type === "resident"
      );
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
.content {
  max-height: 100vh;
}
.chessboard {
  padding: 20px 40px;
  overflow: auto;
  max-height: 100%;
}
.chessboard__inner {
  display: flex;
  align-items: flex-end;
  padding: 20px 40px;
}
</style>
