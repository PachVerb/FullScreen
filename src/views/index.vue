<template>
  <div class="index">
    <!-- <img src="../assets/img/2.png" alt=""> -->
    <div class="index_top" >
      <img alt="logo" src="../assets/img/toptitle.png"  style="height:100%;"/>
      <clock/>
    </div>

    <MapContent ref="Map" @zoomdata='zoomdata' :Fllo='foolbtn'/>
    <component v-if="!mapLoad" :is="echar" :ref="echar"></component>
    <VideoCheck v-if="showVideo"/>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import MapContent from "@/components/MapContent"; // 地图组件
import Clock from "@/components/Clock"; // 时钟

import Bus from'../js/Bus';
export default {
  name: "index",
  flag:true,
  components: {
    MapContent,
    Clock
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
    ...mapGetters(['showVideo', 'mapLoad', 'map'])
  },
  created(){},
  mounted(){},
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
