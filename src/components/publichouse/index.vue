<template>
  <div class="publichouse" style="height: 100%;">
    <sideTran thisCrrentSys="publichouse">
      <div slot="left" style="height: 100%;">
        <sideItem title="学校概况" delay="100" height="20.69%">
          <div class="schoolState" slot="body">
            <currency v-for="(item,i) in staList" :key="i" :boxnum="item.count" :boxtitle="item.type" :boxcolor="item.color" :boxuntil="item.unit"></currency>
          </div>
        </sideItem>
        <sideItem title="校区公房统计" delay="200" height="25.63%">
          <div class="houseStati" slot="body">
            <div class="row title">
              <span>所属校区</span>
              <span>楼栋数</span>
              <span>房间数</span>
              <span>建筑面积</span>
              <span>使用面积</span>
            </div>
            <div class="row bg" v-for="(item,i) in houseStaList" :key="i">
              <span>{{item.campus}}</span>
              <span>{{item.build}}</span>
              <span>{{item.room}}</span>
              <span>{{item.area}}</span>
              <span>{{item.useArea}}</span>
            </div>
            <div class="row bg total">
              <span>合计</span>
              <span>{{houseStaList.reduce((sum,item)=>sum+item.build,0)}}</span>
              <span>{{houseStaList.reduce((sum,item)=>sum+item.room,0)}}</span>
              <span>{{houseStaList.reduce((sum,item)=>sum+item.area,0)}}</span>
              <span>{{houseStaList.reduce((sum,item)=>sum+item.useArea,0)}}</span>
            </div>
          </div>
        </sideItem>
        <sideItem title="公房使用方向统计" delay="300" height="30%">
          <div slot="body">
            <div id="allTotalAssets"></div>
          </div>
        </sideItem>
        <sideItem title="学校公房总数统计" delay="400" height="22.76%">
          <div class="totalStati" slot="body">
            <div class="chart-total" id="totalChart"></div>
          </div>
        </sideItem>
      </div>
      <div slot="right" style="height: 100%;">
        <sideItem title="空置房源统计" transitionType="right" delay="100" height="23.91%">
          <div class="freeStati" slot="body">
            <img class="chartImg" src="../../assets/img/pyramid.png" alt />
            <div class="detailBox">
              <div class="row" v-for="(item,i) in freeList" :key="i">
                <div class="title">
                  <i :style="`border-color:${item.color};`"></i>
                  <span :style="`color:${item.color};`">{{item.name}}</span>
                </div>
                <div class="value">
                  <animated-number :value="item.val" :formatValue="val=>val.toFixed()" :duration="4000" />
                  <i>%</i>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="土地情况" transitionType="right" delay="200" height="37.67%">
          <div slot="body" class="landState">
            <div class="chart-land" id="landChart"></div>
          </div>
        </sideItem>
        <sideItem title="公房使用单位统计" transitionType="right" delay="300" height="38.4%">
          <div slot="body" class="usepublicunitbox">
            <div class="usebox">
              <div id="usepublic"></div>
              <img src="../../assets/pieimg/publichouseout.png" class="useboxoutpie" />
              <img src="../../assets/pieimg/publichouseinner.png" class="gear" />
            </div>
            <!-- 						<div class="usebox">
							<img src="../../assets/pieimg/piemidd.png" alt="" class="useboximg">
							<img src="../../assets/pieimg/outpie.png" class="useboxoutpie">
							<img src="../../assets/pieimg/gear.png" class="gear">
							<div id="usepublic"></div>
							<div>

							</div>
            </div>-->
          </div>
        </sideItem>
      </div>
    </sideTran>
  </div>
</template>

