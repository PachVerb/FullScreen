<template>
	<div>
		<sideTran thisCrrentSys="peoplestatues">
			<div slot="left">
				<nowpeopleslide title="人员实时状态" >
					<div slot='body' class="nowbox" style="height: 20%;">
						<currency class="nowboxitem" :boxnum="oneobj.num" :boxtitle="oneobj.title"
							:boxcolor="oneobj.color" :boxuntil="oneobj.until"></currency>
						<currency class="nowboxitem" :boxnum="secobj.num" :boxtitle="secobj.title"
							:boxcolor="secobj.color" :boxuntil="secobj.until"></currency>
						<currency class="nowboxitem" :boxnum="thirobj.num" :boxtitle="thirobj.title"
							:boxcolor="thirobj.color" :boxuntil="thirobj.until"></currency>
						<currency class="nowboxitem" :boxnum="fourobj.num" :boxtitle="fourobj.title"
							:boxcolor="fourobj.color" :boxuntil="fourobj.until"></currency>
					</div>
				</nowpeopleslide>
				<nowpeopleslide title="今日访客统计" >
					<div slot='body' class="visitorstoday" style="height: 20%;">
						<div class="dormitoryUtilization">
							<div class="useleft">
								<img src="../assets/img/visitorstodayimg.png">
							</div>
							<div class="useright">
								<div class="userightbox">
									<div class="colorbox">
										<div style="position: relative;top: 4px;font-size: 14px; width: 130px;">
											<span class="shu"></span>
											<span class="userboxwz">来访人员总数</span>
										</div>
										<div style="position: relative;top: 2px;font-size: 14px;width: 30%;">
											<span style="color: #00F5FF;">50</span><span style="color: gray;">人</span>
										</div>

									</div>
								</div>
								<div class="userightbox" style="margin-top: 10px;">
									<div class="colorbox">
										<div
											style="position: relative;top: 4px;left: -14px;  font-size: 14px;width: 130px;">
											<span class="shu"></span>
											<span class="userboxwz">在访人员</span>
										</div>
										<div style="position: relative;top: 2px;font-size: 14px;width: 30%;">
											<span style="color: #00F5FF;">50</span><span style="color: gray;">人</span>
										</div>

									</div>
								</div>
								<div class="userightbox" style="margin-top: 10px;">
									<div class="colorbox">
										<div
											style="position: relative;top: 4px;left: -14px; font-size: 14px;width: 130px;">
											<span class="shu"></span>
											<span class="userboxwz">宿舍访客</span>
										</div>
										<div style="position: relative;top: 2px;font-size: 14px;width: 30%;">
											<span style="color: #00F5FF;">50</span><span style="color: gray;">人</span>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</nowpeopleslide>
				<nowpeopleslide title="学校资产总额统计" >
					<div slot='body' class="peoplestrue" style="height: 20%;">
						<div class="peoplestruebgc">
							<div class="peoplestruebgcwz">
								<p style="font-size: 26px;color: #00F5FF;">44466</p>
								<p style="font-size: 12px; color: white;">学生总人数</p>
							</div>
						</div>
						<div class="peoplestruebox">
							<div class="peoplestrueboxitem">
								<span style="color: #6AB0FF;">本科生</span><span
									style="color: #00F5FF;margin-left: 40%;">399999</span><span
									style="color: #FFFFFF;">人</span>
							</div>
							<div class="peoplestrueboxitem">
								<span style="color: #C490BF;">硕士研究生</span><span
									style="color: #00F5FF;margin-left: 25%;">399999</span><span
									style="color: #FFFFFF;">人</span>
							</div>
							<div class="peoplestrueboxitem">
								<span style="color:#13B5B1;">博士研究生</span><span
									style="color: #00F5FF;margin-left: 25%;">399999</span><span
									style="color: #FFFFFF;">人</span>
							</div>
							<div class="peoplestrueboxitem">
								<span style="color: #E5BC80;">国外留学生</span><span
									style="color: #00F5FF;margin-left: 25%;">399999</span><span
									style="color: #FFFFFF;">人</span>
							</div>
						</div>
					</div>
				</nowpeopleslide>
				<nowpeopleslide title="学生实时分布" >
					<div slot='body' style="height: 40%;">
						<div id="studentnow" :style="{width:'100%'}"></div>
					</div>
				</nowpeopleslide>
			</div>
			<div slot="right">
				<!--        <nowpeopleslide title="网站安全统计">
          <div slot='body'>
            <div id="webSecurity"></div>
          </div>
        </nowpeopleslide>
        <nowpeopleslide title="服务器安全分析">
          <div slot='body'>
            <div id="serverSecurity"></div>
          </div>
        </nowpeopleslide> -->
			</div>
		</sideTran>
	</div>
