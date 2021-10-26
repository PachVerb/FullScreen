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
					<div slot='body'>
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

			renderpie(){
				let intelwarningChartDom, intelwarningChartChart, option
				intelwarningChartDom = document.getElementById('intelwarning');
				intelwarningChartChart = echarts.init(intelwarningChartDom);
				
				var chartData = [{name: 'Mon', value: 130},{name: 'Tue', value: 200},{name: 'Wed', value: 150},{name: 'Fri', value: 180},{name: 'Sat', value: 220},{name: 'Sun', value: 210}]
				
				intelwarningChartChart.setOption({
				    tooltip: {
				        show: true,
				        trigger: 'item',
				        // 饼图百分比显示计算
				        formatter: function(d) {
				            let num = d.percent;
				            if (d.percent >= 99) { num = '>99' }
				            if (d.percent <= 1) { num = '<1' }
				            return d.name + ' : ' + d.value  + ' (' + num + '%)';
				        },
				        transitionDuration: 0
				    },
				    color: ['#0082e6', '#15dbc6', '#37d066', '#cbc758', '#c48517', '#c44a07', '#b0222f', '#b63393', '#7a19ac', '#5d12ce', '#5460fa', '#97acfa'],  // 每个区域颜色
				    series: [
				        {
				            name: '',
				            type: 'pie',
				            center: ['50%', '50%'], // 饼图的圆心坐标
				            radius: ['60%', '72%'], // 饼图的半径
				            minAngle: 5, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
				            hoverOffset: 10, // 高亮扇区的偏移距离
				            itemStyle: {
				                normal: {
				                    borderColor: 12,
				                    borderWidth: '#fff',
				                },
				            },
				            emphasis: {
				                label: {
				                    show: true,
				                    // fontSize: '18',
				                    // fontWeight: 'bold',
				                    formatter: function(item){
				                        return '{b|' + item.value + '}\n{c|'+ item.name + '}'
				                    },
				                    rich: {
				                        // 中间数据的样式
				                        b: {
				                            fontSize: '20',
				                            fontWeight: 'bold',
				                            padding: [2, 0, 10, 0],
				                        },
				                        // 中间名字的样式
				                        c: {
				                            fontSize: '24',
				                        },
				                    },
				                },
				            },
				            // 饼图图形上的文本标签
				            label: {
				                show: false,
				                position: 'center',
				            },
				            // 标签的视觉引导线样式
				            labelLine: {
				                normal: {
				                    show: false,
				                }
				            },
				        }
				    ],
				});
				
				// option.legend.data = chartData.map(item => item.name);
				// 得到系列数据
				// option.series[0].data = chartData.map(item => ({
				//     value: item.value || null,
				//     name: item.name || ''
				// }));
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
	.intelwarningunitbox{
		width: 100%;
		height: 210px;
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
	.gear{
		position: absolute;
		width: 80px;
		top: 60px;
		left: 151px;
		
	}
	.userladnd{
		height: 300px;
	}
</style>
