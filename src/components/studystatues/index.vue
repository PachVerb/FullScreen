<template>
	<div>
		<sideTran :thisCrrentSys="thisCrrentSys">
			<div slot="left" class="left">
				<sideItem title="学生到课统计" delay="500">
					<div slot='body' >
						<div class="studentschool">
							<div class="outbox">
								<div class="oneleftbox">
									<img src="../../assets/pieimg/study/arc.png" class="arcposition ">
									<img src="../../assets/pieimg/study/innercir.png" class="cirposition ">
									<div id="studentchart"></div>
								</div>
								<div class="itembox"></div>
							</div>
						</div>
					</div>
				</sideItem>

				<sideItem title="教学综合情况" delay="1000">
					<div  slot='body'>
						<div class="boxtwo">
							
						</div>
					</div>
				</sideItem>

				<sideItem title="各宿舍楼归寝情况" delay="1500">
					<div slot='body'>
						<div class="boxthir">
							
						</div>
					</div>
				</sideItem>

			</div>
			<!-- 右边 -->
			<div slot="right" class="right">
				<sideItem title="未归寝名单" transitionType="right" >
					
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
	import sideTran from '../sideTran'
	import sideItem from '../sideItem.vue'
	export default {
		components: {
			sideTran,
			sideItem
		},
		computed: {
			...mapGetters(['currentSys'])
		},
		watch: {

		},
		methods: {
			init() {
				this.$nextTick(() => {
					this.thisCrrentSys = 'studystatues'
					setTimeout(()=>{
						this.renderBar()
					},1000)
				})
			},
			renderBar(){
				let studentchartChartDom, studentchartChartChart
				studentchartChartDom = document.getElementById('studentchart');
				studentchartChartChart = echarts.init(studentchartChartDom);
				var value = 0.54;
				studentchartChartChart.setOption({
				    // backgroundColor: '#182s3s',
				    title: [
				        {
				            text: (value * 100).toFixed(0) + '%',
				            left: '48%',
				            top: '42%',
				            textAlign: 'center',
				            textStyle: {
				                fontSize: '20',
				                fontWeight: '500',
				                color: '#00F5FF',
				                textAlign: 'center',
				                textBorderColor: 'rgba(0, 0, 0, 0)',
				                textShadowColor: '#000',
				                textShadowBlur: '0',
				                textShadowOffsetX: 0,
				                textShadowOffsetY: 1,
				            },
				        },
				    ],
				    polar: {
				        radius: ['58%', '65%'],
				        center: ['50%', '50%'],
				    },
				    angleAxis: {
				        startAngle:180,
				        max: 100,
				        clockwise: false,
				        axisLine: {
				            show: false,
				        },
				        axisTick: {
				            show: false,
				        },
				        axisLabel: {
				            show: false,
				        },
				        splitLine: {
				            show: false,
				        },
				    },
				    radiusAxis: {
				        type: 'category',
				        show: true,
				        axisLabel: {
				            show: false,
				        },
				        axisLine: {
				            show: false,
				        },
				        axisTick: {
				            show: false,
				        },
				    },
				    series: [
				
				        {
				            name: '',
				            type: 'bar',
				            roundCap: true,
				            z: 2,
				            startAngle:60,
				            showBackground: true,
				            backgroundStyle: {
				                color: '#3F546B',
				            },
				            data: [75],
				            coordinateSystem: 'polar',
				            itemStyle: {
				                normal: {
				                    color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [//设置渐变色
				                        {
				                            offset: 0,
				                            color: '#69AFFD',
				                        },
				                        {
				                            offset: 1,
				                            
				                            
				                            color: '#69AFFD',
				                        },
				                    ]),
				                },
				            },
				        },
				    ],
				});

			}
		},
		mounted() {
			// this.randerBar()
			// setTimeout(console.log(this.$echarts,"5555",this.$ref.returntoBed), 3000 )

		},
		data() {
			return {
				thisCrrentSys: '',
			}
		}
	}
</script>

<style scoped="scoped">
	.studentschool{
		height: 160px;
	}
	.boxtwo{
		height: 150px;
	}
	.boxthir{
		
	}
	.outbox{
		display: flex;
	}
	#studentchart{
		height: 150px;
		width: 150px;
	}
	.oneleftbox{
		position: relative;
	}
	.arcposition{
		position: absolute;
		left: 0;
		width:150px;
		animation: myMove 5s;
		/* -webkit-animation: myMove 5s ease-in infinite alternate; 旋转半圈以后反转*/
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
	.cirposition{
		position: absolute;
		left: 0;
		width:150px;
	}
	.oneleftbox{
		margin-left: 10px;
		margin-top: 10px;
	}
	
	

</style>
