<template>
	<div>
		<sideTran :thisCrrentSys="thisCrrentSys">
			<div slot="left" class="left">
				<sideItem title="今日归寝情况" delay="500">
					<div slot='body' style="height: 30%;">
						<div class="homestatues">
							<div class="homestatuesleft">
								<div class="homestatuesleftwz">
									<p style="color: #00F5FF;display: inline-block;font-weight: bolder;">85.75</p><span
										style="color:gray;">%</span>
									<p style="color: white;">今日归寝率</p>
								</div>
								<div style="width: 150px;margin-top: 56px;">
									<p style="display: inline-block;color: #00F5FF;font-weight: bolder;">21102</p><span
										style="color:gray;">人</span>
									<p style="color: white;position: relative;">住宿总人数</p>
								</div>
							</div>
							<div class="homestatuesright">
								<div class="leftstatuesbox" v-for="(item,index) in homestaueslist">
									<div style="position: relative;top:-10px">
										<p style="display: inline-block;color: #00F5FF;font-weight: bolder;">
											{{item.peoplenum}}
										</p><span style="color:gray;font-size: 12px;">人</span>
									</div>
									<div style="position: relative;top: -10px;">
										<img :src="item.homestatuesimg">
									</div>
									<div style="position: relative;top: -10px;">
										<p style="color: white;font-size: 12px;">{{item.name}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</sideItem>

				<sideItem title="各学院资产总数统计" delay="1000">
					<div style="height: 30%;" slot='body'>
						<div class="dormitoryUtilization">
							<div class="useleft">
								<img src="../assets/img/pyramid.png">
							</div>
							<div class="useright">
								<div class="userightbox">
									<div class="colorbox">
										<div style="position: relative;top: 6px;left: 10px;font-size: 14px;">
											<span class="shu"></span>
											<span class="userboxwz">闲置</span>
										</div>
										<div style="position: relative;top: 6px;font-size: 14px;">
											<span style="color: #00F5FF;">50</span><span style="color: gray;">间</span>
										</div>
										<div style="position: relative;top: 6px;margin-right: 10px;font-size: 14px;">
											<span style="color: white;">查看明细</span>
										</div>
									</div>
								</div>
								<div class="userightbox" style="margin-top: 20px;">
									<div class="colorbox">
										<div style="position: relative;top: 6px;left: 10px;font-size: 14px;">
											<span class="shu"></span>
											<span class="userboxwz">未住满</span>
										</div>
										<div style="position: relative;top: 6px;font-size: 14px;">
											<span style="color: #00F5FF;">50</span><span style="color: gray;">间</span>
										</div>
										<div style="position: relative;top: 6px;margin-right: 10px;font-size: 14px;">
											<span style="color: white;">查看明细</span>
										</div>
									</div>
								</div>
								<div class="userightbox" style="margin-top: 20px;">
									<div class="colorbox">
										<div style="position: relative;top: 6px;left: 10px;font-size: 14px;">
											<span class="shu"></span>
											<span class="userboxwz">住满</span>
										</div>
										<div style="position: relative;top: 6px;font-size: 14px;">
											<span style="color: #00F5FF;">50</span><span style="color: gray;">间</span>
										</div>
										<div style="position: relative;top: 6px;margin-right: 10px;font-size: 14px;">
											<span style="color: white;">查看明细</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</sideItem>

				<sideItem title="各宿舍楼归寝情况" delay="1500">
					<div slot='body' style="height: 40%;">
						<div id="returntoBed" ref="returntoBed">
						</div>
					</div>
				</sideItem>

			</div>
			<!-- 右边 -->
			<div slot="right" class="right">
				<sideItem title="未归寝名单" transitionType="right" >
					<div class="nohomelist" v-for="(item,index) in nohomelist" slot='body'>
						<div style="display: flex;position: relative;">
							<img src="../assets/img/nohomeimg.png" alt="" class="nohomelistimg">
							<!-- <span class="fgline">-</span> -->
							<div class="nohomelistbox">
								<img :src="item.img" alt=""
									style="width: 48px;height: 48px;position: absolute;left: 10px;top: 4px;">
								<div class="nohomelistboxwz">
									<p class="bottomtop" :title="item.roomname">{{item.roomname}}</p>
									<p class="bottomtop" :title="item.name">{{item.name}}</p>
									<p class="bottomtop"
										style='overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'
										:title="item.promess">{{item.promess}}</p>
									<p class="bottomp" :title="item.number">{{item.number}}</p>
									<p class="bottomp" :title="item.studentnumber">{{item.studentnumber}}</p>
									<p class="bottomp" :title="item.class">{{item.class}}</p>
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
	import * as echarts from 'echarts'
	import {
		mapGetters
	} from 'vuex'
	import sideTran from './sideTran'
	import peopleimg from "../assets/img/people.png"
	import sideItem from './sideItem.vue'
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
					this.thisCrrentSys = 'dormitory'
					setTimeout(()=>{
						this.randerBar()
					},1500)
				})
			},
			randerBar() {
				var yAxisData = ['TOP1', 'TOP2', 'TOP3', 'TOP4', 'TOP5', 'TOP6', 'TOP7', 'TOP8', 'TOP9', 'TOP10'];
				let dormitoryChartDom, dormitoryChartChart
				dormitoryChartDom = document.getElementById('returntoBed');
				dormitoryChartChart = echarts.init(dormitoryChartDom);
				let list = [{
					name: '一号宿舍楼',
					value: 36
				}, {
					name: '二号宿舍楼',
					value: 25
				}, {
					name: '三号宿舍楼',
					value: 12
				}, {
					name: '四号宿舍楼',
					value: 14
				}, {
					name: '五号宿舍楼',
					value: 30
				}, {
					name: '六号宿舍楼',
					value: 30
				}, {
					name: '七号宿舍楼',
					value: 30
				}, {
					name: '八号宿舍楼',
					value: 30
				}];
				let yName = list.map((item) => item.name);
				let xData = list.map((item) => item.value);
				let barWidth = 18;
				dormitoryChartChart.setOption({
					xAxis: {
						splitLine: {
							show: false
						},
						axisLabel: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						}
					},
					grid: {
						containLabel: true,
						left: 30,
						top: 0,
						right: 100,
						bottom: 0
					},
					yAxis: [{
						inverse: true,
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							margin: 10,
							textStyle: {
								fontSize: 14,
								color: '#fff'
							}
						},
						data: yName,
					}],
					series: [{ //内
							type: 'bar',
							barWidth,
							legendHoverLink: false,
							symbolRepeat: true,
							silent: true,
							itemStyle: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 1,
									y2: 0,
									colorStops: [{
										offset: 0,
										color: '#00abee' // 0% 处的颜色
									}, {
										offset: 1,
										color: '#62E6F6' // 100% 处的颜色
									}]
								}
							},
							data: list,
							z: 1,
							animationEasing: 'elasticOut'
						},
						{ // 背景
							type: 'pictorialBar',
							animationDuration: 0,
							symbolRepeat: 'fixed',
							symbolMargin: '20%',
							symbol: 'roundRect',
							symbolSize: [6, barWidth],
							itemStyle: {
								normal: {
									color: '#12272A',

								}
							},
							label: {
								normal: {
									show: true,
									position: 'right',
									offset: [0, 2],
									distance: 30,
									textStyle: {
										color: '#7AF8FF',
										fontSize: 14,
									},
									formatter: function(a, b) {
										return `${a.value}%`
									}
								},

							},
							data: xData,
							z: 0,
							animationEasing: 'elasticOut'
						},
						{ //分隔
							type: 'pictorialBar',
							itemStyle: {
								color: '#000'
							},
							symbolRepeat: 'fixed',
							symbolMargin: 4,
							symbol: 'roundRect',
							symbolClip: true,
							symbolSize: [2, barWidth],
							symbolPosition: 'start',
							symbolOffset: [0, 0],
							data: list,
							z: 2,
							animationEasing: 'elasticOut'
						}
					]
				})
			}
		},
		mounted() {
			// this.randerBar()
			// setTimeout(console.log(this.$echarts,"5555",this.$ref.returntoBed), 3000 )

		},
		data() {
			return {
				thisCrrentSys: '',
				peopleimg: require("../assets/img/people.png"),
				nohomelist: [{
						img: require("../assets/img/people.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "网络安全与工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "网络安全与工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "网络安全与工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "网络安全与工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "网络安全与工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "网络安全与工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "网络安全与工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "网络安全与工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "网络安全与工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "网络安全与工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "网络安全与工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "网络安全与工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
				],
				homestaueslist: [{
						peoplenum: "21102",
						homestatuesimg: require("../assets/img/todaypeople.png"),
						name: "今日应归寝人数",
					},
					{
						peoplenum: "21102",
						homestatuesimg: require("../assets/img/leave.png"),
						name: "今日请假人数",
					},
					{
						peoplenum: "21102",
						homestatuesimg: require("../assets/img/todaynowpeople.png"),
						name: "今日当前归寝人数",
					},
					{
						peoplenum: "21102",
						homestatuesimg: require("../assets/img/todaynohomepeople.png"),
						name: "今日未归寝人数",
					}
				],
			}
		}
	}
</script>

<style scoped>
	#returntoBed {
		width: 400px;
		height: 230px;
		position: relative;
		left: -20px;
	}

	.side-item-title {
		margin-top: 10px;
		width: 40%;
		display: flex;
		align-items: center;
		padding: 3px;
		padding-left: .106667rem;
		color: #00F5FF;
		font-size: .08rem;
		border-bottom: 1px solid #00F5FF;
	}

	.side-item-title img {
		margin-right: .04rem;
		width: .106667rem;
	}

	.border {
		display: flex;
		justify-content: center;
		padding: 0 10%;
	}

	.border img {
		width: 100%;
	}

	.title-border {
		margin: 3px;
		margin-bottom: .16rem;
		margin-left: .106667rem;
		width: .583333rem;
		height: 1px;
		background-color: #00F5FF;
	}

	.nohomelist {
		padding-left: 20px;
		padding-right: 10px;
		margin-top: 20px;
	}

	.nohomelistbox {
		height: 56px;
		width: 11rem;
		background: url(../assets/img/nohomebox.png) no-repeat;
		margin-left: 10px;
		background-size: 98% 100%;
		position: relative;

	}

	.nohomelistbox::before {
		content: '';
		position: absolute;
		top: 50%;
		left: -3%;
		background-color: #6AB0FF;
		width: 2%;
		height: 1px;
	}

	.fgline {
		font-size: 24px;
		color: #6AB0FF;
		margin-top: 10px;
		margin-left: 4px;
	}

	.nohomelistboxwz {
		position: absolute;
		right: 10px;
		background-color: rgba(68, 92, 121, 0.6);
		width: 75%;
		height: 94%;
		top: 4%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.nohomelistboxwz p {
		width: 30%;
		height: 20px;
		display: inline-block;
		font-size: 0.01rem;
		color: white;
		margin-top: 2px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.right {
		overflow-y: scroll;
		height: 100%;
	}

	.right::-webkit-scrollbar {
		width: 10px;
		height: 10px;
		/**/
	}

	.right::-webkit-scrollbar-track {
		background: rgb(239, 239, 239);
		border-radius: 2px;
	}

	.right::-webkit-scrollbar-thumb {
		background: #bfbfbf;
		border-radius: 10px;
	}

	.right::-webkit-scrollbar-thumb:hover {
		background: #333;
	}

	.right::-webkit-scrollbar-corner {
		background: #179a16;
	}

	.homestatuesleft {
		border: 1px solid transparent;
		background: url(../assets/img/diamaryhomebg.png);
		width: 150px;
		height: 150px;
		background-color: rgba(68, 92, 121, 0.6);
		background-size: 100% 100%;
		position: relative;
	}

	.left {
		height: 100%;
		padding-left: 20px;
	}

	.homestatues {
		margin-top: 20px;
		display: flex;
	}

	.homestatuesleftwz {
		margin-top: 52px;
	}

	.homestatuesleftwz p {
		font-size: 16px;
	}

	.homestatuesleftwz span {
		font-size: 16px;
	}

	.homestatues p {
		font-size: 16px;
	}

	.homestatues span {
		font-size: 16px;
	}

	.leftstatuesbox {
		display: inline-block;
		/* margin-top: -50px; */
		/* margin-left: 20px; */
		width: 50%;
		height: 100px;
	}

	.homestatuesright {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;
	}

	.border {
		display: flex;
		justify-content: center;
		padding: 0 10%;
	}

	.border img {
		width: 100%;
	}

	.dormitoryUtilization {
		margin-top: 10px;
		display: flex;
	}

	.useright {
		/* height: 100%; */
		width: 100%;
		margin-left: 30px;
	}

	.useright p {
		font-size: 12px;
		color: white;
	}

	.useright span {
		font-size: 12px;
		color: white;
	}

	.userightbox {
		/* width: 100%; */
		height: .18rem;
		background-size: 90% .18rem !important;
		background: url(../assets/img/nohomebox.png) no-repeat;
		border: 1px solid transparent;
	}

	.shu {
		height: 10px;
		width: 3px;
		display: inline-block;
		background-color: rgb(105, 175, 254);
		display: inline-block;
		margin-right: 2px;
	}

	.colorbox {
		display: flex;
		justify-content: space-between;
		height: .15rem;
		width: 87%;
		background-color: rgba(68, 92, 121, 0.6);
		margin-left: 5px;
		margin-top: 3px;
		/* 		width: 80%;
		background-color: red; */
	}
</style>
