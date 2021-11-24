<template>
  <div class="sidebar">
    <div class="up" @click="checkSideList('up')"><img v-if="thisIndex !== 0" class="img-rotate" src="../assets/img/down.png" alt=""><img v-else src="../assets/img/up.png" alt=""></div>
    <div class="swiper">
      <div class="side-list">
        <div :class="['side-item','side-bar-item-aa', sideItem.children ? 'side-item-has-child' : '']" 
          v-for="(sideItem,index) in allSideList" :key="index" 
          @click="checkCurrentSys(sideItem,index, 'click')">
          <div class="sys-tips" :style="{top: sideItem.children ? -10 + sideItem.children.length * (-55) + 'px' : 0}" v-if="sideItem.children">
            <div class="sys-tips-body">
              <span :class="['sys-sidechild-normal', checkSideItem.name === currentSysModule ? 'sys-sidechild-select' : '']" 
                v-for="checkSideItem in sideItem.children" 
                :key="checkSideItem.name"
                @click.stop="checkCurrentSysModule(checkSideItem,sideItem)"
              >{{ checkSideItem.cname }}</span>
            </div>
            <div class="sys-tips-foot"></div>
          </div>
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
    <div class="down" @click="checkSideList('down')"><img class="img-rotate1" v-if="this.thisIndex < (Math.floor(this.allSideList.length/this.size))" src="../assets/img/down.png" alt=""><img class="img-rotate2" v-else src="../assets/img/up.png" alt=""></div>
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
        select: require('../assets/sidebar/select/assets.png'),
        children: [{
          name: 'networkEquipment',
          cname: '网络设备态势'
        },{
          name: 'networkHeat',
          cname: '网络连接热力图'
        },{
          name: 'networkOpticalFiber',
          cname: '网络光纤态势'
        }]
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
        select: require('../assets/sidebar/select/peoplestatues.png'),
        children: [{
          name: 'personnelGathering',
          cname: '人员聚集态势'
        },{
          name: 'personnelMigration',
          cname: '人员迁徙态势'
        }]
      },{
        name: 'vehicle',
        cname: '车辆态势',
        normal: require('../assets/sidebar/normal/vehicle.png'),
        select: require('../assets/sidebar/select/vehicle.png'),
      },{
        name: 'publichouse',
        cname: '公房态势',
        normal: require('../assets/sidebar/normal/publichouse.png'),
        select: require('../assets/sidebar/select/publichouse.png')
      },{
        name: 'networkoperation',
        cname: '网络运维',
        normal: require('../assets/sidebar/normal/networkoperation.png'),
        select: require('../assets/sidebar/select/networkoperation.png'),
      }
			],
      sideList: [[]],
      thisIndex: 0,
      swiperOption: {

      },
      page: 0,
      size: 7,
      type: 'down',
      mid: 0,
      ani: null,
      checkSideItem: {},
      oldCheckSideItem: {},
      oldIndex: '',
      SysTop: '',
      SysLeft: '',
      currentSysThisIndex: '',
      oldCurrentsSys: '',
      midIndex: 0
    }
  },
  computed:{
    ...mapGetters(['currentSys','oldCurrentSys','currentSysModule']),
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
    ...mapMutations(['SET_CURRENTSYS', 'SET_OLD_CURRENTSYS','SET_CURRENTSYS_MODULE']),
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
      if(this.sideList[this.thisIndex].length < this.size){
        mid = mid - (this.size - this.sideList[this.thisIndex].length) 
      }
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
      let mid = 4//Math.ceil(this.sideList[this.thisIndex].length/2)
      if(this.sideList[this.thisIndex].length < this.size){
        mid = mid - (this.size - this.sideList[this.thisIndex].length) 
      }
      let sideDomList = document.getElementsByClassName('side-bar-item-aa')
      sideDomList = [...sideDomList]
      let midIndex = 0
      sideDomList.forEach((dom,index) => {
        let a = this.returnClassType(index,this.thisIndex)
        if(a == 0) midIndex = index
      })
      this.midIndex = midIndex
      sideDomList.forEach((dom,index) => {
        let a = this.returnClassType(index,this.thisIndex)
        // dom.style.left = 0 + (index - this.thisIndex*this.size)*105 + 'px'
        dom.style.left = 17 + (315 - (midIndex - index)*105) + 'px'
        // dom.style.top = (42-(a-1)*17) + 'px'
        dom.style.top = 180 * Math.cos((15 * a * Math.PI) / 180) - 125 + 'px'
      })
    },
    hoverCurrentSys(side,index){
      this.checkSideItem = {}
      if(side && side.children){
        this.checkSideItem = JSON.parse(JSON.stringify(side))
        this.currentSysThisIndex = this.thisIndex
        let sideDomList = document.getElementsByClassName('side-bar-item-aa')
        sideDomList = [...sideDomList]
        let midIndex = 0
        sideDomList.forEach((dom,i) => {
          let a = this.returnClassType(i,this.thisIndex)
          if(a == 0) midIndex = i
        })
        let a = this.returnClassType(index,this.thisIndex)
        this.SysTop = (42-(a-1)*17) - 70 + 'px'
        let marginLeft = side.children ? (side.children.length)*105/2 : 0
        this.SysLeft = 30 + (315 - (midIndex - index)*105) - marginLeft + 'px'
      }
    },
    leaveCurrentSys(side,index){
      if(this.oldCheckSideItem){
        // this.checkSideItem = this.oldCheckSideItem
      }
    },
    checkCurrentSys(side,index,type){
      if(this.$parent.$refs[this.currentSys] && this.$parent.$refs[this.currentSys].destroySys) this.$parent.$refs[this.currentSys].destroySys()
      this.SET_CURRENTSYS_MODULE('')
      this.currentSysThisIndex = this.thisIndex
      this.SET_OLD_CURRENTSYS(this.currentSys)
      this.oldIndex = index
      this.oldCheckSideItem = JSON.parse(JSON.stringify(side))
      this.checkSideItem = JSON.parse(JSON.stringify(side))
      this.SET_CURRENTSYS(side.name)
      if(side.children) this.SET_CURRENTSYS_MODULE(side.children[0].name)
    },
    checkCurrentSysModule(sideChild, parentSys){
      if(this.currentSys !== parentSys.name && this.$parent.$refs[this.currentSys] && this.$parent.$refs[this.currentSys].destroySys) this.$parent.$refs[this.currentSys].destroySys()
      this.SET_CURRENTSYS(parentSys.name)
      this.SET_CURRENTSYS_MODULE(sideChild.name)
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar{
  position: fixed;
  z-index: 11;
  bottom: 3%;
  right: 48%;
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
  // height: 100%;
  cursor: pointer;
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
  transform: rotateZ(-60deg);
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
  overflow-x: clip;
  width: 754px;
  height: 175px;
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
.side-item:hover{
  .sys-tips{
    display: block;
  }
}
.sys-tips{
  position: absolute;
  z-index: 10;
  // transform: translateY(-50%);
  display: none;
  left: 50%;
  margin-left: -60px;
  padding-bottom: 35px;
  // top: -70px;
  // margin-left: -30%;
  // padding-right: 10px;
  // height: 55px;
  // background-image: url('../assets/sidebar/sidebar-btn-box.png');
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  font-size: 12px;
  color: #fff;
  line-height: 47.7px;
  animation: scale-in-bottom .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  transition: all .5s;
}
@keyframes scale-in-bottom {
  0% {
    transform: scale(0);
    transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    transform: scale(1);
    transform-origin: 50% 100%;
    opacity: 1;
  }
}
.sys-sidechild-normal{
  display: inline-block;
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-image: url('../assets/sidebar/sidebar-normal-btn.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.sys-sidechild-normal:hover{
  background-image: url('../assets/sidebar/sidebar-select-btn.png');
}
.sys-sidechild-select{
  background-image: url('../assets/sidebar/sidebar-select-btn.png');
}
.side-cname{
  color: rgba(255, 255, 255, .8);
  font-size: 14px;
}
.sidebar .img-rotate{
  transform: rotateZ(120deg);
}
.sidebar .img-rotate1{
  transform: rotateZ(240deg);
}
.sidebar .img-rotate2{
  transform: rotateZ(60deg);
}
.swiper{
  display: flex;
  justify-content: center;
  // overflow-y: hidden;
  width: 800px;
  background-image: url('../assets/sidebar/sidebar-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 73%;
  background-position-x: center;
  background-position-y: 50px;
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
  cursor: pointer;
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
    margin-top: -13px;
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
.side-item-has-child:hover{
  .sys-tips{
    display: block !important;
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
.sys-tips-body{
  background-image: url('../assets/img/sys-tips-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.sys-tips-foot{
  margin-top: 2px;
  width: 100%;
  height: 13px;
  background-image: url('../assets/img/sys-tips-bottom.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>