<template>
	<div style="height:100%;">
		<sideTran :thisCrrentSys="thisCrrentSys">
			<div slot="left" style="height:100%;">
				<sideItem title="学校概况" height="27%">
					<div slot='body' class="schoolProfile-wrap">
						<div id="schoolProfile"></div>
						<div class="schoolProfile-right">
							<div class="detailBox">
								<div class="row" v-for="(item,i) in ratioList" :key="i">
									<div class="title">
										<i :style="`border-color:${item.color};`"></i><span :style="`color:${item.color};`">{{item.name}}</span>
									</div>
									<div class="value">
										<animated-number :value="item.val/ratioAbTotal*100" :formatValue="val=>val.toFixed()" :duration="4000" /><i>%</i>
									</div>
								</div>
								<div class="row">
									<div class="title">
										<i :style="`border-color:linear-gradient(0deg, #047BDC 0%, #31D6EE 100%);`"></i><span :style="`color:rgba(255, 255, 255, .8);`">响应时间</span>
									</div>
									<div class="value">
										<animated-number :value="262" :formatValue="val=>val.toFixed()" :duration="4000" /><i>ms</i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</sideItem>
				<sideItem title="应用占用资源分析" height="27%">
					<div slot='body' class="resource-analysis">
						<div id="cpu" class="resource-analysis-item"></div>
						<div id="memory" class="resource-analysis-item"></div>
						<div id="store" class="resource-analysis-item"></div>
					</div>
				</sideItem>
				<sideItem title="各宿舍楼归寝概况" height="56%">
					<div slot='body'>
						<div id="allTotalAssets"></div>
					</div>
				</sideItem>
			</div>
			<div slot="right" style="height:100%;">
				<sideItem title="智能警告分析" height="28%">
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
	import AnimatedNumber from "animated-number-vue";
	import {
		mapGetters
	} from 'vuex'
	import * as echarts from 'echarts';
	import 'echarts-liquidfill'
	export default {
		components: {
			sideTran,
			sideItem,
			AnimatedNumber
		},
		data() {
			return {
				thisCrrentSys: "",
				option: {
						series: [
								{
										type: 'liquidFill',
										radius: '55%',
										center: ['50%', '50%'],
										amplitude: '6%',
										color: [
												'rgba(46,115,145,1)',
												{
														type: 'linear',
														x: 0,
														y: 0,
														x2: 0,
														y2: 1,
														colorStops: [
																{
																		offset: 1,
																		color: 'rgba(4, 123, 220, 1)',
																},
																{
																		offset: 0,
																		color: 'rgba(49, 214, 238, 1)',
																},
														],
														globalCoord: false,
												},
										],
										data: [.71,.76],
										backgroundStyle: {
												borderWidth: 1,
												color: 'rgba(241, 200, 50, 0)',
										},
										itemStyle: {
												opacity: 0.95,
												shadowBlur: 50,
												shadowColor: 'rgba(0, 0, 0, 0.4)'
										},
										label: {
												normal: {
														formatter: 76 + '分',
														textStyle: {
																fontSize: 22,
																color: '#fff',
														},
												},
										},
										outline: {
												show: true,
												itemStyle: {
														borderWidth: 0,
												},
												borderDistance: 0,
										},
										emphasis: {
												itemStyle: {
														opacity: 0.9//悬浮样式
												}
										},
								},
						],
				},
				ratioList: []
			}
		},
		computed: {
			...mapGetters(['currentSys']),
			ratioAbTotal(){
				return this.ratioList.reduce((sum,item)=>sum+item.val,0);
			},
		},
		watch: {},
		mounted() {
			// console.log('assets')

		},
		methods: {
			init() {
				this.$nextTick(() => {
					this.thisCrrentSys = 'networkoperation'
					setTimeout(() => {
						console.log(document.getElementById('schoolProfile'), "8+8888")
						this.renderpie()
						this.renderSchoolProfileEchart()
						this.ratioList = [
							{name:"正常",val:319,color:'rgba(169,133,238,0.8)'},
							{name:"缓慢",val:25,color:'rgba(196,144,191,0.8)'},
							{name:"错误",val:12,color:'rgba(19,181,177,0.8)'},
						]
						let dashboard = echarts.init(document.getElementById('cpu'))
						dashboard.setOption(this.renderDashboardOption())
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
					legend: [{  //分行的原理是用数组表示,下一个也是用数组表示,切记,data里面直接传入数组的名字.文字颜色用#fft,自动适配颜色
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
			},
			renderSchoolProfileEchart(){
				let schoolProfileEchart = echarts.init(document.getElementById('schoolProfile'))
				var trafficWay = [{
						name: '',
						value: 319
				},{
						name: '',
						value: 25
				},{
						name: '',
						value: 12
				}];

				var data = [];
				var color=['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000']
				for (var i = 0; i < trafficWay.length; i++) {
						data.push({
								value: trafficWay[i].value,
								name: trafficWay[i].name,
								itemStyle: {
										normal: {
												borderWidth: 3,
												// shadowBlur: 20,
												// borderColor:color[i],
												// shadowColor: color[i]
										}
								}
						}, {
								value: 1,
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
												borderWidth: 0,
										}
								}
						});
				}
				this.option.series.push({
						name: '',
						type: 'pie',
						// clockWise: false,
						radius: ['80%', '89%'],
						// hoverAnimation: false,
						data: data,
						itemStyle: {
							borderRadius: 100,
							borderWidth: 3,
						},
						labelLine: {
							show: false
						},
				})
				schoolProfileEchart.setOption(this.option)
			},
			renderDashboardOption(){
				return {
					series: [
						{
							type: 'gauge',
							axisLine: {
								lineStyle: {
									width: 5,
									color: [
										[1, 'rgb(57,142,188)']
									]
								}
							},
							pointer: {
								itemStyle: {
									color: 'auto'
								}
							},
							axisTick: {
								distance: -3,
								length: 1,
								lineStyle: {
									color: '#fff',
									width: 1
								}
							},
							splitLine: {
								distance: -3,
								length: 1,
								lineStyle: {
									color: 'rgb(29,197,173)',
									width: 3,
									cap: "round"
								}
							},
							axisLabel: {
								color: 'auto',
								distance: 10,
								fontSize: 6
							},
							detail: {
								valueAnimation: true,
								formatter: '{value}%',
								color: 'auto',
								fontSize: 12
							},
							pointer: {
								width: 2
							},
							data: [
								{
									value: 70
								}
							]
						},
						{
							type: 'gauge',
							axisLine: {
								show: false
							},
							pointer: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false
							},
							axisLabel: {
								show: false
							},
							detail: {
								show: false
							},
							pointer: {
								show: false
							},
							progress: {
								show: true,
								width: 6
							},
							data: [
								{
									value: 70
								}
							]
						}
					]
				}
			}
		}
	}
</script>

<style lang='less' scoped>
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
	width: 100%;
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
#schoolProfile{
	width: 160px;
	height: 160px;
	background-image: url('../../assets/img/network-bg.png');
	background-size: 100%;
	background-repeat: no-repeat;
}
.schoolProfile-wrap{
	display: flex;
	justify-content: space-between;
	width: 100%;
}
.schoolProfile-right{
	flex: 1;
}
.detailBox {
  flex: 1;
  height: 100%;
  margin: 0 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .row{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 18px;
      padding-bottom: 5px;
      border-bottom: 2px solid rgba(106, 176, 255, 0.6);
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
.resource-analysis{
	display: flex;
	justify-content: space-between;
	width: 98%;
	.resource-analysis-item{
		width: 116px;
		height: 156px;
		background: url(../../assets/pieimg/fire/firebg.png) no-repeat;
		background-size: contain;
	}
}
</style>
