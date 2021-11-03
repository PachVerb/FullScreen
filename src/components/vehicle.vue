<template>
	<div style="height: 100%;">
		<sideTran thisCrrentSys="vehicle">
			<div slot="left" style="height: 100%;">
				<sideItem title="违规车辆统计" :delay="500"  height="26%">
					<div class="network-status" slot='body'>
						<currency
              v-for="(item,i) in statiList"
              :key="i"
              :boxnum="item.count"
              :boxtitle="item.type"
              :boxcolor="item.color"
              boxuntil="个"
              style="margin-top:12px;"
            ></currency>
					</div>
				</sideItem>
				<sideItem title="违规事件统计" :delay="1000" height="34%">
					<div slot='body' class="violations">
						<img class="outpieimg" src="../assets/pieimg/vehicle/vehiclebox.png" >
						<img class="topleft topbsize" src="../assets/pieimg/vehicle/topleft.png" alt="">
						<img class="topright topbsize" src="../assets/pieimg/vehicle/topright.png" alt="">
						<img class="bottomleft topbsize" src="../assets/pieimg/vehicle/bottomleft.png" alt="">
						<img class="bottomright topbsize" src="../assets/pieimg/vehicle/bottomright.png" alt="">
						<!-- <img class=" innercircle" src="../assets/pieimg/vehicle/innnercircle.png" alt=""> -->
						<div class=" innercircle">
							<h3>统计</h3>
						</div>
						<div id="violationpie"></div>
					</div>
				</sideItem>
				<sideItem title="违规车辆详情" :delay="1500" height="40%">
					<div slot='body' class="violation-detail">
						<date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
							end-placeholder="结束日期">
						</date-picker>
						<div class="violation-detail-table">
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
										<div class="table-item" :style="{width: tableHead[2].width}">{{ item.methods }}</div>
										<div class="table-item" :style="{width: tableHead[3].width}">{{ item.date }}</div>
										<div :style="{width: tableHead[4].width}" class="table-item">
											<span v-if="checkTrajector == item.id" class="close-trajectory" @click="handleCloseTrajector(item.id)">关闭轨迹</span>
											<span v-else class="check-trajectory" @click="handleCheckTrajector(item.id)">查看轨迹</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</sideItem>
			</div>
			<div slot="right" style="height: 100%;">
				<sideItem title="土地情况" :delay="500" transitionType="right">
					<div slot='body' class="parking">
						<div class="parking-item">
							<img src="../assets/img/goin.png" alt="">
							<div class="parking-num">
								<animated-number :value="892" :formatValue="val=>val.toFixed()" :duration="4000" />
							</div>
							<div class="parking-title">驶入车辆</div>
						</div>
						<div class="parking-item">
							<img src="../assets/img/goout.png" alt="">
							<div class="parking-num"><animated-number :value="892" :formatValue="val=>val.toFixed()" :duration="4000" /></div>
							<div class="parking-title">驶出车辆</div>
						</div>
						<div class="parking-item">
							<img src="../assets/img/stop.png" alt="">
							<div class="parking-num"><animated-number :value="892" :formatValue="val=>val.toFixed()" :duration="4000" /></div>
							<div class="parking-title">停滞车辆</div>
						</div>
					</div>
				</sideItem>
				<sideItem title="停车位统计" :delay="1000" transitionType="right" height="45%">
					<div slot='body' class="parking-space-wrap">
						<div class="parking-space" v-for="item in parkingList" :key="item.id">
							<div><span class="eq-statistics-item-num">6</span><span class="eq-statistics-item-unit">(个)</span></div>
							<div class="parking-space-ani">
								<img class="parking-space-top" src="../assets/eqNum/top2.png" alt="">
								<img class="parking-space-middle" src="../assets/eqNum/middle3.png" alt="">
								<img class="parking-space-middle1" src="../assets/eqNum/middle3.png" alt="">
								<img class="parking-space-bottom" src="../assets/eqNum/bottom2.png" alt="">
							</div>
							<div class="eq-statistics-item-name">{{ item.cname }}</div>
						</div>
					</div>
				</sideItem>
				<sideItem title="设备统计" :delay="1500" transitionType="right" height="30%">
					<div slot='body' class="eq-statistics">
						<div class="eq-statistics-item">
							<div><span class="eq-statistics-item-num">6</span><span class="eq-statistics-item-unit">(个)</span></div>
							<img class="eq-statistics-item-img" src="../assets/img/eq-type1.png" alt="">
							<div class="eq-statistics-item-name">道闸设备</div>
						</div>
						<div class="eq-statistics-item">
							<div><span class="eq-statistics-item-num eq-statistics-item-num-ab">6</span><span class="eq-statistics-item-unit">(个)</span></div>
							<img class="eq-statistics-item-img" src="../assets/img/eq-type2.png" alt="">
							<div class="eq-statistics-item-name">故障道闸设备</div>
						</div>
						<div class="eq-statistics-item">
							<div><span class="eq-statistics-item-num">6</span><span class="eq-statistics-item-unit">(个)</span></div>
							<img class="eq-statistics-item-img" src="../assets/img/eq-type4.png" alt="">
							<div class="eq-statistics-item-name">测速设备</div>
						</div>
						<div class="eq-statistics-item">
							<div><span class="eq-statistics-item-num eq-statistics-item-num-ab">6</span><span class="eq-statistics-item-unit">(个)</span></div>
							<img class="eq-statistics-item-img" src="../assets/img/eq-type3.png" alt="">
							<div class="eq-statistics-item-name">故障测速设备</div>
						</div>
					</div>
				</sideItem>
			</div>
		</sideTran>
	</div>
