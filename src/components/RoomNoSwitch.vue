<template>
  <label
    :class="{
      'vue-switcher': true,
      'vue-switcher--unchecked': !viewType,
      'vue-switcher-theme--default': true,
      'vue-switcher-color--default': true,
    }"
  >
    <span class="vue-switcher__label">
      <span>Отображать номер квартиры</span>
    </span>

    <input type="checkbox" @change="toggleViewType" :checked="viewType" />

    <div></div>
  </label>
</template>

<script>
import eventBus from "../eventBus";

export default {
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

<style lang="scss" scoped>
$color-default-default: #aaa;
$theme-default-colors: (
  default: $color-default-default,
);

.vue-switcher {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  &__label {
    display: inline-flex;
    font-size: 10px;
    margin-right: 5px;
  }

  input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    cursor: pointer;
  }

  div {
    height: 15px;
    width: 36px;
    position: relative;
    border-radius: 30px;
    display: -webkit-flex;
    display: -ms-flex;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    transition: linear 0.2s, background-color linear 0.2s;

    &:after {
      content: "";
      height: 20px;
      width: 20px;
      border-radius: 100px;
      display: block;
      transition: linear 0.15s, background-color linear 0.15s;
      position: absolute;
      left: 100%;
      margin-left: -18px;
      cursor: pointer;
      top: -3px;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    }
  }

  &--unchecked {
    div {
      justify-content: flex-end;

      &:after {
        left: 15px;
      }
    }
  }

  &--disabled {
    div {
      opacity: 0.3;
    }

    input {
      cursor: not-allowed;
    }
  }

  &-theme--default {
    @each $colorName, $color in $theme-default-colors {
      &.vue-switcher-color--#{$colorName} {
        div {
          @if $colorName == "default" {
            background-color: lighten($color, 5%);
          } @else {
            background-color: lighten($color, 10%);
          }

          &:after {
            @if $colorName == "default" {
              background-color: darken($color, 5%);
            } @else {
              background-color: $color;
            }
          }
        }

        &.vue-switcher--unchecked {
          div {
            @if $colorName == "default" {
              background-color: $color;
            } @else {
              background-color: lighten($color, 30%);
            }

            &:after {
              background-color: lighten($color, 10%);
            }
          }
        }
      }
    }
  }
}
</style>