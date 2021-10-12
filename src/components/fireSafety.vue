<template>
  <div class="fire-safety">
    <sideTran thisCrrentSys="fireSafety" widthL="420px">
      <div slot="left">
        <sideItem title="设备数量">
          <div class="num-of-eq" slot='body'>
            <div class="num-of-eq-all">
              <div><span class="num-of-eq-all-num">86</span><span>个</span></div>
              <span>设备总数量</span>
            </div>
            <div class="num-of-eq-detail">
              <div class="num-of-eq-detail-item" v-for="item in eqList" :key="item.name">
                <img :src="item.img" alt="">
                <div>
                  <div class="num-of-detail-eq-num">{{ item.num }}<span>个</span></div>
                  <div>{{ item.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="异常设备位置分析">
          <div slot='body'>
            <div id="totalAssets"></div>
          </div>
        </sideItem>
        <sideItem title="设备异常详情">
          <div slot='body'>
            <div id="allTotalAssets"></div>
          </div>
        </sideItem>
      </div>
      <div slot="right">
        <sideItem title="设备数量">
          <div slot='body'>
            <div id="webSecurity"></div>
          </div>
        </sideItem>
        <sideItem title="监控画面">
          <div slot='body'>
            <div id="serverSecurity"></div>
          </div>
        </sideItem>
        <sideItem title="巡更人员异常概况">
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
      console.log(val)
      if(val == 'assets'){
        
      }
    }
  },
  mounted(){
    console.log('assets')
    
  },
  methods: {
  
  }
}
</script>

<style lang="less" scoped>
.fire-safety{
  color: #F6FAFF;
}
.num-of-eq{
  display: inline-flex;
}
.num-of-eq-all{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: .13rem;
  width: 1.5rem;
  height: 1.03333rem;
  font-size: .08rem;
  background-image: url('../assets/img/number_of_eq.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .num-of-eq-all-num{
    color: #00F5FF;
    font-weight: bold;
  }
}
.num-of-eq-detail{
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.13rem 10px 0;
  font-size: .08rem;
}
.num-of-detail-eq-num{
  text-align: left;
  font-weight: bold;
  color: #00F5FF;
}
.num-of-eq-detail-item{
  display: flex;
  align-items: center;
}
</style>