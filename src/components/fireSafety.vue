<template>
  <div class="fire-safety">
    <sideTran :thisCrrentSys="thisCrrentSys">
      <div slot="left">
        <sideItem title="设备数量" delay="500">
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
                  <div class="num-of-detail-eq-name">{{ item.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="异常设备位置分析" delay="1000">
          <div slot='body'>
            <div id="totalAssets"></div>
          </div>
        </sideItem>
        <sideItem title="设备异常详情" delay="1500">
          <div slot='body'>
            <div class="ab-nav">
              <span :class="[abCheckNav == nav.id ? 'ab-check-nav' : '']" v-for="nav in abNavList" :key="nav.id" @click="handleAbCheckNav(nav.id)">{{ nav.name }}</span>
            </div>
            <div class="ab-list">
              <div class="ab-item" v-for="item in abDetailList" :key="item.id">
                <div>
                  <div class="ab-item-name">{{ item.name }}</div>
                  <div class="ab-item-date">{{ item.date }}</div>
                </div>
                <div>{{ item.address }}</div>
                <div class="ab-close-btn"></div>
              </div>
            </div>
          </div>
        </sideItem>
      </div>
      <div slot="right">
        <sideItem title="设备数量" transitionType="right" delay="500">
          <div slot='body'>
            <div id="allPatrolChart" class="eq-num-box-chart"></div>
            <div id="abPatrolChart" class="eq-num-box-chart"></div>
            <div id="abPatrolEqChart" class="eq-num-box-chart"></div>
          </div>
        </sideItem>
        <sideItem title="监控画面" transitionType="right" delay="1000">
          <div slot='body'>
            <div class="up-btn"><img v-if="monitorIndex !== 1" class="img-rotate" src="../assets/img/down.png" alt=""><img v-else src="../assets/img/up.png" alt=""></div>
            <div class="monitor-list">
              <div class="monitor-item" v-for="item in monitorList" :key="item.id">
                <img class="monitor-item-img" :src="item.img" alt="">
              </div>
              <div class="monitor-item" v-if="monitorList%2"></div>
            </div>
            <div class="down-btn"><img v-if="this.monitorIndex >= (Math.ceil(this.monitorList.length/4))" src="../assets/img/down.png" alt=""><img v-else class="img-rotate" src="../assets/img/up.png" alt=""></div>
          </div>
        </sideItem>
        <sideItem title="巡更人员异常概况" transitionType="right" delay="1500">
          <div slot='body'>
            <div class="table-head">
              <span :style="{width: head.width}" v-for="head in tableHead" :key="head.name">{{ head.name }}</span>
            </div>
            <div class="ab-list patrol">
              <div class="ab-item"  v-for="(item) in abDetailList" :key="item.id">
                <div class="table-item ab-item-name" :style="{width: tableHead[0].width}">{{ item.name }}</div>
                <div class="table-item" :style="{width: tableHead[1].width}">{{ item.address }}</div>
                <div class="table-item" :style="{width: tableHead[2].width}">{{ item.date }}</div>
                <div :style="{width: tableHead[3].width}" class="last-address table-item"></div>
              </div>
            </div>
          </div>
        </sideItem>
      </div>
    </sideTran>
  </div>
</template>

<script>
import * as mixins from './mixins'
import sideTran from './sideTran'
import sideItem from './sideItem.vue'
import { Table, TableColumn } from 'element-ui'
import { mapGetters } from 'vuex'
import * as echarts from 'echarts';
let allPatrolChart,
allPatrolOption,
abPatrolChart,
abPatrolOption,
abPatrolEqChart,
abPatrolEqOption
export default {
  mixins: [mixins],
  components: {
    sideTran,
    sideItem,
    Table,
    TableColumn
  },
  data(){
    return {
      thisCrrentSys: '',
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
      },],
      abCheckNav: 1,
      abNavList: [{
        id: 1,
        name: '消防'
      },{
        id: 2,
        name: '门禁'
      },{
        id: 3,
        name: '监控'
      },{
        id: 4,
        name: '温感传感器'
      },],
      abDetailList: [{
        id: '1',
        name: 'JD1544消防栓',
        date: '2021-11-09 15:22:47',
        address: '教学楼A区3层走廊'
      },{
        id: '2',
        name: 'JD1544消防栓',
        date: '2021-11-09 15:22:47',
        address: '教学楼A区3层走廊'
      },{
        id: '3',
        name: 'JD1544消防栓',
        date: '2021-11-09 15:22:47',
        address: '教学楼A区3层走廊'
      },{
        id: '4',
        name: 'JD1544消防栓',
        date: '2021-11-09 15:22:47',
        address: '教学楼A区3层走廊'
      },{
        id: '5',
        name: 'JD1544消防栓',
        date: '2021-11-09 15:22:47',
        address: '教学楼A区3层走廊'
      },],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableHead: [{
        name: '姓名',
        width: '40px'
      },{
        name: '异常事件',
        width: '130px'
      },{
        name: '时间',
        width: '120px'
      },{
        name: '操作',
        width: '57.6px'
      },],
      monitorList: [{
        id: '1',
        img: require('../assets/img/fire-control.png')
      },{
        id: '2',
        img: require('../assets/img/fire-control.png')
      },{
        id: '3',
        img: require('../assets/img/fire-control.png')
      },{
        id: '4',
        img: require('../assets/img/fire-control.png')
      },],
      monitorIndex: 1,
      allPatrolOption: {},
      abPatrolOption: {},
      abPatrolEqOption: {}
    }
  },
  computed: {
    ...mapGetters(['currentSys'])
  },
  watch: {
  
  },
  created(){

  },  
  mounted(){
    console.log('fireSafety')
    
  },
  methods: {
    init(){
      allPatrolOption = this.initDashboardEchartOption()
      abPatrolOption = this.initDashboardEchartOption()
      abPatrolEqOption = this.initDashboardEchartOption()
      this.$nextTick(() => {
        this.thisCrrentSys = 'fireSafety'
        let allPatrolChartDom = document.getElementById('allPatrolChart');
        allPatrolChart = echarts.init(allPatrolChartDom);
        allPatrolChart.setOption(allPatrolOption)
        let abPatrolChartDom = document.getElementById('abPatrolChart');
        abPatrolChart = echarts.init(abPatrolChartDom);
        abPatrolChart.setOption(abPatrolOption)
        let abPatrolEqChartDom = document.getElementById('abPatrolEqChart');
        abPatrolEqChart = echarts.init(abPatrolEqChartDom);
        abPatrolEqChart.setOption(abPatrolEqOption)
      })
    },
    handleAbCheckNav(nav){
      this.abCheckNav = nav
    },
    initDashboardEchartOption(val){
      let angle = 0;//角度，用来做简单的动画效果的
      let value = 15;
      return {
      // backgroundColor:"#061740",
      title: {
              text: '{a|'+ value +'}',
              x: 'center',
              y: 'center',
              textStyle: {
                  rich:{
                      a: {
                          fontSize: 18,
                          color: '#29EEF3'
                      },
                      
                      c: {
                          fontSize: 18,
                          color: '#ffffff',
                          // padding: [5,0]
                      }
                  }
              }
          },
          legend: {
              type: "plain",
              orient: "vertical",
              right: 0,
              top: "10%",
              align: "auto",
              data: [{
                  name: '涨价后没吃过',
                  icon: "circle"
              }, {
                  name: '天天吃',
                  icon: "circle"
              }, {
                  name: '三五天吃一次',
                  icon: "circle"
              }, {
                  name: '半个月吃一次',
                  icon: "circle"
              }],
              textStyle: {
                  color: "white",
                  fontSize: 16,
                  padding: [10, 1, 10, 0]
              },
              selectedMode:false
          },
          series: [{
                  name: '吃猪肉频率',
                  type: 'pie',
                  radius: ['95%', '70%'],
                  silent: true,
                  clockwise: true,
                  startAngle: 90,
                  z: 0,
                  zlevel: 0,
                  label: {
                      normal: {
                          position: "center",

                      }
                  },
                  data: [{
                          value: value,
                          name: "",
                          itemStyle: {
                              normal: {
                                  color: 'rgba(106, 176, 255, 1)' // 完成的圆环的颜色
                              }
                          }
                      },
                      {
                          value: 100-value,
                          name: "",
                          label: {
                              normal: {
                                  show: false
                              }
                          },
                          itemStyle: {
                              normal: {
                                  color: "rgb(39,74,110)"
                              }
                          }
                      }
                  ]
              },
              
              {
                  name: "",
                  type: "gauge",
                  radius: "95%",
                  center: ['50%', '50%'],
                  startAngle: 0,
                  endAngle: 359.9,
                  splitNumber: 20,
                  hoverAnimation: true,
                  axisTick: {
                      show: false
                  },
                  splitLine: {
                      length: 60,
                      lineStyle: {
                          width: 5,
                          color: "rgba(22,45,73,.8)"
                      }
                  },
                  axisLabel: {
                      show: false
                  },
                  pointer: {
                      show: false
                  },
                  axisLine: {
                      lineStyle: {
                          opacity: 0
                      }
                  },
                  detail: {
                      show: false
                  },
                  data: [{
                      value: 0,
                      name: ""
                  }]
              },
              
          ]
      };
    }
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
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10px;
  width: 100px;
  height: 136px;
  font-size: 14px;
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
  padding: 10px 10px 0;
  width: 260px;
  font-size: 12px;
  img{
    width: 54px;
  }
}
.num-of-detail-eq-num{
  width: 60px;
  text-align: left;
  font-weight: bold;
  color: #00F5FF;
}
.num-of-detail-eq-num{
  
}
.num-of-eq-detail-item{
  display: flex;
  align-items: center;
}
.ab-nav{
  padding: 16px 0;
  font-size: 14px;
  span{
    box-sizing: border-box;
    display: inline-block; 
    margin: 0 8px;
    padding-bottom: 6px; 
    color: rgba(255, 255, 255, .8);
    cursor: pointer;
  }
  .ab-check-nav{
    color: rgba(0, 245, 255, 1);
    border-bottom: 1px solid rgba(0, 245, 255, 1);
  }
}
.ab-list{
  font-size: 12px;
}
.ab-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 16px 0;
  padding: 0 0 6px;
  border-bottom: 1px solid rgba(63, 151, 207, .5); 
}
.ab-item-name,.ab-item-date{
  margin-top: 5px;
  padding-left: 6px;
  text-align: left;
  border-left: 1px solid #00F5FF;
  color: rgba(255, 255, 255, .5);
}
.ab-item-name{
  font-size: 14px;
  color: #F6FAFF;
  font-weight: bold;
}
.ab-close-btn{
  width: 58px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-image: url('../assets/img/btn-close-img.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.last-address{
  width: 64px;
  height: 26px;
  background-image: url('../assets/img/last-address.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.patrol{
  font-size: 12px;
  .ab-item-name{
    margin-top: 0;
    font-size: 12px;
    border: none;
  }
}
.table-head{
  margin: 0 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, .8);
  border-bottom: 1px solid rgba(63, 151, 207, .5);
  span{
    display: inline-block;
    line-height: 40px;
    text-align: center;
  }
}
.table-item{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.monitor-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 19px;
}
.monitor-item{
  width: 162px;
  height: 108px;
}
// .monitor-item:nth-child(2n){
//   margin-right: 20px;
// }
.monitor-item-img{
  width: 100%;
  height: 100%;
}
.up-btn,.down-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 26px;
}
.up-btn img,.down-btn img{
  width: 29.6px;
  height: 23.4px;
}
.img-rotate{
  transform: rotateX(180deg);
}
.eq-num-box-chart{
  display: inline-block;
  width: 104.4px;
  height: 149.4px;
}
</style>