<script>
// let color = ['#A985EE', '#C490BF', '#13B5B1', '#45dbf7', '#f69846', '#44aff0', '#4777f5', '#5045f6', '#ad46f3',
// 	'#f845f1'
// ];
import sideTran from '../sideTran'
import nowpeopleslide from '../nowpeopleslide.vue'
import sideItem from '../sideItem.vue'
import currency from '../currency.vue'//通用box组件
import AnimatedNumber from "animated-number-vue";
import {
  mapGetters
} from 'vuex'
import * as echarts from 'echarts';
export default {
  components: {
    sideTran,
    sideItem,
    currency,
    AnimatedNumber
  },
  data() {
    return {
      name: ["生活用水", "浇灌用水", "其他"],
      value: [1114, 444, 501],
      fontcolor: [],
      fontcolorobj: [],
      staList: [],
      houseStaList: [],
      freeList: [],
    }
  },
  computed: {
    ...mapGetters(['currentSys'])
  },
  watch: {},
  mounted() { },
  methods: {
    init() {
      this.$nextTick(() => {
        // this.initcolor()
        setTimeout(() => {
          this.renderpie()
          this.getSchoolState();
          this.getHouseStati();
          this.getTotalStati();
          this.getFreeStati();
          this.getLandState();
        }, 500);
      })
    },
    //学校概况
    getSchoolState() {
      this.staList = [
        { type: '总占地面积', count: 172469, color: '#00F5FF', unit: '㎡' },
        { type: '总楼栋数', count: 63, color: '#F2896B', unit: '栋' },
        { type: '总房间数', count: 87, color: '#DBBB8A', unit: '间' },
        { type: '总房间面积', count: 28227, color: '#A488EF', unit: '㎡' },
      ]
    },
    //校区公房统计
    getHouseStati() {
      this.houseStaList = [
        { campus: '东校区', build: 13, room: 195, area: 13012.68, useArea: 8043.58 },
        { campus: '西校区', build: 7, room: 41, area: 2785.37, useArea: 1764.83 },
        { campus: '南校区', build: 16, room: 510, area: 39013.36, useArea: 23284.54 },
      ]
    },
    //学校公房总数统计
    getTotalStati() {
      let dom = document.getElementById('totalChart');
      let chart = echarts.init(dom);
      let parma = {
        names: ['总量', '超出'],
        lineX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        value: [
          [351, 452, 183, 284, 135, 236, 287, 188, 359, 151, 231, 132],
          [260, 345, 80, 192, 30, 110, 192, 80, 250, 53, 152, 28]
        ]
      };
      let color = ['rgb(106, 176, 255)', 'rgb(242, 137, 107)']
      let lineY = []
      for (let i = 0; i < parma.names.length; i++) {
        let data = {
          name: parma.names[i],
          type: 'line',
          animationDuration: 2000,
          color: color[i],
          smooth: false,
          symbol: 'circle',
          symbolSize: 5,
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
          textStyle: {
            fontSize: 12,
            color: 'F1F1F3'
          },
          right: '20px'
        },
        grid: {
          top: '30px',
          left: '0px',
          right: '5px',
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
              color: 'rgba(246, 250, 255, 0.8)'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.5)',
              width: 2
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
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: 'rgba(246, 250, 255, 0.8)',
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.5)',
              type: 'dotted',
              width: 2
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.5)',
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
    //空置房源统计
    getFreeStati() {
      this.freeList = [
        { name: "北校区", val: 11, color: '#7892FF' },
        { name: "北校区", val: 22, color: '#5172FF' },
        { name: "东校区", val: 67, color: '#0C72F0' },
      ]
    },
    //土地情况
    getLandState() {
      let dom = document.getElementById('landChart');
      let chart = echarts.init(dom);
      let parma = {
        names: ['总使用权面积', '划拨使用权面积', '出让使用权面积'],
        unit: '(亿元)',
        lineX: ['北校区', '北校区', '东校区'],
        value: [
          [218, 218, 218], [85, 85, 85], [44, 44, 44],
        ],
        color: ['#6AB0FF', '#E5BC80', '#C490BF']
      };
      let option = {
        animationDuration: 2000,
        tooltip: {
          confine: true,//提示框限制在图表内
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: 'rgba(44,62,80,0.8)',
          borderColor: 'rgba(153, 209, 246, 0.6)',
          textStyle: {
            align: 'left',
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          },
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '0',
          top: '24%',
          containLabel: true
        },
        legend: {
          data: parma.names.map((item,i)=>{
            return {
              name:item,
              textStyle:{
                color:parma.color[i],
                fontSize:12
              }
            }
          }),
          right: '0',
          itemWidth: 10,
          itemHeight: 5,
          orient:'vertical',
        },
        xAxis: {
          type: 'category',
          data: parma.lineX,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.5)'
            }
          },
          axisLabel: {
            textStyle: {
              color: "rgba(246, 250, 255, 0.8)"
            }
          },
        },

        yAxis: {
          name: parma.unit,
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.5)'
            }
          },
          axisLabel: {
            textStyle: {
              color: "rgba(246, 250, 255, 0.8)"
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.5)',
              type: 'dotted',
            }
          },
        },
        series: parma.value.map((item, i) => {
          return {
            name: parma.names[i],
            type: 'bar',
            barWidth: '12px',
            barGap: '100%',//数据之间的距离
            label: {
              normal: {
                show: true,
                position: 'top',
                fontSize: 12,
                color: '#fff',
              },
            },
            itemStyle: {
              normal: {
                color: parma.color[i]
              },
            },
            data: item
          }
        })
      };
      chart.clear();//清除动画
      chart.setOption(option, true);
    },

    initcolor() {
      let tempobj = {}
      this.fontcolor = color.slice(0, this.name.length);
      // this.fontcolor.forEach(el => {
      // 	tempobj.color = el
      // 	this.fontcolorobj.push(tempobj)
      // })
      let len = this.fontcolor.length
      let array = [];
      for (let i = 0; i < len; i++) {
        array.push({
          "color": this.fontcolor[i]
        });
      }
      console.log(array, "bbbbbbb", this.fontcolor)
    },
    //公房使用单位统计
    renderpie() {
				let usepublicChartDom, usepublicChartChart, option
				usepublicChartDom = document.getElementById('usepublic');
				usepublicChartChart = echarts.init(usepublicChartDom);
				var seriesData = [{
					name: "土木工程学院",
					value: "40",
					label:{
						color:"#73DDFF"
					}
				}, {
					name: "物理学院",
					value: "40",
					label:{
						color:"#73ACFF"
					}
				}, {
					name: "数学学院",
					value: "53",
					label:{
						color:"#FDD56A"
					}
				}, {
					name: "软件工程学院",
					value: "40",
					label:{
						color:"#FDB36A"
					}
				}, {
					name: "继续教育学院",
					value: "60",
					label:{
						color:"#FD866A"
					}
				}, {
					name: "文法学院",
					value: "10",
					label:{
						color:"#9E87FF"
					}
				}, {
					name: "计算机科学学院",
					value: "20",
					label:{
						color:"#58D5FF"
					},
				}];
				let title = "总计"
				let formatNumber = function(num) {
					let reg = /(?=(\B)(\d{3})+$)/g;
					return num.toString().replace(reg, ',');
				}
				let total = seriesData.reduce((a, b) => {
					return a + b.value * 1
				}, 0);
				var legendData = ["二元", "大白", "长大", "杜洛克", "三元", "大长", "PIC"]
				var colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF'];
				usepublicChartChart.setOption({
					// title: {
					//     text: `总计`,
					//     x: 'center',
					//     y: 'center',
					//     textStyle: {
					//         color: '#fff'
					//     }
					// },
					title: [{
						text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}{unit|间}',
						top: 'center',
						left: 'center',
						textStyle: {
							rich: {
								name: {
									fontSize: 12,
									fontWeight: 'normal',
									color: 'rgba(255,255,255,0.8)',
									padding: [10, 0]
								},
								val: {
									fontSize: 16,
									fontWeight: 'bold',
									color: '#00F5FF',
								},
								unit: {
									fontSize: 12,
									color: 'rgba(255,255,255,0.5)',
								}
							}
						}
					}],
					tooltip: {
						trigger: 'item',
						// borderColor: 'rgba(255,255,255,.3)',
						backgroundColor: 'rgba(13,5,30,.6)',
						borderWidth: 1,
						padding: 5,
						formatter: function(parms) {
							var str = parms.marker + "" + parms.data.name + "</br>" +
								// "数量：" + parms.data.value + "头</br>" +
								"占比：" + parms.percent + "%";
							return str;
						}
					},
					legend: {
						show: false,
						// type: "scroll",
						orient: 'vertical',
						left: 'left',
						align: 'auto',
						top: 'middle',
						textStyle: {
							color: '#fft'
						},
						data: legendData
					},
					series: [{
						type: 'pie',
						z: 3,
						center: ['50%', '50%'],
						radius: ['50%', '65%'],
						clockwise: true,
						avoidLabelOverlap: true,
						hoverOffset: 15,
						itemStyle: {
							normal: {
								color: function(params) {
									return colorList[params.dataIndex]
								},

							}
						},
						label: {
							show: true,
							position: 'outside',
							formatter: '{a|{b}}',
							rich: {

								a: {
									padding: [-30, 10, -20, 10],
								}
							}
						},
						labelLine: {
							normal: {
								length: 15,
								length2: 25,
								lineStyle: {
									width: 1
								}
							}
						},
						data: seriesData
					}, ]
				});
			}
    // rendpubpie() { //能耗态势设备能耗占比饼状图,右侧的那个数据不能有中echarts中的legend需要自己写,点击右边数据不和echarts做联动
    // 	console.log("进入")
    // 	let usepublicChartDom, usepublicChartChart, option
    // 	usepublicChartDom = document.getElementById('usepublic');
    // 	usepublicChartChart = echarts.init(usepublicChartDom, {
    // 		width: 150,
    // 		height: 150
    // 	});
    // 	let names = ["生活用水", "浇灌用水", "其他"];
    // 	let data1 = [1114, 444, 501]
    // 	let list = []
    // 	let total = 0
    // 	for (let i in data1) {
    // 		total += data1[i]
    // 	}

    // 	let placeHolderStyle = {
    // 		normal: {
    // 			label: {
    // 				show: false
    // 			},
    // 			labelLine: {
    // 				show: false
    // 			},
    // 			color: 'rgba(0, 0, 0, 0)',
    // 			borderColor: 'rgba(0, 0, 0, 0)',
    // 			borderWidth: 0
    // 		}
    // 	};

    // 	let rich = {
    // 		white: {
    // 			align: 'center',
    // 			padding: [3, 0]
    // 		}
    // 	};

    // 	for (let i in data1) {
    // 		list.push({
    // 			value: data1[i],
    // 			name: names[i],
    // 			itemStyle: {
    // 				normal: {
    // 					borderWidth: 5,
    // 					shadowBlur: 20,
    // 					borderColor: color[i],
    // 					shadowColor: color[i],
    // 					color: color[i]
    // 				}
    // 			}
    // 		}, {
    // 			value: total / 30,
    // 			name: '',
    // 			itemStyle: placeHolderStyle
    // 		})
    // 	}

    // 	let func = (params) => {
    // 		let percent = ((params.value / total) * 100).toFixed(1)
    // 		let name = params.name.replace(/\n/g, '')
    // 		if (params.name !== '') {
    // 			return name + '\n{white|' + percent + '%}'
    // 		} else {
    // 			return ''
    // 		}
    // 	}



    // 	usepublicChartChart.setOption({
    // 		tooltip: {
    // 			show: false
    // 		},
    // 		grid: {
    // 			containLabel: true,
    // 			left: 30,
    // 			top: 0,
    // 			bottom: 0
    // 		},
    // 		legend: {
    // 			show: false,
    // 			orient: 'vertical',
    // 			data: names,
    // 			icon: 'circle',
    // 			right: '5px',
    // 			top: '10px',
    // 			textStyle: {
    // 				color: '#fff',
    // 				fontSize: 20
    // 			}
    // 		},
    // 		series: [{
    // 				name: '',
    // 				type: 'pie',
    // 				clockWise: false,
    // 				startAngle: '90',
    // 				center: ['50%', '50%'],
    // 				radius: ['70%', '70%'], //设置饼状图的宽高
    // 				hoverAnimation: false,
    // 				itemStyle: {
    // 					normal: {
    // 						label: {
    // 							show: false,
    // 							position: 'outside',
    // 							formatter: func,
    // 							rich: rich
    // 						},
    // 						labelLine: {
    // 							length: 40,
    // 							length2: 100,
    // 							show: false,
    // 							color: '#00ffff'
    // 						}
    // 					}
    // 				},
    // 				data: list,
    // 				animationType: 'scale',
    // 				animationEasing: 'elasticOut',
    // 				animationDelay: function(idx) {
    // 					return idx * 350;
    // 				}
    // 			},
    // 			{
    // 				name: '',
    // 				type: 'pie',
    // 				center: ['50%', '50%'],
    // 				radius: ['49%', '49%'],
    // 				itemStyle: {
    // 					color: 'transparant'
    // 				},
    // 				startAngle: '90',
    // 				data: [{
    // 					value: total,
    // 					name: '',
    // 					label: {
    // 						normal: {
    // 							show: true,
    // 							formatter: '{c|设备}' + '\n\r' + '{active|用电占比}',

    // 							// formatter: '用电纪录',
    // 							rich: {
    // 								c: {
    // 									color: 'rgba(255, 255, 255, .5)',
    // 									fontSize: 12,
    // 									// fontWeight: 'bold',
    // 									lineHeight: 22
    // 								},
    // 								b: {
    // 									color: 'rgba(255, 255, 255, .5)',
    // 									fontSize: 12,
    // 									lineHeight: 22
    // 								}
    // 							},
    // 							textStyle: {
    // 								fontSize: 12,
    // 								// fontWeight: 'bold'
    // 							},
    // 							position: 'center'
    // 						}
    // 					}
    // 				}]
    // 			}
    // 		]
    // 	});
    // 	// usepublicChartChart.setOption(option)
    // }
  }
}
</script>

