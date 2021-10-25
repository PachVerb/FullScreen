<template>
	<div>
		<sideTran thisCrrentSys="vehicle">
			<div slot="left">
				<sideItem title="违规车辆统计">
					<div class="network-status" slot='body'>

					</div>
				</sideItem>
				<sideItem title="违规事件统计">
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
				<sideItem title="违规车辆详情">
					<div slot='body'>
						<date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
							end-placeholder="结束日期">
						</date-picker>
					</div>
				</sideItem>
			</div>
			<div slot="right"></div>
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
	import {
		DatePicker
	} from 'element-ui'
	export default {
		components: {
			sideTran,
			sideItem,
			DatePicker
		},
		computed: {
			...mapGetters(['currentSys'])
		},
		data() {
			return {
				value1: ''
			}
		},
		methods: {
			init() {
				this.$nextTick(() => {
					this.thisCrrentSys = 'vehicle'
					setTimeout(() => {
						this.randerBar()
					}, 1500)
				})
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
		height: 120px;
	}

	.violations {
		height: 200px;
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
</style>