</template>

<script>
	import sideTran from './sideTran'
	import currency from './currency' //通用box组件
	import nowpeopleslide from './nowpeopleslide.vue'
	import {
		mapGetters
	} from 'vuex'
	import * as echarts from 'echarts';


	export default {
		components: {
			sideTran,
			nowpeopleslide,
			currency
		},
		data() {
			return {
				num: 888,
				oneobj: {
					num: 22349,
					color: "#00F5FF",
					title: "全校学生",
					until: "人"
				},
				secobj: {
					num: 19496,
					color: "#13B5B1",
					title: "在校学生",
					until: "人"
				},
				thirobj: {
					num: 201,
					color: "#DBBB8A",
					title: "请假学生",
					until: "人"
				},
				fourobj: {
					num: 1697,
					color: "#F2896B",
					title: "不在校学生",
					until: "人"
				},
			}
		},
		computed: {
			...mapGetters(['currentSys'])
		},
		watch: {
			currentSys(val) {
				console.log(val)
				if (val == 'peoplestatues') {
					this.$nextTick(() => {
						this.randerBar()
						// studentnowChartDom = document.getElementById('studentnow');
						// totalAssetsChart = echarts.init(studentnowChartDom);
						// totalAssetsChart.setOption(this.totalAssetsOption)
					})
				}
			}
		},
		mounted() {
			console.log(this.num, 'assets11', this.oneobj)

		},
		methods: {
			randerBar() {
				// 绘制主体
				let studentnowChartDom, studentnowChartChart
				studentnowChartDom = document.getElementById('studentnow');
				studentnowChartChart = echarts.init(studentnowChartDom);
				const CubeBody = echarts.graphic.extendShape({
					shape: {
						x: 0,
						y: 0
					},
					buildPath: function(ctx, shape) {
						// 会canvas的应该都能看得懂，shape是从custom传入的
						const xAxisPoint = shape.xAxisPoint
						const c0 = [shape.x, shape.y]
						const c1 = [shape.x - 13, shape.y]
						const c2 = [xAxisPoint[0] - 13, xAxisPoint[1] - 0]
						const c3 = [xAxisPoint[0], xAxisPoint[1]]
						const c4 = [xAxisPoint[0] + 13, xAxisPoint[1]]
						const c5 = [shape.x + 13, shape.y]
						ctx.moveTo(c0[0], c0[1])
							.lineTo(c1[0], c1[1])
							.lineTo(c2[0], c2[1])
							.lineTo(c3[0], c3[1])
							.lineTo(c4[0], c4[1]).lineTo(c5[0], c5[1])
							.closePath()
					}
				})


				// 顶部
				const CubeTop = echarts.graphic.extendShape({
					shape: {
						x: 0,
						y: 0
					},
					buildPath: function(ctx, shape) {
						const xAxisPoint = shape.xAxisPoint
						const c1 = [shape.x, shape.y]
						const c2 = [xAxisPoint[0], xAxisPoint[1]]
						const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
						const c4 = [shape.x + 18, shape.y - 9]
						ctx.moveTo(c1[0] - 13, c1[1])
						ctx.quadraticCurveTo(c1[0], c1[1] - 8, c1[0] + 13, c1[1])
						ctx.quadraticCurveTo(c1[0], c1[1] + 8, c1[0] - 13, c1[1])
						ctx.closePath()
					}
				})


				// 底部
				const CubeBottom = echarts.graphic.extendShape({
					shape: {
						x: 0,
						y: 0
					},
					buildPath: function(ctx, shape) {
						const xAxisPoint = shape.xAxisPoint
						const c1 = [xAxisPoint[0], xAxisPoint[1]]
						ctx.moveTo(c1[0] - 13, c1[1])
						ctx.quadraticCurveTo(c1[0], c1[1] - 8, c1[0] + 13, c1[1])
						ctx.quadraticCurveTo(c1[0], c1[1] + 8, c1[0] - 13, c1[1])
						ctx.closePath()
					}
				})



				// 地面
				const BottomPanel = echarts.graphic.extendShape({
					shape: {
						x: 0,
						y: 0
					},
					buildPath: function(ctx, shape) {
						const xAxisPoint = [0, shape.api.getHeight() - 120]
						ctx.beginPath()
						// 有待完善 40即grid left的值
						ctx.moveTo(40, xAxisPoint[1] + 30)
						ctx.lineTo(80, xAxisPoint[1] - 20)
						ctx.lineTo(shape.api.getWidth() - 80, xAxisPoint[1] - 20)
						ctx.lineTo(shape.api.getWidth() - 40, xAxisPoint[1] + 30)
						ctx.closePath()
					}
				})


				echarts.graphic.registerShape('BottomPanel', BottomPanel)
				echarts.graphic.registerShape('CubeTop', CubeTop)
				echarts.graphic.registerShape('CubeBottom', CubeBottom)
				echarts.graphic.registerShape('CubeBody', CubeBody)



				const VALUE = [2000, 3500, 4800, 5000, 4900, 6000]
				studentnowChartChart.setOption({
						// backgroundColor: "#012366",

						tooltip: {
							trigger: 'axis',
							show: true,
							axisPointer: {
								type: 'shadow'
							}

						},
						grid: {
							// left: 40,
							// right: 40,
							bottom: 90,
							width:"auto",
							height:"auto",
							top: 30,
							containLabel: true
						},
						xAxis: {
						    data: ["2015", "2016", "2017", "2018", "2019", "2020"],
						    axisTick: {
						      show: false,
						    },
						    axisLine: {
						      show: true,
						      lineStyle: {
						        color: '#3485D3'
						      }
						    },
						    splitLine: {
						      show: false,
						      lineStyle: {
						        type: 'dashed',
						        color: '#3485D3'
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
						    axisTick: {
						      show: false,
						    },
						    axisLine: {
						      lineStyle: {
						        color: '#3485D3'
						      }
						    },
						    splitLine: {
						      show: true,
						      lineStyle: {
						        type: 'dashed',
						        color: '#3485D3'
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
						// xAxis: {
						// 	type: 'category',
						// 	data: ["2015", "2016", "2017", "2018", "2019", "2020"],
						// 	axisLine: {
						// 		show: false,
						// 		lineStyle: {
						// 			color: 'white'
						// 		}
						// 	},
						// 	axisTick: {
						// 		show: false,
						// 		length: 9,
						// 		alignWithLabel: true,
						// 		lineStyle: {
						// 			color: '#7DFFFD'
						// 		}
						// 	},
						// 	axisLabel: {
						// 		show: true,
						// 		fontSize: 16
						// 	},
						// },
						// yAxis: {
						// 	type: 'value',
						// 	axisLine: {
						// 		show: false,
						// 		lineStyle: {
						// 			color: 'white'
						// 		}
						// 	},
						// 	splitLine: {
						// 		show: false
						// 	},
						// 	axisTick: {
						// 		show: false
						// 	},
						// 	axisLabel: {
						// 		show: false,
						// 		fontSize: 16
						// 	},

						// },
						series: [

							{
								type: 'custom',
								silent: true,
								legendHoverLink: false,
								z: 0,
								renderItem: (params, api) => {

									//const location = api.coord([0,0])

									var color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: 'rgba(43, 123, 255, 0.1)'
										},
										{
											offset: 1,
											color: '#3485D3'
										}
									])
									return {
										type: 'group',
										children: [{
												type: 'BottomPanel',
												shape: {
													api,
												},
												style: {
													fill: color
												}
											},


										]
									}
								},
								data: [0]
							},

							{
								type: 'custom',
								label: {
									show: true,
									position: "top",
									textStyle: {
										color: "pink",
									}
								},
								renderItem: (params, api) => {
									//console.log(api.style())
									const location = api.coord([api.value(0), api.value(1)])
									var color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: 'rgba(22, 125, 242, 0.2)'
										},
										{
											offset: 0.5,
											color: 'rgba(106, 176, 255, 0.4)'
										},
										{
											offset: 1,
											color: 'rgba(11, 87, 169, 0.23)'
										}
									])
									return {
										type: 'group',
										children: [{
												type: 'CubeBody',
												shape: {
													api,
													xValue: api.value(0),
													yValue: api.value(1),
													x: location[0],
													y: location[1],
													xAxisPoint: api.coord([api.value(0), 0])
												},
												style: {
													fill: color
												}
											},
											{
												type: 'CubeTop',
												shape: {
													api,
													xValue: api.value(0),
													yValue: api.value(1),
													x: location[0],
													y: location[1],
													xAxisPoint: api.coord([api.value(0), 0])
												},
												style: {
													fill: 'rgba(52, 133, 211, 1)'
												}
											},
											{
												type: 'CubeBottom',
												shape: {
													api,
													xValue: api.value(0),
													yValue: api.value(1),
													x: location[0],
													y: location[1],
													xAxisPoint: api.coord([api.value(0), 0])
												},
												style: {
													fill: 'rgba(52, 133, 211, 1)'
												}
											},

										]
									}
								},
								data: VALUE
							},

						]
					}
				)
				  this.autoHeight = VALUE.length * 35 + 50; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
				  studentnowChartChart.resize({height:this.autoHeight}); 
			}
		}
	}
