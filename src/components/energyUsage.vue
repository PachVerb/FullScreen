/* 能耗态势 */
<template>
  <div class="energy">
    <sideTran thisCrrentSys="energyUsage">
      <div slot="left">
        <sideItem title="用电设备统计">
          <div slot='body'>
            
          </div>
        </sideItem>
        <sideItem title="用电概况">
          <div slot='body'>
            <!-- <div id="totalAssets"></div> -->
          </div>
        </sideItem>
        <sideItem title="设备用电占比">
          <div slot='body'>
            <!-- <div id="allTotalAssets"></div> -->
          </div>
        </sideItem>
        <sideItem title="用电趋势分析">
          <div slot='body'>
            <!-- <div id="allTotalAssets"></div> -->
          </div>
        </sideItem>
      </div>
      <div slot="right">
        <sideItem title="用水设备统计">
          <div slot='body'>
            <!-- <div id="webSecurity"></div> -->
          </div>
        </sideItem>
        <sideItem title="用水概况">
          <div slot='body'>
            <!-- <div id="serverSecurity"></div> -->
          </div>
        </sideItem>
        <sideItem title="设备用水占比">
          <div slot='body'>

          </div>
        </sideItem>
        <sideItem title="用水趋势分析">
          <div slot='body'>

          </div>
        </sideItem>
      </div>
    </sideTran>
  </div>
</template>

<script>
import sideTran from './sideTran'
import sideItem from './sideItem.vue'
import { mapGetters } from 'vuex'
import * as echarts from 'echarts';
let totalAssetsChartDom,
totalAssetsChart,
allTotalAssetschartDom,
allTotalAssetsChart,
webSecurityChartDom,
webSecurityChart,
serverSecurityChartDom,
serverSecurityChart
export default {
  components: {
    sideTran,
    sideItem
  },
  data(){
    return {
      eqList: [{
        num: 86,
        name: '消防设备总数',
        img: require('../assets/img/fire-control.png')
      },{
        num: 86,
        name: '门禁总数',
        img: require('../assets/img/access-control.png')
      },{
        num: 86,
        name: '温感传感器总数',
        img: require('../assets/img/temperature.png')
      },{
        num: 86,
        name: '监控总数',
        img: require('../assets/img/monitor.png')
      },]
    }
  },
  computed: {
    ...mapGetters(['currentSys'])
  },
  watch: {
    currentSys(val){
      console.log('energyUsage',val)
    }
  },
  mounted(){
    
  },
  methods: {
  
  }
}
</script>

<style lang="less" scoped>
.energy{
  color: #F6FAFF;
  
}
</style>