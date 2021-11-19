<template>
	<div style="height: 100%;">
		<sideTran thisCrrentSys="peoplestatues">
			<div slot="left" style="height: 100%;">
				<sideItem title="人员实时状态" transitionType="left" delay="500" height="25%">
					<div slot='body' class="nowbox">
						<currency class="nowboxitem" :boxnum="oneobj.num" :boxtitle="oneobj.title"
							:boxcolor="oneobj.color" :boxuntil="oneobj.until"></currency>
						<currency class="nowboxitem" :boxnum="secobj.num" :boxtitle="secobj.title"
							:boxcolor="secobj.color" :boxuntil="secobj.until"></currency>
						<currency class="nowboxitem" :boxnum="thirobj.num" :boxtitle="thirobj.title"
							:boxcolor="thirobj.color" :boxuntil="thirobj.until"></currency>
						<currency class="nowboxitem" :boxnum="fourobj.num" :boxtitle="fourobj.title"
							:boxcolor="fourobj.color" :boxuntil="fourobj.until"></currency>
					</div>
				</sideItem>
				<sideItem title="今日访客统计" transitionType="left" delay="1000" height="25%">

					<div slot='body' class="visitorstoday">

						<div class="dormitoryUtilization">
							<div class="useleft">
								<img src="../assets/img/visitorstodayimg.png">
							</div>
							<div class="useright">
								<div class="userightbox">
									<div class="colorbox">
										<div style="position: relative;top: 6px;font-size: 14px; width: 130px;">
											<span class="shu"></span>
											<span class="userboxwz">来访人员总数</span>
										</div>
										<div style="position: relative;top: 6px;font-size: 14px;width: 30%;">
											<span style="color: #00F5FF;">50</span><span style="color: gray;">人</span>
										</div>

									</div>
								</div>
								<div class="userightbox" style="margin-top: 10px;">
									<div class="colorbox">
										<div
											style="position: relative;top: 6px;left: -14px;  font-size: 14px;width: 130px;">
											<span class="shu"></span>
											<span class="userboxwz">在访人员</span>
										</div>
										<div style="position: relative;top: 6px;font-size: 14px;width: 30%;">
											<span style="color: #00F5FF;">50</span><span style="color: gray;">人</span>
										</div>

									</div>
								</div>
								<div class="userightbox" style="margin-top: 10px;">
									<div class="colorbox">
										<div
											style="position: relative;top: 6px;left: -14px; font-size: 14px;width: 130px;">
											<span class="shu"></span>
											<span class="userboxwz">宿舍访客</span>
										</div>
										<div style="position: relative;top: 6px;font-size: 14px;width: 30%;">
											<span style="color: #00F5FF;">50</span><span style="color: gray;">人</span>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</sideItem>
				<sideItem title="学生结构" transitionType="left" delay="1500" height="25%">
					<div slot='body' class="peoplestrue">
						<div class="peoplestruebgc">
							<!-- <div class="peoplestruebgcwz">
								<p style="font-size: 26px;color: #00F5FF;">44466</p>
								<p style="font-size: 12px; color: white;">学生总人数</p>
							</div> -->
							<div class="chartBox">
								<img src="../assets/pieimg/fire/firearc.png" class="bg-ratio-animImg" />
								<img src="../assets/pieimg/fire/fireleftgear.png" class="bg-ratio" />
								<div class="chart-ratio" id="ratioChart"></div>
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
				</sideItem>
				<sideItem title="学生实时分布" transitionType="left" delay="2000" height="25%">
					<div slot='body'>
						<div id="studentnow"></div>
					</div>
				</sideItem>
			</div>
			<div slot="right">
				<sideItem title="打卡异常统计" transitionType="right" delay="500">
					<div slot='body' style="height: 20%;width: 100%;" class="abnormal">
						<div class="abnormalbox eq-num-box-chart">
							<img src="../assets/pieimg/fire/gearout.png" alt="" class="gear">
							<img src="../assets/pieimg/fire/gearout.png" alt="" class="gearout">
							<div id="abnormalecharts"></div>
							<p style="position: relative;bottom: 25px;color: white;">状态正常</p>
						</div>
						<div class="abnormalbox eq-num-box-chart">
							<img src="../assets/pieimg/fire/gearout.png" alt="" class="gear">
							<img src="../assets/pieimg/fire/gearout.png" alt="" class="gearout">
							<div id="abnormalechartssec"></div>
							<p style="position: relative;bottom: 25px;color: white;">状态异常</p>
						</div>
						<div class="abnormalbox eq-num-box-chart">
							<img src="../assets/pieimg/fire/gearout.png" alt="" class="gear">
							<img src="../assets/pieimg/fire/gearout.png" alt="" class="gearout">
							<div id="abnormalechartsthir"></div>
							<p style="position: relative;bottom: 25px;color: white;">打卡缺失</p>
						</div>
					</div>
				</sideItem>
				<sideItem title="常去位置分析" style="height: 20%;" transitionType="right" delay="1000">
					<div slot='body' style="height: 20%;">
						<div id="radar"></div>
					</div>
				</sideItem>
				<sideItem title="长期异常监测" style="height: 60%;"transitionType="right" delay="1500" height="40%">
					<div slot='body' style="height:100%;width: 100%; ">
						<div class="ab-list patrol">
							<div class="ab-item" v-for="(item) in abDetailList" :key="item.id">
								<div class="table-item ab-item-name" :style="{width: tableHead[0].width}">
									{{ item.name }}
								</div>
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
				colorone: ["#6AB0FF", '#6AB0FF'],
				colortwo: ["#F6886A", "#F6886A"],
				colorthir: ["#E5BC80", "#E5BC80"],
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
				}, {
					id: '7',
					name: '张海',
					date: '无位置感知信息',
				}, {
					id: '8',
					name: '张海',
					date: '无位置感知信息',
				}, {
					id: '9',
					name: '张海',
					date: '无位置感知信息',
				}, {
					id: '11',
					name: '张海1',
					date: '无位置感知信息',
				}, {
					id: '12',
					name: '张海1',
					date: '无位置感知信息',
				}, {
					id: '13',
					name: '张海1',
					date: '无位置感知信息',
				}, {
					id: '14',
					name: '张海1',
					date: '无位置感知信息',
				}, {
					id: '15',
					name: '张海1',
					date: '无位置感知信息',
				}, ],
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
				}, ],
				gatherGeoJson: {
					'type': 'FeatureCollection',
					'features': []
				},
			}
		},
		computed: {
			...mapGetters(['map','currentSys','currentSysModule'])
		},
		watch: {
			currentSysModule(val){
				if(this.currentSys === 'peoplestatues'){
					if(this.currentSysModule){

					}
				}
			}
		},
		mounted() {
			// console.log(this.num, 'assets11', this.oneobj)

		},
		methods: {
			init() {
				this.map.setBearing(0)
				this.map.setPitch(0)
				this.map.setLayoutProperty('modellayer', 'visibility', 'none')
				this.hideBuildingText()
				this.$nextTick(() => {
					setTimeout(() => {
						this.randerBar()
						this.randernormal()
						this.randernormalsec()
						this.randernormalthir()
						this.renderstudentpie()
					}, 1500)
					this.radar()

				})
				this.createGatherLayer()
			},
			destroySys(){
				this.showBuildingText()
				this.map.setLayoutProperty('modellayer', 'visibility', '')
				this.gatherGeoJson.features = []
				if(this.map.getSource('peopleGatherData')) this.map.getSource('peopleGatherData').setData(this.gatherGeoJson)
			},
			createGatherLayer(){
				this.createGatherData()
				if(!this.map.getSource('peopleGatherData')){
					this.map.addSource('peopleGatherData', {
						type: 'geojson',
						data: this.gatherGeoJson
					})
				} else {
					this.map.getSource('peopleGatherData').setData(this.gatherGeoJson)
				}
				if(!this.map.getLayer('peopleGather')){
					this.map.addLayer({
						id: 'peopleGather',
						source: 'peopleGatherData',//上述定义的source
						type: 'circle',//图层类型，见3.5节中图层描述
						layout: {
						
						},
						paint: {
							'circle-color': 'red'
						}
					})
				}
			},
			createGatherData(){
				this.gatherGeoJson.features.push({
          type: 'circle',
          geometry: {"type":"Polygon","coordinates":[[[104.06030589667,30.59173094939],[104.06030379654,30.5918125773],[104.06034770009,30.5918134148],[104.06034979954,30.59173178626],[104.06030589667,30.59173094939]]]},
          properties: { 
						
          }
				})
				this.map.getSource('peopleGatherData').setData(this.gatherGeoJson)
			},
			renderstudentpie() {

				this.ratioList = [{
						name: "照明",
						val: 1100,
						color: 'rgba(169,133,238,0.8)'
					},
					{
						name: "空调",
						val: 444,
						color: 'rgba(196,144,191,0.8)'
					},
					{
						name: "机房",
						val: 501,
						color: 'rgba(19,181,177,0.8)'
					},
					{
						name: "应急通道",
						val: 300,
						color: 'rgba(229,188,128,0.8)'
					}
				]
				let dom = document.getElementById('ratioChart');
				let chart = echarts.init(dom);
				let total = this.ratioList.reduce((sum, item) => sum + item.val, 0);
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
					series: [{
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
							animationDelay: function(idx) {
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
										formatter: '{b|' + total + '}' + '\n' + '{c|学生总人数}',
										rich: {
											b: {
												color: 'rgba(0, 245, 255, 1)',
												fontSize: 13,
												lineHeight: 18
											},
											c: {
												color: 'rgba(255, 255, 255, .8)',
												fontSize: 10,
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
						ctx.lineTo(shape.api.getWidth() - 70, xAxisPoint[1] - 20)
						ctx.lineTo(shape.api.getWidth() - 30, xAxisPoint[1] + 30)
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
				let value = 15;
				let config = {
					color: ["rgba(19, 181, 177, 1)", 'rgba(19, 181, 177, 1)'],
					data: [{
							name: '',
							value: 77,
						},
						{
							name: '',
							value: 23,
						},
					],
					// title: {
					// 	subtext: '公园基础设施提升',
					// },
				};
				let num = config.data[0].value;
				let unit = '%';
				let title = '进度';
				option = {

					color: [{
							type: 'linear',
							x: 0,
							y: 0,
							x2: 1,
							y2: 1,
							colorStops: [{
									offset: 0,
									color: config.color[0],
								},
								{
									offset: 1,
									color: config.color[1],
								},
							],
							global: false,
						},
						// '#252f54'//未填满的颜色
						'rgba(32,187,252,0.15)'
					],
					title: Object.assign({
							text: '{a|' + num + '}{b|%}',
							x: 'center',
							y: 'center',
							textStyle: {
								rich: {
									a: {
										fontSize: 22,
										color: '#00F5FF',
										fontWeight: '800',
										// lineHeight: 22,
										// marginRight: '100px 138px 0 0',
									},
									b: {
										fontSize: 14,
										color: "rgba(255,255,255,0.6)"
									}
								},
							},
							subtext: '',
							top: '44%',
							left: '46%',
							textAlign: 'center',
							itemGap: 280,
							subtextStyle: {
								color: '#fff',
								fontSize: 36,
								align: 'center',
							},
						},
						config.title
					),
					series: [
						//环形
						{
							name: '',
							type: 'pie',
							radius: ['60%', '80%'],
							center: ['50%', '50%'],
							hoverAnimation: false, //4.x版本使用取消悬浮放大
							emphasis: {
								//5.x版本使用取消悬浮放大
								scale: false,
								label: {
									show: false /* 5.x版本是label.emphasis */ ,
								},
							},
							// label: { 4.x版本是label.emphasis
							//     // normal: {
							//         show: false,
							//     // },
							//     emphasis: {
							//         show: false,
							//     },
							// },
							zlevel: 1,
							labelLine: {
								// normal: {/* 5.x版本中去掉了normal */
								show: false,
								// },
							},
							data: config.data,
						},
						//环形分割线
						{
							name: '分割线',
							type: 'gauge',
							radius: '100%', //配合splitLine里的length一起调
							clockwise: true,
							startAngle: '90',
							center: ['50%', '50%'],
							endAngle: '-269.9999',
							splitNumber: 14,
							zlevel: 2,
							detail: {
								offsetCenter: [10, 20],
								formatter: ' ',
							},
							axisLine: {
								lineStyle: {
									width: 1,
									opacity: 0,
								},
							},
							axisTick: {
								show: false,
							},
							markArea: {
								itemStyle: {
									color: '#0f0',
								},
							},
							splitLine: {
								show: true,
								length: 11, //配合radius一起调
								padding: [0, 0, 0],
								lineStyle: {
									// color: 'rgba(21, 82, 105, 0.6)',
									color: '#051F54',
									width: 3,
								},
							},
							axisLabel: {
								show: false,
							},
						},
					],
				};
				normalChartChart.setOption(option, true)
			},

			randernormalsec() {
				let normalChartDomsec, normalChartChartsec, option
				normalChartDomsec = document.getElementById('abnormalechartssec');
				normalChartChartsec = echarts.init(normalChartDomsec);

				// console.log(val, "45655")
				let angle = 0; //角度，用来做简单的动画效果的
				let value = 15;
				let config = {
					color: ["rgba(246, 136, 106, 1)", 'rgba(246, 136, 106, 1)'],
					data: [{
							name: '',
							value: 77,
						},
						{
							name: '',
							value: 23,
						},
					],
					// title: {
					// 	subtext: '公园基础设施提升',
					// },
				};
				let num = config.data[0].value;
				let unit = '%';
				let title = '进度';
				option = {

					color: [{
							type: 'linear',
							x: 0,
							y: 0,
							x2: 1,
							y2: 1,
							colorStops: [{
									offset: 0,
									color: config.color[0],
								},
								{
									offset: 1,
									color: config.color[1],
								},
							],
							global: false,
						},
						// '#252f54'//未填满的颜色
						'rgba(32,187,252,0.15)'
					],
					title: Object.assign({
							text: '{a|' + num + '}{b|%}',
							x: 'center',
							y: 'center',
							textStyle: {
								rich: {
									a: {
										fontSize: 22,
										color: '#00F5FF',
										fontWeight: '800',
										// lineHeight: 22,
										// marginRight: '100px 138px 0 0',
									},
									b: {
										fontSize: 14,
										color: "rgba(255,255,255,0.6)"
									}
								},
							},
							subtext: '',
							top: '44%',
							left: '46%',
							textAlign: 'center',
							itemGap: 280,
							subtextStyle: {
								color: '#fff',
								fontSize: 36,
								align: 'center',
							},
						},
						config.title
					),
					series: [
						//环形
						{
							name: '',
							type: 'pie',
							radius: ['60%', '80%'],
							center: ['50%', '50%'],
							hoverAnimation: false, //4.x版本使用取消悬浮放大
							emphasis: {
								//5.x版本使用取消悬浮放大
								scale: false,
								label: {
									show: false /* 5.x版本是label.emphasis */ ,
								},
							},
							// label: { 4.x版本是label.emphasis
							//     // normal: {
							//         show: false,
							//     // },
							//     emphasis: {
							//         show: false,
							//     },
							// },
							zlevel: 1,
							labelLine: {
								// normal: {/* 5.x版本中去掉了normal */
								show: false,
								// },
							},
							data: config.data,
						},
						//环形分割线
						{
							name: '分割线',
							type: 'gauge',
							radius: '100%', //配合splitLine里的length一起调
							clockwise: true,
							startAngle: '90',
							center: ['50%', '50%'],
							endAngle: '-269.9999',
							splitNumber: 14,
							zlevel: 2,
							detail: {
								offsetCenter: [10, 20],
								formatter: ' ',
							},
							axisLine: {
								lineStyle: {
									width: 1,
									opacity: 0,
								},
							},
							axisTick: {
								show: false,
							},
							markArea: {
								itemStyle: {
									color: '#0f0',
								},
							},
							splitLine: {
								show: true,
								length: 13, //配合radius一起调
								padding: [0, 0, 0],
								lineStyle: {
									// color: 'rgba(21, 82, 105, 0.6)',
									color: '#051F54',
									width: 3,
								},
							},
							axisLabel: {
								show: false,
							},
						},
					],
				};
				normalChartChartsec.setOption(option, true)
			},

			randernormalthir() {
				let abnormalechartsthirChartDom, abnormalechartsthirChartChart, option
				abnormalechartsthirChartDom = document.getElementById('abnormalechartsthir');
				abnormalechartsthirChartChart = echarts.init(abnormalechartsthirChartDom);
				// console.log(val, "45655")
				let angle = 0; //角度，用来做简单的动画效果的
				let value = 15;
				let config = {
					color: ["rgba(229, 188, 128, 1)", 'rgba(229, 188, 128, 1)'],
					data: [{
							name: '',
							value: 77,
						},
						{
							name: '',
							value: 23,
						},
					],
					// title: {
					// 	subtext: '公园基础设施提升',
					// },
				};
				let num = config.data[0].value;
				let unit = '%';
				let title = '进度';
				option = {

					color: [{
							type: 'linear',
							x: 0,
							y: 0,
							x2: 1,
							y2: 1,
							colorStops: [{
									offset: 0,
									color: config.color[0],
								},
								{
									offset: 1,
									color: config.color[1],
								},
							],
							global: false,
						},
						// '#252f54'//未填满的颜色
						'rgba(32,187,252,0.15)'
					],
					title: Object.assign({
							text: '{a|' + num + '}{b|%}',
							x: 'center',
							y: 'center',
							textStyle: {
								rich: {
									a: {
										fontSize: 22,
										color: '#00F5FF',
										fontWeight: '800',
										// lineHeight: 22,
										// marginRight: '100px 138px 0 0',
									},
									b: {
										fontSize: 14,
										color: "rgba(255,255,255,0.6)"
									}
								},
							},
							subtext: '',
							top: '44%',
							left: '46%',
							textAlign: 'center',
							itemGap: 280,
							subtextStyle: {
								color: '#fff',
								fontSize: 36,
								align: 'center',
							},
						},
						config.title
					),
					series: [
						//环形
						{
							name: '',
							type: 'pie',
							radius: ['60%', '80%'],
							center: ['50%', '50%'],
							hoverAnimation: false, //4.x版本使用取消悬浮放大
							emphasis: {
								//5.x版本使用取消悬浮放大
								scale: false,
								label: {
									show: false /* 5.x版本是label.emphasis */ ,
								},
							},
							// label: { 4.x版本是label.emphasis
							//     // normal: {
							//         show: false,
							//     // },
							//     emphasis: {
							//         show: false,
							//     },
							// },
							zlevel: 1,
							labelLine: {
								// normal: {/* 5.x版本中去掉了normal */
								show: false,
								// },
							},
							data: config.data,
						},
						//环形分割线
						{
							name: '分割线',
							type: 'gauge',
							radius: '100%', //配合splitLine里的length一起调
							clockwise: true,
							startAngle: '90',
							center: ['50%', '50%'],
							endAngle: '-269.9999',
							splitNumber: 14,
							zlevel: 2,
							detail: {
								offsetCenter: [10, 20],
								formatter: ' ',
							},
							axisLine: {
								lineStyle: {
									width: 1,
									opacity: 0,
								},
							},
							axisTick: {
								show: false,
							},
							markArea: {
								itemStyle: {
									color: '#0f0',
								},
							},
							splitLine: {
								show: true,
								length: 13, //配合radius一起调
								padding: [0, 0, 0],
								lineStyle: {
									// color: 'rgba(21, 82, 105, 0.6)',
									color: '#051F54',
									width: 3,
								},
							},
							axisLabel: {
								show: false,
							},
						},
					],
				};
				abnormalechartsthirChartChart.setOption(option, true)
			},
			radar() {
				let data = [{
						name: '教学楼',
						val: 80
					},
					{
						name: '教学楼',
						val: 45
					},
					{
						name: '教学楼',
						val: 25
					},
					{
						name: '教学楼',
						val: 20
					},
					{
						name: '教学楼',
						val: 15
					},
					{
						name: '宿舍楼',
						val: 42
					},
				]
				let radarChartDom, radarChartChart, option
				radarChartDom = document.getElementById('radar');
				radarChartChart = echarts.init(radarChartDom);
				option = {
					animationEasing: 'cubicInout',
					animationDuration: 3000,
					tooltip: {
						confine: true,//提示框限制在图表内
						backgroundColor: 'rgba(44,62,80,0.8)',
						textStyle: {
							color: 'rgba(255,255,255,0.8)',
						},
						formatter: function() {
							var html = '';
							data.forEach(item => {
								html += `${item.name} : ${item.val/100}<br/>`;
							});
							return html
						},
					},
					radar: {
						radius: "75%", //大小
						nameGap: 5, // 图中工艺等字距离图的距离
						center: ["50%", "50%"], // 图的位置
						name: {
							textStyle: {
								color: "rgba(255, 255, 255, 0.8)",
								fontSize: 14,
								rich: {
									per: {
										color: '#00F5FF',
										fontSize: 15
									},
									hr: {
										borderColor: 'rgba(153, 209, 246, 0.2)',
										width: '100%',
										borderWidth: 1,
										height: 0,
										align: 'left'
									}
								}
							},
							formatter: function(name, parma) {
								return `${name} {per|${parma.val/parma.max}}\n{hr|}`;
							}
						},
						indicator: data.map(item => {
							return {
								...item,
								max: 100
							};
						}),
						axisLine: {
							lineStyle: {
								type: 'dotted',
								width: 2,
								color: "rgba(153, 209, 246, 0.2)"
							}
						},
						splitArea: {
							show: true,
							areaStyle: {
								color: [
									'rgba(106, 176, 255, 0.5)',
									'rgba(106, 176, 255, 0.4)',
									'rgba(106, 176, 255, 0.3)',
									'rgba(106, 176, 255, 0.2)',
									'rgba(106, 176, 255, 0.1)',
								] // 图表背景的颜色
							}
						},
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dotted',
								width: 2,
								color: "rgba(153, 209, 246, 0.2)" // 设置网格的颜色
							}
						},
					},

					series: [{
						type: "radar",
						// symbol: "circle",
						areaStyle: {
							color: "rgba(0, 245, 255, 0.4)"
						},
						itemStyle: {
							color: "rgba(0, 245, 255, 1)",
							// borderColor: "rgba(0, 245, 255, 1)",
							borderWidth: 0,
							shadowBlur: 2,
							shadowColor: 'rgba(146, 225, 255, 1)',
						},
						lineStyle: {
							color: "rgba(146, 225, 255, 1)",
							// width: 1
						},
						data: [{
							value: [0, 0, 0, 0, 0, 0],
						}]
					}]
				}
				radarChartChart.setOption(option, true)
				setTimeout(() => {
					radarChartChart.clear(); //清除动画
					option.series[0].data[0].value = data.map(item => item.val);
					radarChartChart.setOption(option, true);
				}, 600)
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
		/* height: .75rem; */
		display: flex;
		margin-top: 20px;
		padding-left: 20px;
		padding-right: 20px;
	}

	.peoplestruebgc {
		width: 152px;
		height: 144px;
		/* 		background: url(../assets/img/peoplestrueimg.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center; */
	}

	.peoplestruebox {
		width: 60%;
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
		width: 380px;
		height: 180px;
		top: -10px
	}

	.abnormal {
		margin-top: 20px;
		display: flex;
		justify-content: space-around;
		position: relative;
	}

	.abnormalbox {
		background: url(../assets/personnelsituation/rightbox.png) no-repeat;
		width: 104px;
		height: 140px;
		background-size: 104px 140px;
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

	#radar {
		width: 380px;
		height: 180px;
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
		height: 520px;
		overflow-y: scroll;
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

	.chart-ratio {
		width: 120px;
		height: 120px;
		position: absolute;
		left: 0;
		// top:50px;
		left: 20px;
	}

	.bg-ratio-animImg {
		width: 130px;
		height: 130px;
		position: absolute;
		left: 13px;
		top: -2px;
		animation: myMove 5s; //外圈旋转动画
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

	.bg-ratio {
		width: 84px;
		height: 84px;
		position: absolute;
		left: 38px;
		top: 18px;
	}

	.chartBox {
		position: relative;
		left: -20px;
	}
	
	.eq-num-box-chart {
		position: relative;
	}
	.gear {
		width: 56px;
		height: 56px;
		position: absolute;
		top: 32px;
		left: 22px;
	}

	.gearout {
		width: 96px;
		height: 98px;
		position: absolute;
		left: 3px;
		top: 10px;
		;
	}
</style>
