<template>
  <div class="sidebar">
    <div class="up" @click="checkSideList('up')"><img v-if="thisIndex == 0" class="img-rotate" src="../assets/img/down.png" alt=""><img v-else src="../assets/img/up.png" alt=""></div>
    <div class="swiper">
      <div class="side-list">
        <div :class="['side-item','side-bar-item-aa',]" v-for="(sideItem,index) in allSideList" :key="index" @click="checkCurrentSys(sideItem)">
          <!-- <div class="sys-tips" v-show="sideItem.name === currentSys"><span>{{ sideItem.cname }}</span></div> -->
          <div :class="['side-normal',sideItem.name === currentSys ? 'side-select' : '']">
            <img class="side-normal-img" :src="sideItem.normal" alt="">
            <img class="side-select-img" :src="sideItem.select" alt="">
            <div class="side-cname">{{ sideItem.cname }}</div>
          </div>
        </div>
        <!-- <div class="side-position-item" v-for="(sideItem,index) in (sideBar.length % size)" :key="index+'position'">
        </div> -->
      </div>
    </div>
    <div class="down" @click="checkSideList('down')"><img class="img-rotate" v-if="this.thisIndex >= (Math.floor(this.allSideList.length/6))" src="../assets/img/down.png" alt=""><img v-else src="../assets/img/up.png" alt=""></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    
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
        name: 'studystatues',
        cname: '教学态势',
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
      sideList: [[]],
      thisIndex: 0,
      swiperOption: {

      },
      page: 0,
      size: 7,
      type: 'down',
      mid: 0,
      ani: null
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
    returnSideItemClass(val,thisIndex){
      let className = ''
      let index = val + this.thisIndex*this.size
      if(index >= (this.thisIndex+1)*this.size){
        className = 'right-side-item'
      } else if(index < this.thisIndex*this.size){
        className = 'left-side-item'
      }
      return className
    },
    returnClassType(val,thisIndex){
      let type = 0
      let mid = 4//Math.ceil(this.sideList[this.thisIndex].length/2)
      type = Math.abs(mid-(val+1))
      type = Math.abs(type - this.thisIndex*this.size)
      console.log(type)
      return type
    },
    checkSideList(type){
      this.type = type
      if(type == 'up' && this.thisIndex > 0){
        this.thisIndex -= 1
      } else if(type == 'down' && this.thisIndex < (Math.floor(this.allSideList.length/6))) {
        this.thisIndex += 1
      }
      console.log(this.sideList[this.thisIndex],6666)
      // this.sideList = this.allSideList.filter((item,index) => {
      //   if(index < this.thisIndex*6 && index >= (this.thisIndex-1)*6){
      //     return item
      //   }
      // })
      // this.ani = setInterval(() => {

      // },100)
      let sideDomList = document.getElementsByClassName('side-bar-item-aa')
      sideDomList = [...sideDomList]
      sideDomList.forEach((dom,index) => {
        let a = this.returnClassType(index,this.thisIndex)
        dom.style.left = (index - this.thisIndex*this.size)*105 + 'px'
        // console.log(a)
        dom.style.top = (42-(a-1)*17) + 'px'
      })
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
  position: absolute;
  z-index: 10;
  top: 60px;
  height: 100%;
}
.up{
  left: -30px;
}
.down{
  right: -30px;
}
.up img,.down img{
  width: .226667rem;
  height: .16rem;
}
.down img{
  transform: rotateZ(60deg);
}
.up img{
  transform: rotateZ(-35deg);
}
.side-item img{
  width: 68px;
  height: 68px;
}
.side-list{
  // display: flex;
  // flex-direction: column;
  // justify-content: space-around;
  position: relative;
  overflow: hidden;
  width: 800px;
  height: 175px;
  background-image: url('../assets/sidebar/sidebar-bg.png');
  background-repeat: no-repeat;
  background-size: 130% 73%;
  background-position-x: center;
  background-position-y: 50px;
  transition: all 1s;
}
.side-item{
  position: absolute;
  margin: 0.04rem;
  display: inline-block;
  width: 81px;
  height: 81px;
  transition: all 1s;
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
.side-cname{
  color: rgba(255, 255, 255, .8);
  font-size: 14px;
}
.sys-tips span{
  display: inline-block;
  margin-right: .09rem;
  width: .48rem;
  text-align: center;
}
.sidebar .img-rotate{
  transform: rotateZ(120deg);
}
.swiper{
  overflow-y: hidden;
  width: 730px;
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
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    width: 81px;
    height: 81px;
  }
  .side-cname{
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
    font-weight: bold;
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
      width: 81px;
      height: 81px;
    }
  }
}
.side-position-item{
  width: 80px;
  height: 80px;
}
.right-side-item{
  animation: right-side-item-ani 1.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
} 
@keyframes right-side-item-ani{
  0%{
    transform: rotateX(90deg) rotateY(90deg) rotateZ(90deg);
  }
  100%{
    transform: rotateX(45deg) rotateY(45deg) rotateZ(45deg);
  }
}
.left-side-item{
  animation: left-side-item-ani 1.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@keyframes left-side-item-ani{
  0%{
    transform: rotateX(90deg) rotateY(90deg) rotateZ(90deg);
  }
  100%{
    transform: rotateX(45deg) rotateY(45deg) rotateZ(45deg);
  }
}
.side-item-3{
  top: 3px;
  // transition: all .5s;
}
.side-item-2{
  top: 20px;
  // transition: all .5s;
}
.side-item-1{
  top: 39px;
  // transition: all .5s;
}
.side-item-0{
  top: 53px;
  // transition: all .5s;
}
// .tran-type-up{
//   position: relative;
//   top: -80px;
//   left: -80px;
// }
// .tran-type-down{
//   position: relative;
//   top: -80px;
//   left: -80px;
// }
// .side-item{
//   top: 0;
//   left: 0;
//   transition: all .5s;
// }
</style>