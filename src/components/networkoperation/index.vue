<template>

	<div>
		<sideTran :thisCrrentSys="thisCrrentSys">
			<div slot="left">
				<sideItem title="学校概况">
					<div slot='body' style="height: 20%;">
					</div>
				</sideItem>
				<sideItem title="校区公房统计">
					<div slot='body'>
						<div id="totalAssets"></div>
					</div>
				</sideItem>
				<sideItem title="公房使用方向统计">
					<div slot='body'>
						<div id="allTotalAssets"></div>
					</div>
				</sideItem>
				<sideItem title="学校公房总数统计">
					<div slot='body'>
						<div id="allTotalAssets"></div>
					</div>
				</sideItem>
			</div>
			<div slot="right">
				<sideItem title="智能警告分析">
					<div slot='body' class="intelligentwarningbox">
						<img src="../../assets/pieimg/Networkoperation/intergear.png" alt="" class="intergear">
						<img src="../../assets/pieimg/Networkoperation/interoutpie.png" alt="" class="interoutpie">
						<div class="intelligentwarningbar"></div>
						<div id="intelwarning"></div>
					</div>
				</sideItem>
				<sideItem title="故障智能分析">
					<div slot='body' class="userladnd">
						<div id="serverSecurity"></div>
					</div>
				</sideItem>
				<sideItem title="应用数据发展分析">
					<div slot='body' class="intelwarningunitbox">
						<!-- <div class="usebox">
							<div id="intelwarning"></div>
							<img src="../../assets/pieimg/publichouseout.png" class="useboxoutpie">
							<img src="../../assets/pieimg/publichouseout.png" class="gear">
						</div> -->
					</div>
				</sideItem>

			</div>
		</sideTran>
	</div>
</template>

<script>
	import sideTran from '../sideTran'
	import nowpeopleslide from '../nowpeopleslide.vue'
	import sideItem from '../sideItem.vue'
	import {
		mapGetters
	} from 'vuex'
	import * as echarts from 'echarts';
	export default {
		components: {
			sideTran,
			sideItem
		},
		data() {
			return {
				thisCrrentSys: "",
			}
		},
		computed: {
			...mapGetters(['currentSys'])
		},
		watch: {},
		mounted() {
			// console.log('assets')

		},
		methods: {
			init() {
				this.$nextTick(() => {
					this.thisCrrentSys = 'networkoperation'
					var _this = this
					// this.initcolor()
					setTimeout(function() {
						console.log(document.getElementById('intelwarning'), "8+8888")
						_this.renderpie()
					}, 1500);
				})
			},

			renderpie() {
				let colors = ['#598BF1', '#E2B46D', '#F2896B', '#2B63D5', '#2039C3', ]
				let colortwo = ['#F2896B']
				let datas = [{
						value: 335,
						name: '次要警告'
					},
					{
						value: 310,
						name: '重要警告'
					},

				]
				let datatwo = [{
					value: 234,
					name: '紧急警告'
				}, ]
				let intelwarningChartDom, intelwarningChartChart, option
				intelwarningChartDom = document.getElementById('intelwarning');
				intelwarningChartChart = echarts.init(intelwarningChartDom);

				intelwarningChartChart.setOption({
					legend: [{
						icon:"rect",
							itemWidth: 3,
							top:10,
							itemHeight: 8,
							textStyle: {
								fontSize: 12,
								color: "#fft"//与图块颜色对应,牛逼
							},
							// data: legendData,
							data:["次要警告",'重要警告']
						},
						{
							icon:"rect",
							// orient: 'horizontal',
							itemWidth: 3,
							itemHeight: 8,
							bottom: 10,
							// data: legendDatatwo,
							data:['紧急警告'],
							textStyle: {
								fontSize: 12,
								color: "#fft"
							}
						}
					],
					  tooltip: {
					    show:true,
					    trigger: 'item',
					    formatter: '{b} : {c} ({d}%)'
					  },
					series: [{
							// name: '访问来源',
							color: ['#598BF1', '#E2B46D', '#F2896B', '#2B63D5', '#2039C3', '#2ECACE',
								'#6F81DA'
							],
							type: 'pie',
							radius: ['50%', '60%'],
							avoidLabelOverlap: false,
							hoverAnimation: false,
							label: {
								show: false,
								position: 'center'
							},
							emphasis: {
								label: {
									show: false,
									fontSize: '30',
									fontWeight: 'bold'
								}
							},
							labelLine: {
								show: false
							},
							data: [{
									value: 335,
									name: '次要警告'
								},
								{
									value: 310,
									name: '重要警告'
								},
								{
									value: 234,
									name: '紧急警告'
								},
							]
						},

					]
				});
			}

		}
	}
</script>

<style scoped>
	#totalAssets {
		width: 100%;
		height: 150px;
	}

	#allTotalAssets {
		width: 100%;
		height: 150px;
	}

	#webSecurity {
		width: 100%;
		height: 150px;
	}

	#serverSecurity {
		width: 100%;
		height: 150px;
	}

	.intelwarningunitbox {
		width: 50%;
		height: 180px;
	}

	#intelwarning {
		width: 200px;
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

	.intelligentwarningbox {
		position: relative;
		display: flex;
		height: 180px;
	}

	.intelligentwarningbar {
		width: 50%;
		height: 180px;
	}

	.intergear {
		position: absolute;
		right: 51px;
		width: 90px;
		top: 55px;
	}

	.interoutpie {
		position: absolute;
		right: 31PX;
		width: 133px;
		top: 34px;
	}
</style>