<style lang="less" scoped>
.publichouse {
  color: #f6faff;
  .schoolState {
    padding: 0 16px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  .houseStati {
    padding: 0 16px;
    width: 100%;
    .row {
      margin-top: 5px;
      width: 100%;
      display: flex;
      align-items: center;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      span {
        flex: 1;
        line-height: 30px;
      }
    }
    .title {
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.8);
    }
    .total {
      color: #00f5ff;
    }
    .bg {
      background: rgba(106, 176, 255, 0.3);
    }
  }

  .totalStati {
    padding: 0 16px;
    width: 100%;
    .chart-total {
      width: 340px;
      height: 150px;
    }
  }
  .freeStati {
    padding: 10px 20px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .chartImg {
      width: 145px;
      height: 150px;
    }
    .detailBox {
      flex: 1;
      height: 150px;
      margin-left: 25px;
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
  .landState {
    padding: 0 16px;
    width: 100%;
    .chart-land {
      width: 340px;
      height: 280px;
    }
  }

  #allTotalAssets {
    width: 100%;
    height: 150px;
  }

  .usepublicunitbox {
    width: 100%;
    height: 210px;
  }
  #usepublic {
    width: 100%;
    height: 200px;
    /* margin-left: 20px; */
  }

  .usebox {
    display: flex;
    position: relative;
    left: 20px;
  }

  .icon {
    color: #fff;
    font-size: 24px;
    margin-top: 8px;
  }

  .useboximg {
    position: absolute;
    width: 130px;
    top: 10px;
    left: 10px;
  }

  .useboxoutpie {
    position: absolute;
    width: 150px;
    top: 25px;
    left: 115px;
    /* 		animation: myMove 5s; 外圈旋转动画
		-webkit-animation: myMove 5s infinite linear; */
  }

  /* 	@keyframes myMove {
	    from {transform: rotate(0deg);}
	    to {transform: rotate(360deg);}
	}
	 
	@-webkit-keyframes myMove {
	    from {transform: rotate(0deg);}
	    to {transform: rotate(360deg);}
	} 旋转半圈以后反转*/

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
  .gear {
    position: absolute;
    width: 80px;
    top: 60px;
    left: 151px;
  }
  .userladnd {
    height: 300px;
  }
}
</style>
