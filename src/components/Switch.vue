<template>
  <label
    :class="{
      'vue-switcher': true,
      'vue-switcher--unchecked': !checked,
      'vue-switcher-theme--default': true,
      'vue-switcher-color--default': true,
    }"
  >
    <span class="vue-switcher__label">
      <span>{{ label }}</span>
    </span>

    <input type="checkbox" @change="onChange($event)" :checked="checked" />
    <div></div>

    <span class="vue-switcher__label" v-if="rightLabel">
      <span>{{ rightLabel }}</span>
    </span>

  </label>
</template>

<script>
export default {
  props: ['label', 'rightLabel', 'checked'],
  methods: {
    onChange(e) {
      this.$emit('change', e);
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
    margin: 0 10px;
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