<template>
  <div style="height: 100%;">
    <sideTran thisCrrentSys="comprehensive">
      <div slot="left" style="height: 100%;">
        <sideItem title="网络状态" :delay="100" height="46.2%">
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
                <svg class="svg-box">
                  <defs>
                    <filter id="f1" x="-100%" y="-100%" width="400%" height="400%">
                      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="4" />
                      <feBlend in="SourceGraphic" in2="blurOut" mode="multiply" />
                    </filter>
                  </defs>
                  <polyline class="line ani1" points="76,43 20,43 4,29" filter="url(#f1)" />
                  <polyline class="line ani2" points="77,43 77,54 64,65 20,65" filter="url(#f1)" />
                  <polyline class="line ani3" points="81,45 81,72 56,102 4,102" filter="url(#f1)" />
                  <polyline class="line ani4" points="86,45 86,102 85,102" filter="url(#f1)" />
                  <polyline class="line ani3" points="91,45 91,72 116,103 166,103" filter="url(#f1)" />
                  <polyline class="line ani2" points="95,43 95,54 108,65 150,65" filter="url(#f1)" />
                  <polyline class="line ani1" points="96,43 152,43 168,29" filter="url(#f1)" />
                </svg>
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
        <sideItem title="一卡通状态" :delay="200" height="23.9%">
          <div class="card-status" slot="body">
            <div class="row" v-for="(item,i) in cardList" :key="i">
              <span class="title">{{item.title}}</span>
              <span class="box" style="left:12px;">
                <span class="text">金额</span>
                <span class="value">
                  {{item.val}}
                  <i>元</i>
                </span>
              </span>
              <span class="box" style="left:-12px;">
                <span class="text">人次</span>
                <span class="value">
                  {{item.count}}
                  <i>次</i>
                </span>
              </span>
            </div>
          </div>
        </sideItem>
        <sideItem title="近十日各消费类别趋势" :delay="300" height="29.8%">
          <div class="conmuse-status" slot="body">
            <div class="chart-conm" id="conmuseChart"></div>
          </div>
        </sideItem>
      </div>
      <div slot="right" style="height: 100%;">
        <sideItem title="车辆态势" transitionType="right" :delay="100" height="24.5%">
          <div class="car-status" slot="body">
            <div class="box">
              <img class="box-car" src="../assets/compre/bg-car.png" alt />
              <img class="car1" src="../assets/compre/car1.png" alt />
              <img class="car2" src="../assets/compre/car2.png" alt />
              <img class="car3" src="../assets/compre/car3.png" alt />
              <svg class="svg-box">
                <defs>
                  <filter id="f1" x="-100%" y="-100%" width="400%" height="400%">
                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="4" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="multiply" />
                  </filter>
                </defs>
                <polyline class="ani-line" points="160,4 203,29 203,77 160,101 118,77 118,29 160,4" filter="url(#f1)" />
              </svg>
            </div>
            <div class="detail">
              <div class="item">
                <span class="value">
                  1202
                  <i>辆</i>
                </span>
                <span class="text">驶入车辆数</span>
              </div>
              <div class="item">
                <span class="value">
                  1202
                  <i>辆</i>
                </span>
                <span class="text">超速车辆数</span>
              </div>
              <div class="item">
                <span class="value">
                  7
                  <i>辆</i>
                </span>
                <span class="text">驶出车辆数</span>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="学生实时分布" transitionType="right" :delay="200" height="25.3%">
          <div slot="body" class="studentdistribution">
            <div class="box">
              <img src="../assets/pieimg/comprehensive/comprehensiveoutpie.png" class="comprehensiveoutpie" />
              <img src="../assets/pieimg/comprehensive/innercircle.png" class="innercircle" />
              <div id="studentdistribution"></div>
            </div>
            <div class="detailBox">
              <div class="row" v-for="(item,i) in stuDisList" :key="i">
                <div class="title">
                  <i :style="`border-color:${item.color};`"></i>
                  <span :style="`color:${item.color};`">{{item.name}}</span>
                </div>
                <div class="value">
                  <span>{{item.value}}</span>
                  <i>人</i>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="AI摄像机态势" transitionType="right" :delay="300" height="21.4%">
          <div slot="body" class="camera-status">
            <dir class="item">
              <img class="bg1" src="../assets/compre/bg-ai1.png" alt />
              <svg class="svg-box">
                <polyline class="ani-line1" points="20,0 52,0 70,30 52,60 20,60 0,30 20,0" />
                <polyline class="ani-line2" points="20,0 52,0 70,30 52,60 20,60 0,30 20,0" />
                <polyline class="ani-line3" points="58,2 72,25 80,25" />
                <polyline class="ani-line4" points="58,58 72,35 160,35" />
              </svg>
              <span class="value">
                122323
                <i>次</i>
              </span>
              <span class="name">总识别数量</span>
            </dir>
            <dir class="item">
              <img class="bg1" src="../assets/compre/bg-ai2.png" alt />
              <svg class="svg-box">
                <polyline class="ani-line1" points="20,0 52,0 70,30 52,60 20,60 0,30 20,0" />
                <polyline class="ani-line2" points="20,0 52,0 70,30 52,60 20,60 0,30 20,0" />
                <polyline class="ani-line3" points="58,2 72,25 80,25" />
                <polyline class="ani-line4" points="58,58 72,35 160,35" />
              </svg>
              <span class="value">
                1026
                <i>次</i>
              </span>
              <span class="name">本月识别数量</span>
            </dir>
            <dir class="item">
              <img class="bg1" src="../assets/compre/bg-ai3.png" alt />
              <svg class="svg-box">
                <polyline class="ani-line1" points="20,0 52,0 70,30 52,60 20,60 0,30 20,0" />
                <polyline class="ani-line2" points="20,0 52,0 70,30 52,60 20,60 0,30 20,0" />
                <polyline class="ani-line3" points="58,2 72,25 80,25" />
                <polyline class="ani-line4" points="58,58 72,35 160,35" />
              </svg>
              <span class="value">
                3467
                <i>次</i>
              </span>
              <span class="name">本周识别数量</span>
            </dir>
            <dir class="item">
              <img class="bg1" src="../assets/compre/bg-ai4.png" alt />
              <svg class="svg-box">
                <polyline class="ani-line1" points="20,0 52,0 70,30 52,60 20,60 0,30 20,0" />
                <polyline class="ani-line2" points="20,0 52,0 70,30 52,60 20,60 0,30 20,0" />
                <polyline class="ani-line3" points="58,2 72,25 80,25" />
                <polyline class="ani-line4" points="58,58 72,35 160,35" />
              </svg>
              <span class="value">
                1265
                <i>次</i>
              </span>
              <span class="name">今日识别数量</span>
            </dir>
          </div>
        </sideItem>
        <sideItem title="国有资产" transitionType="right" :delay="400" height="28.6%">
          <div slot="body" class="assets-Status">
            <img class="bg1" src="../assets/compre/bg-asset1.png" alt />
            <img class="bg2" src="../assets/compre/bg-asset2.png" alt />
            <div class="chart-asset" id="assetChart"></div>
          </div>
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
      cardList: [],
      stuDisList: []
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.getNetStatus();
        this.getCardStatus();
        this.getConmuseStatus();
        this.renderpie();
        this.getAssetsStatus();
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
    //获取一卡通状态
    getCardStatus() {
      this.cardList = [
        { title: '今日消费', val: 5798.62, count: 653 },
        { title: '今日充值', val: 5798.62, count: 653 },
        { title: '今日餐饮', val: 5798.62, count: 653 },
      ]
    },
    //近十日各消费类别趋势
    getConmuseStatus() {
      let dom = document.getElementById('conmuseChart');
      let chart = echarts.init(dom);
      let parma = {
        names: ['餐饮', '淋浴', '购物', '金额'],
        lineX: ['09-01', '09-02', '09-03', '09-04', '09-05', '09-06', '09-07'],
        value: [
          [251, 152, 103, 334, 95, 236, 217],
          [160, 345, 80, 192, 330, 280, 192],
          [60, 145, 280, 92, 430, 80, 92],
          [360, 245, 180, 52, 30, 180, 392],
        ]
      };
      let color = ['rgba(205,120,73', 'rgba(91,139,218', 'rgba(164,109,215', 'rgba(70,191,195']
      let lineY = []
      for (let i = 0; i < parma.names.length; i++) {
        let data = {
          name: parma.names[i],
          type: 'line',
          animationDuration: 2000,
          color: color[i] + ')',
          smooth: true,//曲线
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: color[i] + ', 0.5)'
              }, {
                offset: 0.8,
                color: color[i] + ', 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          symbol: 'circle',
          symbolSize: 0,
          data: parma.value[i]
        }
        lineY.push(data)
      }
      let option = {
        tooltip: {
          confine: true,//提示框限制在图表内
          trigger: 'axis',
          backgroundColor: 'rgba(44,62,80,0.8)',
          borderColor: 'rgba(153, 209, 246, 0.6)',
          textStyle: {
            align: 'left',
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          },
        },
        legend: {
          top: '0px',
          data: parma.names,
          icon: 'stack',
          itemWidth: 3,
          itemHeight: 6,
          textStyle: {
            fontSize: 12,
            color: 'F1F1F3'
          },
          right: '20px'
        },
        grid: {
          top: '25px',
          left: '0px',
          right: '16px',
          bottom: '0px',
          containLabel: true
        },
        xAxis: {
          show: true,
          type: 'category',
          data: parma.lineX,
          boundaryGap: false,//x轴从0开始
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(106, 176, 255, 0.4)",
              type: 'dotted',
              width: 2
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.7)',
              type: 'solid',
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(246, 250, 255, 0.8)'
            },
          }
        },
        yAxis: {
          show: true,
          type: 'value',
          splitArea: {
            show: true,
            areaStyle: {
              color: "transparent"
            }
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: 'rgba(246, 250, 255, 0.8)'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(106, 176, 255, 0.4)",
              type: 'dotted',
              width: 2
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.7)',
              type: 'solid',
              width: 2
            }
          }
        },
        series: lineY
      }
      chart.clear();//清除动画
      chart.setOption(option, true);
      // setTimeout(() => {
      //   chart.clear();//清除动画
      //   chart.setOption(option, true);
      // }, 600)
    },
    //学生实时分布
    renderpie() {
      let studentdistributionChartDom = document.getElementById('studentdistribution');
      let studentdistributionChartChart = echarts.init(studentdistributionChartDom);
      let series = [];
      this.stuDisList = [
        { "value": 30, "name": "教学楼", color: "rgba(222, 125, 255, 1)" },
        { "value": 14, "name": "图书馆", color: "rgba(250, 118, 121, 1)" },
        { "value": 26, "name": "宿舍楼", color: "rgba(53, 198, 215, 1)" },
        { "value": 20, "name": "实验楼", color: "rgba(101, 223, 138, 1)" },
        { "value": 10, "name": "餐厅/食堂", color: "rgba(253, 161, 79, 1)" },
        { "value": 10, "name": "其他位置", color: "rgba(68,165,255,1)" }
      ];
      let maxRadius = 90,
        barWidth = 5,
        barGap = 5;
      let sumValue = this.stuDisList.reduce((sum, item) => sum + item.value, 0);
      this.stuDisList.forEach((item, i) => {
        series.push({
          type: 'pie',
          animationDuration: 2000,
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [(maxRadius - i * (barGap + barWidth)) + '%', (maxRadius - (i + 1) * barWidth - i * barGap) + '%'],
          center: ["50%", "50%"],
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
              color: item.color
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
          animationDuration: 2000,
          silent: true,
          z: 0,
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [(maxRadius - i * (barGap + barWidth)) + '%', (maxRadius - (i + 1) * barWidth - i * barGap) + '%'],
          center: ["50%", "50%"],
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
      let option = {
        tooltip: {
          show: true,
          confine: true,//提示框限制在图表内
          trigger: "item",
          backgroundColor: 'rgba(44,62,80,0.8)',
          textStyle: {
            align: 'left',
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          },
        },
        legend: {
          show: false
        },
        series: series,
      }
      studentdistributionChartChart.setOption(option, true);
      setTimeout(() => {
        studentdistributionChartChart.clear();//清除动画
        studentdistributionChartChart.setOption(option, true);
      }, 800)
    },
    //国有资产
    getAssetsStatus() {
      let dom = document.getElementById('assetChart');
      let chart = echarts.init(dom);
      let parma = [
        { name: "专用资产", val: 90.11, max: 100 },
        { name: "通用资产", val: 85.23, max: 100 },
        { name: "家具资产", val: 55.03, max: 100 },
        { name: "土地房屋", val: 60.44, max: 100 },
        { name: "图书档案", val: 60.14, max: 100 },
        { name: "文物资产", val: 80.09, max: 100 },
      ]
      let option = {
        tooltip: {
          show: false,
          trigger: "item",
          confine: true,//提示框限制在图表内
          backgroundColor: 'rgba(44,62,80,0.8)',
          borderColor: 'rgba(153, 209, 246, 0.6)',
          textStyle: {
            align: 'left',
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          },
        },
        legend: {
          show: false,
        },
        animationDuration: 3000,
        radar: {
          "center": ["50%", "50%"],
          "radius": "70%",//雷达图相对于盒子的大小
          "startAngle": 120,//坐标轴方向
          "splitNumber": 5,
          "shape": "circle",
          name: {//用于提示框显示
            show: true,
            textStyle: {
              color: "transparent"
            }
          },
          "splitArea": {
            "areaStyle": {
              "color": ["transparent"]
            }
          },
          "axisLine": {
            "show": true,
            "lineStyle": {
              "color": "rgba(106, 176, 255, 1)",
              type: 'dotted',
              width: 1,
            }
          },
          "splitLine": {
            "show": true,
            "lineStyle": {
              "color": "rgba(106, 176, 255, 1)",
              type: 'dashed',
              width: 1,
            }
          },
          "indicator": parma
        },
        series: [
          {
            "name": "国有资产",
            "type": "radar",
            "symbol": "circle",
            "symbolSize": 0,
            "areaStyle": {
              "normal": {
                "color": "rgba(0, 245, 255, 0.5)"
              }
            },
            "lineStyle": {
              "normal": {
                "color": "rgba(0, 245, 255, 1)",
                "width": 2
              }
            },
            "data": [parma.map(item => item.val)],
          }, {
            type: 'pie',
            hoverAnimation: false,
            legendHoverLink: false,
            radius: ['71%', '71%'],
            center: ['50%', '50%'],
            tooltip: {
              show: false
            },
            label: {
              normal: {
                formatter: (e) => {
                  return `{per|${parma[e.dataIndex].name}}\n{hr|}\n{a|${parma[e.dataIndex].val}}{b|%}`;
                },
                padding: [0, -10],//取消hr线跟延长线之间的间隙
                rich: {
                  per: {
                    padding: [4, 0],
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '12px'
                  },
                  hr: {//设置hr是为了让中间线能够自适应长度
                    borderColor: 'rgba(106, 176, 255, 1)',
                    width: '105%',
                    borderWidth: 0.5,
                    height: 0.5,
                  },
                  a: {
                    color: '#00F5FF',
                    lineHeight: 20,
                    align: 'center'
                  },
                  b: {
                    color: 'rgba(255, 255, 255, 0.3)',
                    lineHeight: 20,
                    align: 'center'
                  },
                }
              }
            },
            labelLine: {
              show: true,
              length: 40,
              length2: 10,
              lineStyle: {
                color: 'rgba(106, 176, 255, 1)'
              },
            },
            data: Array(parma.length).fill(1),
          },
        ]
      };
      chart.setOption(option, true);
      // setTimeout(() => {
      //   chart.clear();//清除动画
      //   chart.setOption(option, true);
      // }, 600)
    }
  }
}
</script>

<style lang="less" scoped>
.network-status {
  padding: 0 14px;
  .network-status-start {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .btn-item {
      margin-top: 8px;
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
    margin-top: 10px;
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
      position: relative;
      .net-img {
        width: 172px;
      }
      .svg-box {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        .line {
          fill: none;
          stroke-width: 2;
          stroke: #6ab0ff;
          stroke-linejoin: round;
          stroke-linecap: round;
          stroke-dashoffset: 0;
        }
        .ani1{
          stroke-dasharray: 2, 76;
          animation: aniLineMove1 4s linear infinite;
        }
        .ani2{
          stroke-dasharray: 2, 70;
          animation: aniLineMove2 4s linear infinite;
        }
        .ani3{
          stroke-dasharray: 2, 116;
          animation: aniLineMove3 4s linear infinite;
        }
        .ani4{
          stroke-dasharray: 2, 56;
          animation: aniLineMove4 4s linear infinite;
        }
        @keyframes aniLineMove1 {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -78;
          }
        }
        @keyframes aniLineMove2 {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -72;
          }
        }
        @keyframes aniLineMove3 {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -118;
          }
        }
        @keyframes aniLineMove4 {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -58;
          }
        }
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
    margin-top: 10px;
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
.card-status {
  padding: 10px 14px 0;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 340px;
    height: 40px;
    background: url("../assets/compre/bg-card.png") no-repeat;
    background-size: 100% 100%;
    font-size: 12px;
    font-weight: 400;
    .title {
      position: relative;
      left: 14px;
      color: rgba(246, 250, 255, 0.8);
    }
    .box {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        color: rgba(246, 250, 255, 0.8);
        margin-right: 14px;
      }
      .value {
        color: #00f5ff;
        i {
          margin-left: 2px;
          color: rgba(246, 250, 255, 0.4);
        }
      }
    }
  }
}
.conmuse-status {
  padding: 0 14px;
  .chart-conm {
    width: 360px;
    height: 200px;
  }
}
.car-status {
  padding: 0 30px;
  .box {
    margin-top: 10px;
    width: 100%;
    position: relative;
    overflow: hidden;
    .box-car {
      width: 100%;
    }
    .car1,
    .car2,
    .car3 {
      position: absolute;
      width: 21px;
      height: 36px;
      top: calc(100%);
      z-index: 1;
    }
    .car1 {
      left: 22px;
      animation: carMove 5s infinite linear;
    }
    .car2 {
      left: calc(50% - 10.5px);
      animation: carMove 4s infinite linear;
    }
    .car3 {
      top: -36px;
      right: 22px;
      transform: rotate(180deg);
      animation: carMove_rev 5s infinite linear;
    }
    @keyframes carMove {
      0% {
        top: calc(100%);
      }
      100% {
        top: -36px;
      }
    }
    @keyframes carMove_rev {
      0% {
        top: -36px;
      }
      100% {
        top: calc(100%);
      }
    }
    .svg-box {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      .ani-line {
        fill: none;
        stroke-width: 2;
        stroke: #6ab0ff;
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-dasharray: 73, 27;
        stroke-dashoffset: 0;
        animation: lineMove 4s linear infinite;
      }
      @keyframes lineMove {
        0% {
          stroke-dashoffset: 0;
        }
        100% {
          stroke-dashoffset: 100;
        }
      }
    }
  }

  .detail {
    margin-top: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      height: 34px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .value {
        font-size: 16px;
        font-weight: bold;
        color: #00f5ff;
        i {
          margin-left: 2px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.4);
        }
      }
      .text {
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}

.studentdistribution {
  margin-top: 10px;
  padding: 0 10px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .box {
    position: relative;
    #studentdistribution {
      height: 160px;
      width: 160px;
    }
    .comprehensiveoutpie {
      position: absolute;
      width: 160px;
      left: 0;
      top: 0;
    }
    .innercircle {
      width: 24px;
      height: 26px;
      position: absolute;
      left: calc(50% - 12px);
      top: calc(50% - 13px);
    }
  }

  .detailBox {
    flex: 1;
    height: 160px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 5px;
      border-bottom: 2px dotted rgba(106, 176, 255, 0.6);
      .title {
        i {
          border: 2px solid;
          border-radius: 4px;
          display: inline-block;
          height: 5px;
          margin-right: 4px;
        }
        span {
          font-size: 14px;
        }
      }
      .value {
        span {
          font-size: 14px;
          font-weight: 400;
          color: #00f5ff;
          margin-right: 2px;
        }
        i {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}
.camera-status {
  padding: 0 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .item {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    width: 160px;
    height: 60px;
    .bg1 {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .svg-box {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      .ani-line1 {
        fill: none;
        stroke-width: 2;
        stroke: #6ab0ff;
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-dasharray: 20, 186;
        stroke-dashoffset: 40;
        animation: lineMove1 4s linear infinite;
      }
      .ani-line2 {
        fill: none;
        stroke-width: 2;
        stroke: #6ab0ff;
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-dasharray: 20, 186;
        stroke-dashoffset: 48;
        animation: lineMove2 4s linear infinite;
      }
      .ani-line3,
      .ani-line4 {
        fill: none;
        stroke-width: 2;
        stroke: #325e8c;
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-dasharray: 20, 116;
        stroke-dashoffset: 20;
        animation: lineMove3 4s linear infinite;
      }
      @keyframes lineMove1 {
        0% {
          stroke-dashoffset: 40;
          stroke: #6ab0ff;
        }
        50% {
          stroke-dashoffset: -18;
          stroke: #6ab0ff;
        }
        51% {
          stroke-dashoffset: -18;
          stroke: #325e8c;
        }
        100% {
          stroke-dashoffset: -18;
          stroke: #325e8c;
        }
      }
      @keyframes lineMove2 {
        0% {
          stroke-dashoffset: 48;
          stroke: #6ab0ff;
        }
        50% {
          stroke-dashoffset: 112;
          stroke: #6ab0ff;
        }
        51% {
          stroke-dashoffset: 112;
          stroke: #325e8c;
        }
        100% {
          stroke-dashoffset: 112;
          stroke: #325e8c;
        }
      }
      @keyframes lineMove3 {
        0% {
          stroke: #325e8c;
          stroke-dashoffset: 20;
        }
        45% {
          stroke: #325e8c;
          stroke-dashoffset: 20;
        }
        46% {
          stroke: #6ab0ff;
          stroke-dashoffset: 20;
        }
        100% {
          stroke: #6ab0ff;
          stroke-dashoffset: -116;
        }
      }
    }
    .value {
      color: #00f5ff;
      font-size: 16px;
      font-weight: bold;
      position: relative;
      top: 10px;
      i {
        margin-left: 2px;
        color: rgba(246, 250, 255, 0.4);
        font-size: 12px;
        font-weight: 400;
      }
    }
    .name {
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
.assets-Status {
  // margin-top: 10px;
  width: 100%;
  position: relative;
  .chart-asset {
    width: 380px;
    height: 180px;
  }
  .bg1 {
    width: 140px;
    height: 140px;
    position: absolute;
    left: calc(50% - 70px);
    top: calc(50% - 70px);
    animation: rotateAnim1 10s infinite linear;
  }
  .bg2 {
    width: 190px;
    height: 190px;
    position: absolute;
    left: calc(50% - 95px);
    top: calc(50% - 95px);
    animation: rotateAnim2 10s infinite linear;
  }
}
/* 旋转动画 */
@-webkit-keyframes rotateAnim1 {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes rotateAnim2 {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}
</style>