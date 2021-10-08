<template>
  <div>
    <transition name="go-in-sys-left">
      <div class="sys-left" v-if="currentSys === thisCrrentSys">
        <slot name="left"/>
      </div>
    </transition>
    <transition name="go-in-sys-right">
      <div class="sys-right" v-if="currentSys === thisCrrentSys">
        <slot name="right"/>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['thisCrrentSys'],
  computed: {
    ...mapGetters(['currentSys'])
  }
}
</script>

<style scoped>
.sys-left,.sys-right{
  background-color: rgba(10,25,46, .8);
}
.sys-left{
  position: fixed;
  z-index: 10;
  top: 16%;
  left: 5%;
  color: red;
  font-size: .346667rem;
}
.go-in-sys-left-enter{
  transform: translateX(-50%);
}
.go-in-sys-left-enter-active, .go-in-sys-left-leave-active {
  transition: all .5s;
}
.go-in-sys-left-enter-to /* .fade-leave-active below version 2.1.8 */ {
  left: 5%;
}
.go-in-sys-left-leave-to{
  transform: translateX(-50rem);
}
.sys-right{
  position: fixed;
  z-index: 10;
  top: 16%;
  right: 5%;
  color: red;
  font-size: .346667rem;
}
.go-in-sys-right-enter{
  transform: translateX(150%);
}
.go-in-sys-right-enter-active, .go-in-sys-right-leave-active {
  transition: all .5s;
}
.go-in-sys-right-enter-to /* .fade-leave-active below version 2.1.8 */ {
  right: 5%;
}
.go-in-sys-right-leave-to{
  transform: translateX(150%);
}
</style>