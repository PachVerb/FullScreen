/* 能耗态势 */
<template>
  <div class="energy">
    <sideTran thisCrrentSys="energyUsage">
      <div slot="left">
        <sideItem title="用电设备统计" delay="100">
          <div class="deviceStati" slot="body">
            <currency v-for="(item,i) in statiList" :key="i" :boxnum="item.count" :boxtitle="item.type" :boxcolor="item.color" boxuntil="个"></currency>
          </div>
        </sideItem>
        <sideItem title="用电概况" delay="200">
          <div class="survey" slot="body">
            <div class="l">
              <img class="bg" src="../assets/img/frameA.png" alt />
              <div class="title">用电概况 | 今年</div>
              <div class="row">
                <div class="total">
                  <animated-number class="num" :value="9686" :formatValue="val=>val.toFixed()" :duration="4000" />
                  <i class="unit">KWh</i>
                </div>
                <div class="percent">
                  <span class="text">比去年</span>
                  <img class="arrow" src="../assets/img/arrow-down.png" alt />
                  <i class="perc">
                    <animated-number :value="42" :formatValue="val=>val.toFixed()" :duration="4000" />%
                  </i>
                </div>
              </div>
              <div class="row">
                <div class="item" style="margin-right:10px;">
                  <span class="text">日均：</span>
                  <animated-number class="num" :value="86" :formatValue="val=>val.toFixed()" :duration="4000" />
                  <i class="unit">KWh</i>
                </div>
                <div class="item">
                  <span class="text">月均：</span>
                  <animated-number class="num" :value="256" :formatValue="val=>val.toFixed()" :duration="4000" />
                  <i class="unit">KWh</i>
                </div>
              </div>
              <div class="row" style="justify-content:space-around;">
                <div class="group">
                  <div id="dayPerc" class="chart-survey"></div>
                  <!-- <img src="../assets/img/survey.png" alt /> -->
                  <div class="perBox">
                    <div class="percent">
                      <img class="arrow" src="../assets/img/arrow-down.png" alt />
                      <i class="perc">
                        <animated-number :value="16.5" :formatValue="val=>val.toFixed(1)" :duration="4000" />%
                      </i>
                    </div>
                    <span class="text">日均同比</span>
                  </div>
                </div>
                <div class="group">
                  <div id="monthPerc" class="chart-survey"></div>
                  <!-- <img src="../assets/img/survey.png" alt /> -->
                  <div class="perBox">
                    <div class="percent">
                      <img class="arrow" src="../assets/img/arrow-up.png" alt />
                      <i class="perc red">
                        <animated-number :value="25" :formatValue="val=>val.toFixed(1)" :duration="4000" />%
                      </i>
                    </div>
                    <span class="text">月均同比</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="r">
              <div class="group">
                <img class="bg" src="../assets/img/frameB.png" alt />
                <div class="title">用电概况 | 今月</div>
                <div class="total">
                  <animated-number class="num" :value="168.62" :formatValue="val=>val.toFixed(2)" :duration="4000" />
                  <i class="unit">KWh</i>
                </div>
                <div class="percent">
                  <span class="text">比去年</span>
                  <img class="arrow" src="../assets/img/arrow-down.png" alt />
                  <i class="perc">
                    <animated-number :value="42" :formatValue="val=>val.toFixed()" :duration="4000" />%
                  </i>
                </div>
              </div>
              <div class="group">
                <img class="bg" src="../assets/img/frameB.png" alt />
                <div class="title">用电概况 | 今日</div>
                <div class="total">
                  <animated-number class="num" :value="12.56" :formatValue="val=>val.toFixed(2)" :duration="4000" />
                  <i class="unit">KWh</i>
                </div>
                <div class="percent">
                  <span class="text">比去年</span>
                  <img class="arrow" src="../assets/img/arrow-down.png" alt />
                  <i class="perc">
                    <animated-number :value="42" :formatValue="val=>val.toFixed()" :duration="4000" />%
                  </i>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="设备用电占比" delay="300">
          <div class="ratio" slot="body">
            <div class="chartBox">
              <img src="../assets/pieimg/fire/firearc.png" class="bg-ratio-animImg" />
              <img src="../assets/pieimg/fire/fireleftgear.png" class="bg-ratio" />
              <div class="chart-ratio" id="ratioChart"></div>
            </div>
            <div class="detailBox">
              <div class="row" v-for="(item,i) in ratioList" :key="i">
                <div class="title">
                  <i :style="`border-color:${item.color};`"></i><span :style="`color:${item.color};`">{{item.name}}</span>
                </div>
                <div class="value">
                  <animated-number :value="item.val/ratioWaterTotal*100" :formatValue="val=>val.toFixed()" :duration="4000" /><i>%</i>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="用电趋势分析" delay="400">
          <div class="trendAnalysis" slot="body">
            <div class="checkBox">
              <div :class="trendKey==0?'btn checked':'btn'" @click="getTrendAnalyData(0)">近一周</div>
              <div :class="trendKey==1?'btn checked':'btn'" @click="getTrendAnalyData(1)">近一月</div>
              <div :class="trendKey==2?'btn checked':'btn'" @click="getTrendAnalyData(2)">近一年</div>
            </div>
            <div class="chart-trend" id="trendChart"></div>
          </div>
        </sideItem>
      </div>
      <div slot="right">
        <sideItem title="用水设备统计" transitionType="right" delay="200">
          <div class="deviceStati water" slot="body">
            <currency v-for="(item,i) in statiList" :key="i" :boxnum="item.count" :boxtitle="item.type" :boxcolor="item.color" boxuntil="个"></currency>
          </div>
        </sideItem>
        <sideItem title="用水概况" transitionType="right" delay="400">
          <div class="survey water" slot="body">
            <div class="l">
              <img class="bg" src="../assets/img/frameA.png" alt />
              <div class="title">用水概况 | 今年</div>
              <div class="row">
                <div class="total">
                  <animated-number class="num" :value="9686" :formatValue="val=>val.toFixed()" :duration="4000" />
                  <i class="unit">㎡</i>
                </div>
                <div class="percent">
                  <span class="text">比去年</span>
                  <img class="arrow" src="../assets/img/arrow-down.png" alt />
                  <i class="perc">
                    <animated-number :value="42" :formatValue="val=>val.toFixed()" :duration="4000" />%
                  </i>
                </div>
              </div>
              <div class="row">
                <div class="item" style="margin-right:10px;">
                  <span class="text">日均：</span>
                  <animated-number class="num" :value="86" :formatValue="val=>val.toFixed()" :duration="4000" />
                  <i class="unit">㎡</i>
                </div>
                <div class="item">
                  <span class="text">月均：</span>
                  <animated-number class="num" :value="256" :formatValue="val=>val.toFixed()" :duration="4000" />
                  <i class="unit">㎡</i>
                </div>
              </div>
              <div class="row" style="justify-content:space-around;">
                <div class="group">
                  <div id="dayPerc_water" class="chart-survey"></div>
                  <!-- <img src="../assets/img/survey.png" alt /> -->
                  <div class="perBox">
                    <div class="percent">
                      <img class="arrow" src="../assets/img/arrow-down.png" alt />
                      <i class="perc">
                        <animated-number :value="16.5" :formatValue="val=>val.toFixed(1)" :duration="4000" />%
                      </i>
                    </div>
                    <span class="text">日均同比</span>
                  </div>
                </div>
                <div class="group">
                  <div id="monthPerc_water" class="chart-survey"></div>
                  <!-- <img src="../assets/img/survey.png" alt /> -->
                  <div class="perBox">
                    <div class="percent">
                      <img class="arrow" src="../assets/img/arrow-up.png" alt />
                      <i class="perc red">
                        <animated-number :value="25" :formatValue="val=>val.toFixed(1)" :duration="4000" />%
                      </i>
                    </div>
                    <span class="text">月均同比</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="r">
              <div class="group">
                <img class="bg" src="../assets/img/frameB.png" alt />
                <div class="title">用水概况 | 今月</div>
                <div class="total">
                  <animated-number class="num" :value="168.62" :formatValue="val=>val.toFixed(2)" :duration="4000" />
                  <i class="unit">㎡</i>
                </div>
                <div class="percent">
                  <span class="text">比去年</span>
                  <img class="arrow" src="../assets/img/arrow-down.png" alt />
                  <i class="perc">
                    <animated-number :value="42" :formatValue="val=>val.toFixed()" :duration="4000" />%
                  </i>
                </div>
              </div>
              <div class="group">
                <img class="bg" src="../assets/img/frameB.png" alt />
                <div class="title">用水概况 | 今日</div>
                <div class="total">
                  <animated-number class="num" :value="12.56" :formatValue="val=>val.toFixed(2)" :duration="4000" />
                  <i class="unit">㎡</i>
                </div>
                <div class="percent">
                  <span class="text">比去年</span>
                  <img class="arrow" src="../assets/img/arrow-down.png" alt />
                  <i class="perc">
                    <animated-number :value="42" :formatValue="val=>val.toFixed()" :duration="4000" />%
                  </i>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="设备用水占比" transitionType="right" delay="600">
           <div class="ratio water" slot="body">
            <div class="chartBox">
              <img src="../assets/pieimg/fire/firearc.png" class="bg-ratio-animImg" />
              <img src="../assets/pieimg/fire/fireleftgear.png" class="bg-ratio" />
              <div class="chart-ratio" id="ratioChart_water"></div>
            </div>
            <div class="detailBox">
              <div class="row" v-for="(item,i) in ratioWaterList" :key="i">
                <div class="title">
                  <i :style="`border-color:${item.color};`"></i><span :style="`color:${item.color};`">{{item.name}}</span>
                </div>
                <div class="value">
                  <animated-number :value="item.val/ratioWaterTotal*100" :formatValue="val=>val.toFixed()" :duration="4000" />
                  <i>%</i>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="用水趋势分析" transitionType="right" delay="800">
          <div class="trendAnalysis water" slot="body">
            <div class="checkBox">
              <div :class="trendWaterKey==0?'btn checked':'btn'" @click="getTrendAnalyWaterData(0)">近一周</div>
              <div :class="trendWaterKey==1?'btn checked':'btn'" @click="getTrendAnalyWaterData(1)">近一月</div>
              <div :class="trendWaterKey==2?'btn checked':'btn'" @click="getTrendAnalyWaterData(2)">近一年</div>
            </div>
            <div class="chart-trend" id="trendChart_water"></div>
          </div>
        </sideItem>
      </div>
    </sideTran>
  </div>
