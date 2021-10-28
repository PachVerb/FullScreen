<template>
	<div>
		<sideTran :thisCrrentSys="thisCrrentSys">
			<div slot="left">
				<nowpeopleslide title="用户使用统计">
					<div slot='body' style="height: 20%;">
						<div class="flopbox">
							<p class="flopboxtitle" style="width: 85px;">在线用户</p>
							<flop :num="num" :unitil="unitil"></flop>
						</div>
						<div class="flopbox">
							<p class="flopboxtitle">今日用户数据值</p>
							<flop :num="numtow" :unitil="unitil"></flop>
						</div>
					</div>
				</nowpeopleslide>
				<sideItem title="网络设备统计">
					<div slot='body' class="networkdevicetotal">
						<div id="networkdevicetotal"></div>
					</div>
				</sideItem>
				<sideItem title="设备告警统计">
					<div slot='body' class="equipmentalarmtotal">
						<div class="table-head">
							<span :style="{width: head.width}" v-for="head in tableHead"
								:key="head.name">{{ head.name }}</span>
						</div>
						<div class="ab-list patrol">
							<div class="ab-item" v-for="(item) in abDetailList" :key="item.id">
								<div class="table-item ab-item-name" :style="{width: tableHead[0].width}" >
									{{ item.name }}
								</div>
								<div class="table-item" :style="{width: tableHead[1].width}" :title=item.reason>{{ item.reason }}</div>
								<div class="table-item" :style="{width: tableHead[2].width}" :title=item.date>{{ item.date }}</div>
							</div>
						</div>
					</div>
				</sideItem>
				<sideItem title="设备告警详情">
					<div slot='body' class="deviceDetail">
						<div class="checkBox" >
						  <div :class="trendKey==0?'btn checked':'btn'" @click="getTrendAnalyData(0)">近一周</div>
						  <div :class="trendKey==1?'btn checked':'btn'" @click="getTrendAnalyData(1)">近一月</div>
						  <div :class="trendKey==2?'btn checked':'btn'" @click="getTrendAnalyData(2)">近一年</div>
						</div>
						<div class="chart-trendChart" id="trendChart"></div>
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
	import sideTran from '@/components/sideTran'
	import sideItem from '@/components/sideItem.vue'
	import nowpeopleslide from '@/components/nowpeopleslide.vue'
	import flop from '@/components/commonComponent/flop.vue'
	import {
		Table,
		TableColumn
	} from 'element-ui'
	import {
		mapGetters
	} from 'vuex'
	import * as echarts from 'echarts';
	export default {
		components: {
			sideTran,
			sideItem,
			nowpeopleslide,
			flop,
			elTable: Table,
			elTableColumn: TableColumn
		},
		data() {
			return {
				trendKey:2,
				trendWaterKey:2,
				thisCrrentSys: '',
				num: 12345,
				numtow: 67898,
				unitil: "人",
				tableHead: [{
					name: '严重等级',
					width: '80px'
				}, {
					name: '告警原因',
					width: '100px'
				}, {
					name: '告警时间',
					width: '100px'
				}, ],
				abDetailList: [{
					id: '1',
					name: '一般',
					date: '2021-11-09 15:22:47',
					reason:"#2015柜内存使用率超标"
				}, {
					id: '2',
					name: '正常',
					date: '2021-11-09 15:22:47',
					reason:"#2015柜内存使用率超标"
				}, {
					id: '3',
					name: '正常',
					date: '2021-11-09 15:22:47',
					reason:"#2015柜内存使用率超标"
				}, {
					id: '4',
					name: '正常',
					date: '2021-11-09 15:22:47',
					reason:"#2015柜内存使用率超标"
				}, {
					id: '5',
					name: '正常',
					date: '2021-11-09 15:22:47',
					reason:"#2015柜内存使用率超标"
				}, ],
			}
		},
		computed: {
			...mapGetters(['currentSys'])
		},
		watch: {},
		mounted() {

		},
		methods: {
			init() {
				this.$nextTick(() => {
					this.thisCrrentSys = 'interstatues'
					setTimeout(() => {
						this.randerBar()
						this.getTrendAnalyData(2);
					}, 1500)
				})
			},

			randerBar() {
				let networkdevicetotalChartDom, networkdevicetotalChartChart
				networkdevicetotalChartDom = document.getElementById('networkdevicetotal');
				networkdevicetotalChartChart = echarts.init(networkdevicetotalChartDom);
				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						show: true,
						icon: "roundRect",
						data: ['设备总数', '异常设备数'],
						align: 'right',
						right: 10,
						textStyle: {
							color: "#fft"
						},
						itemWidth: 12,
						itemHeight: 8,
						itemGap: 30,
						align: "left"
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '1%',
						top: "40",
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: ['AP设备',
							'交换机',
							'路由器',
							'集线器',
						],
						axisLine: {
							show: true,
							lineStyle: {
								color: "rgba(106, 176, 255, .5)",
								width: 1,
								type: "solid"
							}
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: "white",
							}
						},
					}],
					yAxis: [{
						type: 'value',
						name: "(个)",
						nameTextStyle: {
							color: '#ffffff'
						},
						axisLabel: {
							formatter: '{value} ',
							textStyle: {
								color: "white",
							}
						},
						axisTick: {
							show: false,
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "rgba(106, 176, 255, .5)",
								width: 1,
								type: "solid"
							},
						},
						splitLine: {
							lineStyle: {
								color: "rgba(106, 176, 255, .5)",
								type: "dashed"
							}
						}
					}],
					series: [{
						name: '设备总数',
						type: 'bar',
						data: [20, 50, 80, 58],
						barWidth: 10, //柱子宽度
						barGap: 1, //柱子之间间距
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#598BF1'
								}, {
									offset: 1,
									color: '#598BF1'
								}]),
								opacity: 1,
							}
						}
					}, {
						name: '异常设备数',
						type: 'bar',
						data: [50, 70, 60, 61],
						barWidth: 10,
						barGap: 1,
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#F6886A'
								}, {
									offset: 1,
									color: '#F6886A'
								}]),
								opacity: 1,
							}
						}
					}]
				};
				// 使用刚指定的配置项和数据显示图表。
				networkdevicetotalChartChart.setOption(option);
			},
			getTrendAnalyData(index) {
			  this.trendKey = index;
			  let charts = {};
			  if (index == 0) {
			    charts = {
			      unit: '',
			      lineX: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			      value: [
			        [251, 152, 103, 334, 95, 236, 217],
			      ]
			    }
			  } else if (index == 1) {
			    charts = {
			      unit: '',
			      lineX: ['1号', '4号', '7号', '10号', '13号', '16号', '18号', '21号', '24号', '27号', '30号'],
			      value: [
			        [151, 352, 303, 534, 95, 236, 217, 328, 159, 151, 31],
			      ]
			    }
			  } else if (index == 2) {
			    charts = {
			      unit: '',
			      lineX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
			      value: [
			        [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 392],
			      ]
			    }
			  }
			
			  this.loadTrendAnalyCharts('trendChart', charts)
			},
			loadTrendAnalyCharts(id, data) {
			  let dom = document.getElementById(id);
			  let chart = echarts.init(dom);
			  let parma = {
			    names: ['告警次数'],
			    ...data
			  };
				// rgba(106, 176, 255, 1)
			  let color = ['rgba(106, 176, 255', 'rgba(106, 176, 255']
			  let lineY = []
			  for (let i = 0; i < parma.names.length; i++) {
			    let data = {
			      name: parma.names[i],
			      type: 'line',
			      animationDuration: 2000,
			      color: color[i] + ')',
			      // smooth: false,
			      // areaStyle: {
			      //   normal: {
			      //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			      //       offset: 0,
			      //       color: color[i] + ', 0.3)'
			      //     }, {
			      //       offset: 0.8,
			      //       color: color[i] + ', 0)'
			      //     }], false),
			      //     shadowColor: 'rgba(0, 0, 0, 0.1)',
			      //     shadowBlur: 10
			      //   }
			      // },
			      symbol: 'circle',
			      symbolSize: 5,
			      data: parma.value[i]
			    }
			    lineY.push(data)
			  }
			  let option = {
			    tooltip: {
			      trigger: 'axis',
			      textStyle: {
			        align:'left',
			        fontSize: 12,
			        color: 'rgba(255,255,255,0.8)',
			      },
			    },
			    legend: {
						show:false,
			      top: '0px',
			      data: parma.names,
			      textStyle: {
			        fontSize: 12,
			        color: 'F1F1F3'
			      },
			      right: '20px'
			    },
			    grid: {
			      top: '10px',
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
						axisLine: {
						  show: true,
						  lineStyle: {
						    color: 'rgba(106, 176, 255, 1)'
						  }
						},
			      axisLabel: {
			        textStyle: {
			          color: 'white'
			        },
			      }
			    },
			    yAxis: {
			      show: true,
			      splitArea: {
			        show: false,
			        areaStyle: {
			          color: "transparent"
			        }
			      },
			      type: 'value',
			      axisLabel: {
			        formatter: '{value}',
			        textStyle: {
			          color: 'white'
			        }
			      },
			      splitLine: {
			        lineStyle: {
			          color: 'rgba(106, 176, 255, 1)',
								type: "dashed"
			        }
			      },
			      axisLine: {
			        show: true,
			        lineStyle: {
			          color: 'rgba(106, 176, 255, 1)'
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
		}
	}
</script>

<style lang="less" scoped="scoped">
	.flopbox {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.flopboxtitle {
		color: rgba(255, 255, 255, .8);
		text-align: left;
	}

	.networkdevicetotal {
		height: 140px;
	}

	#networkdevicetotal {
		height: 140px;
		width: 100%;
	}

	.equipmentalarmtotal {
		height: 140px;
		margin-top: 20px;
	}
.table-head {
		margin: 0 16px;
		font-size: 14px;
/* 		position: relative;
		top: -10px; */
		color: rgba(255, 255, 255, .8);
		border-bottom: 1px solid rgba(63, 151, 207, .5);
		display: flex;
		justify-content: space-around;
		span {
			display: inline-block;
			line-height: 40px;
			text-align: center;
		}
	}

	.table-item {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-right: 10px;
		color: white;
	}
	.ab-list {
		font-size: 12px;
	}
	
	.ab-item {
		display: flex;
		justify-content: space-between;
		text-align: center;
		margin: 6px 16px 0;
		padding: 0 0 6px;
		border-bottom: 1px solid rgba(63, 151, 207, .5);
	}
	
	.ab-item-name,
	.ab-item-date {
		/* margin-top: 5px; */
		padding-left: 6px;
		text-align: center;
		/* border-left: 1px solid #00F5FF; */
		color: rgba(255, 255, 255, .5);
	}
	
	.ab-item-name {
		font-size: 12px;
		color: #F6FAFF;
		/* font-weight: bold; */
	}
	
	
	.patrol {
		font-size: 12px;
		height: 120px;
		overflow-y: scroll;
		.ab-item-name {
			margin-top: 0;
			font-size: 12px;
			border: none;
		}
	}
	.deviceDetail{
		height: 220px;
	}
	.deviceDetail {
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
	      background: url(../../assets/img/btn.png) no-repeat 100%;
	      margin: 0 4px;
	      cursor: pointer;
	    }
	    .checked {
	      color: #00f5ff;
	      background: url(../../assets/img/btn-check.png) no-repeat 100%;
	    }
	  }
	  .chart-trendChart{
	    width: 340px;
	    height: 180px;
			margin-top: 20px;
	  }
	}
	
</style>
<!-- <style type="text/css">
	.el-table, .el-table__expanded-cell {background-color: transparent !important;}
	.el-table th, .el-table tr, .el-table td {background-color: transparent !important;}
	/* 去掉中间数据的分割线 */
	.el-table__row>td{border: none;}
	/* 去掉上面的线 */
	.el-table th.is-leaf{border: none;}
	/* 去掉最下面的那一条线 */
	.el-table::before {height: 0px;}
</style> -->
