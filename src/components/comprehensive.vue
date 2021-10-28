<template>
  <div>
    <sideTran thisCrrentSys="comprehensive">
      <div slot="left">
        <sideItem title="网络状态">
          <div class="network-status" slot="body">
            <div class="network-status-start">
              <div class="btn-item" v-for="(item,index) in netList" :key="index">
                <img class="btn-icon" :src="item.icon" alt />
                <i class="line"></i>
                <div class="btn-detail">
                  <span class="btn-name">{{item.name}}</span>
                  <span class="btn-mes">
                    {{item.val}}
                    <i class="btn-unit">{{item.unit}}</i>
                  </span>
                </div>
              </div>
            </div>
            <div class="network-status-center">
              <div class="left">
                <div class="btn-net">
                  <span class="name">old·教科网</span>
                  <span class="value">
                    46.95
                    <i>Mbps</i>
                  </span>
                </div>
                <div class="btn-net pos">
                  <span class="name">新校园网移动</span>
                  <span class="value">
                    66.81
                    <i>Mbps</i>
                  </span>
                </div>
                <div class="btn-net">
                  <span class="name">老cmcc·移动</span>
                  <span class="value">
                    68.88
                    <i>Mbps</i>
                  </span>
                </div>
              </div>
              <div class="middle">
                <img class="net-img" src="../assets/compre/net.png" alt />
                <div class="btn-net">
                  <span class="name">cucc联动</span>
                  <span class="value">
                    2.88
                    <i>Mbps</i>
                  </span>
                </div>
              </div>
              <div class="right">
                <div class="btn-net">
                  <span class="name">old·电信</span>
                  <span class="value">
                    90.95
                    <i>Mbps</i>
                  </span>
                </div>
                <div class="btn-net pos">
                  <span class="name">校园网电信</span>
                  <span class="value">
                    166.81
                    <i>Mbps</i>
                  </span>
                </div>
                <div class="btn-net">
                  <span class="name">校园网电信2</span>
                  <span class="value">
                    468.88
                    <i>Mbps</i>
                  </span>
                </div>
              </div>
            </div>
            <div class="network-status-end">
              <div class="btn-net" v-for="(item,i) in netList1" :style="`background-image:url(${item.icon})`" :key="i">
                <span class="name">{{item.name}}</span>
                <span class="value">
                  {{item.val}}
                  <i>Mbps</i>
                </span>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="一卡通状态">
          <div name="body"></div>
        </sideItem>
        <sideItem title="AI摄像机态势">
          <div name="body"></div>
        </sideItem>
        <sideItem title="馆藏图书">
          <div name="body"></div>
        </sideItem>
      </div>
      <div slot="right">
        <sideItem title="车辆态势">
          <div slot="body"></div>
        </sideItem>
        <sideItem title="学生实时分布" transitionType="right" delay="1500">
          <div slot="body" class="studentdistribution">
            <img src="../assets/pieimg/comprehensive/comprehensiveoutpie.png" class="comprehensiveoutpie" />
            <img src="../assets/pieimg/comprehensive/innercircle.png" class="innercircle" />
            <div id="studentdistribution"></div>
          </div>
        </sideItem>
        <sideItem title="AI摄像机态势">
          <div slot="body"></div>
        </sideItem>
        <sideItem title="国有资产">
          <div slot="body"></div>
        </sideItem>
      </div>
    </sideTran>
  </div>
</template>

