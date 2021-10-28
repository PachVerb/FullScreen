<template>
  <transition :name="`go-in-item-${transitionType}`">
    <div class="side-item" v-show="currentSys == thisCrrentSys">
      <div class="side-item-title">
        <img src="../assets/img/side-item-title.png" alt="">
        <span>{{title}}</span>
      </div>
      <div class="title-border"></div>
      <div class="side-item-body" v-show="!loading">
        <slot name="body"></slot>
      </div>
      <div :class="[loading ?'side-item-loading' : '']" v-if="loading">
        <loading/>
      </div>
      <div class="border"><img src="../assets/img/side-item-border.png" alt=""></div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import loading from './commonComponent/loading.vue'
export default {
  props: {
    title: '',
    tranTime: {
      default: 1,
    },
    transitionType: {
      default: 'left'
    },
    delay: {
      default: '1000'
    },
    loading: {
      default: false
    }
  },
  components: {
    loading
  },
  data(){
    return {
      thisCrrentSys: ''
    }
  },
  computed: {
    ...mapGetters(['currentSys'])
  },
  mounted(){
    console.log(this.$parent.thisCrrentSys,666666)
    setTimeout(() => {
      this.thisCrrentSys = this.$parent.thisCrrentSys
    },this.delay)
  }
}
</script>

<style scoped>
.side-item{
  position: relative;
  left: 0;
}
.side-item-title{
  display: flex;
  align-items: center;
  margin-top: .066667rem;
  padding: 3px;
  padding-left: .106667rem;
  color: #00F5FF;
  font-size: .08rem;
}
.side-item-title img{
  margin-right: .04rem;
  width: .106667rem;
}
.side-item-loading{
  min-height: 150px;
}
.border{
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding: 0 10%;
}
.border img {
  width: 100%;
}
.title-border{
  margin: 3px;
  /* margin-bottom: .16rem; */
  margin-left: .106667rem;
  width: .583333rem;
  height: 1px;
  background-color: #00F5FF;
}
.go-in-item-left-enter{
  opacity: 0;
  transform: translateX(-50%);
}
.go-in-item-left-enter-active, .go-in-item-left-leave-active {
  transition: all 1s ease;
}
.go-in-item-left-enter-to /* .fade-leave-active below version 2.1.8 */ {
  left: 0%;
  opacity: 1;
}
.go-in-item-left-leave-to{
  transform: translateX(150rem);
}
.go-in-item-right-enter{
  opacity: 0;
  transform: translateX(150%);
}
.go-in-item-right-enter-active, .go-in-item-right-leave-active {
  transition: all .8s ease;
}
.go-in-item-right-enter-to /* .fade-leave-active below version 2.1.8 */ {
  right: 0%;
  opacity: 1;
}
.go-in-item-right-leave-to{
  transform: translateX(150rem);
}
.loading-enter{
  opacity: 0;
}
.loading-enter-active, .loading-leave-active {
  transition: all 1s ease;
}
.loading-enter-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 1;
}
.loading-leave-to{
  opacity: 0;
  width: 0;
  height: 0;
}
</style>