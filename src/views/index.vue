<template>
  <div class="index">
    <!-- <img src="../assets/img/2.png" alt=""> -->
    <div class="index_top" >
      <img alt="logo" src="../assets/img/toptitle.png"  style="width: 50%; display: inline-block;"/>
<!-- 			<div style="margin-right: 10px;display: inline-block;position: absolute;margin-top: 20px">
				<selectschool style="position: absolute;width:340px" />
				<clock style="margin-left: 150px;" />
			</div> -->
      <!-- <div id="he-plugin-simple" style=""></div> -->
    </div>
		<dormitory style="position: absolute;"/>
    <!-- <MapContent ref="Map" @zoomdata='zoomdata' :Fllo='foolbtn'/> -->
    <component v-if="!mapLoad" :is="echar" :ref="echar"></component>
    <!-- SideBar这个组件写在每一个态势里面 我看ui图每个态势的右边模块宽度不一样，最好吧sideBar写在态势里面去 -->
    <SideBar></SideBar>
    <!-- <VideoCheck v-if="showVideo"/> -->
    <comprehensive ref="comprehensive"></comprehensive>
    <assets ref="assets"></assets>
    <fireSafety ref="fireSafety"></fireSafety>
    <vehicle ref="vehicle"></vehicle>
    <peoplestatues ref="peoplestatues"></peoplestatues>
    <energyUsage ref="energyUsage"></energyUsage>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import MapContent from "@/components/MapContent"; // 地图组件.
import Clock from "@/components/Clock"; // 时钟
import SideBar from '@/components/sidebar'
import comprehensive from '@/components/comprehensive'
import assets from '@/components/assets'
import dormitory from '@/components/dormitory'
import fireSafety from '@/components/fireSafety'
import vehicle from '@/components/vehicle'
import peoplestatues from '@/components/peoplestatues'
import energyUsage from '@/components/energyUsage'

import Bus from'../js/Bus';
import EnergyUsage from '../components/energyUsage.vue';
export default {
  name: "index",
  flag:true,
  components: {
    MapContent,
    Clock,
    SideBar,
    comprehensive,
    assets,
		dormitory,
    vehicle,
	peoplestatues,
    fireSafety,
    vehicle,
    energyUsage,
  },
  data() {
    return {
      echar: '', //模块组件的名称

      isFoot:0,
      foolce:false,//楼层状态
      fool:'',//楼层
      foolList:[],
      foolbtn:0,
      
    };
  },
  computed: {
    ...mapGetters(['mapLoad', 'map', 'currentSys'])
  },
  watch: {
    currentSys(val){
      console.log(this.$refs[val])
      if(this.$refs[val] && this.$refs[val].init) this.$refs[val].init()
    },
  },
  created(){
		this.getWeather(document)
	},
  mounted(){
		// this.copyWeatherHtml()
	},
  methods:{
    zoomdata(data){
      if(this.map && this.map.getZoom && this.map.getZoom() <18.5){
          this.foolce=false;
          this.SET_ISINDOOR(false)
      }else if(data != false){
        this.$nextTick(() => {
          this.fool = parseInt(data.maxLevel);
          this.foolList = [];
          for(let i=this.fool;i>=0;i--){
            this.foolList.push(i+1)
          }
          this.isFoot = data.maxLevel-data.nowLevelIndex;
          this.foolce = true;
          this.SET_ISINDOOR(true)
        })
      }else{
          this.foolce=false;
          this.SET_ISINDOOR(false)
      }
    },
    getWeather (d) {
      // 和风天气插件
      $.getScript("https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0", function(){
        var w = d.createElement('script')
        w.type = 'text/javascript'
        w.innerHTML = `
					WIDGET = {
            "CONFIG": {
              "modules": "210",
              "background": "5",
              "tmpColor": "01cbe3",
              "tmpSize": "16",
              "cityColor": "01cbe3",
              "citySize": "16",
              "aqiColor": "FFFFFF",
              "aqiSize": "16",
              "weatherIconSize": "24",
              "alertIconSize": "18",
              "padding": "10px 10px 10px 10px",
              "shadow": "0",
              "language": "auto",
              "fixed": "false",
              "vertical": "top",
              "horizontal": "left",
              "key": "1fa02fd156a14c8a9e47e470a1f3dc68"
            }
          }
        `
        var sn = d.getElementsByTagName('script')[0]
        sn.parentNode.insertBefore(w, sn)
        })
      },

    ...mapMutations(['SET_ISINDOOR']),
  }
};
</script>

<style lang="less" scoped>
*{
  padding: 0;
  margin: 0;
}
.index{
  width: 100%;
  height:100%;
  position: relative;
  >img{
    width: 100%;
    height:100%;
    pointer-events:none;
    position: absolute;
    left:0;
    z-index: 3;
  }
  .index_top{
    width: 100%;
    height:0.9rem;
    position: absolute;
    top:0;
    z-index: 5;
  }

  .foolce{
    width: 0.25rem;
    position: absolute;
    bottom: 50px;
    right: 0.5rem;
    background: url('../assets/img/foolBar.png'),no-repeat;
    background-size: 100% 100%;
    padding:5px 0;
    z-index: 9999;
    div{
      width: 100%;
      height: 0.2rem;
      line-height: 0.21rem;
    }
    div:hover{
      cursor:pointer
    }
    >.fllol{
        width: 100%;
      line-height: 0.21rem;
      background: url('../assets/img/foo_ba.png'),no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