</template>

<script>
import sideTran from './sideTran'
import sideItem from './sideItem.vue'
import currency from './currency'//通用box组件
import { mapGetters } from 'vuex'
import * as echarts from 'echarts';
import AnimatedNumber from "animated-number-vue";
export default {
  components: {
    AnimatedNumber,
    sideTran,
    sideItem,
    currency
  },
  data() {
    return {
      statiList: [],//设备统计
      trendKey: 2,
      trendWaterKey: 2,
      ratioList:[],
      ratioWaterList:[],
    }
  },
  computed: {
    ...mapGetters(['currentSys']),
    ratioTotal(){
      return this.ratioList.reduce((sum,item)=>sum+item.val,0);
    },
    ratioWaterTotal(){
      return this.ratioWaterList.reduce((sum,item)=>sum+item.val,0);
    },
  },
  watch: {},
  mounted() { },
  methods: {
    //初始化
    init() {
      this.$nextTick(() => {
        this.getDeviceStatiList();
        this.getSurveyData();
        this.getSurveyWaterData();
        this.getTrendAnalyData(2);
        this.getTrendAnalyWaterData(2);
        this.getRatioData();
        this.getRatioWaterData();
        // setTimeout(() => {
        // }, 1400)
      })
    },
    //获取设备统计列表
    getDeviceStatiList() {
      this.statiList = [
        { type: '设备总数', count: 2349, color: '#00F5FF' },
        { type: '异常设备数', count: 86, color: '#F2896B' },
        { type: '超出使用设备数', count: 45, color: '#DBBB8A' },
        { type: '超出使用总量', count: 298, color: '#A488EF' },
      ]
    },

    //获取用水概况数据
    getSurveyWaterData() {
      //初始化用水概况图表
      this.loadSurveyCharts('dayPerc_water', {});
      this.loadSurveyCharts('monthPerc_water', {});
    },
    //获取用电概况数据
    getSurveyData() {
      //初始化用电概况图表
      this.loadSurveyCharts('dayPerc', {});
      this.loadSurveyCharts('monthPerc', {});
    },
    //加载用电概况图表
    loadSurveyCharts(id, data) {
      let dom = document.getElementById(id);
      let chart = echarts.init(dom);
      let option = {
        animationEasing: 'cubicInout',
        animationDuration: 4000,
        series: [{
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 100,
          radius: '100%',
          splitNumber: 4,
          itemStyle: {//指针样式
            color: '#4EB78C',
          },
          pointer: {//指针
            length: '74%',
            width: 2,
            offsetCenter: [0, '5%']
          },
          axisLine: {//轴线
            show: true,
            roundCap: true,
            lineStyle: {
              width: 8,
              color: [[0.3, '#6AB0FF'], [0.7, '#4EB78C'], [1, '#F2896B']],
            }
          },
          axisTick: {//轴线刻度
            show: true,
            distance: 0,
            length: 2,
          },
          splitLine: {//分割段数,每段大刻度
            distance: 0,
            length: 4,
            lineStyle: {
              width: 1,
              color: '#479aef'
            }
          },
          axisLabel: {//刻度标签
            show: false,
            color: '#fff',
            fontSize: '10px',
          },
          title: {//标题
            show: false
          },
          detail: { show: false },
          data: [{
            value: 0
          }]
        }],
      };
      chart.setOption(option, true);
      setTimeout(() => {
        chart.clear();//清除动画
        option.series[0].data = [{ value: 75 }];
        chart.setOption(option, true);
      }, 600)
    },
    //获取用电趋势分析
    getTrendAnalyData(index) {
      this.trendKey = index;
      let charts = {};
      if (index == 0) {
        charts = {
          unit: '单位(KWh)',
          lineX: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          value: [
            [251, 152, 103, 334, 95, 236, 217],
            [160, 345, 80, 192, 330, 280, 192]
          ]
        }
      } else if (index == 1) {
        charts = {
          unit: '单位(KWh)',
          lineX: ['1号', '4号', '7号', '10号', '13号', '16号', '18号', '21号', '24号', '27号', '30号'],
          value: [
            [151, 352, 303, 534, 95, 236, 217, 328, 159, 151, 31],
            [160, 545, 80, 192, 330, 580, 192, 80, 250, 253, 52]
          ]
        }
      } else if (index == 2) {
        charts = {
          unit: '单位(KWh)',
          lineX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          value: [
            [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 392],
            [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28]
          ]
        }
      }

      this.loadTrendAnalyCharts('trendChart', charts)
    },
    //加载用电趋势分析图表
    loadTrendAnalyCharts(id, data) {
      let dom = document.getElementById(id);
      let chart = echarts.init(dom);
      let parma = {
        names: ['总量', '超出'],
        ...data
      };
      let color = ['rgba(205, 173, 62', 'rgba(93, 255, 255']
      let lineY = []
      for (let i = 0; i < parma.names.length; i++) {
        let data = {
          name: parma.names[i],
          type: 'line',
          animationDuration: 2000,
          color: color[i] + ')',
          smooth: false,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: color[i] + ', 0.3)'
              }, {
                offset: 0.8,
                color: color[i] + ', 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          symbol: 'circle',
          symbolSize: 5,
          data: parma.value[i]
        }
        lineY.push(data)
      }
      let option = {
        tooltip: {
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
          textStyle: {
            fontSize: 12,
            color: 'F1F1F3'
          },
          right: '20px'
        },
        grid: {
          top: '30px',
          left: '0px',
          right: '14px',
          bottom: '0px',
          containLabel: true
        },
        xAxis: {
          show: true,
          type: 'category',
          boundaryGap: false,
          data: parma.lineX,
          axisLabel: {
            textStyle: {
              color: 'rgb(0,253,255,0.6)'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgb(0,253,255,0.6)'
            }
          }
        },
        yAxis: {
          show: true,
          splitArea: {
            show: true,
            areaStyle: {
              color: "transparent"
            }
          },
          name: parma.unit,
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: 'rgb(0,253,255,0.6)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgb(23,255,243,0.3)'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgb(0,253,255,0.6)'
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
    //获取用水趋势分析
    getTrendAnalyWaterData(index) {
      this.trendWaterKey = index;
      let charts = {};
      if (index == 0) {
        charts = {
          unit: '单位(㎡)',
          lineX: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          value: [
            [251, 152, 103, 334, 95, 236, 217],
            [160, 345, 80, 192, 330, 280, 192]
          ]
        }
      } else if (index == 1) {
        charts = {
          unit: '单位(㎡)',
          lineX: ['1号', '4号', '7号', '10号', '13号', '16号', '18号', '21号', '24号', '27号', '30号'],
          value: [
            [151, 352, 303, 534, 95, 236, 217, 328, 159, 151, 31],
            [160, 545, 80, 192, 330, 580, 192, 80, 250, 253, 52]
          ]
        }
      } else if (index == 2) {
        charts = {
          unit: '单位(㎡)',
          lineX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          value: [
            [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 392],
            [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28]
          ]
        }
      }

      this.loadTrendAnalyCharts('trendChart_water', charts)
    },
    //获取设备用电占比
    getRatioData() {
      this.ratioList = [
        {name:"照明",val:1100,color:'rgba(169,133,238,0.8)'},
        {name:"空调",val:444,color:'rgba(196,144,191,0.8)'},
        {name:"机房",val:501,color:'rgba(19,181,177,0.8)'},
        {name:"应急通道",val:300,color:'rgba(229,188,128,0.8)'}
      ]
      let dom = document.getElementById('ratioChart');
      let chart = echarts.init(dom);
      let total = this.ratioList.reduce((sum,item)=>sum+item.val,0);
      let list = []

      for (let i in this.ratioList) {
        list.push({
          value: this.ratioList[i].val,
          name: this.ratioList[i].name,
          itemStyle: {
            normal: {
              borderWidth: 5,
              shadowBlur: 20,
              borderColor: this.ratioList[i].color,
              shadowColor: this.ratioList[i].color,
            }
          }
        }, {
          value: total / 30,
          name: '',
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0
            }
          }
        })
      }
      
      let option = {
        tooltip: {
          show: false
        },
        series: [
          {
            name: '',
            type: 'pie',
            clockWise: false,
            startAngle: '90',
            center: ['50%', '50%'],
            radius: ['80%', '81%'],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            data: list,
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return idx * 550;
            }
          },
          {
            name: '',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['70%', '70%'], //设置饼状图的宽高
            itemStyle: {
              color: 'transparant'
            },
            startAngle: '90',
            data: [{
              value: total,
              name: '',
              label: {
                normal: {
                  show: true,
                  formatter: '{c|设备}' + '\n' + '{c|用电占比}',
                  rich: {
                    c: {
                      color: 'rgba(255, 255, 255, .8)',
                      fontSize: 14,
                      lineHeight: 20
                    }
                  },
                  position: 'center'
                }
              }
            }]
          }
        ]
      }
      chart.setOption(option, true);
    },
    //获取设备用水占比
    getRatioWaterData(){
      this.ratioWaterList = [
        {name:"生活用水",val:1100,color:'rgba(169,133,238,0.8)'},
        {name:"浇灌用水",val:444,color:'rgba(196,144,191,0.8)'},
        {name:"其他",val:501,color:'rgba(19,181,177,0.8)'},
      ]
      let dom = document.getElementById('ratioChart_water');
      let chart = echarts.init(dom);
      let total = this.ratioWaterList.reduce((sum,item)=>sum+item.val,0);
      let list = []

      for (let i in this.ratioWaterList) {
        list.push({
          value: this.ratioWaterList[i].val,
          name: this.ratioWaterList[i].name,
          itemStyle: {
            normal: {
              borderWidth: 5,
              shadowBlur: 20,
              borderColor: this.ratioWaterList[i].color,
              shadowColor: this.ratioWaterList[i].color,
            }
          }
        }, {
          value: total / 30,
          name: '',
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0
            }
          }
        })
      }
      
      let option = {
        tooltip: {
          show: false
        },
        series: [
          {
            name: '',
            type: 'pie',
            clockWise: false,
            startAngle: '90',
            center: ['50%', '50%'],
            radius: ['80%', '81%'],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            data: list,
          },
          {
            name: '',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['70%', '70%'], //设置饼状图的宽高
            itemStyle: {
              color: 'transparant'
            },
            startAngle: '90',
            data: [{
              value: total,
              name: '',
              label: {
                normal: {
                  show: true,
                  formatter: '{c|设备}' + '\n' + '{c|用水占比}',
                  rich: {
                    c: {
                      color: 'rgba(255, 255, 255, .8)',
                      fontSize: 14,
                      lineHeight: 20
                    }
                  },
                  position: 'center'
                }
              }
            }]
          }
        ]
      }
      chart.setOption(option, true);
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
.energy {
  color: #f6faff;
  .deviceStati {
		// min-height: 124px;
    padding: 0 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  .survey {
		// min-height: 180px;
    padding: 10px 16px 0;
    display: flex;
    .l {
      position: relative;
      width: 220px;
      padding: 0 10px;
      box-sizing: border-box;
      z-index: 1;
      .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        z-index: -1;
      }
      .title {
        text-align: left;
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
        line-height: 2.5;
      }
      .row {
        padding: 5px 0;
        display: flex;
        align-items: flex-end;
        .total {
          display: flex;
          align-items: flex-end;
        }
        .num {
          font-size: 22px;
          font-weight: bold;
          color: #00f5ff;
          line-height: 0.8;
          margin-right: 4px;
        }
        .unit {
          font-size: 12px;
          font-weight: 400;
          color: rgba(246, 250, 255, 0.3);
        }
        .percent {
          margin-left: 16px;
          display: flex;
          align-items: flex-end;
        }
        .text {
          white-space: nowrap;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
        }
        .arrow {
          margin: 0 2px;
          width: 8px;
          height: 12px;
        }
        .perc {
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 224, 79, 0.8);
        }
        .red {
          color: rgba(242, 137, 107, 0.8);
        }
        .item {
          display: flex;
          align-items: flex-end;
          .num {
            font-size: 18px;
          }
        }
        .group {
          position: relative;
          height: 80px;
          .chart-survey {
            width: 74px;
            height: 74px;
            // width: 100px;
            // height: 100px;
          }
          .perBox {
            position: absolute;
            top: 50%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .percent {
            margin: 8px 0;
          }
        }
      }
    }
    .r {
      margin-left: 10px;
      width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .group {
        width: 100%;
        padding: 0 10px 8px;
        position: relative;
        z-index: 1;
        .bg {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          z-index: -1;
        }
        .title {
          text-align: left;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          line-height: 2.5;
        }
        .total {
          padding: 0 0 10px;
          display: flex;
          align-items: flex-end;
          .num {
            font-size: 22px;
            font-weight: bold;
            color: #00f5ff;
            line-height: 0.8;
            margin-right: 4px;
          }
          .unit {
            font-size: 12px;
            font-weight: 400;
            color: rgba(246, 250, 255, 0.3);
          }
        }

        .percent {
          display: flex;
          align-items: flex-end;
          .text {
            font-size: 12px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.8);
          }
          .arrow {
            margin: 0 2px;
            width: 8px;
            height: 12px;
          }
          .perc {
            font-size: 12px;
            font-weight: 400;
            color: rgba(0, 224, 79, 0.8);
          }
        }
      }
    }
  }
  .trendAnalysis {
		// min-height: 130px;
    position: relative;
    padding: 10px 16px 0;
    .checkBox {
      position: absolute;
      right: 16px;
      top: -20px;
      display: flex;
      align-items: center;
      .btn {
        width: 48px;
        line-height: 22px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.6);
        background: url(../assets/img/btn.png) no-repeat 100%;
        margin: 0 4px;
        cursor: pointer;
      }
      .checked {
        color: #00f5ff;
        background: url(../assets/img/btn-check.png) no-repeat 100%;
      }
    }
    .chart-trend {
      width: 340px;
      height: 150px;
    }
  }
  .ratio {
    // min-height: 140px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .chartBox {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .bg-ratio-animImg {
        width: 160px;
        height: 160px;
        position: absolute;
        left: calc(50% - 80px);
        top: calc(50% - 80px);
        animation: myMove 5s; //外圈旋转动画
        -webkit-animation: myMove 5s infinite linear;
      }
      .bg-ratio {
        width: 110px;
        height: 110px;
        position: absolute;
        left: calc(50% - 55px);
        top: calc(50% - 55px);
      }
      .chart-ratio {
        width: 150px;
        height: 150px;
      }
    }
    .detailBox {
      flex: 1;
      height: 100%;
      margin-left: 34px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .row{
         display: flex;
         justify-content: space-between;
         align-items: center;
         padding-bottom: 5px;
         border-bottom: 2px dotted rgba(106, 176, 255, 0.6);
         .title{
           i{
             border: 2px solid;
             border-radius: 4px;
             display: inline-block;
              height: 5px;
              margin-right: 4px;
           }
           span{
             font-size: 14px;
           }
         }
         .value{
           span{
              font-size: 14px;
              font-weight: 400;
              color: #00F5FF;
              margin-right: 2px;
           }
           i{
              font-size: 12px;
              font-weight: 400;
              color: rgba(255, 255, 255, 0.5);
           }
         }
      }
    }
  }

  /* 外圈旋转动画 */
  @-webkit-keyframes myMove {
    /**关键帧名称**/
    0% {
      -webkit-transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
    }
  }
}
</style>