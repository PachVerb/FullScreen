<template>
  <div class="index">
    <!-- <img src="../assets/img/2.png" alt=""> -->
    <div class="index_top" >
      <img alt="logo" src="../assets/img/toptitle.png"  style="width: 95%; display: inline-block;"/>
<!-- 			<div style="margin-right: 10px;display: inline-block;position: absolute;margin-top: 20px">
				<selectschool style="position: absolute;width:340px" />
				<clock style="margin-left: 150px;" />
			</div> -->
      <!-- <div id="he-plugin-simple" style=""></div> -->
    </div>
    <MapContent ref="Map" @zoomdata='zoomdata' :Fllo='foolbtn'/>
    <component v-if="!mapLoad" :is="echar" :ref="echar"></component>
    <SideBar></SideBar>
    <!-- <VideoCheck v-if="showVideo"/> -->
    <comprehensive v-show="currentSys" ref="comprehensive"></comprehensive>
    <assets v-show="currentSys" ref="assets"></assets>
    <fireSafety v-show="currentSys" ref="fireSafety"></fireSafety>
    <vehicle v-show="currentSys" ref="vehicle"></vehicle>
    <peoplestatues v-show="currentSys" ref="peoplestatues"></peoplestatues>
    <energyUsage v-show="currentSys" ref="energyUsage"></energyUsage>
		<dormitory v-show="currentSys" ref="dormitory" style="position: absolute;"/>  
		<interstatues v-show="currentSys" ref="interstatues"></interstatues>
		<publichouse v-show="currentSys" ref="publichouse"></publichouse>
		<studystatues v-show="currentSys" ref="studystatues"></studystatues>
		<networkoperation v-show="currentSys" ref="networkoperation"></networkoperation>
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
import interstatues from '@/components/interstatues/index.vue'//网络态势
import studystatues from '@/components/studystatues/index.vue'//教学态势
import fireSafety from '@/components/fireSafety'
import vehicle from '@/components/vehicle'
import peoplestatues from '@/components/peoplestatues'
import energyUsage from '@/components/energyUsage'
import publichouse from '@/components/publichouse/index.vue'//公房态势
import networkoperation from '@/components/networkoperation/index.vue'//网络运维
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
		interstatues,
		publichouse,
		studystatues,
		networkoperation
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
    ...mapGetters(['mapLoad', 'detailMsg', 'detailMsgMarker','map', 'currentSys', 'oldCurrentSys']),
  },
  watch: {
    currentSys(val){
      if(this.map){
        this.map.setBearing(8)
				this.map.setPitch(60)
        this.map.setZoom(16.1)
        this.map.setCenter([104.05758988604839, 30.595132552688057])
        this.SET_DETAIL_MSG(null)
      }
      if(this.$refs[val] && this.$refs[val].init) this.$refs[val].init()
    },
    mapLoad(val){
      if(val){
        this.SET_CURRENTSYS('comprehensive')
      }
    },
    detailMsg(val){
      this.clearMarker()
      if(val && val.location){
        let zoom = val.floor !== undefined ? 19 : 16.1
        this.map.flyTo({
          center: val.location,
          zoom,
          offset: [0,-50]
        })
        this.createMarker()
      }
    }
  },
  created(){
		this.getWeather(document)
	},
  mounted(){
		// this.copyWeatherHtml()
    // this.SET_CURRENTSYS('comprehensive')
	},
  methods:{
    ...mapMutations(['SET_ISINDOOR','SET_CURRENTSYS','SET_CURRENTFLOOR','SET_DETAIL_MSG','SET_DETAIL_MSG_MARKER']),
    createMarker(){
      let div = document.createElement('div')
      div.innerHTML = `
        <img style="width: 50px;height: 50px;" src="${require('../assets/gif/marker.gif')}" />
      `
      let marker = new creeper.Marker({element: div}).setLngLat(this.detailMsg.location).addTo(this.map)
      this.SET_DETAIL_MSG_MARKER(marker)
    },
    clearMarker(){
      if(this.detailMsgMarker){
        this.detailMsgMarker.remove()
        this.SET_DETAIL_MSG_MARKER(null)
      }
    },
    zoomdata(data){
      if(this.map && this.map.getZoom && this.map.getZoom() <16.1){
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
