<template>
	<div style="height: 100%;">
		<sideTran :thisCrrentSys="thisCrrentSys">
			<div slot="left" class="left" style="height: 100%;">
				<sideItem title="今日归寝情况" delay="100" height="30%">
					<div slot='body' style="height: 100%;">
						<div class="homestatues">
							<div class="homestatuesleft">
								<img src="../assets/pieimg/dormitory/arc.png" class="arcposition ">
								<img src="../assets/pieimg/dormitory/innercir.png" class="cirposition ">
								<div id="todayhome"></div>
								<div style="width: 150px;margin-top: 136px;margin-left: -20px;">
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

				<sideItem title="宿舍利用概况" delay="200" height="30%" style="margin-top: 30px;">
					<div style="height: 100%;width: 100%;margin-top: 10%;" slot='body'>
						<div class="dormitoryUtilization">
							<div class="useleft">
								<img class="img1" src="../assets/img/free-img1.png" alt="">
								<img class="img2" src="../assets/img/free-img2.png" alt="">
								<img class="img3" src="../assets/img/free-img3.png" alt="">
								<!-- <img src="../assets/img/pyramid.png"> -->
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
											<span style="color: #00F5FF;">2410</span><span style="color: gray;">间</span>
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
											<span style="color: #00F5FF;">15241</span><span style="color: gray;">间</span>
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

				<sideItem title="各宿舍楼归寝情况" delay="300" height="38%">
					<div slot='body' style="height: 100%;width: 100%;">
						<div id="returntoBed" ref="returntoBed">
						</div>
					</div>
				</sideItem>

			</div>
			<!-- 右边class="right" -->
			<div slot="right" style="height: 100%;" class="right">
				<sideItem title="未归寝名单" transitionType="right" delay="100" height="100%" >
						<div  style="height: 100%;width: 100%;overflow-y: scroll;" slot='body'>
							<div class="violation-detail-table">
								<div class="ab-list patrol">
									<div class="content" @mouseenter="abScrollStop" @mouseleave="abScrollStart">
							<div class="nohomelist ab-item-wrap" v-for="(item,index) in nohomelist" >
								<div class="ab-item">
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
							</div>
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
		data() {
			return {
				abTimer:null,
				thisCrrentSys: '',
				peopleimg: require("../assets/img/people.png"),
				nohomelist: [{
						img: require("../assets/img/people.png"),
						roomname: "修身宿舍楼",
						name: "李晶",
						promess: "机械工程",
						number: "A5102",
						studentnumber: "225456565",
						class: "09班"
					},
					{
						img: require("../assets/img/people2.png"),
						roomname: "修身宿舍楼",
						name: "李志云",
						promess: "机械设计制造及其自动化",
						number: "C5102",
						studentnumber: "225456545",
						class: "02班"
					},
					{
						img: require("../assets/img/people3.png"),
						roomname: "修身宿舍楼",
						name: "李梦",
						promess: "电子信息工程",
						number: "B5102",
						studentnumber: "225453565",
						class: "01班"
					},
					{
						img: require("../assets/img/people4.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "电子科学与技术",
						number: "B4102",
						studentnumber: "225456565",
						class: "02班"
					},
					{
						img: require("../assets/img/people5.png"),
						roomname: "修身宿舍楼",
						name: "周雨生",
						promess: "通信工程",
						number: "B5982",
						studentnumber: "225556565",
						class: "12班"
					},
					{
						img: require("../assets/img/people6.png"),
						roomname: "修身宿舍楼",
						name: "李晶",
						promess: "微电子科学与工程",
						number: "B2242",
						studentnumber: "225987565",
						class: "01班"
					},
					{
						img: require("../assets/img/people7.png"),
						roomname: "修身宿舍楼",
						name: "唐月",
						promess: "光电信息科学与工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people8.png"),
						roomname: "修身宿舍楼",
						name: "王谢",
						promess: "信息工程",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people9.png"),
						roomname: "修身宿舍楼",
						name: "舒云",
						promess: "软件工程系",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people10.png"),
						roomname: "修身宿舍楼",
						name: "吴星星",
						promess: "美术系",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people4.png"),
						roomname: "修身宿舍楼",
						name: "王猛",
						promess: "音乐系",
						number: "B5102",
						studentnumber: "225456565",
						class: "01班"
					},
					{
						img: require("../assets/img/people6.png"),
						roomname: "修身宿舍楼",
						name: "李春",
						promess: "教育系",
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
				mesList: [],
				markerList: null
			}
		},
		computed: {
			...mapGetters(['currentSys'])
		},
		watch: {
			currentSys(val) {
				if (val != 'vehicle') {
					this.abScrollStop();
				}
			}
		},
		mounted(){
    	this.init()
		},
		beforeDestroy(){
			this.destroySys()
		},
		methods: {
			init() {
				this.map.flyTo({
				     center: [104.05999036597285, 30.596105715016634],
				     bearing: 40,
				     pitch: 60,
				     zoom: 14.5,
				     duration: 1000,
				     easing(t) {
				       return t;
				     }
				})
				this.hideBuildingText()
				this.$nextTick(() => {
					this.thisCrrentSys = 'dormitory'
					setTimeout(() => {
						this.renderpie()
						this.randerBar()
						this.abScrollStart();
					}, 600)
				})
				this.mesList = [{
					useNum: 34,
					freeNum: 14,
					location: [104.05418072206447, 30.596097296430713]
				},{
					useNum: 34,
					freeNum: 14,
					location: [104.05289504007709, 30.597849568538066]
				},{
					useNum: 34,
					freeNum: 14,
					location: [104.05297581881695, 30.591683078089403]
				},{
					useNum: 34,
					freeNum: 14,
					location: [104.05284012650753, 30.593330798308727]
				},{
					useNum: 34,
					freeNum: 14,
					location: [104.05302822711468, 30.599482777495666]
				},{
					useNum: 34,
					freeNum: 14,
					location: [104.05301282025277, 30.59451783566125]
				},]
				this.createStudystatusMraker('mesList', 'markerList')
			},
			destroySys(){
				this.showBuildingText()
				this.clearStudystatusMarker()
				if(this.roomLayer){
					this.roomLayer.remove()
					this.roomLayer = null
				}
			},
			//开始自动滚动
			abScrollStart() {
				console.log("abScrollStart11")
				this.nohomelist.length && this.$nextTick(() => {
					console.log("jinru")
					this.abScrollStop();
					let scrollBox = document.querySelector('.violation-detail-table .ab-list');
					let content = document.querySelector('.violation-detail-table .ab-list .content');
					let items = document.querySelectorAll('.violation-detail-table .ab-list .content .ab-item-wrap');
					console.log(scrollBox,content,items,"44444")
					let itemH = items[0].clientHeight;
					let flag = true;
					let nexTop = Math.ceil(scrollBox.clientHeight / itemH) * itemH - scrollBox.clientHeight;
					//检查滚动距离是否过短
					console.log(content.clientHeight - scrollBox.clientHeight < itemH,"5555",content.clientHeight, scrollBox.clientHeight)
					if (content.clientHeight - scrollBox.clientHeight < itemH) return;
					// scrollBox.className = 'scroll noScroll';//隐藏滚动条
					this.abTimer = setInterval(() => {
						//检查滚动距离是否过短
						if (content.clientHeight - scrollBox.clientHeight < itemH) return;
						//来回移动
						// if(flag&&scrollBox.scrollTop<content.clientHeight-scrollBox.clientHeight){
						//   scrollBox.scrollTop += 1;
						// }else if(!flag&&scrollBox.scrollTop>0){
						//   scrollBox.scrollTop -= 1;
						// }else{
						//   flag = !flag
						// }
						//单向重复移动
						if (scrollBox.scrollTop < content.clientHeight - scrollBox.clientHeight) {
							scrollBox.scrollTop += 1;
						} else {
							scrollBox.scrollTop = nexTop;
						}
					}, 50);
				})
			},
			//停止自动滚动
			abScrollStop() {
				clearInterval(this.abTimer);
				// document.querySelector('.violation-detail-table .scroll')&&(document.querySelector('.violation-detail-table .scroll').className = 'scroll');//显示滚动条
			},
			createStudystatusMraker(listName, markerListName){
				let imgsrc = require('../assets/dormitory/dormitory-marker.png')
				let domList = this[listName].map(item => {
					let div = document.createElement('div')
					div.className = 'studystatus-marker-wrap'
					div.innerHTML = `
						<img class="studystatus-marker-img" src="${imgsrc}" />
						<div class="studystatus-marker-mes">
							<div><span>在寝人数：</span><span>${item.useNum}人</span></div>
							<div><span>未归寝人数：</span><span>${item.freeNum}人</span></div>
						</div>
					`
					return {dom: div}
					// let marker = new creeper.Marker({element: div}).setLngLat(item.location).addTo(this.map)
					// this[markerListName].push(marker)
				})
				let geoJson = this.setFeature(this[listName])
				console.log('geoJson',geoJson)
				this[markerListName] = new creeper.MarkerIndoor(this.map)
				this[markerListName].addMarker(geoJson,domList,true)
			},
			setFeature(markerList){
				let list = markerList.map(item => {
					let obj = {
						"type": "Feature",
						"properties": {
							
						},
						"geometry": {
								"type": "Point",
								"coordinates": JSON.parse(JSON.stringify(item.location))
						}
					}
					if(item.buildingId) obj.properties.buildingId = item.buildingId
					if(item.floor) obj.properties.floor = item.floor
					return obj
				})
				return {
					"type": "FeatureCollection",
					"features": list
				}
			},
			clearStudystatusMarker(){
				if(this.markerList) this.markerList.remove()
				this.markerList = null
			},
			renderpie() {
				let todayhomeChartDom, todayhomeChartChart
				todayhomeChartDom = document.getElementById('todayhome');
				todayhomeChartChart = echarts.init(todayhomeChartDom);
				var value = 0.54;
				todayhomeChartChart.setOption({
					// backgroundColor: '#182s3s',
					title: [{
						text: `${(value * 100).toFixed(2)}%`,
						subtext: "今日归寝率",
						left: '48%',
						top: '42%',
						textAlign: 'center',
						textStyle: {
							fontSize: '14',
							fontWeight: '500',
							color: '#00F5FF',
							textAlign: 'center',
							textBorderColor: 'rgba(0, 0, 0, 0)',
							textShadowColor: '#000',
							textShadowBlur: '0',
							textShadowOffsetX: 0,
							textShadowOffsetY: 1,
							lineHeight: 4
						},
						subtextStyle: {
							fontSize: 12,
							lineHeight: 8,
							color:"rgba(255, 255, 255, .6)"
						}
					}, ],
					polar: {
						radius: ['38%', '45%'],
						center: ['50%', '50%'],
					},
					angleAxis: {
						startAngle: 180,
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
							startAngle: 60,
							showBackground: true,
							backgroundStyle: {
								color: '#3F546B',
							},
							data: [75],
							coordinateSystem: 'polar',
							itemStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [ //设置渐变色
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
						top: 20,
						right: 60,
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
							animationDuration: 2500,
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
				window.addEventListener("resize", function() {
					dormitoryChartChart.resize();
				});
			}
		},
		
	}
</script>

<style lang="less" scoped>
	.scroll {
	  flex: 1;
	  width: 100%;
	  overflow-y: auto;
	}
	.noScroll {
	  &::-webkit-scrollbar {
	    visibility: hidden;
	  }
	  &::-webkit-scrollbar-thumb {
	    visibility: hidden;
	  }
	}
	.violation-detail-table{
		// height: calc(100% - 30px);
		height: 100%;
		display: flex;
		flex-direction: column;
		.ab-list{
			// height: calc(100% - 45px);
			flex: 1;
			overflow-y: scroll;
		}
	}
	.ab-item-wrap:hover{
		background: rgba(106, 176, 255, 0.2);
	}
	#returntoBed {
		width: 100%;
		height:100%;
		position: relative;
		left: -20px;
	}

	.side-item-title {
		margin-top: 10px;
		width: 40%;
		display: flex;
		align-items: center;
		padding: 3px;
		/* padding-left: .106667rem; */
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

	/* .right::-webkit-scrollbar {
		width: 10px;
		height: 10px;
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
	} */

	.homestatuesleft {
		width: 150px;
		height: 150px;
		/* 		border: 1px solid transparent;
		background: url(../assets/img/diamaryhomebg.png);
		background-color: rgba(68, 92, 121, 0.6);
		background-size: 100% 100%; */
		position: relative;
		left: 20px;
	}

	.left {
		height: 100%;
		/* padding-left: 20px; */
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
		padding: 0 14px;
		display: flex;
		.useleft{
			width: 145px;
      height: 150px;
      position: relative;
      img{
        position: absolute;
        cursor: pointer;
        &:hover{
          filter: drop-shadow(0 0 2px #ddd);
        }
      }
      .img1{
        width: 57px;
        top: 0;
        left: calc(50% - 28.5px);
        z-index: 3;
        animation: aniImg1 3s linear 1;
      }
      .img2{
        width: 96px;
        top: 38px;
        left: calc(50% - 48px);
        z-index: 2;
        animation: aniImg2 2s linear 1;
      }
      .img3{
        width: 145px;
        bottom: 0;
        left: calc(50% - 72.5px);
        z-index: 1;
        animation: aniImg3 1s linear 1;
      }
      @keyframes aniImg1{
        0%{
          top: 148px;
          opacity: 0;
        }
        33%{
          top: 93px;
          opacity: 0;
        }
        66%{
          top: 47px;
          opacity: 0;
        }
        100%{
          top: 0;
          opacity: 1;
        }
      }
      @keyframes aniImg2{
        0%{
          top: 148px;
          opacity: 0;
        }
        50%{
          top: 82px;
          opacity: 0;
        }
        100%{
          top: 38px;
          opacity: 1;
        }
      }
      @keyframes aniImg3{
        0%{
          opacity: 0;
        }
        100%{
          opacity: 1;
        }
      }
		}
	}

	.useright {
		flex: 1;
		margin-left: 10px;
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
		height: 40px;
		background-size: 100% 100% !important;
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
		height: 32px;
		width: 96%;
		background-color: rgba(68, 92, 121, 0.6);
		margin-left: 5px;
		margin-top: 3px;
		/* 		width: 80%;
		background-color: red; */
	}

	#todayhome {
		width: 200px;
		height: 200px;
		position: absolute;
		left: -50px;
		top: -40px;
	}

	.arcposition {
		position: absolute;
		left: -20px;
		top: -10px;
		width: 140px;
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

	.cirposition {
		position: absolute;
		left: -20px;
		width: 140px;
		top: -10px;
	}
</style>
