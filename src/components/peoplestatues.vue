<template>
  <div>
    <sideTran thisCrrentSys="peoplestatues">
      <div slot="left">
        <sideItem title="人员实时状态">
          <div slot='body' class="nowbox">
						<currency class="nowboxitem" :boxnum="oneobj.num" :boxtitle="oneobj.title" :boxcolor="oneobj.color" :boxuntil="oneobj.until"></currency>
						<currency class="nowboxitem" :boxnum="secobj.num" :boxtitle="secobj.title" :boxcolor="secobj.color" :boxuntil="secobj.until"></currency>
						<currency class="nowboxitem" :boxnum="thirobj.num" :boxtitle="thirobj.title" :boxcolor="thirobj.color" :boxuntil="thirobj.until"></currency>
						<currency class="nowboxitem" :boxnum="fourobj.num" :boxtitle="fourobj.title" :boxcolor="fourobj.color" :boxuntil="fourobj.until"></currency>
					</div>
        </sideItem>
        <sideItem title="今日访客统计">
          <div slot='body' class="visitorstoday">
						<div>
							<img src="../assets/img/visitorstodayimg.png" >
						</div>
						<div class="fontbox">
							
						</div>
            <!-- <div id="totalAssets"></div> -->
          </div>
        </sideItem>
        <sideItem title="学校资产总额统计">
          <div slot='body'>
            <div id="allTotalAssets"></div>
          </div>
        </sideItem>
				<sideItem title="学生实时分布">
				  <div slot='body'>
				    <div id="allTotalAssets"></div>
				  </div>
				</sideItem>
      </div>
      <div slot="right">
<!--        <sideItem title="网站安全统计">
          <div slot='body'>
            <div id="webSecurity"></div>
          </div>
        </sideItem>
        <sideItem title="服务器安全分析">
          <div slot='body'>
            <div id="serverSecurity"></div>
          </div>
        </sideItem> -->
      </div>
    </sideTran>
  </div>
</template>

<script>
import sideTran from './sideTran'
import currency from './currency'//通用box组件
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
    sideItem,
		currency
  },
  data(){
    return {
			num:888,
			oneobj:{
				num:22349,
				color:"#00F5FF",
				title:"全校学生",
				until:"(人)"
			},
			secobj:{
				num:19496,
				color:"#13B5B1",
				title:"在校学生",
				until:"(人)"
			},
			thirobj:{
				num:201,
				color:"#DBBB8A",
				title:"请假学生",
				until:"(人)"
			},
			fourobj:{
				num:1697,
				color:"#F2896B",
				title:"不在校学生",
				until:"(人)"
			},
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
    console.log(this.num,'assets11',this.oneobj)
    
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
.nowbox{
	display: flex;
	justify-content: space-around;
	width: 100%;
	flex-wrap: wrap;
}
.nowboxitem{
	margin-top: 20px;
}
.visitorstoday{
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-top: 20px;
}
</style>