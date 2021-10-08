<template>
  <div class="sidebar">
    <div class="up"><img src="../assets/img/up.png" alt=""></div>
    <div class="side-list">
      <div class="side-item" v-for="(sideItem,index) in sideList" :key="index" @click="checkCurrentSys(sideItem)">
        <div class="sys-tips" v-if="sideItem.name === currentSys"><span>{{ sideItem.cname }}</span></div>
        <img src="../assets/img/comprehensive.png" alt="">
      </div>
    </div>
    <div class="down"><img src="../assets/img/down.png" alt=""></div>
  </div>
</template>

<script>
import { Carousel, CarouselItem } from 'element-ui'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    Carousel,
    CarouselItem
  },
  data(){
    return {
      allSideList: [{
        name: 'comprehensive',
        cname: '综合态势'
      },{
        name: 'assets',
        cname: '资产态势'
      },{
        name: '2',
        cname: '2态势'
      },{
        name: '3',
        cname: '3态势'
      },{
        name: 'dormitory',
        cname: '宿舍态势'
      },{
        name: '5',
        cname: '态势'
      },{
        name: '6',
        cname: '6态势'
      },{
        name: '7',
        cname: '7态势'
      },{
        name: '8',
        cname: '8态势'
      }],
      sideList: [],
      thisIndex: 1
    }
  },
  computed:{
    ...mapGetters(['currentSys'])
  },
  mounted(){
    this.checkSideList()
  },
  methods: {
    ...mapMutations(['SET_CURRENTSYS']),
    checkSideList(){
      this.sideList = this.allSideList.filter((item,index) => {
        if(index < this.thisIndex*6 && index >= (this.thisIndex-1)*6){
          return item
        }
      })
    },
    checkCurrentSys(side){
      this.SET_CURRENTSYS(side.name)
    }
  }
}
</script>

<style scoped>
.sidebar{
  position: fixed;
  z-index: 10;
  top: 16%;
  right: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 86%; */
}
.up img,.down img{
  width: .226667rem;
  height: .16rem;
}
.side-item img{
  width: .36rem;
  height: .36rem;
}
.side-list{
  /* height: 80%; */
  /* overflow: hidden; */
}
.side-item{
  position: relative;
  margin: 0.06rem;
}
.sys-tips{
  position: absolute;
  top: 0.075rem;
  left: -0.6rem;
  width: .6rem;
  height: .24rem;
  background-image: url('../assets/img/sys-tips.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: .07rem;
  color: #fff;
  line-height: .24rem;
}
.sys-tips span{
  display: inline-block;
  margin-right: .09rem;
  width: .48rem;
  text-align: center;
}
</style>