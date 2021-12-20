<template>
	<div style="height:100%;">
		<sideTran :thisCrrentSys="thisCrrentSys">
			<div slot="left" style="height:100%;">
				<sideItem title="学校概况" height="27%" :delay="500">
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
				<sideItem title="应用占用资源分析" height="27%" :delay="1000">
					<div slot='body' class="resource-analysis">
						<div id="cpu" class="resource-analysis-item"></div>
						<div id="memory" class="resource-analysis-item"></div>
						<div id="store" class="resource-analysis-item"></div>
					</div>
				</sideItem>
				<sideItem title="各宿舍楼归寝概况" height="56%" :delay="1500">
					<div slot='body' class="visitsChart-wrap">
						<div id="visitsChart"></div>
					</div>
				</sideItem>
			</div>
			<div slot="right" style="height:100%;">
				<sideItem title="智能警告分析" transitionType="right" height="28%" :delay="500">
					<div slot='body' class="intelligentwarningbox">
						<img src="../../assets/pieimg/Networkoperation/intergear.png" alt="" class="intergear">
						<img src="../../assets/pieimg/Networkoperation/interoutpie.png" alt="" class="interoutpie">
						<div id="intelligentwarningbar" class="intelligentwarningbar">
							
						</div>
						<div id="intelwarning"></div>
					</div>
				</sideItem>
				<sideItem title="故障智能分析" transitionType="right" :delay="1000" height="28%">
					<div slot='body' class="fault-analysis-wrap intelligentwarningbox">
						<img src="../../assets/pieimg/Networkoperation/intergear.png" alt="" class="intergear">
						<img src="../../assets/pieimg/Networkoperation/interoutpie.png" alt="" class="interoutpie">
						<div id="faultAnalysisLine" class="intelligentwarningbar">
							
						</div>
						<div id="faultAnalysisPie"></div>
					</div>
				</sideItem>
				<sideItem title="应用数据发展分析" transitionType="right" :delay="1500" height="42%">
					<div slot='body' class="application-analysis">
						<div class="application-analysis-item" v-for="item in applicationAnalysisList" :key="item.id">
							<div class="application-analysis-item-top">
								<img src="../../assets/img/application-analysis1.png" alt="">
								<span>{{item.title}}</span>
							</div>
							<div class="application-analysis-item-bottom">
								<div class="application-analysis-item-bottom-item" v-for="child in item.children" :key="child.id">
									<span class="application-analysis-item-bottom-item-title">{{ child.title }}：</span>
									<span class="application-analysis-item-bottom-item-value">{{ child.value }}</span>
								</div>
							</div>
						</div>
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
				applicationAnalysisList: [{
					id: 1,
					title: '网络数',
					children: [{
						id: 1,
						title: '平均响应时间',
						value: '230ms'
					},{
						id: 2,
						title: '最大响应时间',
						value: '1905ms'
					},{
						id: 3,
						title: '可用性',
						value: '98%'
					}]
				},{
					id: 2,
					title: '应用代码层',
					children: [{
						id: 1,
						title: '平均执行时间',
						value: '214ms'
					},{
						id: 2,
						title: '最高时间',
						value: '1905ms'
					},{
						id: 3,
						title: '错误次数',
						value: '246'
					}]
				},{
					id: 3,
					title: '中间件层',
					children: [{
						id: 1,
						title: '请求次数',
						value: '356'
					},{
						id: 2,
						title: 'CPU利用率',
						value: '56%'
					},{
						id: 3,
						title: '当前链接数',
						value: '67'
					}]
				},{
					id: 4,
					title: '数据库层',
					children: [{
						id: 1,
						title: '会话数',
						value: '378'
					},{
						id: 2,
						title: '缓存命中数',
						value: '632'
					},{
						id: 3,
						title: '最大链接数',
						value: '400'
					}]
				},{
					id: 5,
					title: '服务器系统',
					children: [{
						id: 1,
						title: 'CPU',
						value: '35%'
					},{
						id: 2,
						title: '内存',
						value: '91%'
					},{
						id: 3,
						title: '存储使用率',
						value: '72%'
					}]
				}],
				option: {
						tooltip: {
							trigger: 'item',
							backgroundColor: 'rgba(44,62,80,0.8)',
							borderColor: 'rgba(153, 209, 246, 0.6)',
							textStyle: {
								align: 'left',
								fontSize: 12,
								color: 'rgba(255,255,255,0.8)',
							},
						},
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
												shadowBlur: 15,
												shadowColor: new echarts.graphic.LinearGradient(
														//4个参数用于配置渐变色的起止位置, 依次对应右/下/左/上四个方位
														0, 0, 0, 1,
														//数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示起始位置
														[ //外部轮廓的阴影颜色 
																{
																		offset: 0,
																		color: "#cffc03"
																},
																{
																		offset: 1,
																		color: '#ecfc03'
																}
														]
												),
										},
										itemStyle: {
												opacity: 0.95,
												shadowBlur: 5,
												shadowColor: 'rgba(255, 255, 255, 0.4)'
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
				ratioList: [],
			}
		},
		computed: {
			...mapGetters(['map','currentSys']),
			ratioAbTotal(){
				return this.ratioList.reduce((sum,item)=>sum+item.val,0);
			},
		},
		watch: {},
		mounted(){
    	this.init()
		},
		beforeDestroy(){
			this.destroySys()
		},
		methods: {
			init() {
				this.$nextTick(() => {
					this.thisCrrentSys = 'networkoperation'
					setTimeout(() => {
						console.log(document.getElementById('schoolProfile'), "8+8888")
						this.renderpie('intelwarning')
						this.renderpie('faultAnalysisPie')
						this.renderSchoolProfileEchart()
						this.ratioList = [
							{name:"正常",val:319,color:'rgba(169,133,238,0.8)'},
							{name:"缓慢",val:25,color:'rgba(196,144,191,0.8)'},
							{name:"错误",val:12,color:'rgba(19,181,177,0.8)'},
						]
						let cpuDashboard = echarts.init(document.getElementById('cpu'))
						cpuDashboard.setOption(this.renderDashboardOption('cpu使用率', 28))
						let memoryDashboard = echarts.init(document.getElementById('memory'))
						memoryDashboard.setOption(this.renderDashboardOption('内存使用率',28))
						let storeDashboard = echarts.init(document.getElementById('store'))
						storeDashboard.setOption(this.renderDashboardOption('储存使用率', 28))
						this.renderVisitsChart()
						this.setBarChart()
						this.renderFaultAnalysisLine()
					}, 2000);
				})
			},
			setBarChart(){
				let colors = ['#598BF1', '#E2B46D', '#F2896B', '#2B63D5', '#2039C3', ]
				let intelligentwarningbarChart = echarts.init(document.getElementById('intelligentwarningbar'))
				intelligentwarningbarChart.setOption({
					grid: {
						left: 35,
						right: 0,
						bottom: 20,
						top: 10
					},
					xAxis: {
						type: 'category',
						data: ['次要警告', '重要警告', '紧急警告'],
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: 'rgba(106, 176, 255, .5)'
							}
						}
					},
					yAxis: {
						type: 'value',
						axisLine: {
							show: true,
							lineStyle: {
								color: 'rgba(106, 176, 255, .5)'
							}
						},
						splitLine: {
							lineStyle: {
								type: 'dashed',
								color: 'rgba(106, 176, 255, .3)'
							}
						}
					},
					series: [
						{
							data: [120, 200, 150],
							barMaxWidth: 15,
							type: 'bar',
							itemStyle:{
								normal:{
　　　　　　　　　　　　//每个柱子的颜色即为colors数组里的每一项，如果柱子数目多于colors的长度，则柱子颜色循环使用该数组
									color: function (params){
										return colors[params.dataIndex];
									}
								},
							},
						}
					]
				})
			},
			renderFaultAnalysisLine(){
				let option = {
					color: ['#80FFA5'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					grid: {
						left: 35,
						right: 0,
						bottom: 20,
						top: 10
					},
					xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['1', '2', '3', '4', '5', '6', '7'],
							axisTick: {
								show: false
							},
							axisLine: {
								lineStyle: {
									color: 'rgba(106, 176, 255, .5)'
								}
							}
					},
					yAxis: {
						type: 'value',
						axisLine: {
							show: true,
							lineStyle: {
								color: 'rgba(106, 176, 255, .5)'
							}
						},
						splitLine: {
							lineStyle: {
								type: 'dashed',
								color: 'rgba(106, 176, 255, .3)'
							}
						}
					},
					series: [
						{
							name: 'Line 1',
							type: 'line',
							stack: 'Total',
							smooth: true,
							lineStyle: {
								width: 0
							},
							showSymbol: false,
							areaStyle: {
								opacity: 0.8,
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: 'rgba(42, 227, 234, 1)'
									},
									{
										offset: 1,
										color: 'rgba(112, 49, 228, 1)'
									}
								])
							},
							emphasis: {
								focus: 'series'
							},
							data: [140, 232, 101, 264, 90, 340, 250]
						},
					]
				}
				let faultAnalysisLine = echarts.init(document.getElementById('faultAnalysisLine'));
				faultAnalysisLine.setOption(option)
			},
			renderpie(id) {
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
				intelwarningChartDom = document.getElementById(id);
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
						formatter: '{b} : {c} ({d}%)',
						backgroundColor: 'rgba(44,62,80,0.8)',
						borderColor: 'rgba(153, 209, 246, 0.6)',
						textStyle: {
							align: 'left',
							fontSize: 12,
							color: 'rgba(255,255,255,0.8)',
						},
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
			renderDashboardOption(title,value){
				return {
					title: {
						text: title,
						textAlign: 'center',
						bottom: 15,
						left: '48%',
						textStyle: {
							fontSize: 12,
							color: 'rgba(255, 255, 255, .8)'
						}
					},
					series: [
						{
							type: 'gauge',
							zlevel: 2,
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
								distance: 13,
								fontSize: 6,
								color: 'rgba(255, 255, 255, 1)',
							},
							detail: {
								valueAnimation: true,
								formatter: '{value}%',
								color: 'rgba(255, 255, 255, 1)',
								fontSize: 12
							},
							pointer: {
								width: 2
							},
							data: [
								{
									value: value
								}
							]
						},
						{
							type: 'gauge',
							radius: '60%',
							zlevel: 1,
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
								width: 15,
								itemStyle: {
									color: 'rgba(15,210,157,1)',
								}
							},
							data: [
								{
									value: value
								}
							]
						}
					]
				}
			},
			renderVisitsChart(){
				const colors = ['#598BF1','#C490BF',];
				let option = {
					color: colors,
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
						backgroundColor: 'rgba(44,62,80,0.8)',
						borderColor: 'rgba(153, 209, 246, 0.6)',
						textStyle: {
							align: 'left',
							fontSize: 12,
							color: 'rgba(255,255,255,0.8)',
						},
					},
					grid: {
						left: '16%',
						right: '16%'
					},
					xAxis: [
						{
							type: 'category',
							axisTick: {
								show: false
							},
							// prettier-ignore
							data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
						}
					],
					yAxis: [
						{
							type: 'value',
							name: '浏览器访问量（次）',
							min: 0,
							position: 'left',
							axisLine: {
								show: true,
								lineStyle: {
									color: colors[0]
								}
							},
							splitLine: {
								lineStyle: {
									type: 'dashed',
									color: colors[0]
								}
							}
						},
						{
							type: 'value',
							name: '系统请求次数(次)',
							min: 0,
							position: 'right',
							axisLine: {
								show: true,
								lineStyle: {
									color: colors[1]
								}
							},
							splitLine: {
								lineStyle: {
									type: 'dashed',
									color: colors[1]
								}
							}
						}
					],
					series: [
						{
							name: '浏览器访问量',
							type: 'bar',
							data: [
								2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
							]
						},
						{
							name: '系统请求次数',
							type: 'bar',
							data: [
								2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
							],
							yAxisIndex: 1,
						},
						
					]
				};
				let visitsChart = echarts.init(document.getElementById('visitsChart'))
				visitsChart.setOption(option)
				window.addEventListener("resize", function() {                
					visitsChart.resize();           
				})
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
	width: 40%;
	height: 180px;
}

