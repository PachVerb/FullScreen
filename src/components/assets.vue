<template>
  <div style="height: 100%;">
    <sideTran thisCrrentSys="assets">
      <div slot="left" style="height: 100%;">
        <nowpeopleslide title="学校资产统计" :delay="500" height="20%">
          <div slot='body' style="width: 100%;">
						<div class="flopbox">
							<p class="flopboxtitle">资产总数</p>
							<flop :num="num" :unitil="'套'"></flop>
						</div>
						<div class="flopbox">
							<p class="flopboxtitle">资产价值</p>
							<flop :num="numtow" :unitil="'万元'"></flop>
						</div>
					</div>
        </nowpeopleslide>
        <sideItem title="各学院资产总数统计" :delay="1000" height="40%">
          <div slot='body' class="chart-wrap">
            <div id="totalAssets"></div>
          </div>
        </sideItem>
        <sideItem title="学校资产总额统计" :delay="1500" height="40%">
          <div slot='body' class="chart-wrap">
            <div id="allTotalAssets"></div>
          </div>
        </sideItem>
      </div>
      <div slot="right" style="height: 100%;">
        <sideItem title="网站安全统计" :transitionType="'right'" :delay="500" height="45%">
          <div slot='body' class="websafe chart-wrap">
            <div id="webSecurity"></div>
          </div>
        </sideItem>
        <sideItem title="服务器安全分析" :transitionType="'right'" :delay="1000" height="55%">
          <div slot='body' class="serversafebox-wrap">
            <div class="serversafebox" >
              <img src="../assets/pieimg/assets/assetsarc.png" class="assetsarc">
              <img src="../assets/pieimg/assets/assetsinner.png" class="assetsinner">
              <div id="serverSecurity"></div>
            </div>
            <div class="detailBox">
							<div class="row" v-for="(item,i) in ratioList" :key="i">
                <div class="title">
                  <i :style="`border-color:${item.color};`"></i><span :style="`color:${item.color};`">{{item.name}}</span>
                </div>
                <div class="value">
                  <animated-number :value="item.val/ratioAbTotal*100" :formatValue="val=>val.toFixed()" :duration="4000" /><i>%</i>
                </div>
              </div>
						</div>
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
import nowpeopleslide from '@/components/nowpeopleslide.vue'
import flop from '@/components/commonComponent/flop.vue'
import AnimatedNumber from "animated-number-vue";
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
    sideItem,
    nowpeopleslide,
    flop,
    AnimatedNumber
  },
  data(){
    return {
      ratioList:[],
      totalAssetsOption: {
        tooltip: {
          // trigger: 'axis',
          backgroundColor: 'rgba(44,62,80,0.8)',
          borderColor: 'rgba(153, 209, 246, 0.6)',
          textStyle: {
            align: 'left',
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          },
        },
        grid: { 
          top: '10px',
          left: '100px',  
          right: '30px', 
          bottom: '30px', 
        },
        xAxis: { 
          type: 'value',
          axisTick: {
             show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#F6FAFF',
            fontSize: 10
          },
          axisLine: {
            lineStyle: {
              color: '#6AB0FF'
            }
          }
        },
        yAxis: { 
          type: 'category',
          axisTick: {
             show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            fontSize: 10,
            formatter: function (value) {
              return value
            },
            color: '#F6FAFF'
          },
          data: ['管理学院','通信与信息工程学院','计算机学院','人文社科学院','体育学院','电子工程学院','中文学院','美术学院','音乐学院']
        },
        series: [
          {
            type: 'bar',
            barWidth: '5px',
            animationDuration: 2500,
            data: [177,139,186,148,119,132,75,119,95],
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,       //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                        [
                            {offset: 0, color: '#6AB0FF'},
                            // {offset: 0.5, color: '#5172FF'},
                            {offset: 1, color: '#5172FF'}
                        ]                //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                    ),
                    barBorderRadius: [15,15,15,15]
                }
            },
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            },
            label: {
              show: true,
              precision: 1,
              position: 'right',
              valueAnimation: true,
              fontFamily: 'monospace',
              color: '#F6FAFF'
            }
          }
        ]
      },
      allTotalAssetsOption: {
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
        grid: { 
          top: '20px',
          left: '40px',  
          right: '30px', 
          bottom: '30px', 
        },
        xAxis: {
          type: 'category',
          data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
          axisLine: {
            lineStyle: {
              color: '#6AB0FF'
            }
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgb(20,46,74)'
            }
          },
          axisLabel: {
            show: true,
            fontSize: 10,
            formatter: function (value) {
              return value
            },
            color: '#F6FAFF'
          },
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#6AB0FF'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgb(20,46,74)'
            }
          },
          axisLabel: {
            show: true,
            fontSize: 10,
            formatter: function (value) {
              return value
            },
            color: '#F6FAFF'
          },
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
            animationDuration: 2500,
            symbol: 'circle',
            itemStyle:{
              normal:{
                color:'rgb(106,176,255)', //折点颜色
                lineStyle:{
                  color:'rgb(106,176,255)' //折线颜色
                }
              }
                
            }
          }
        ]
      },
      serverSecurityOption: {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(44,62,80,0.8)',
          borderColor: 'rgba(153, 209, 246, 0.6)',
          textStyle: {
            align: 'left',
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          },
        },
        // legend: {
        //   top: '5%',
        //   left: 'center'
        // },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            animationDuration: 2500,
            radius: ['90%', '100%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      },
      num: 12345,
      numtow: 67898,
      unitil: "人",
    }
  },
  computed: {
    ...mapGetters(['currentSys']),
    ratioAbTotal(){
      return this.ratioList.reduce((sum,item)=>sum+item.val,0);
    },
  },
  watch: {

  },
  mounted(){
    console.log('assets')
    
  },
  methods: {
    init(){
      this.$nextTick(() => {
        setTimeout(() => {
          totalAssetsChartDom = document.getElementById('totalAssets');
          totalAssetsChart = echarts.init(totalAssetsChartDom);
          totalAssetsChart.setOption(this.totalAssetsOption)
        },1500)
        setTimeout(() => {
          allTotalAssetschartDom = document.getElementById('allTotalAssets');
          allTotalAssetsChart = echarts.init(allTotalAssetschartDom);
          allTotalAssetsChart.setOption(this.allTotalAssetsOption)
        },2000)
        setTimeout(() => {
          webSecurityChartDom = document.getElementById('webSecurity');
          webSecurityChart = echarts.init(webSecurityChartDom);
          webSecurityChart.setOption(this.getEcharts3DBar(['z','x'], [20,98], '01'))
          this.ratioList = [
            {name:"照明",val:1100,color:'rgba(169,133,238,0.8)'},
            {name:"空调",val:444,color:'rgba(196,144,191,0.8)'},
            {name:"机房",val:501,color:'rgba(19,181,177,0.8)'},
            {name:"应急通道",val:300,color:'rgba(229,188,128,0.8)'}
          ]
        },1500)
        setTimeout(() => {
          serverSecurityChartDom = document.getElementById('serverSecurity');
          serverSecurityChart = echarts.init(serverSecurityChartDom);
          serverSecurityChart.setOption(this.serverSecurityOption)   
          window.addEventListener("resize", function() {  
            allTotalAssetsChart.resize()
            totalAssetsChart.resize()  
            webSecurityChart.resize()            
            serverSecurityChart.resize();           
          })
        },2000)
        // this.myChart2.setOption(this.getEcharts3DBar(['z'], [20], '01'))
      })
    },
    getEcharts3DBar (xAxisData, data, colorType) {
      var colorArr = [];
      if (colorType == '01') {
          colorArr = ["#5783FF", "#68ABF7", "#68ABF7"];
      } else {
          colorArr = ["#28c1c6", "#50dac0", "#87e8c7"];
      }
      var color = {
          type: "linear",
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [
              {
              offset: 0,
              color: colorArr[0],
              },
              {
              offset: 0.5,
              color: colorArr[0],
              },
              {
              offset: 0.5,
              color: colorArr[1],
              },
              {
              offset: 1,
              color: colorArr[1],
              },
          ],
      };
      var barWidth = 30;
      var constData = [];
      var showData = [];
      data.filter(function (item) {
      if (item) {
          constData.push(1);
          showData.push(item);
      } else {
          constData.push(0);
          showData.push(
          {
              value: 1,
              itemStyle: {
                normal: {
                  borderColor: "rgba(0,0,0,0)",
                  borderWidth: 2,
                  color: "rgba(0,0,0,0)",
                },
              },
          }
          );
      }
      });
      return {
          tooltip: {
              trigger: "axis",
              backgroundColor: 'rgba(44,62,80,0.8)',
              borderColor: 'rgba(153, 209, 246, 0.6)',
              textStyle: {
                align: 'left',
                fontSize: 12,
                color: 'rgba(255,255,255,0.8)',
              },
              formatter: function (params) {
              var str = params[0].axisValue + "：";
              params.filter(function (item) {
                  if (item.componentSubType == "bar") {
                  str += "<br/>" + item.seriesName + "：" + item.value;
                  }
              });
              return str;
              },
          },
          grid: {
              left: "3%", //图表距边框的距离
              right: "3%",
              top: "15%",
              bottom: "0",
              containLabel: true,
          },
          xAxis: {
              data: xAxisData,
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#6AB0FF'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: 'rgb(20,46,74)'
                }
              },
              axisLabel: {
                show: true,
                fontSize: 10,
                formatter: function (value) {
                  return value
                },
                color: '#F6FAFF'
              },
          },
          yAxis: {
              name: '(亿元)',
              axisTick: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: '#6AB0FF'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: 'rgb(20,46,74)'
                }
              },
              axisLabel: {
                show: true,
                fontSize: 10,
                formatter: function (value) {
                  return value
                },
                color: '#F6FAFF'
              },
          },
          series: [
              {
                z: 1,
                name: '数据',
                type: "bar",
                animationDuration: 2500,
                barWidth: barWidth,
                barGap: "0%",
                data: data,
                itemStyle: {
                    normal: {
                    color: color,
                    },
                },
                label: {
                  show: true,
                  position: 'top',
                  valueAnimation: true,
                  color: '#D4E7F4'
                }
              },
              {
                z: 2,
                name: '数据',
                type: "pictorialBar",
                animationDuration: 2500,
                data: constData,
                symbol: "diamond",
                symbolOffset: ["0%", "50%"],
                symbolSize: [barWidth, 10],
                itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                          offset: 0,
                          color: "#68ABF7" // 0% 处的颜色
                      }, {
                          offset: 0.4,
                          color: "#68ABF7" // 60% 处的颜色
                      }, {
                          offset: 1,
                          color: "#5783FF" // 100% 处的颜色
                      }], false)
                    }
                },
                tooltip: {
                    show: false,
                },
              },
              {
                z: 3,
                name: '数据',
                type: "pictorialBar",
                animationDuration: 2500,
                symbolPosition: "end",
                data: showData,
                symbol: "diamond",
                symbolOffset: ["0%", "-50%"],
                symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
                itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                          offset: 0,
                          color: "#68ABF7" // 0% 处的颜色
                      }, {
                          offset: 0.6,
                          color: "#5783FF" // 60% 处的颜色
                      }, {
                          offset: 1,
                          color: "#5783FF" // 100% 处的颜色
                      }], false)
                    }
                },
                tooltip: {
                    show: false,
                },
              },
          ],
      };
    }
  }
}
</script>

<style lang="less" scoped>
#totalAssets{
  width: 100%;
  height: 100%;
}
#allTotalAssets{
  width: 100%;
  height: 100%;
}
#webSecurity{
  width: 100%;
  height: 100%;
}
#serverSecurity{
  width: 180px;
  height: 180px;
	margin-left: 100px;
	/* margin-top: 24px; */
	position: absolute;
	left: 0;
}
.serversafebox-wrap{
  width: 100%;
}
.serversafebox{
	position: relative;
  margin: 20px 0;
	height: 180px;
}
.websafe{
	/* height: 360px; */
}
.assetsarc{
	position: absolute;
	left: 84px;
	top: -14px;
	width: 210px;
	height: 210px;
	animation: myMove 5s;
	-webkit-animation: myMove 5s infinite linear;
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
.assetsinner{
	position: absolute;
	left: 116px;
	top: 14px;;
	width: 150px;
	height: 150px;
}
.flopbox {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.flopboxtitle {
  color: rgba(255, 255, 255, .8);
  text-align: left;
}
.detailBox {
  flex: 1;
  height: 100%;
  margin: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .row{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 18px;
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
.chart-wrap{
  width: 100%;
  height: 100%;
}
</style>