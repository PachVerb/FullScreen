<template>
  <div style="height: 100%;">
    <transition name="go-in-sys-left">
      <div
        class="sys-left"
        :style="{ width: widthL, left: showLeftSys ? 0 : '-450px' }"
        v-if="currentSys === thisCrrentSys"
      >
        <!-- <img
          @click="handleShowLeftSys"
          :class="['sys-hide-btn']"
          :src="
            showLeftSys
              ? require('../assets/img/hideSysBtn.png')
              : require('../assets/img/showSys.png')
          "
          alt=""
        /> -->
        <slot name="left" />
      </div>
    </transition>
    <transition name="go-in-sys-right">
      <div
        class="sys-right"
        :style="{ width: widthR, right: showRightSys ? 0 : '-450px' }"
        v-if="currentSys === thisCrrentSys"
      >
        <!-- <img
          @click="handleShowRightSys"
          :class="[
            'sys-hide-btn',
            showRightSys ? 'right-sys-hide-btn' : 'right-sys-show-btn',
          ]"
          :src="
            showRightSys
              ? require('../assets/img/hideRightSys.png')
              : require('../assets/img/show-right.png')
          "
          alt=""
        /> -->
        <slot name="right" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    thisCrrentSys: {
      default: "",
    },
    widthL: {
      default: "450px",
    },
    widthR: {
      default: "450px",
    },
  },
  data() {
    return {
      // thisCrrentSys: ''
      showLeftSys: true,
      showRightSys: true,
    };
  },
  computed: {
    ...mapGetters(["currentSys"]),
  },
  methods: {
    handleShowLeftSys() {
      this.showLeftSys = !this.showLeftSys;
    },
    handleShowRightSys() {
      this.showRightSys = !this.showRightSys;
      let floorDom = document.querySelector("#map-floor");
      if (this.showRightSys) {
        floorDom.style.right = "420px";
      } else {
        floorDom.style.right = "100px";
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.sys-left,
.sys-right {
  height: 95%;
  transition: all 1s;
  /* background-color: rgba(10,25,46, .8); */
}
.sys-left {
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  font-size: 12px;
  /* background-image: url("../assets/img/left-bg.png");
  background-size: 100% 100%; */
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.8);
}
.go-in-sys-left-enter {
  transform: translateX(-50%);
}
.go-in-sys-left-enter-active,
.go-in-sys-left-leave-active {
  transition: all 0.5s;
}
.go-in-sys-left-enter-to /* .fade-leave-active below version 2.1.8 */ {
  left: 0%;
}
.go-in-sys-left-leave-to {
  transform: translateX(-50rem);
}
.sys-right {
  position: fixed;
  z-index: 10;
  bottom: 0px;
  right: 0px;
  font-size: 12px;
  /* background-image: url("../assets/img/right-bg.png");
  background-size: 100% 100%; */
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.8);
}
.go-in-sys-right-enter {
  transform: translateX(150%);
}
.go-in-sys-right-enter-active,
.go-in-sys-right-leave-active {
  transition: all 0.5s;
}
.go-in-sys-right-enter-to /* .fade-leave-active below version 2.1.8 */ {
  right: 0%;
}
.go-in-sys-right-leave-to {
  transform: translateX(150%);
}
.sys-hide-btn {
  position: absolute;
  left: 442px;
  top: 50%;
  cursor: pointer;
  width: 45px;
  height: 80px;
}
.right-sys-hide-btn {
  left: -37px;
  transform: rotateX(180deg);
}
.right-sys-show-btn {
  left: -40px;
  transform: rotateX(0);
}
</style>