#intelwarning {
	width: 200px;
	height: 200px;
	/* margin-left: 20px; */
}
#faultAnalysisPie{
	width: 200px;
	height: 200px;
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
	height: 100%;
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
	justify-content: space-around;
	width: 96%;
	.resource-analysis-item{
		width: 106px;
		height: 136px;
		background: url(../../assets/pieimg/fire/firebg.png) no-repeat;
		background-size: 93%;
    background-position: center 7px;
	}
}
.visitsChart-wrap{
	width: 100%;
	height: 100%;
}
#visitsChart{
	width: 100%;
	height: 91%;
}
.application-analysis{
	width: 100%;
	height: 100%;
}
.application-analysis-item{
	margin: 15px;
}
.application-analysis-item-top{
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	font-size: 16px;
	color: #fff;
	img{
		margin-right: 10px;
		width: 30px;
	}
}
.application-analysis-item-bottom{
	display: flex;
	justify-content: space-between;
}
.application-analysis-item-bottom-item{
	display: flex;
	justify-content: space-between;
	padding-bottom: 5px;
	min-width: 25%;
	border-bottom: 1px dashed #fff;
}
.application-analysis-item-bottom-item-title{
	color: rgba(255, 255, 255, 0.8);
}
.application-analysis-item-bottom-item-value{
	color: rgba(rgba(0, 245, 255, 1));
}
</style>
