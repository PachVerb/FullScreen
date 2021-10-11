<template>
  <div>
    <sideTran thisCrrentSys="assets">
      <div slot="left">
        <sideItem title="学校资产统计">
          <div slot='body'></div>
        </sideItem>
        <sideItem title="各学院资产总数统计">
          <div slot='body'>
            <div id="totalAssets"></div>
          </div>
        </sideItem>
        <sideItem title="学校资产总额统计">
          <div slot='body'>
            <div id="allTotalAssets"></div>
          </div>
        </sideItem>
      </div>
      <div slot="right">
        <sideItem title="网站安全统计">
          <div slot='body'>
            <div id="webSecurity"></div>
          </div>
        </sideItem>
        <sideItem title="服务器安全分析">
          <div slot='body'>
            <div id="serverSecurity"></div>
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
      totalAssetsOption: {
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
        grid: { 
          top: '10px',
          left: '40px',  
          right: '30px', 
          bottom: '30px', 
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
            lineStyle: {
              color: 'rgba(39,75,114)'
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
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'rgba(39,75,114)'
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
          trigger: 'item'
        },
        // legend: {
        //   top: '5%',
        //   left: 'center'
        // },
        series: [
          {
            name: 'Access From',
            type: 'pie',
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
      }
    }
  },
  computed: {
    ...mapGetters(['currentSys'])
  },
  watch: {
    currentSys(val){
      console.log(val)
      if(val == 'assets'){
        this.$nextTick(() => {
          totalAssetsChartDom = document.getElementById('totalAssets');
          totalAssetsChart = echarts.init(totalAssetsChartDom);
          totalAssetsChart.setOption(this.totalAssetsOption)
          allTotalAssetschartDom = document.getElementById('allTotalAssets');
          allTotalAssetsChart = echarts.init(allTotalAssetschartDom);
          allTotalAssetsChart.setOption(this.allTotalAssetsOption)
          webSecurityChartDom = document.getElementById('webSecurity');
          webSecurityChart = echarts.init(webSecurityChartDom);
          webSecurityChart.setOption(this.getEcharts3DBar(['z','x'], [20,98], '01'))
          serverSecurityChartDom = document.getElementById('serverSecurity');
          serverSecurityChart = echarts.init(serverSecurityChartDom);
          serverSecurityChart.setOption(this.serverSecurityOption)
          // this.myChart2.setOption(this.getEcharts3DBar(['z'], [20], '01'))
        })
      }
    }
  },
  mounted(){
    console.log('assets')
    
  },
  methods: {
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
                  color: 'rgba(39,75,114)'
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
                  color: 'rgba(39,75,114)'
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

<style scoped>
#totalAssets{
  width: 100%;
  height: 230px;
}
#allTotalAssets{
  width: 100%;
  height: 230px;
}
#webSecurity{
  width: 100%;
  height: 300px;
}
#serverSecurity{
  width: 100%;
  height: 100px;
}
</style>