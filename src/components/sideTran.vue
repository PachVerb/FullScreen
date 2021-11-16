<template>
  <div style="height: 100%;">
    <transition name="go-in-sys-left">
      <div class="sys-left" :style="{width: widthL}" v-if="currentSys === thisCrrentSys" v-show="showLeftSys">
        <img @click="handleShowLeftSys" class="sys-hide-btn" src="../assets/img/hideSysBtn.png" alt="">
        <slot name="left"/>
      </div>
    </transition>
    <transition name="go-in-sys-right">
      <div class="sys-right" :style="{width: widthR}" v-if="currentSys === thisCrrentSys" v-show="showRightSys">
        <img @click="handleShowRightSys" class="sys-hide-btn right-sys-hide-btn" src="../assets/img/hideSysBtn.png" alt="">
        <slot name="right"/>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    thisCrrentSys: {
      default: ''
    },
    widthL: {
      default: '380px'
    },
    widthR: {
      default: '380px'
    }
  },
  data(){
    return {
      // thisCrrentSys: ''
      showLeftSys: true,
      showRightSys: true
    }
  },
  computed: {
    ...mapGetters(['currentSys',])
  },
  methods: {
    handleShowLeftSys(){
      this.showLeftSys = !this.showLeftSys
    },
    handleShowRightSys(){
      this.showRightSys = !this.showRightSys
    },  
  },
  mounted(){
    
  }
}
</script>

<style scoped>
.sys-left,.sys-right{
  height: 90%;
  /* background-color: rgba(10,25,46, .8); */
}
.sys-left{
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  font-size: 12px;
  background-image: url('../assets/img/left-bg.png');
  background-size: 100% 100%;
}
.go-in-sys-left-enter{
  transform: translateX(-50%);
}
.go-in-sys-left-enter-active, .go-in-sys-left-leave-active {
  transition: all .5s;
}
.go-in-sys-left-enter-to /* .fade-leave-active below version 2.1.8 */ {
  left: 0%;
}
.go-in-sys-left-leave-to{
  transform: translateX(-50rem);
}
.sys-right{
  position: fixed;
  z-index: 10;
  bottom: 0px;
  right: 0px;
  font-size: 12px;
  background-image: url('../assets/img/right-bg.png');
  background-size: 100% 100%;
}
.go-in-sys-right-enter{
  transform: translateX(150%);
}
.go-in-sys-right-enter-active, .go-in-sys-right-leave-active {
  transition: all .5s;
}
.go-in-sys-right-enter-to /* .fade-leave-active below version 2.1.8 */ {
  right: 0%;
}
.go-in-sys-right-leave-to{
  transform: translateX(150%);
}
.sys-hide-btn{
  position: absolute;
  left: 373px;
  top: 50%;
  cursor: pointer;
  width: 25px;
}
.right-sys-hide-btn{
  left: -23px;
  transform: rotate(180deg);
}
</style>