</template>

<script>
	import * as echarts from 'echarts'
	import {
		mapGetters
	} from 'vuex'
	import sideTran from './sideTran'
	import sideItem from './sideItem.vue'
	import currency from './currency.vue'
	import {
		DatePicker
	} from 'element-ui'
	import AnimatedNumber from "animated-number-vue";
	export default {
		components: {
			sideTran,
			sideItem,
			DatePicker,
			currency,
			AnimatedNumber
		},
		computed: {
			...mapGetters(['currentSys'])
		},
		data() {
			return {
				value1: '',
				statiList: [],//违章车辆统计
				abDetailList: [{
					id: '1',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区3层走廊',
					methods: '违停'
				}, {
					id: '2',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区3层走廊',
					methods: '违停'
				}, {
					id: '3',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区3层走廊',
					methods: '违停'
				}, {
					id: '4',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区3层走廊',
					methods: '违停'
				}, {
					id: '5',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区3层走廊',
					methods: '违停'
				}, {
					id: '6',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区3层走廊',
					methods: '违停'
				},{
					id: '7',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区3层走廊',
					methods: '违停'
				},{
					id: '8',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区3层走廊',
					methods: '违停'
				},{
					id: '9',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区3层走廊',
					methods: '违停'
				},],
				tableHead: [{
					name: '车牌号',
					key: 'name',
					width: '40px'
				}, {
					name: '位置',
					key: 'address',
					width: '80px'
				},{
					name: '违章事件',
					key: 'methods',
					width: '50px'
				}, {
					name: '违规时间',
					key: 'date',
					width: '120px'
				}, {
					name: '操作',
					key: '',
					width: '57.6px'
				}, ],
				checkTrajector: '',
				parkingList: [{
					cname: '总共停车位',
					id: 1
				},{
					cname: '停车区域',
					id: 2
				},{
					cname: '已停车位',
					id: 3
				},{
					cname: '空闲车位',
					id: 4
				},]
			}
		},
		methods: {
			init() {
				this.$nextTick(() => {
					this.thisCrrentSys = 'vehicle'
					this.getDeviceStatiList()
					setTimeout(() => {
						this.randerBar()
					}, 1500)
				})
			},
			handleCheckTrajector(id){
				this.checkTrajector = id
			},
			handleCloseTrajector(id){
				this.checkTrajector = ''
			},
			//获取设备统计列表
			getDeviceStatiList() {
				this.statiList = [
					{ type: '总数', count: 2349, color: '#00F5FF' },
					{ type: '今日', count: 86, color: '#F2896B' },
					{ type: '本周', count: 45, color: '#DBBB8A' },
					{ type: '本月', count: 298, color: '#A488EF' },
				]
			},
			randerBar() {
				let vehicleChartDom, vehicleChartChart
				vehicleChartDom = document.getElementById('violationpie');
				vehicleChartChart = echarts.init(vehicleChartDom);
				let color = ['#8871C9','#43BC71', '#1AC9FF','#1CC0B2'];
				let chartdata = [{
						name: '违停',
						value: 50,
					},
					{
						name: '超速',
						value: 50,
					},
					{
						name: '逆行',
						value: 50,
					},
					{
						name: '事故',
						value: 50,
					},
				];
				let sum = 0;
				let data1 = [];
				chartdata.forEach((item) => {
					sum += Number(item.value);
				});
				chartdata.forEach((item) => {
					data1.push(item, {
						name: '',
						value: sum / 100,
						labelLine: {
							show: false,
							lineStyle: {
								color: 'transparent',
							},
						},
						itemStyle: {
							color: 'transparent',
						},
					});
				});
				vehicleChartChart.setOption({
					// backgroundColor: '#263e53',
					grid: {
						top: '10%',
						bottom: 0,
						left: 0,
						right: 0,
						containLabel: true,
					},
					tooltip: {
						backgroundColor: 'rgba(44,62,80,0.8)',
						borderColor: 'rgba(153, 209, 246, 0.6)',
						textStyle: {
							align: 'left',
							fontSize: 12,
							color: 'rgba(255,255,255,0.8)',
						},
						formatter: (params) => {
							if (params.name != '') {
								return params.name + ' : ' + params.value + '\n' + '(' + params.percent + '%)';
							}
						},
					},
					series: [
						// {
						//     type: 'pie',
						//      hoverAnimation: false,//4.x版本使用取消悬浮放大
						//     radius: ['36%', '54%'],
						//     center: ['50%', '50%'],
						//     color: color,
						//     hoverAnimation: false,
						//     startAngle: 0,
						//     selectedMode: 'single',
						//     itemStyle: {
						//         normal: {
						//             // shadowColor:'#3C3C3C',
						//         },
						//     },
						//     emphasis: {
						//         itemStyle: {
						//           shadowBlur: 10,
						//           shadowOffsetX: 0,
						//           shadowColor: 'rgba(0, 0, 0, 0.5)'
						//         }
						//       },
						//     label: {
						//         show: false,
						//         formatter: '{b}' + ' ' + '{c}',
						//     },
						//     data: data1,
						//     z: 666,
						// },
						{
							type: 'pie',
							// hoverAnimation: false, //4.x版本使用取消悬浮放大
							// radius: ['76%', '84%'],
							radius: ['56%', '84%'],
							center: ['50%', '50%'],
							color: color,
							hoverAnimation: false,
							startAngle: 0,
							selectedMode: 'single',
							itemStyle: {
              normal: {  //设置边界去增大间距
                borderWidth:5,
                borderColor: "rgba(58,70,87,0)"
              }
							},
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							},
							label: {
								show: false,
								formatter: '{b}' + ' ' + '{c}',
							},
							data: data1,
							z: 666,
						},
					],
				});

			}
		}
	}
