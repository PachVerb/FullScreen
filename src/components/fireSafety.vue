<template>
	<div class="fire-safety">
		<sideTran :thisCrrentSys="thisCrrentSys">
			<div slot="left">
				<sideItem title="设备数量" delay="500" :loading="loading">
					<div class="num-of-eq" slot='body'>
						<div class="num-of-eq-all">
							<div><span class="num-of-eq-all-num">86</span><span>个</span></div>
							<span>设备总数量</span>
						</div>
						<div class="num-of-eq-detail">
							<div class="num-of-eq-detail-item" v-for="item in eqList" :key="item.name">
								<img :src="item.img" alt="">
								<div>
									<div class="num-of-detail-eq-num">{{ item.num }}<span>个</span></div>
									<div class="num-of-detail-eq-name">{{ item.name }}</div>
								</div>
							</div>
						</div>
					</div>
				</sideItem>
				<sideItem title="异常设备位置分析" delay="1000">
					<div slot='body' class="abnormaldevice">
						<img src="../assets/pieimg/fire/firearc.png" class="abnormaldeviceimg fireleftarc">
						<img src="../assets/pieimg/fire/fireleftgear.png" class="abnormaldeviceimg fireleftgear">
						<div id="totalAssets"></div>
						<div class="abnormaldevicebox"></div>
					</div>
				</sideItem>
				<sideItem title="设备异常详情" delay="1500">
					<div slot='body'>
						<div class="ab-nav">
							<span :class="[abCheckNav == nav.id ? 'ab-check-nav' : '']" v-for="nav in abNavList"
								:key="nav.id" @click="handleAbCheckNav(nav.id)">{{ nav.name }}</span>
						</div>
						<div class="ab-list">
							<div class="ab-item" v-for="item in abDetailList" :key="item.id">
								<div>
									<div class="ab-item-name">{{ item.name }}</div>
									<div class="ab-item-date">{{ item.date }}</div>
								</div>
								<div>{{ item.address }}</div>
								<div class="ab-close-btn"></div>
							</div>
						</div>
					</div>
				</sideItem>
			</div>
			<div slot="right">
				<sideItem title="设备数量" transitionType="right" delay="500">
					<div slot='body' class="rightonebox">
						<div class="allpiebox">
							<div id="allPatrolChart" class="eq-num-box-chart">
							</div>
							<img src="../assets/pieimg/fire/gearout.png" alt="" class="gear">
							<img src="../assets/pieimg/fire/gearout.png" alt="" class="gearout">
						</div>
						<div class="allpiebox">
							<div id="abPatrolChart" class="eq-num-box-chart"></div>
							<img src="../assets/pieimg/fire/gearout.png" alt="" class="gear">
							<img src="../assets/pieimg/fire/gearout.png" alt="" class="gearout">
						</div>
						<div class="allpiebox">
							<div id="abPatrolEqChart" class="eq-num-box-chart"></div>
							<img src="../assets/pieimg/fire/gearout.png" alt="" class="gear">
							<img src="../assets/pieimg/fire/gearout.png" alt="" class="gearout">
						</div>
					</div>
				</sideItem>
				<sideItem title="监控画面" transitionType="right" delay="1000">
					<div slot='body'>
						<div class="up-btn"><img v-if="monitorIndex !== 1" class="img-rotate"
								src="../assets/img/down.png" alt=""><img v-else src="../assets/img/up.png" alt=""></div>
						<div class="monitor-list">
							<div class="monitor-item" v-for="item in monitorList" :key="item.id">
								<img class="monitor-item-img" :src="item.img" alt="">
							</div>
							<div class="monitor-item" v-if="monitorList%2"></div>
						</div>
						<div class="down-btn"><img v-if="this.monitorIndex >= (Math.ceil(this.monitorList.length/4))"
								src="../assets/img/down.png" alt=""><img v-else class="img-rotate"
								src="../assets/img/up.png" alt=""></div>
					</div>
				</sideItem>
				<sideItem title="巡更人员异常概况" transitionType="right" delay="1500">
					<div slot='body'>
						<div class="table-head">
							<span :style="{width: head.width}" v-for="head in tableHead"
								:key="head.name">{{ head.name }}</span>
						</div>
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
						<pageination></pageination>
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
	import * as mixins from './mixins'
	import sideTran from './sideTran'
	import sideItem from './sideItem.vue'
	import pageination from './commonComponent/pagination.vue'
	import {
		Table,
		TableColumn,
	} from 'element-ui'
	import {
		mapGetters
	} from 'vuex'
	import * as echarts from 'echarts';
	let allPatrolChart,
		allPatrolOption,
		abPatrolChart,
		abPatrolOption,
		abPatrolEqChart,
		abPatrolEqOption
	export default {
		mixins: [mixins],
		components: {
			sideTran,
			sideItem,
			Table,
			TableColumn,
			pageination
		},
		data() {
			return {
				thisCrrentSys: 'fireSafety',
				colorone: ["#6AB0FF", '#6AB0FF'],
				colortwo: ["#F6886A", "#F6886A"],
				colorthir: ["#E5BC80", "#E5BC80"],
				eqList: [{
					num: 86,
					name: '消防设备总数',
					img: require('../assets/img/fire-control.png')
				}, {
					num: 86,
					name: '门禁总数',
					img: require('../assets/img/access-control.png')
				}, {
					num: 86,
					name: '温感传感器总数',
					img: require('../assets/img/temperature.png')
				}, {
					num: 86,
					name: '监控总数',
					img: require('../assets/img/monitor.png')
				}, ],
				abCheckNav: 1,
				abNavList: [{
					id: 1,
					name: '消防'
				}, {
					id: 2,
					name: '门禁'
				}, {
					id: 3,
					name: '监控'
				}, {
					id: 4,
					name: '温感传感器'
				}, ],
				abDetailList: [{
					id: '1',
					name: 'JD1544消防栓',
					date: '2021-11-09 15:22:47',
					address: '教学楼A区3层走廊'
				}, {
					id: '2',
					name: 'JD1544消防栓',
					date: '2021-11-09 15:22:47',
					address: '教学楼A区3层走廊'
				}, {
					id: '3',
					name: 'JD1544消防栓',
					date: '2021-11-09 15:22:47',
					address: '教学楼A区3层走廊'
				}, {
					id: '4',
					name: 'JD1544消防栓',
					date: '2021-11-09 15:22:47',
					address: '教学楼A区3层走廊'
				}, {
					id: '5',
					name: 'JD1544消防栓',
					date: '2021-11-09 15:22:47',
					address: '教学楼A区3层走廊'
				}, ],
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				tableHead: [{
					name: '姓名',
					width: '40px'
				}, {
					name: '异常事件',
					width: '130px'
				}, {
					name: '时间',
					width: '120px'
				}, {
					name: '操作',
					width: '57.6px'
				}, ],
				monitorList: [{
					id: '1',
					img: require('../assets/img/fire-control.png')
				}, {
					id: '2',
					img: require('../assets/img/fire-control.png')
				}, {
					id: '3',
					img: require('../assets/img/fire-control.png')
				}, {
					id: '4',
					img: require('../assets/img/fire-control.png')
				}, ],
				monitorIndex: 1,
				allPatrolOption: {},
				abPatrolOption: {},
				abPatrolEqOption: {},
				loading: true
			}
		},
		computed: {
			...mapGetters(['currentSys'])
		},
		watch: {

		},
		created() {

		},
		mounted() {
			console.log('fireSafety')

		},
		methods: {
			init() {
				allPatrolOption = this.initDashboardEchartOption(this.colorone)
				abPatrolOption = this.initDashboardEchartOption(this.colortwo)
				abPatrolEqOption = this.initDashboardEchartOption(this.colorthir)
				this.$nextTick(() => {
					setTimeout(() => {
						let allPatrolChartDom = document.getElementById('allPatrolChart');
						allPatrolChart = echarts.init(allPatrolChartDom);
						allPatrolChart.setOption(allPatrolOption)
						let abPatrolChartDom = document.getElementById('abPatrolChart');
						abPatrolChart = echarts.init(abPatrolChartDom);
						abPatrolChart.setOption(abPatrolOption)
						let abPatrolEqChartDom = document.getElementById('abPatrolEqChart');
						abPatrolEqChart = echarts.init(abPatrolEqChartDom);
						abPatrolEqChart.setOption(abPatrolEqOption)
						this.rendpubpie()
						setTimeout(() => {
							this.loading = false
						},5000)
					}, 1500)
				})
			},

			handleAbCheckNav(nav) {
				this.abCheckNav = nav
			},
			initDashboardEchartOption(val) {
				console.log(val, "45655")
				let angle = 0; //角度，用来做简单的动画效果的
				let value = 15;
				let config = {
					color: val,
					data: [{
							name: '',
							value: 77,
						},
						{
							name: '',
							value: 23,
						},
					],
					title: {
						subtext: '公园基础设施提升',
					},
				};
				let num = config.data[0].value;
				let unit = '%';
				let title = '进度';
				return {

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
							text: '{a|' + num + '}',
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
							radius: '79%', //配合splitLine里的length一起调
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
			},
			rendpubpie() {
				let totalAssetsChartDom, totalAssetsChartChart, option
				totalAssetsChartDom = document.getElementById('totalAssets');
				totalAssetsChartChart = echarts.init(totalAssetsChartDom, {
					width: 150,
					height: 150
				});
				let color = ['#A985EE', '#C490BF', '#13B5B1', '#45dbf7', '#f69846', '#44aff0', '#4777f5', '#5045f6',
					'#ad46f3',
					'#f845f1'
				];
				let names = ["居住", "生产", "经营"];
				let data1 = [1114, 444, 501]
				let list = []
				let total = 0
				for (let i in data1) {
					total += data1[i]
				}

				let placeHolderStyle = {
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
				};

				let rich = {
					white: {
						align: 'center',
						padding: [3, 0]
					}
				};

				for (let i in data1) {
					list.push({
						value: data1[i],
						name: names[i],
						itemStyle: {
							normal: {
								borderWidth: 5,
								shadowBlur: 20,
								borderColor: color[i],
								shadowColor: color[i],
								color: color[i]
							}
						}
					}, {
						value: total / 30,
						name: '',
						itemStyle: placeHolderStyle
					})
				}

				let func = (params) => {
					let percent = ((params.value / total) * 100).toFixed(1)
					let name = params.name.replace(/\n/g, '')
					if (params.name !== '') {
						return name + '\n{white|' + percent + '%}'
					} else {
						return ''
					}
				}



				totalAssetsChartChart.setOption({
					tooltip: {
						show: false
					},
					legend: {
						show: false,
						orient: 'vertical',
						data: names,
						icon: 'circle',
						right: '5px',
						top: '10px',
						textStyle: {
							color: '#fff',
							fontSize: 20
						}
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
										show: false,
										position: 'outside',
										formatter: func,
										rich: rich
									},
									labelLine: {
										length: 40,
										length2: 100,
										show: true,
										color: '#00ffff'
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
										formatter: '{c|异常设备}' + '\n' + '{active|位置分析}',

										// formatter: '用电纪录',
										rich: {
											c: {
												color: 'rgba(255, 255, 255, .8)',
												fontSize: 12,
												// fontWeight: 'bold',
												lineHeight: 22
											},
											b: {
												color: 'rgba(255, 255, 255, .8)',
												fontSize: 12,
												lineHeight: 22
											}
										},
										textStyle: {
											fontSize: 12,
											// fontWeight: 'bold'
										},
										position: 'center'
									}
								}
							}]
						}
					]
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.fire-safety {
		color: #F6FAFF;
	}

	.num-of-eq {
		display: inline-flex;
	}

	.num-of-eq-all {
		display: inline-flex;
		flex-direction: column;
		justify-content: space-between;
		padding-top: 10px;
		width: 100px;
		height: 136px;
		font-size: 14px;
		background-image: url('../assets/img/number_of_eq.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;

		.num-of-eq-all-num {
			color: #00F5FF;
			font-weight: bold;
		}
	}

	.num-of-eq-detail {
		display: inline-flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 10px 10px 0;
		width: 260px;
		font-size: 12px;

		img {
			width: 54px;
		}
	}

	.num-of-detail-eq-num {
		width: 60px;
		text-align: left;
		font-weight: bold;
		color: #00F5FF;
	}

	.num-of-detail-eq-num {}

	.num-of-eq-detail-item {
		display: flex;
		align-items: center;
	}

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
		border-bottom: 1px solid rgba(63, 151, 207, .5);
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
	}

	.monitor-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 19px;
	}

	.monitor-item {
		width: 162px;
		height: 108px;
	}

	// .monitor-item:nth-child(2n){
	//   margin-right: 20px;
	// }
	.monitor-item-img {
		width: 100%;
		height: 100%;
	}

	.up-btn,
	.down-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 26px;
	}

	.up-btn img,
	.down-btn img {
		width: 29.6px;
		height: 23.4px;
	}

	.img-rotate {
		transform: rotateX(180deg);
	}

	.eq-num-box-chart {

		display: inline-block;
		width: 104.4px;
		height: 149.4px;
		position: relative;
		top: -15px;
	}

	.rightonebox {
		margin-top: 10px;
		display: flex;
		justify-content: space-around;
	}

	.allpiebox {
		position: relative;
	}

	.gear {
		width: 60px;
		height: 60px;
		position: absolute;
		top: 30px;
		left: 22px;
	}

	.allpiebox {
		background: url(../assets/pieimg/fire/firebg.png) no-repeat;
		background-size: contain;
	}

	.gearout {
		width: 98px;
		height: 98px;
		position: absolute;
		left: 3px;
		top: 10px;
		;
	}
	.abnormaldevice{
		height: 200px;
		display: flex;
		justify-content: space-around;
		position: relative;
	}
	
	#totalAssets {
		height: 200px;
		width: 50%;
		position: absolute;
		left: 20px;
		top: 20px;
	}
	.fireleftarc{
		width: 160px;
		height: 160px;
		position:absolute;
		left:14px;
		top:17px;
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
	.fireleftgear{
		width: 110px;
		height: 110px;
		position:absolute;
		left:41px;
		top:41px;
	}
</style>