<script>
import sideTran from './sideTran'
import nowpeopleslide from './nowpeopleslide.vue'
import sideItem from './sideItem.vue'
import {
  mapGetters
} from 'vuex'
import * as echarts from 'echarts';
export default {
  components: {
    sideTran,
    sideItem
  },
  computed: {
    ...mapGetters(['currentSys'])
  },
  data() {
    return {
      netList: [],
      netList1: [],
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.getNetStatus();
        var _this = this
        // this.initcolor()
        setTimeout(function () {
          _this.renderpie()
        }, 1500);
      })
    },
    //获取网络状态数据
    getNetStatus() {
      this.netList = [
        { name: '在线人数', val: '2364', unit: '人', icon: require('../assets/compre/people-up-num.png') },
        { name: '当日累积', val: '4095', unit: '人', icon: require('../assets/compre/people-all-num.png') },
        { name: '累计上行流量', val: '1', unit: 'TB', icon: require('../assets/compre/up-flow.png') },
        { name: '累计下行流量', val: '111', unit: 'GB', icon: require('../assets/compre/down-flow.png') },
        { name: '时延', val: '4.76', unit: 'ms', icon: require('../assets/compre/time.png') },
        { name: '丢包率', val: '0.72', unit: '%', icon: require('../assets/compre/packetLoss.png') },
      ]
      this.netList1 = [
        { name: '运营商电信', val: '9.95', icon: require('../assets/compre/btn-net1.png') },
        { name: '运营商移动', val: '229.95', icon: require('../assets/compre/btn-net2.png') },
        { name: '运营商联通', val: '39.95', icon: require('../assets/compre/btn-net3.png') }
      ]
    },
    renderpie() {
      let studentdistributionChartDom, studentdistributionChartChart, option
      studentdistributionChartDom = document.getElementById('studentdistribution');
      studentdistributionChartChart = echarts.init(studentdistributionChartDom);
      let series = [];
      let pieDatas = [
        {
          "value": 30,
          "name": "教学楼"
        },
        {
          "value": 14,
          "name": "图书馆"
        },
        {
          "value": 26,
          "name": "宿舍楼"
        },
        {
          "value": 20,
          "name": "实验楼"
        },
        {
          "value": 10,
          "name": "餐厅/食堂"
        },
        {
          "value": 10,
          "name": "其他位置"
        }
      ];
      let maxRadius = 80,
        barWidth = 5,
        barGap = 5;
      let sumValue = 0;
      let showValue = true, showPercent = true;
      pieDatas.map(item => {
        sumValue += item.value;
      })
      let barColor = [
        {
          "color1": "rgba(222, 125, 255, 1)",
          "color2": ""
        },
        {
          "color1": "rgba(250, 118, 121, 1)",
          "color2": ""
        },
        {
          "color1": "rgba(53, 198, 215, 1)",
          "color2": ""
        },
        {
          "color1": "rgba(101, 223, 138, 1)",
          "color2": ""
        },
        {
          "color1": "rgba(253, 161, 79, 1)",
          "color2": ""
        },
        {
          "color1": "rgba(68,165,255,1)",
          "color2": ""
        }
      ];
      pieDatas.map((item, i) => {
        series.push({
          type: 'pie',
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [(maxRadius - i * (barGap + barWidth)) + '%', (maxRadius - (i + 1) * barWidth - i * barGap) + '%'],
          center: ["30%", "50%"],
          label: {
            show: false
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false
            },
            borderWidth: 5,
          },
          data: [{
            value: item.value,
            name: item.name,
            itemStyle: {
              color: barColor[i] && barColor[i].color1 || 'rgba(68,165,255,1)'
            }
          }, {
            value: sumValue - item.value,
            name: '',
            itemStyle: {
              color: "transparent",
            },
            tooltip: {
              show: false
            },
            hoverAnimation: false
          }]
        })
        series.push({
          name: 'blank',
          type: 'pie',
          silent: true,
          z: 0,
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [(maxRadius - i * (barGap + barWidth)) + '%', (maxRadius - (i + 1) * barWidth - i * barGap) + '%'],
          center: ["30%", "50%"],
          label: {
            show: false
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false
            },
            borderWidth: 5,
          },
          data: [{
            value: 1,
            itemStyle: {
              color: "rgba(255, 255, 255,.13)",
              borderWidth: 0
            },
            tooltip: {
              show: false
            },
            hoverAnimation: false
          }]
        });
      })
      studentdistributionChartChart.setOption({
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        legend: {
          show: false,
          left: '60%',
          top: 'middle',
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            fontSize: 16,
            color: '#fff',
          },
          formatter: (name) => {
            var datas = pieDatas;
            let total = 0;
            datas.map(item => {
              total += (item.value - 0)
            })
            let valueIndex = datas.map(item => item.name).indexOf(name);
            return name + "  " + (showValue ? datas[valueIndex].value + (option.legendValueUnit || '') + ' ' : '') + (showPercent ? ((datas[valueIndex].value / total) * 100).toFixed(2) + "%" : '');
          },
        },
        series: series,
      });

    }
  }
}
</script>

<style lang="less" scoped>
i {
  font-style: normal;
  line-height: 1;
}
span {
  display: inline-block;
  line-height: 1;
}
.network-status {
  padding: 0 14px;
  .network-status-start {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .btn-item {
      display: flex;
      align-items: center;
      background: url("../assets/compre/bg-net.png") no-repeat;
      background-size: 100%;
      padding: 4px;
      .btn-icon {
        width: 25px;
        height: 25px;
        background: rgba(106, 176, 255, 0.2);
      }
      .line {
        margin: 0 2px;
        width: 2px;
        height: 0;
        border: 1px solid #6ab0ff;
      }
      .btn-detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(106, 176, 255, 0.2);
        width: 130px;
        height: 25px;
        padding: 5px;
        box-sizing: border-box;
        .btn-name {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
        }
        .btn-mes {
          font-size: 14px;
          color: #00f5ff;
          font-weight: bold;
          display: flex;
          align-items: flex-end;
        }
        .btn-unit {
          margin-left: 2px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(246, 250, 255, 0.4);
        }
      }
    }
  }
  .network-status-center {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    .btn-net {
      width: 86px;
      height: 36px;
      background: url("../assets/compre/btn-net.png") no-repeat;
      background-size: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-weight: 400;
      font-size: 12px;

      .name {
        color: rgba(246, 250, 255, 0.8);
        margin-bottom: 2px;
      }
      .value {
        display: flex;
        align-items: flex-end;
        color: #00f5ff;
        i {
          margin-left: 2px;
          color: rgba(246, 250, 255, 0.4);
        }
      }
    }
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .pos {
        position: relative;
        left: 16px;
      }
    }
    .middle {
      display: flex;
      flex-direction: column;
      align-items: center;
      .net-img {
        width: 172px;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .pos {
        position: relative;
        right: 16px;
      }
    }
  }
  .network-status-end {
    margin-top: 8px;
		padding-top: 4px;
    display: flex;
    justify-content: space-between;
    .btn-net {
      width: 112px;
      height: 44px;
      background-repeat: no-repeat;
      background-size: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-end;
      font-weight: 400;
      font-size: 12px;

      .name {
        color: #fff;
        position: relative;
        right: 8px;
        top: -10px;
      }
      .value {
        display: flex;
        align-items: flex-end;
        color: #00f5ff;
        position: relative;
        right: 7px;
        bottom: 5px;
        i {
          color: rgba(246, 250, 255, 0.4);
        }
      }
    }
  }
}

.studentdistribution {
  height: 200px;
  width: 380px;
  position: relative;
}
#studentdistribution {
  height: 200px;
  width: 330px;
  position: absolute;
  left: 0px;
}
.comprehensiveoutpie {
  position: absolute;
  width: 186px;
  left: 6px;
  top: 7px;
}
.innercircle {
  position: absolute;
  left: 23%;
  top: 43%;
}
</style>