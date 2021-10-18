<template>
  <div class="sidebar">
    <div class="up" @click="checkSideList('up')"><img v-if="thisIndex == 1" class="img-rotate" src="../assets/img/down.png" alt=""><img v-else src="../assets/img/up.png" alt=""></div>
    <div class="swiper">
      <Swiper :options='swiperOption' ref="sideBarSwiper">
        <SwiperSlide v-for="(sideBar,sideIndex) in sideList" :key="sideIndex" >
          <div class="side-list" v-show="thisIndex == sideIndex">
            <div :class="['side-item', `side-item-${returnClassType(index)}`]" v-for="(sideItem,index) in sideBar" :key="index" @click="checkCurrentSys(sideItem)">
              <div class="sys-tips" v-show="sideItem.name === currentSys"><span>{{ sideItem.cname }}</span></div>
              <div :class="['side-normal',sideItem.name === currentSys ? 'side-select' : '']">
                <img class="side-normal-img" :src="sideItem.normal" alt="">
                <img class="side-select-img" :src="sideItem.select" alt="">
              </div>
            </div>
            <div class="side-position-item" v-for="(sideItem,index) in (sideBar.length % size)" :key="index+'position'">
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <!-- <transition :name="`side-bar-list-${type}`" v-for="(sideBar,sideIndex) in sideList" :key="sideIndex">
        <div class="side-list" v-if="thisIndex == sideIndex">
          <div class="side-item" v-for="(sideItem,index) in sideBar" :key="index" @click="checkCurrentSys(sideItem)">
            <div class="sys-tips" v-show="sideItem.name === currentSys"><span>{{ sideItem.cname }}</span></div>
            <div :class="['side-normal',sideItem.name === currentSys ? 'side-select' : '']">
              <img class="side-normal-img" :src="sideItem.normal" alt="">
              <img class="side-select-img" :src="sideItem.select" alt="">
            </div>
          </div>
          <div class="side-position-item" v-for="(sideItem,index) in (sideBar.length % size)" :key="index+'position'">
          </div>
        </div>
      </transition> -->
    </div>
    <div class="down" @click="checkSideList('down')"><img v-if="this.thisIndex >= (Math.ceil(this.allSideList.length/6))" src="../assets/img/down.png" alt=""><img v-else class="img-rotate" src="../assets/img/up.png" alt=""></div>
  </div>
</template>