</script>

<style lang="less" scoped>
	#violationpie {
		width: 130px;
		height: 130px;
	}

	.network-status {
    padding: 0 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
	}

	.violations {
		height: 200px;
		width: 100%;
		display: flex;
		// color: transparent;
		/*!*flex-direction: column;*!可写可不写*/
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.outpieimg{
		position: absolute;
		width: 150px;
		height: 150px;
		animation: myMove 5s;
		-webkit-animation: myMove 5s infinite linear;
	}
	@-webkit-keyframes myMove {
	
		/**关键帧名称**/
		0% {
			-webkit-transform: rotate(0deg);
		}
	
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
	.topbsize{
		width: 115px;
		height: 45px;
	}
	.topleft{
		position: absolute;
		top: 20px;
		left: 30px;
	}
	.topright{
		position: absolute;
		top: 20px;
		right: 30px;
	}
	.bottomleft{
		position: absolute;
		bottom: 0;
		left: 30px;
	}
	.bottomright{
		position: absolute;
		bottom: 0;
		right: 30px;
	}
	.innercircle{
		position: absolute;
		background: url(../assets/pieimg/vehicle/innnercircle.png) no-repeat;
		background-size: cover;
		width: 50px;
		height: 50px;
	}
	.innercircle h3{
		// margin-top: 10px;
		line-height: 50px;
		color: white;
	}
	.ab-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// margin: 6px 16px 0;
		padding: 6px 16px 6px;
		border-bottom: 1px solid rgba(63, 151, 207, .5);
	}

	.ab-item-name,
	.ab-item-date {
		// margin-top: 5px;
		padding-left: 6px;
		text-align: left;
		// border-left: 1px solid #00F5FF;
		color: #fff;
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
	.table-head {
		margin: 0 16px;
		font-size: 12px;
		color: #fff;
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
		color: #fff;
	}
	.close-trajectory{
		display: inline-block;
		width: 58px;
		height: 18px;
		background: #F2896B;
		opacity: 0.58;
		border-radius: 4px;
		cursor: pointer;
		line-height: 18px;
	}
	.check-trajectory{
		display: inline-block;
		width: 58px;
		height: 18px;
		background: #1E9A5C;
		opacity: 0.58;
		border-radius: 4px;
		cursor: pointer;
		line-height: 18px;
	}
	.parking{
		display: flex;
		justify-content: space-around;
		padding: 20px 0 15px;
		width: 100%;
		.parking-item{
			display: flex;
			flex-direction: column;
			justify-items: center;
			.parking-num{
				margin: 11px 0 8px;
				font-size: 22px;
				color: #00F5FF;
			}
			.parking-title{
				font-size: 12px;
				color: #fff;
			}
		}
	}
	.violation-detail{
		padding-top: 10px;
		height: 100%;
		/deep/.el-date-editor{
			height: 30px;
			font-size: 12px;
			background-image: url('../assets/img/date-bg.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-color: transparent;
			border: none;
			.el-range__icon{
				position: absolute;
				left: 300px;
				line-height: 30px;
			}
			.el-icon-circle-close{
				display: none;
			}
			.el-range-input{
				background-color: transparent;
				color: #00F5FF;
				font-size: 12px;
			}
			.el-range-separator{
				color: rgba(0, 245, 255, .6);
				font-size: 12px;
				line-height: 26px;
			}
		}
	}
	.eq-statistics{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-between;
		margin-bottom: 30px;
		padding: 0 10px;
		width: 100%;
		height: 88%;
		font-size: 12px;
	}
	.eq-statistics-item{
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-top: 20px;
		padding-left: 100px;
		width: 57.6px;
		height: 70.4px;
	}
	.eq-statistics-item-img{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.eq-statistics-item-name{
		color: rgba(255,255,255, .8);
	}
	.eq-statistics-item-unit{
		color: rgba(255,255,255, .4)
	}
	.eq-statistics-item-num{
		font-size: 22px;
		font-weight: bold;
		color: rgba(0, 245, 255, 1);
	}
	.eq-statistics-item-num-ab{
		color: rgba(242, 137, 107, 1);
	}
	.parking-space-wrap{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-around;
		padding: 0 18px;
		height: 100%;
		font-size: 12px;
	}
	.parking-space{
		margin-top: 10px;
	}
	.parking-space-ani{
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 150px;
		height: 115px;
		overflow: hidden;
	}
	.parking-space-top{
		position: absolute;
		top: 21px;
		z-index: 3;
		width: 70px;
		animation: parking-space-top-start 2s infinite linear;
	}
	@keyframes parking-space-top-start{
		0%{
			top: 21px
		}
		25%{
			top: 15px
		}
		50%{
			top: 20px
		}
		75%{
			top: 28px;
		}
		100%{
			top: 21px
		}
	}
	.parking-space-middle{
		position: absolute;
		top: 13px;
		z-index: 2;
		width: 100px;
	}
	.parking-space-middle1{
		position: absolute;
		bottom: -4px;
		animation: parking-space-middle1-start 4s infinite linear;
	}
	@keyframes parking-space-middle1-start{
		0%{
			width: 100px;
			opacity: 1;
		}
		50%{
			width: 130px;
			opacity: 1;
		}
		100%{
			width: 130px;
			opacity: 0;
		}
	}
	.parking-space-bottom{
		position: absolute;
		top: 30px;
		z-index: 1;
		width: 130px;
	}
	.violation-detail-table{
		height: calc(100% - 50px);
		.ab-list{
			height: calc(100% - 45px);
			overflow-y: scroll;
		}
	}
	.ab-item-wrap:hover{
		background: rgba(106, 176, 255, 0.2);
	}
</style>
