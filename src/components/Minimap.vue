<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    width="220px"
    height="107px"
    viewBox="0 0 2200 1070"
    preserveAspectRatio="xMidYMid meet"
  >
    <g id="layer101" fill="#4a4747" stroke="none">
      <path
        d="M50 760 c0 -233 2 -270 15 -270 13 0 15 -34 15 -242 l0 -243 250 0 c138 0 250 3 250 8 0 4 234 7 520 7 286 0 520 -3 520 -7 0 -5 115 -8 255 -8 l255 0 0 243 c0 155 4 242 10 242 6 0 10 97 10 270 l0 270 -160 0 -160 0 0 -375 0 -375 -100 0 -100 0 0 25 0 25 -530 0 c-523 0 -530 0 -530 -20 0 -19 -7 -20 -93 -20 l-94 0 -6 158 c-4 86 -7 253 -7 370 l0 212 -160 0 -160 0 0 -270z m305 0 l1 -255 -3 252 -3 252 -148 4 -147 3 150 -1 150 0 0 -255z m1643 253 l-148 -4 -2 -257 -3 -257 -2 250 c-2 137 -1 255 2 262 3 10 40 12 152 11 l148 -2 -147 -3z m-1631 -680 c-2 -32 -3 -8 -3 52 0 61 1 87 3 58 2 -29 2 -78 0 -110z m1480 -10 c-2 -32 -3 -6 -3 57 0 63 1 89 3 58 2 -32 2 -84 0 -115z m-750 -220 c-1 -43 -3 -10 -3 72 0 83 2 118 3 78 2 -40 2 -107 0 -150z"
      />
    </g>

    <g id="layer103" stroke="none">
      <path
        :fill="hoveredSection === 1 ? '#4a4747' : '#fff'"
        @click="setSelectedSection(1)"
        @mouseenter="setHoveredSection(1)"
        @mouseleave="resethoveredSection()"
        d="M60 755 l0 -255 145 0 145 0 0 255 0 255 -145 0 -145 0 0 -255z"
      />
      <path
        :fill="hoveredSection === 2 ? '#4a4747' : '#fff'"
        @click="setSelectedSection(2)"
        @mouseenter="setHoveredSection(2)"
        @mouseleave="resethoveredSection()"
        d="M90 250 l0 -240 240 0 240 0 0 135 0 135 -105 0 -105 0 0 105 0 105 -135 0 -135 0 0 -240z"
      />
      <path
        :fill="hoveredSection === 3 ? '#4a4747' : '#fff'"
        @click="setSelectedSection(3)"
        @mouseenter="setHoveredSection(3)"
        @mouseleave="resethoveredSection()"
        d="M580 175 l0 -145 255 0 255 0 0 145 0 145 -255 0 -255 0 0 -145z"
      />
      <path
        :fill="hoveredSection === 4 ? '#4a4747' : '#fff'"
        @click="setSelectedSection(4)"
        @mouseenter="setHoveredSection(4)"
        @mouseleave="resethoveredSection()"
        d="M1100 175 l0 -145 260 0 260 0 0 145 0 145 -260 0 -260 0 0 -145z"
      />
      <path
        :fill="hoveredSection === 5 ? '#4a4747' : '#fff'"
        @click="setSelectedSection(5)"
        @mouseenter="setHoveredSection(5)"
        @mouseleave="resethoveredSection()"
        d="M1850 380 l0 -110 -110 0 -110 0 0 -130 0 -130 245 0 245 0 0 240 0 240 -135 0 -135 0 0 -110z"
      />
      <path
        :fill="hoveredSection === 6 ? '#4a4747' : '#fff'"
        @click="setSelectedSection(6)"
        @mouseenter="setHoveredSection(6)"
        @mouseleave="resethoveredSection()"
        d="M1850 755 l0 -255 145 0 145 0 0 255 0 255 -145 0 -145 0 0 -255z"
      />
    </g>
  </svg>
</template>

<script>
import eventBus from '../eventBus';

export default {
  computed: {
    hoveredSection() {
      return eventBus.$data.hoveredSection;
    }
  },
  methods: {
    setSelectedSection(val) {
      eventBus.$data.selectedSection = val;
    },
    setHoveredSection(val) {
      eventBus.$data.hoveredSection = val;
    },
    resethoveredSection() {
      eventBus.$data.hoveredSection = null;
    },
  }
};
</script>