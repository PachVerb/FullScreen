<template>
	<div class="fire-safety">
		<sideTran :thisCrrentSys="thisCrrentSys">
			<div slot="left" style="height: 100%;">
				<sideItem title="设备数量" delay="500" height="25%">
					<div class="num-of-eq" slot='body'>
						<div class="num-of-eq-all">
							<div><span class="num-of-eq-all-num">86</span><span>个</span></div>
							<div class="num-of-eq-all-ani">
								<img class="num-of-eq-all-ani-top" src="../assets/eqNum/top.png" alt="">
								<img class="num-of-eq-all-ani-middle1"  src="../assets/eqNum/middle1.png" alt="">	
								<img class="num-of-eq-all-ani-middle2" src="../assets/eqNum/middle2.png" alt="">
								
								<img class="num-of-eq-all-ani-bottom" src="../assets/eqNum/bottom.png" alt="">
								<img class="num-of-eq-all-ani-middle3"  src="../assets/eqNum/middle2.png" alt="">
							</div>
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
				<sideItem title="异常设备位置分析" delay="1000" height="30%">
					<div slot="headRight">6666</div>
					<div slot='body' class="abnormaldevice-box">
						<div class="abnormaldevice">
							<img src="../assets/pieimg/fire/firearc.png" class="abnormaldeviceimg fireleftarc">
							<img src="../assets/pieimg/fire/fireleftgear.png" class="abnormaldeviceimg fireleftgear">
							<div id="totalAssets"></div>
							<div class="abnormaldevicebox"></div>
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
				<sideItem title="设备异常详情" delay="1500" height="45%">
					<div slot='body' class="ab-detail-list-wrap">
						<div class="ab-nav">
							<span :class="[abCheckNav == nav.id ? 'ab-check-nav' : '']" v-for="nav in abNavList"
								:key="nav.id" @click="handleAbCheckNav(nav.id)">{{ nav.name }}</span>
						</div>
						<div class="ab-list">
							<div class="ab-item-wrap" v-for="item in abDetailList" :key="item.id">
								<div class="ab-item">
									<div>
										<div class="ab-item-name">{{ item.name }}</div>
										<div class="ab-item-date">{{ item.date }}</div>
									</div>
									<div>{{ item.address }}</div>
									<div class="ab-close-btn"></div>
								</div>
							</div>
						</div>
					</div>
				</sideItem>
			</div>
			<div slot="right" style="height: 100%;">
				<sideItem title="设备数量" transitionType="right" delay="500" height="25%">
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
				<sideItem title="监控画面" transitionType="right" delay="1000" height="38%">
					<div slot='body'>
						<div class="up-btn">
							<img v-if="monitorIndex!=1" @click="changeMonitoList(monitorIndex-1)" class="img-rotate" src="../assets/img/down.png" alt="">
							<img v-else src="../assets/img/up.png" alt="">
						</div>
						<div class="monitor-list">
							<div class="content">
								<div class="monitor-item" v-for="item in monitorList" :key="item.id">
									<video class="monitor-item-img" :src="item.src" autoplay loop></video>
								</div>
							</div>
						</div>
						<div class="down-btn">
							<img v-if="this.monitorIndex!=(Math.ceil(this.monitorList.length/4))" @click="changeMonitoList(monitorIndex+1)" src="../assets/img/down.png" alt="">
							<img v-else class="img-rotate" src="../assets/img/up.png" alt="">
						</div>
					</div>
				</sideItem>
				<sideItem title="巡更人员异常概况" transitionType="right" delay="1500" height="37%">
					<div slot='body' class="patrol-list-wrap">
						<div class="table-head">
							<span :style="{width: head.width}" v-for="head in tableHead"
								:key="head.name">{{ head.name }}</span>
						</div>
						<div class="ab-list patrol">
							<div class="ab-item-wrap" v-for="(item) in abDetailList" :key="item.id">
								<div class="ab-item">
									<div class="table-item ab-item-name" :style="{width: tableHead[0].width}">
										{{ item.name }}
									</div>
									<div class="table-item" :style="{width: tableHead[1].width}">{{ item.address }}</div>
									<div class="table-item" :style="{width: tableHead[2].width}">{{ item.date }}</div>
									<div :style="{width: tableHead[3].width}" class="last-address table-item"></div>
								</div>
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
	let color = ['#A985EE', '#C490BF', '#13B5B1', '#45dbf7', '#f69846', '#44aff0', '#4777f5', '#5045f6', '#ad46f3',
		'#f845f1'
	];
	import * as mixins from './mixins'
	import sideTran from './sideTran'
	import sideItem from './sideItem.vue'
	import pageination from './commonComponent/pagination.vue'
	import AnimatedNumber from "animated-number-vue";
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
			pageination,
			AnimatedNumber
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
				},{
					id: '6',
					name: 'JD1544消防栓',
					date: '2021-11-09 15:22:47',
					address: '教学楼A区3层走廊'
				},{
					id: '7',
					name: 'JD1544消防栓',
					date: '2021-11-09 15:22:47',
					address: '教学楼A区3层走廊'
				},],
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
					src: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
				}, {
					id: '2',
						src: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
				}, {
					id: '3',
						src: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
				}, {
					id: '4',
						src: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
				},{
					id: '5',
					src: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
				}, {
					id: '6',
					src: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
				}, {
					id: '7',
					src: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
				}, {
					id: '8',
					src: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
				}, ],
				monitorIndex: 1,
				allPatrolOption: {},
				abPatrolOption: {},
				abPatrolEqOption: {},
				loading: true,
      	ratioList:[],
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
		created() {

		},
		mounted() {

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
						this.ratioList = [
								{name:"照明",val:1100,color:'rgba(169,133,238,0.8)'},
								{name:"空调",val:444,color:'rgba(196,144,191,0.8)'},
								{name:"机房",val:501,color:'rgba(19,181,177,0.8)'},
								{name:"应急通道",val:300,color:'rgba(229,188,128,0.8)'}
							]
					}, 1500)
				})
			},
			initcolors(){
				
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
					// title: {
					// 	subtext: '公园基础设施提升',
					// },
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
			},
			rendpubpie() {
				let totalAssetsChartDom, totalAssetsChartChart, option
				totalAssetsChartDom = document.getElementById('totalAssets');
				totalAssetsChartChart = echarts.init(totalAssetsChartDom, {
					width: 150,
					height: 150
				});
				// let color = ['#A985EE', '#C490BF', '#13B5B1', '#45dbf7', '#f69846', '#44aff0', '#4777f5', '#5045f6',
				// 	'#ad46f3',
				// 	'#f845f1'
				// ];
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
							data: list
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
										formatter: '{c|异常设备}' + '\n' + '{c|位置分析}',

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
			},
			//监控画面
			changeMonitoList(index){
				let content = document.querySelector('.monitor-list .content');
				let item = document.querySelector('.monitor-list .monitor-item');
				content.style.top = `${this.monitorIndex<index?'-':''}${(index-1)*2*item.clientHeight}px`;
				this.monitorIndex = index;
			}
		}
	}
