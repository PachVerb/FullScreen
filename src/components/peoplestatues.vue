<template>
	<div>
		<sideTran thisCrrentSys="peoplestatues">
			<div slot="left">
				<nowpeopleslide title="人员实时状态">
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
				<nowpeopleslide title="今日访客统计">

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
				<nowpeopleslide title="学校资产总额统计">
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
				<nowpeopleslide title="学生实时分布">
					<div slot='body' style="height: 40%;">
						<div id="studentnow" :style="{width:'100%'}"></div>
					</div>
				</nowpeopleslide>
			</div>
			<div slot="right">
				<sideItem title="打卡异常统计" style="height: 20%;">
					<div slot='body' style="height: 20%;" class="abnormal">
						<div class="abnormalbox">
							<div id="abnormalecharts"></div>
							<p style="position: absolute;bottom: 10px;left: 42px;color: white;">状态正常</p>
						</div>
						<div class="abnormalbox">
							<div id="abnormalechartssec"></div>
							<p style="position: relative;bottom: 25px;color: white;">状态正常</p>
						</div>
						<div class="abnormalbox">
							<div id="abnormalechartsthir"></div>
							<p style="position: relative;bottom: 25px;color: white;">状态正常</p>
						</div>
					</div>
				</sideItem>
				<sideItem title="常去位置分析" style="height: 20%;">
					<div slot='body' style="height: 20%;">
						<div id="radar">

						</div>
					</div>
				</sideItem>
				<sideItem title="长期异常监测" style="height: 60%;">
					<div slot='body' style="height: 340px;overflow-y: scroll;">
						<div class="ab-list patrol">
							<div class="ab-item" v-for="(item) in abDetailList" :key="item.id">
								<div class="table-item ab-item-name" :style="{width: tableHead[0].width}">
									{{ item.name }}</div>
								<div class="table-item" :style="{width: tableHead[1].width}">{{ item.address }}</div>
								<div class="table-item" :style="{width: tableHead[2].width}">{{ item.date }}</div>
								<div :style="{width: tableHead[3].width}" class="last-address table-item"></div>
							</div>
						</div>
					</div>
				</sideItem>
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
	import AnimatedNumber from "animated-number-vue";
	import sideItem from './sideItem.vue'
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
			currency,
			sideItem,
			AnimatedNumber
		},
		data() {
			return {
				num: 888,
				      value: 1000,
				      duration: 1000,
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
				abDetailList: [{
					id: '1',
					name: '张海',
					date: '无位置感知信息',
				}, {
					id: '2',
					name: '张海',
					date: '无位置感知信息',
				}, {
					id: '3',
					name: '张海',
					date: '无位置感知信息',
				}, {
					id: '4',
					name: '张海',
					date: '无位置感知信息',
				}, {
					id: '5',
					name: '张海',
					date: '无位置感知信息',
				}, {
					id: '6',
					name: '张海',
					date: '无位置感知信息',
				},{
					id: '7',
					name: '张海',
					date: '无位置感知信息',
				},{
					id: '8',
					name: '张海',
					date: '无位置感知信息',
				},{
					id: '9',
					name: '张海',
					date: '无位置感知信息',
				},{
					id: '10',
					name: '张海1',
					date: '无位置感知信息',
				},
				],
				tableHead: [{
					name: '姓名',
					width: '60px'
				}, {
					name: '异常事件',
					width: '0px'
				}, {
					name: '时间',
					width: '130px'
				}, {
					name: '操作',
					width: '64px'
				},
				 ],
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
						this.randernormal()
						this.randernormalsec()
						this.randernormalthir()
						this.radar()
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
			    formatToPrice(value) {
			      return `<h3>$ ${Number(value).toFixed(2)}</h1>`;
			    },
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
					animation: true,
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
						width: "auto",
						height: "auto",
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
							formatter: function(value) {
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
							formatter: function(value) {
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
					series: [{
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
							data: [0],
							animationEasing: 'elasticOut'
						},

						{
							type: 'custom',
							label: {
								show: true,
								position: "top",
								valueAnimation: true,
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
							data: VALUE,
							animationEasing: 'elasticOut'
						},

					]
				})
				this.autoHeight = VALUE.length * 35 + 50; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
				studentnowChartChart.resize({
					height: this.autoHeight
				});
			},
			randernormal() {
				let normalChartDom, normalChartChart, option
				normalChartDom = document.getElementById('abnormalecharts');
				normalChartChart = echarts.init(normalChartDom);
				let angle = 0; //角度，用来做简单的动画效果的
				let value = 55.33;
				option = {
					// backgroundColor: "#061740",
					title: {
						text: '{a|' + value + '}{c|%}',
						x: 'center',
						y: 'center',
						textStyle: {
							rich: {
								a: {
									fontSize: 12,
									color: '#29EEF3'
								},

								c: {
									fontSize: 12,
									color: '#ffffff',
									// padding: [5,0]
								}
							}
						}
					},
					// grid: {
					// 	containLabel: true,
					// 	left: 30,
					// 	top: -20,
					// 	// right: 100,
					// 	bottom: 0
					// },
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
							fontSize: 12,
							padding: [10, 1, 10, 0]
						},
						selectedMode: false
					},
					series: [{
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								return {
									type: 'arc',
									shape: {
										cx: api.getWidth() / 2,
										cy: api.getHeight() / 2,
										r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
										startAngle: (0 + angle) * Math.PI / 180,
										endAngle: (90 + angle) * Math.PI / 180
									},
									style: {
										stroke: "#0CD3DB",
										fill: "transparent",
										lineWidth: 1.5
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								return {
									type: 'arc',
									shape: {
										cx: api.getWidth() / 2,
										cy: api.getHeight() / 2,
										r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
										startAngle: (180 + angle) * Math.PI / 180,
										endAngle: (270 + angle) * Math.PI / 180
									},
									style: {
										stroke: "#0CD3DB",
										fill: "transparent",
										lineWidth: 1.5
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								return {
									type: 'arc',
									shape: {
										cx: api.getWidth() / 2,
										cy: api.getHeight() / 2,
										r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
										startAngle: (270 + -angle) * Math.PI / 180,
										endAngle: (40 + -angle) * Math.PI / 180
									},
									style: {
										stroke: "#0CD3DB",
										fill: "transparent",
										lineWidth: 1.5
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								return {
									type: 'arc',
									shape: {
										cx: api.getWidth() / 2,
										cy: api.getHeight() / 2,
										r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
										startAngle: (90 + -angle) * Math.PI / 180,
										endAngle: (220 + -angle) * Math.PI / 180
									},
									style: {
										stroke: "#0CD3DB",
										fill: "transparent",
										lineWidth: 1.5
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								let x0 = api.getWidth() / 2;
								let y0 = api.getHeight() / 2;
								let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85;
								let point = getCirlPoint(x0, y0, r, (90 + -angle))
								return {
									type: 'circle',
									shape: {
										cx: point.x,
										cy: point.y,
										r: 4
									},
									style: {
										stroke: "#0CD3DB", //粉
										fill: "#0CD3DB"
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5", //绿点
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								let x0 = api.getWidth() / 2;
								let y0 = api.getHeight() / 2;
								let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85;
								let point = getCirlPoint(x0, y0, r, (270 + -angle))
								return {
									type: 'circle',
									shape: {
										cx: point.x,
										cy: point.y,
										r: 4
									},
									style: {
										stroke: "#0CD3DB", //绿
										fill: "#0CD3DB"
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: '吃猪肉频率',
							type: 'pie',
							radius: ['58%', '45%'],
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
											color: { // 完成的圆环的颜色
												colorStops: [{
													offset: 0,
													color: '#4FADFD' // 0% 处的颜色
												}, {
													offset: 1,
													color: '#28E8FA' // 100% 处的颜色
												}]
											},
										}
									}
								},
								{
									value: 100 - value,
									name: "",
									label: {
										normal: {
											show: false
										}
									},
									itemStyle: {
										normal: {
											color: "rgb(38,73,110)"
										}
									}
								}
							]
						},

						{ //分割线
							name: "",
							type: "gauge",
							radius: "58%",
							center: ['50%', '50%'],
							startAngle: 0,
							endAngle: 359.9,
							splitNumber: 8,
							hoverAnimation: true,
							axisTick: {
								show: false
							},
							splitLine: {
								length: 7,
								lineStyle: {
									width: 2,
									color: "rgb(23,49,77,0.5)"
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

				//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
				function getCirlPoint(x0, y0, r, angle) {
					let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
					let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
					return {
						x: x1,
						y: y1
					}
				}

				function draw() {
					angle = angle + 3
					normalChartChart.setOption(option, true)
					//window.requestAnimationFrame(draw);
				}

				setInterval(function() {
					//用setInterval做动画感觉有问题
					draw()
				}, 100);

			},
			randernormalsec() {
				let normalChartDomsec, normalChartChartsec, option
				normalChartDomsec = document.getElementById('abnormalechartssec');
				normalChartChartsec = echarts.init(normalChartDomsec);
				console.log("889898", normalChartChartsec)
				let angle = 0; //角度，用来做简单的动画效果的
				let value = 55.33;
				option = {
					// backgroundColor: "#061740",
					title: {
						text: '{a|' + value + '}{c|%}',
						x: 'center',
						y: 'center',
						textStyle: {
							rich: {
								a: {
									fontSize: 12,
									color: '#29EEF3'
								},

								c: {
									fontSize: 12,
									color: '#ffffff',
									// padding: [5,0]
								}
							}
						}
					},
					// grid: {
					// 	containLabel: true,
					// 	left: 30,
					// 	top: -20,
					// 	// right: 100,
					// 	bottom: 0
					// },
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
							fontSize: 12,
							padding: [10, 1, 10, 0]
						},
						selectedMode: false
					},
					series: [{
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								return {
									type: 'arc',
									shape: {
										cx: api.getWidth() / 2,
										cy: api.getHeight() / 2,
										r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
										startAngle: (0 + angle) * Math.PI / 180,
										endAngle: (90 + angle) * Math.PI / 180
									},
									style: {
										stroke: "#0CD3DB",
										fill: "transparent",
										lineWidth: 1.5
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								return {
									type: 'arc',
									shape: {
										cx: api.getWidth() / 2,
										cy: api.getHeight() / 2,
										r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
										startAngle: (180 + angle) * Math.PI / 180,
										endAngle: (270 + angle) * Math.PI / 180
									},
									style: {
										stroke: "#0CD3DB",
										fill: "transparent",
										lineWidth: 1.5
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								return {
									type: 'arc',
									shape: {
										cx: api.getWidth() / 2,
										cy: api.getHeight() / 2,
										r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
										startAngle: (270 + -angle) * Math.PI / 180,
										endAngle: (40 + -angle) * Math.PI / 180
									},
									style: {
										stroke: "#0CD3DB",
										fill: "transparent",
										lineWidth: 1.5
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								return {
									type: 'arc',
									shape: {
										cx: api.getWidth() / 2,
										cy: api.getHeight() / 2,
										r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
										startAngle: (90 + -angle) * Math.PI / 180,
										endAngle: (220 + -angle) * Math.PI / 180
									},
									style: {
										stroke: "#0CD3DB",
										fill: "transparent",
										lineWidth: 1.5
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								let x0 = api.getWidth() / 2;
								let y0 = api.getHeight() / 2;
								let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85;
								let point = getCirlPoint(x0, y0, r, (90 + -angle))
								return {
									type: 'circle',
									shape: {
										cx: point.x,
										cy: point.y,
										r: 4
									},
									style: {
										stroke: "#0CD3DB", //粉
										fill: "#0CD3DB"
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5", //绿点
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								let x0 = api.getWidth() / 2;
								let y0 = api.getHeight() / 2;
								let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85;
								let point = getCirlPoint(x0, y0, r, (270 + -angle))
								return {
									type: 'circle',
									shape: {
										cx: point.x,
										cy: point.y,
										r: 4
									},
									style: {
										stroke: "#0CD3DB", //绿
										fill: "#0CD3DB"
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: '吃猪肉频率',
							type: 'pie',
							radius: ['58%', '45%'],
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
											color: { // 完成的圆环的颜色
												colorStops: [{
													offset: 0,
													color: '#F6886A' // 0% 处的颜色
												}, {
													offset: 1,
													color: '#F6886A' // 100% 处的颜色
												}]
											},
										}
									}
								},
								{
									value: 100 - value,
									name: "",
									label: {
										normal: {
											show: false
										}
									},
									itemStyle: {
										normal: {
											color: "rgb(38,73,110)"
										}
									}
								}
							]
						},

						{ //分割线
							name: "",
							type: "gauge",
							radius: "58%",
							center: ['50%', '50%'],
							startAngle: 0,
							endAngle: 359.9,
							splitNumber: 8,
							hoverAnimation: true,
							axisTick: {
								show: false
							},
							splitLine: {
								length: 7,
								lineStyle: {
									width: 2,
									color: "rgb(23,49,77,0.5)"
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

				//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
				function getCirlPoint(x0, y0, r, angle) {
					let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
					let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
					return {
						x: x1,
						y: y1
					}
				}

				function draw() {
					angle = angle + 3
					normalChartChartsec.setOption(option, true)
					//window.requestAnimationFrame(draw);
				}

				setInterval(function() {
					//用setInterval做动画感觉有问题
					draw()
				}, 100);

			},
			randernormalthir() {
				let normalChartDom, normalChartChart, option
				normalChartDom = document.getElementById('abnormalechartsthir');
				normalChartChart = echarts.init(normalChartDom);
				let angle = 0; //角度，用来做简单的动画效果的
				let value = 55.33;
				option = {
					// backgroundColor: "#061740",
					title: {
						text: '{a|' + value + '}{c|%}',
						x: 'center',
						y: 'center',
						textStyle: {
							rich: {
								a: {
									fontSize: 12,
									color: '#29EEF3'
								},

								c: {
									fontSize: 12,
									color: '#ffffff',
									// padding: [5,0]
								}
							}
						}
					},
					// grid: {
					// 	containLabel: true,
					// 	left: 30,
					// 	top: -20,
					// 	// right: 100,
					// 	bottom: 0
					// },
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
							fontSize: 12,
							padding: [10, 1, 10, 0]
						},
						selectedMode: false
					},
					series: [{
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								return {
									type: 'arc',
									shape: {
										cx: api.getWidth() / 2,
										cy: api.getHeight() / 2,
										r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
										startAngle: (0 + angle) * Math.PI / 180,
										endAngle: (90 + angle) * Math.PI / 180
									},
									style: {
										stroke: "#0CD3DB",
										fill: "transparent",
										lineWidth: 1.5
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								return {
									type: 'arc',
									shape: {
										cx: api.getWidth() / 2,
										cy: api.getHeight() / 2,
										r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
										startAngle: (180 + angle) * Math.PI / 180,
										endAngle: (270 + angle) * Math.PI / 180
									},
									style: {
										stroke: "#0CD3DB",
										fill: "transparent",
										lineWidth: 1.5
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								return {
									type: 'arc',
									shape: {
										cx: api.getWidth() / 2,
										cy: api.getHeight() / 2,
										r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
										startAngle: (270 + -angle) * Math.PI / 180,
										endAngle: (40 + -angle) * Math.PI / 180
									},
									style: {
										stroke: "#0CD3DB",
										fill: "transparent",
										lineWidth: 1.5
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								return {
									type: 'arc',
									shape: {
										cx: api.getWidth() / 2,
										cy: api.getHeight() / 2,
										r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
										startAngle: (90 + -angle) * Math.PI / 180,
										endAngle: (220 + -angle) * Math.PI / 180
									},
									style: {
										stroke: "#0CD3DB",
										fill: "transparent",
										lineWidth: 1.5
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5",
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								let x0 = api.getWidth() / 2;
								let y0 = api.getHeight() / 2;
								let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85;
								let point = getCirlPoint(x0, y0, r, (90 + -angle))
								return {
									type: 'circle',
									shape: {
										cx: point.x,
										cy: point.y,
										r: 4
									},
									style: {
										stroke: "#0CD3DB", //粉
										fill: "#0CD3DB"
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: "ring5", //绿点
							type: 'custom',
							coordinateSystem: "none",
							renderItem: function(params, api) {
								let x0 = api.getWidth() / 2;
								let y0 = api.getHeight() / 2;
								let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85;
								let point = getCirlPoint(x0, y0, r, (270 + -angle))
								return {
									type: 'circle',
									shape: {
										cx: point.x,
										cy: point.y,
										r: 4
									},
									style: {
										stroke: "#0CD3DB", //绿
										fill: "#0CD3DB"
									},
									silent: true
								};
							},
							data: [0]
						}, {
							name: '吃猪肉频率',
							type: 'pie',
							radius: ['58%', '45%'],
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
											color: { // 完成的圆环的颜色
												colorStops: [{
													offset: 0,
													color: '#E5BC80' // 0% 处的颜色
												}, {
													offset: 1,
													color: '#E5BC80' // 100% 处的颜色
												}]
											},
										}
									}
								},
								{
									value: 100 - value,
									name: "",
									label: {
										normal: {
											show: false
										}
									},
									itemStyle: {
										normal: {
											color: "rgb(38,73,110)"
										}
									}
								}
							]
						},

						{ //分割线
							name: "",
							type: "gauge",
							radius: "58%",
							center: ['50%', '50%'],
							startAngle: 0,
							endAngle: 359.9,
							splitNumber: 8,
							hoverAnimation: true,
							axisTick: {
								show: false
							},
							splitLine: {
								length: 7,
								lineStyle: {
									width: 2,
									color: "rgb(23,49,77,0.5)"
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

				//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
				function getCirlPoint(x0, y0, r, angle) {
					let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
					let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
					return {
						x: x1,
						y: y1
					}
				}

				function draw() {
					angle = angle + 3
					normalChartChart.setOption(option, true)
					//window.requestAnimationFrame(draw);
				}

				setInterval(function() {
					//用setInterval做动画感觉有问题
					draw()
				}, 100);

			},
			radar() {
				let radarChartDom, radarChartChart,option
				radarChartDom = document.getElementById('radar');
				radarChartChart = echarts.init(radarChartDom);
				option = {
					// backgroundColor:"#031d33",
					tooltip: {},
					radar: {
						radius: "80%", //大小
						nameGap: 1, // 图中工艺等字距离图的距离
						center: ["50%", "50%"], // 图的位置
						name: {
							textStyle: {
								color: "rgba(101, 213, 255, 1)",
								fontSize: 16
							},
							formatter: function(name) {
								return name;
							}
						},
						indicator: [{
								"name": 'a',
								"max": "100"
							},
							{
								"name": 'b',
								"max": "100"
							},
							{
								"name": 'c',
								"max": "100"
							},
							{
								"name": 'd',
								"max": "100"
							},
							{
								"name": 'e',
								"max": "100"
							},
							{
								"name": 'a',
								"max": "100"
							},

						],
						axisLine: {
							lineStyle: {

								color: "rgba(153, 209, 246, 0.2)"
							}
						},
						splitArea: {
							show: false,
							areaStyle: {
								color: "rgba(255,0,0,0)" // 图表背景的颜色
							}
						},
						splitLine: {
							show: true,
							lineStyle: {
								width: 1,
								color: "rgba(153, 209, 246, 0.2)" // 设置网格的颜色
							}
						}
					},

					series: [{
						name: "报警类型分析",
						type: "radar",
						symbol: "angle",
						itemStyle: {
							normal: {
								areaStyle: {
									type: "default"
								}
							}
						},
						data: [{
							symbol: "circle",
							symbolSize: 5,
							value: [70, 42, 63, 84, 75, 34],
							areaStyle: {
								color: "rgba(64, 205, 241, 0.2)"
							},
							itemStyle: {
								normal: {
									borderWidth: 1,
									color: "RGBA(0, 34, 66, 1)",
									borderColor: "rgba(146, 225, 255, 1)"
								}
							},
							lineStyle: {
								color: "rgba(146, 225, 255, 1)",
								width: 1
							}
						}]
					}]
				}
				radarChartChart.setOption(option, true)
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
		/* margin-top: 10px; */
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

	.abnormal {
		margin-top: 20px;
		display: flex;
		justify-content: space-around;
		position: relative;
	}

	.abnormalbox {
		background: url(../assets/personnelsituation/rightbox.png) no-repeat;
		width: 100px;
		height: 140px;
		background-size: 100px 140px;
	}

	#abnormalecharts {
		width: 100px;
		height: 140px;
		position: relative;
		top: -10px;
	}

	#abnormalechartssec {
		width: 100px;
		height: 140px;
		position: relative;
		top: -10px;
	}

	#abnormalechartsthir {
		width: 100px;
		height: 140px;
		position: relative;
		top: -10px;
	}
	#radar{
		width:380px;
		height: 150px;
	}
</style>
<style lang="less" scoped>
	.ab-nav {
		padding: 16px 0;
		font-size: 14px;

		span {
			box-sizing: border-box;
			display: inline-block;
			margin: 0 8px;
			padding-bottom: 6px;
			color: rgba(255, 255, 255, .8);
			cursor: pointer;
		}

		.ab-check-nav {
			color: rgba(0, 245, 255, 1);
			border-bottom: 1px solid rgba(0, 245, 255, 1);
		}
	}

	.ab-list {
		font-size: 12px;
	}

	.ab-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 6px 16px 0;
		padding: 0 0 6px;
		border-bottom: 1px solid rgba(106, 176, 255, .5);
	}

	.ab-item-name,
	.ab-item-date {
		margin-top: 5px;
		padding-left: 6px;
		text-align: left;
		border-left: 1px solid #00F5FF;
		color: rgba(255, 255, 255, .5);
	}

	.ab-item-name {
		font-size: 14px;
		color: #F6FAFF;
		font-weight: bold;
	}

	.ab-close-btn {
		width: 58px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		background-image: url('../assets/img/btn-close-img.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.last-address {
		width: 64px;
		height: 26px;
		background-image: url('../assets/img/last-address.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.patrol {
		font-size: 12px;

		.ab-item-name {
			margin-top: 0;
			font-size: 12px;
			border: none;
		}
	}

	.table-head {
		margin: 0 16px;
		font-size: 12px;
		color: rgba(255, 255, 255, .8);
		border-bottom: 1px solid rgba(63, 151, 207, .5);

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
		color: white;
	}

	.last-address {
		width: 64px;
		height: 26px;
		background-image: url('../assets/personnelsituation/seelocation.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
</style>