</script>

<style scoped>
	.nowbox {
		display: flex;
		justify-content: space-around;
		width: 100%;
		flex-wrap: wrap;
	}

	.nowboxitem {
		margin-top: 10px;
	}

	.visitorstoday {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 20px;
	}

	.dormitoryUtilization {
		/* margin-top: 10px; */
		display: flex;
	}

	.useright {
		/* height: 100%; */
		width: 110%;
		margin-left: 30px;
		margin-top: -20px;
	}

	.useright p {
		font-size: 14px;
		color: white;
	}

	.useright span {
		font-size: 14px;
		color: white;
	}

	.userightbox {
		width: 110%;
		height: .18rem;
		background-size: 100% .18rem !important;
		background: url(../assets/img/nohomebox.png) no-repeat;
		border: 1px solid transparent;
	}

	.shu {
		height: 10px;
		width: 3px;
		display: inline-block;
		background-color: rgb(105, 175, 254);
		display: inline-block;
		margin-right: 2px;
	}

	.useleft {
		margin-top: -10px;
	}

	.colorbox {
		display: flex;
		justify-content: space-between;
		height: .15rem;
		width: 97%;
		background-color: rgba(68, 92, 121, 0.6);
		margin-left: 3px;
		margin-top: 3px;
		/* 		width: 80%;
		background-color: red; */
	}

	.peoplestrue {
		width: 100%;
		height: .75rem;
		display: flex;
		padding-left: 20px;
		padding-right: 20px;
	}

	.peoplestruebgc {
		width: 152px;
		height: 144px;
		background: url(../assets/img/peoplestrueimg.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		/*实现垂直居中*/
		align-items: center;
		/*实现水平居中*/
		justify-content: center;
	}

	.peoplestruebox {
		width: 50%;
		height: .75rem;
		margin-left: 10px;
	}

	.peoplestruebgcwz {
		text-align: center;
	}

	.peoplestrueboxitem {
		width: 100%;
		font-size: 14px;
		color: white;
		text-align: left;
		border-bottom: 1px dashed #6AB0FF !important;
		margin-top: 10px;
	}

	#studentnow {
		width: 100%;
		height: 1.4rem;
	}
</style>