<script>
import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
import { Carousel, CarouselItem } from 'element-ui'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    Carousel,
    CarouselItem,
    Swiper,
    SwiperSlide
  },
  data(){
    return {
      allSideList: [{
        name: 'comprehensive',
        cname: '综合态势',
        normal: require('../assets/sidebar/normal/comprehensive.png'),
        select: require('../assets/sidebar/select/comprehensive.png')
      },{
        name: 'assets',
        cname: '资产态势',
        normal: require('../assets/sidebar/normal/assets.png'),
        select: require('../assets/sidebar/select/assets.png')
      },{
        name: 'interstatues',
        cname: '网络态势',
        normal: require('../assets/sidebar/normal/assets.png'),
        select: require('../assets/sidebar/select/assets.png')
      },{
        name: '3',
        cname: '3态势',
        normal: require('../assets/sidebar/normal/assets.png'),
        select: require('../assets/sidebar/select/assets.png')
      },{
        name: 'dormitory',
        cname: '宿舍态势',
        normal: require('../assets/sidebar/normal/dormitory.png'),
        select: require('../assets/sidebar/select/dormitory.png')
      },{
        name: 'fireSafety',
        cname: '安消态势',
        normal: require('../assets/sidebar/normal/fireSafety.png'),
        select: require('../assets/sidebar/select/fireSafety.png')
      },{
        name: 'energyUsage',
        cname: '能耗态势',
        normal: require('../assets/sidebar/normal/energyUsage.png'),
        select: require('../assets/sidebar/select/energyUsage.png')
      },{
        name: 'peoplestatues',
        cname: '人员态势',
        normal: require('../assets/sidebar/normal/peoplestatues.png'),
        select: require('../assets/sidebar/select/peoplestatues.png')
      },{
        name: 'vehicle',
        cname: '车辆态势',
        normal: require('../assets/sidebar/normal/vehicle.png'),
        select: require('../assets/sidebar/select/vehicle.png')
      },{
        name: 'publichouse',
        cname: '公房态势',
        normal: require('../assets/sidebar/normal/publichouse.png'),
        select: require('../assets/sidebar/select/publichouse.png')
      }],
      sideList: [],
      thisIndex: 0,
      swiperOption: {

      },
      page: 0,
      size: 7,
      type: 'down',
      mid: 0,
    }
  },
  computed:{
    ...mapGetters(['currentSys']),
  },
  mounted(){
    this.page = Math.ceil(this.allSideList.length/this.size)
    let sideList = []
    for(let i = 0;i < this.page;i++){
      console.log(i)
      sideList[i] = JSON.parse(JSON.stringify(this.allSideList.slice(i*this.size,(i+1)*this.size)))
    }
    console.log(this.page,sideList)
    this.sideList = sideList
    this.checkSideList()
  },
  methods: {
    ...mapMutations(['SET_CURRENTSYS']),
    returnClassType(val){
      let type = 0
      let mid = Math.ceil(this.sideList[this.thisIndex].length/2)
      type = Math.abs(mid-(val+1))
      return type
    },
    checkSideList(type){
      this.type = type
      if(type == 'up' && this.thisIndex > 0){
        this.thisIndex -= 1
      } else if(type == 'down' && this.thisIndex < (Math.floor(this.allSideList.length/6))) {
        this.thisIndex += 1
      }
      console.log(this.thisIndex)
      this.$nextTick(() => {
        this.$refs.sideBarSwiper.$swiper.slideTo(this.thisIndex,500,false)
      })
      // console.log(this.$refs.sideBarSwiper,6666)
      // this.sideList = this.allSideList.filter((item,index) => {
      //   if(index < this.thisIndex*6 && index >= (this.thisIndex-1)*6){
      //     return item
      //   }
      // })
    },
    checkCurrentSys(side){
      this.SET_CURRENTSYS(side.name)
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar{
  position: fixed;
  z-index: 10;
  bottom: 3%;
  right: 50%;
  // margin-left: 50%;
  transform: translateX(365px);
  display: flex;
  // flex-direction: column;
  align-items: center;
  /* height: 86%; */
}
.up,.down{
  position: relative;
  z-index: 10;
  height: 100%;
}
.up img,.down img{
  width: .226667rem;
  height: .16rem;
  transform: rotateX(75deg);
}
.side-item img{
  width: 80px;
  height: 80px;
}
.side-list{
  // display: flex;
  // flex-direction: column;
  // justify-content: space-around;
  /* overflow: hidden; */
}
.side-item{
  position: relative;
  margin: 0.06rem;
  display: inline-block;
}
.sys-tips{
  position: absolute;
  transform: translateY(50%);
  left: -116px;
  width: 116px;
  height: 47.7px;
  background-image: url('../assets/img/sys-tips.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 12px;
  color: #fff;
  line-height: 47.7px;
  animation: tilt-in-right-1 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@keyframes tilt-in-right-1 {
  0% {
    width: 10px;
    height: 10px;
    transform: rotateX(-30deg) translateX(300px) skewX(30deg) rotateY(-30deg) translateY(-300px) skewY(30deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg) translateX(0) skewX(0deg) rotateY(0deg) translateY(0) skewY(0deg);
    opacity: 1;
  }
}

.sys-tips span{
  display: inline-block;
  margin-right: .09rem;
  width: .48rem;
  text-align: center;
}
.img-rotate{
  transform: rotateX(180deg);
}
.swiper{
  // overflow-y: hidden;
  .swiper-container{
    height: 100%;
    // overflow-y: hidden;
  }
}
.swiper .swiper-slide{
  width: 730px;
  opacity: 0;
  z-index: 0;
  transition: all .5s;
}
.swiper .swiper-slide-active{
  opacity: 1;
  z-index: 1;
  transition: all .5s;
}
.side-normal{
  .side-normal-img{
    display: block;
  }
  .side-select-img{
    display: none;
  }
}
.side-select{
  .side-normal-img{
    display: none;
  }
  .side-select-img{
    display: block;
  }
}
.side-item:hover{
  .sys-tips{
    display: block !important;
  }
  .side-normal{
    .side-normal-img{
      display: none;
    }
    .side-select-img{
      display: block;
    }
  }
}
.side-bar-list-up-enter{
  opacity: 0;
  transform: translateY(-100%);
}
.side-bar-list-up-enter-active, .side-bar-list-up-leave-active {
  transition: all 1s ease;
}
.side-bar-list-up-enter-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 1;
  transform: translateY(0%);
}
.side-bar-list-up-leave-to{
  transform: translateY(-150%);
}
.side-bar-list-down-enter{
  opacity: 0;
  transform: translateY(0%);
}
.side-bar-list-down-enter-active, .side-bar-list-down-leave-active {
  transition: all 1s ease;
}
.side-bar-list-down-enter-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 1;
  transform: translateY(0%);
}
.side-bar-list-down-leave-to{
  transform: translateY(100%);
}
.side-position-item{
  width: 80px;
  height: 80px;
}
.side-item-3{
  margin-bottom: 53px;
}
.side-item-2{
  margin-bottom: 33px;
}
.side-item-1{
  margin-bottom: 16px;
}
.side-item-0{
  margin-bottom: 6px;
}
</style>