</script>

<style lang="less" scoped>
	.fire-safety {
		height: 100%;
		color: #F6FAFF;
	}

	.num-of-eq {
		display: inline-flex;
		// min-height: 150px;
	}

	.num-of-eq-all {
		position: relative;
		display: inline-flex;
		flex-direction: column;
		justify-content: space-between;
		padding-top: 10px;
		width: 100px;
		height: 136px;
		font-size: 14px;
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
		height: calc(100% - 54px);
		font-size: 12px;
		overflow-y: scroll;
	}

	.ab-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// margin: 6px 16px 0;
		padding: 6px 16px 6px;
		border-bottom: 1px solid rgba(63, 151, 207, .5);
	}
	.ab-item-wrap:hover{
		background: rgba(106, 176, 255, 0.2);
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
		cursor: pointer;
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
		width: 100%;
		height: 220px;
		box-sizing: border-box;
		padding: 0 10px;
		overflow: hidden;
		.content{
			width: 100%;
			height: 100%;
			display: flex;
			flex-wrap: wrap;
			position: relative;
			top:0;
			transition: top 2s;
		}
	}

	.monitor-item {
		width: 50%;
		height: 50%;
		box-sizing: border-box;
		padding: 5px 9px;
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
		cursor: pointer;
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
		width: 100%;
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
		width: 190px;
		height: 200px;
		display: flex;
		justify-content: space-around;
		position: relative;
	}
	
	#totalAssets {
		height: 160px;
		width: 160px;
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
	.num-of-eq-all-ani{
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.num-of-eq-all-ani-top{
		position: absolute;
		top: 10px;
		z-index: 4;
		transform: scale(.8);
		animation: num-of-eq-all-ani-top-start 1.8s infinite linear;
	}
	.num-of-eq-all-ani-middle1{
		position: absolute;
		top: 26px;
		z-index: 3;
		transform: scale(.8);
		animation: num-of-eq-all-ani-middle1-start 1.8s infinite linear;
	}
	.num-of-eq-all-ani-middle2{
		position: absolute;
		// top: 37px;
		bottom: 31px;
		z-index: 1;
		transform: scale(.8);
		animation: num-of-eq-all-ani-middle2-start 3s infinite linear;
	}
	.num-of-eq-all-ani-middle3{
		position: absolute;
		// top: 37px;
		bottom: 38px;
		z-index: 2;
		transform: scale(.8);
	}
	.num-of-eq-all-ani-bottom{
		position: absolute;
		top: 25px;
		z-index: 2;
		transform: scale(.8);
	}
	@keyframes num-of-eq-all-ani-top-start{
		0%{
			top: 20px;
		}
		50%{
			top: 10px;
		}
		100%{
			top: 20px;
		}
	}
	@keyframes num-of-eq-all-ani-middle1-start{
		0%{
			top: 35px;
		}
		50%{
			top: 26px;
		}
		100%{
			top: 35px;
		}
	}
	@keyframes num-of-eq-all-ani-middle2-start{
		0%{
			width: 30px;
			opacity: 0;
		}
		50%{
			width: 119px;
			opacity: 1;
		}
		75%{
			width: 119px;
			opacity: .5;
		}
		100%{
			width: 119px;
			opacity: 0;
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
	.abnormaldevice-box{
		display: flex;
		padding-right: 15px;
		height: 200px;
		width: 100%;
	}
	.patrol-list-wrap{
		width: 100%;
		height: 100%;
		.ab-list{
			margin-bottom: 8px;
			height: calc(100% - 85px);
		}
	}
	.ab-detail-list-wrap{
		width: 100%;
		height: 100%;
		.ab-list{
			height: calc(100% - 60px);
		}
	}
</style>
