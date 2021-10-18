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
				<sideItem title="土地情况">
					<div slot='body'>
						<div id="webSecurity"></div>
					</div>
				</sideItem>
				<sideItem title="用水情况">
					<div slot='body'>
						<div id="serverSecurity"></div>
					</div>
				</sideItem>
				<sideItem title="公房使用单位统计">
					<div slot='body'>
						<div class="usebox">
							<div id="usepublic"></div>
							<div>
								
							</div>
						</div>
					</div>
				</sideItem>
				<sideItem title="空置房源统计">
					<div slot='body'>
						<div id="serverSecurity"></div>
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
				thisCrrentSys: ""
			}
		},
		computed: {
			...mapGetters(['currentSys'])
		},
		watch: {},
		mounted() {
			console.log('assets')

		},
		methods: {
			init() {
				this.$nextTick(() => {
					this.thisCrrentSys = 'publichouse'
					console.log(document.getElementById('usepublic'), "8+8888")
					var _this = this
					setTimeout(function() {
						_this.rendpubpie() //娃娃消失
					}, 200);
				})
			},
			rendpubpie() {
				console.log("进入")
				let usepublicChartDom, usepublicChartChart, option
				usepublicChartDom = document.getElementById('usepublic');
				usepublicChartChart = echarts.init(usepublicChartDom, {
					width: 150,
					height: 150
				});
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



				usepublicChartChart.setOption({
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
							radius: ['70%', '70%'], //设置饼状图的宽高
							// hoverAnimation: false,
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
										show: false,
										color: '#00ffff'
									}
								}
							},
							data: list,
							animationType: 'scale',
							animationEasing: 'elasticOut',
							animationDelay: function(idx) {
								return idx * 350;
							}
						},
						{
							name: '',
							type: 'pie',
							center: ['50%', '50%'],
							radius: ['49%', '49%'],
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
										formatter: '{c|设备}' + '\n\r' + '{active|用电占比}',

										// formatter: '用电纪录',
										rich: {
											c: {
												color: 'rgba(255, 255, 255, .5)',
												fontSize: 14,
												// fontWeight: 'bold',
												lineHeight: 22
											},
											b: {
												color: 'rgba(255, 255, 255, .5)',
												fontSize: 14,
												lineHeight: 22
											}
										},
										textStyle: {
											fontSize: 14,
											// fontWeight: 'bold'
										},
										position: 'center'
									}
								}
							}]
						}
					]
				});
				// usepublicChartChart.setOption(option)
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

	#usepublic {
		width: 150px;
		height: 150px;
	}
	.usebox{
		display: flex;
	}
</style>
