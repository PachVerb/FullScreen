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
				<sideItem title="违规事件统计" :delay="1000" height="34%" :loading="loading">
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
								<div class="content" @mouseenter="abScrollStop" @mouseleave="abScrollStart">
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
					</div>
				</sideItem>
			</div>
			<div slot="right" style="height: 100%;">
				<sideItem title="车辆进出" :delay="500" transitionType="right">
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
							<svg class="svg-box">
                <polyline class="ani-line1" points="20,1 60,1 80,35 60,70 20,70 0,35 20,1" />
                <polyline class="ani-line2" points="20,1 60,1 80,35 60,70 20,70 0,35 20,1" />
                <polyline class="ani-line3" points="70,12 80,32 90,32" />
                <polyline class="ani-line4" points="70,60 80,40 160,40" />
              </svg>
						</div>
						<div class="eq-statistics-item">
							<div><span class="eq-statistics-item-num eq-statistics-item-num-ab">6</span><span class="eq-statistics-item-unit">(个)</span></div>
							<img class="eq-statistics-item-img" src="../assets/img/eq-type2.png" alt="">
							<div class="eq-statistics-item-name">故障道闸设备</div>
							<svg class="svg-box">
                <polyline class="ani-line1" points="20,1 60,1 80,35 60,70 20,70 0,35 20,1" />
                <polyline class="ani-line2" points="20,1 60,1 80,35 60,70 20,70 0,35 20,1" />
                <polyline class="ani-line3" points="70,12 80,32 90,32" />
                <polyline class="ani-line4" points="70,60 80,40 160,40" />
              </svg>
						</div>
						<div class="eq-statistics-item">
							<div><span class="eq-statistics-item-num">6</span><span class="eq-statistics-item-unit">(个)</span></div>
							<img class="eq-statistics-item-img" src="../assets/img/eq-type4.png" alt="">
							<div class="eq-statistics-item-name">测速设备</div>
							<svg class="svg-box">
                <polyline class="ani-line1" points="20,1 60,1 80,35 60,70 20,70 0,35 20,1" />
                <polyline class="ani-line2" points="20,1 60,1 80,35 60,70 20,70 0,35 20,1" />
                <polyline class="ani-line3" points="70,12 80,32 90,32" />
                <polyline class="ani-line4" points="70,60 80,40 160,40" />
              </svg>
						</div>
						<div class="eq-statistics-item">
							<div><span class="eq-statistics-item-num eq-statistics-item-num-ab">6</span><span class="eq-statistics-item-unit">(个)</span></div>
							<img class="eq-statistics-item-img" src="../assets/img/eq-type3.png" alt="">
							<div class="eq-statistics-item-name">故障测速设备</div>
							<svg class="svg-box">
                <polyline class="ani-line1" points="20,1 60,1 80,35 60,70 20,70 0,35 20,1" />
                <polyline class="ani-line2" points="20,1 60,1 80,35 60,70 20,70 0,35 20,1" />
                <polyline class="ani-line3" points="70,12 80,32 90,32" />
                <polyline class="ani-line4" points="70,60 80,40 160,40" />
              </svg>
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
			...mapGetters(['map','currentSys'])
		},
		data() {
			return {
				value1: '',
				statiList: [],//违章车辆统计
				abTimer:null,
				abDetailList: [{
					id: '1',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区1层走廊',
					methods: '违停'
				}, {
					id: '2',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区2层走廊',
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
					address: '教学楼A区4层走廊',
					methods: '违停'
				}, {
					id: '5',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区5层走廊',
					methods: '违停'
				}, {
					id: '6',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区6层走廊',
					methods: '违停'
				},{
					id: '7',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区7层走廊',
					methods: '违停'
				},{
					id: '8',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区8层走廊',
					methods: '违停'
				},{
					id: '9',
					name: 'JD1544',
					date: '2021/11/09 15:22',
					address: '教学楼A区9层走廊',
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
				},],
				loading: true,
				carList: [],
				carMarkerList: [],
				markerNameList: [],
				lineGeoJson: { type: 'FeatureCollection', features: [] }
			}
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
				setTimeout(() => {
					this.loading = false
				},2500)
				this.$nextTick(() => {
					this.thisCrrentSys = 'vehicle'
					this.getDeviceStatiList()
					setTimeout(() => {
						this.getAbDetail()
						this.randerBar()
					}, 1500)
				})
				this.carList = [{
					type: 0, // 正常
					goin: 4,
					goout: 8,
					location: [104.05770952061329, 30.591833220446006]
				},{
					type: 1,
					goin: 42,
					goout: 18,
					ab: 15,
					location: [104.0577995524622, 30.594567804926783]
				},{
					type: 0, // 正常
					goin: 14,
					goout: 28,
					location: [104.05787054368835, 30.59764980689455]
				},{
					type: 1,
					goin: 14,
					goout: 82,
					ab: 10,
					location: [104.06143324955798, 30.59131103037565]
				},{
					type: 0, // 正常
					goin: 14,
					goout: 28,
					location: [104.06127705010374, 30.59750252595603]
				},{
					type: 1, 
					goin: 14,
					goout: 28,
					ab: 13,
					location: [104.05370371212604, 30.600148109533137]
				},{
					type: 0, // 正常
					goin: 14,
					goout: 28,
					location: [104.05199870899884, 30.59535577814711]
				},]
				this.createMarker('carList','carMarkerList')
			},
			destroySys(){
				this.showBuildingText()
				this.clearMarker()
				this.lineGeoJson = { type: 'FeatureCollection', features: [] }
				if(this.map.getSource('vehicleLineData')) this.map.getSource('vehicleLineData').setData(this.lineGeoJson)
				this.checkTrajector = ''
			},
			createMarker(listName, markerListName){
				this[listName].forEach(item => {
					let imgsrc = ''
					let popup
					if(item.type == 0){
						imgsrc = require('../assets/vehicle/normal.png')
					} else if (item.type == 1) {
						imgsrc = require('../assets/vehicle/abnormal.png')
					}
					let div = document.createElement('div')
					div.className = 'vehicle-marker-wrap'
					if(item.type == 0){
						div.innerHTML = `
							<img class="vehicle-marker-img" src="${imgsrc}" />
							<div class="vehicle-marker-mes">
								<div><span>驶入：</span><span>${item.goin}辆</span></div>
								<div><span>驶出：</span><span>${item.goout}辆</span></div>
							</div>
						`
					} else {
						div.innerHTML = `
							<img class="vehicle-marker-img" src="${imgsrc}" />
							<div class="vehicle-marker-mes vehicle-marker-mes-ab">
								<div><span>超速：</span><span class="vehicle-marker-mes-ab-num">${item.ab}辆</span></div>
							</div>
						`
						let pophtml = `
							<div class="vehicle-abcar-table">
								<div class="vehicle-abcar-table-head">
									<div class="vehicle-abcar-table-tr">
										<span></span>
										<span>超速时间</span>
										<span>超速车牌</span>
									</div>
								</div>
								<div class="vehicle-abcar-table-body">
									<div class="vehicle-abcar-table-tr">
										<span class="vehicle-abcar-table-td-index">1</span>
										<span>2021-10-01 15:03</span>
										<span>豫A148w2</span>
									</div>
									<div class="vehicle-abcar-table-tr">
										<span class="vehicle-abcar-table-td-index">2</span>
										<span>2021-10-01 15:03</span>
										<span>豫QT147E</span>
									</div>
									<div class="vehicle-abcar-table-tr">
										<span class="vehicle-abcar-table-td-index">3</span>
										<span>2021-10-01 15:03</span>
										<span>豫Q5678Y</span>
									</div>
									<div class="vehicle-abcar-table-tr">
										<span class="vehicle-abcar-table-td-index">4</span>
										<span>2021-10-01 15:03</span>
										<span>豫Q78888</span>
									</div>
								</div>
							</div>
						`
						popup = new creeper.Popup({
							closeButton: false,
							offset: [120, 95],
						}).setHTML(
							`<div class="vehicle-abcar-popup">${pophtml}</div>`)
					}
					let marker
					if(popup){
						marker = new creeper.Marker({element: div}).setLngLat(item.location).setPopup(popup).addTo(this.map)
					} else {
						marker = new creeper.Marker({element: div}).setLngLat(item.location).addTo(this.map)
					}
					this[markerListName].push(marker)
				})
				this.markerNameList.push(markerListName)
			},
			clearMarker(){
				this.markerNameList.forEach(name => {
					this[name].forEach(item => {
						item.remove()
					})
					this[name] = []
				})
				this.markerNameList = []
			},
			handleCheckTrajector(id){
				this.checkTrajector = id
				this.clearMarker()
				this.setLineLayer()
			},
			setLineLayer(){
				let lineImg = require('../assets/img/yellow_line.png')
        if (!this.map.hasImage(`vehicle-line-img`)) {
            this.map.loadImage(lineImg, (err, data) => {
              this.map.addImage(`vehicle-line-img`, data);
            })
        }
				this.lineGeoJson.features.push({
					type: 'line',
					geometry: {"type":"LineString","coordinates":[
						[104.0536790002352, 30.593758777480332],
						[104.0536563672133, 30.596705408507972],
						[104.06129554184974, 30.596714547211135],
						[104.06121161635173, 30.600269776430196],
						[104.05793594620422, 30.600305041267504],
						[104.05796483282677, 30.600313864215096],
						[104.05796483282677, 30.600313864215096],
					]}
				})
				if (!this.map.getSource('vehicleLineData')) {
						this.map.addSource('vehicleLineData', {
								type: 'geojson',
								data: this.lineGeoJson
						})
				} else {
					this.map.getSource('vehicleLineData').setData(this.lineGeoJson)
				}
				if(!this.map.getLayer('vehicleLineLayer')){
					this.map.addLayer({
						type: 'line',
						source: 'vehicleLineData',
						id: 'vehicleLineLayer',
						paint: {
							'line-width': 5,
							"line-pattern": `vehicle-line-img`,
						},
						layout: {
							'line-cap': 'round',
							'line-join': 'round'
						}
					})
				}
			},
			handleCloseTrajector(id){
				this.checkTrajector = ''
				this.createMarker('carList','carMarkerList')
				this.lineGeoJson = { type: 'FeatureCollection', features: [] }
				this.map.getSource('vehicleLineData').setData(this.lineGeoJson)
			},
			//违规车辆详情
			getAbDetail(){
				this.abScrollStart();
			},
			//开始自动滚动
			abScrollStart() {
				this.abDetailList.length && this.$nextTick(() => {
					this.abScrollStop();
					let scrollBox = document.querySelector('.violation-detail-table .ab-list');
					let content = document.querySelector('.violation-detail-table .ab-list .content');
					let items = document.querySelectorAll('.violation-detail-table .ab-list .content .ab-item-wrap');
					let itemH = items[0].clientHeight;
					let flag = true;
					let nexTop = Math.ceil(scrollBox.clientHeight / itemH) * itemH - scrollBox.clientHeight;
					//检查滚动距离是否过短
					if (content.clientHeight - scrollBox.clientHeight < itemH) return;
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
		background: rgb(240,125,92);
		// opacity: 0.58;
		border-radius: 4px;
		cursor: pointer;
		line-height: 18px;
	}
	.check-trajectory{
		display: inline-block;
		width: 58px;
		height: 18px;
		background: rgb(13,162,101);
		// opacity: 0.58;
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
		display: flex;
		flex-direction: column;
		align-items: center;
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
		padding: 0 15px;
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
		padding-left: 70px;
		width: 86px;
		height: 70.4px;
	}
	.eq-statistics-item-img{
		position: absolute;
		top: 0;
		left: 0;
		// width: 90%;
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
		height: calc(100% - 30px);
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
	.svg-box {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		.ani-line1 {
			fill: none;
			stroke-width: 2;
			stroke: #6ab0ff;
			stroke-linejoin: round;
			stroke-linecap: round;
			stroke-dasharray: 20, 186;
			stroke-dashoffset: 40;
			animation: lineMove1 4s linear infinite;
		}
		.ani-line2 {
			fill: none;
			stroke-width: 2;
			stroke: #6ab0ff;
			stroke-linejoin: round;
			stroke-linecap: round;
			stroke-dasharray: 20, 186;
			stroke-dashoffset: 48;
			animation: lineMove2 4s linear infinite;
		}
		.ani-line3,
		.ani-line4 {
			fill: none;
			stroke-width: 2;
			stroke: #325e8c;
			stroke-linejoin: round;
			stroke-linecap: round;
			stroke-dasharray: 20, 116;
			stroke-dashoffset: 20;
			animation: lineMove3 4s linear infinite;
		}
		@keyframes lineMove1 {
			0% {
				stroke-dashoffset: 40;
				stroke: #325e8c;
      }
			15% {
				stroke: #6ab0ff;
			}
			50% {
				stroke-dashoffset: -18;
				stroke: #6ab0ff;
			}
			51% {
				stroke-dashoffset: -18;
				stroke: #325e8c;
			}
			100% {
				stroke-dashoffset: -18;
				stroke: #325e8c;
			}
		}
		@keyframes lineMove2 {
			0% {
				stroke-dashoffset: 48;
				stroke: #325e8c;
      }
			15% {
				stroke: #6ab0ff;
			}
			50% {
				stroke-dashoffset: 112;
				stroke: #6ab0ff;
			}
			51% {
				stroke-dashoffset: 112;
				stroke: #325e8c;
			}
			100% {
				stroke-dashoffset: 112;
				stroke: #325e8c;
			}
		}
		@keyframes lineMove3 {
			0% {
				stroke: #325e8c;
				stroke-dashoffset: 20;
			}
			45% {
				opacity: .8;
				stroke: #325e8c;
				stroke-dashoffset: 20;
			}
			46% {
				opacity: .7;
				stroke: #6ab0ff;
				stroke-dashoffset: 20;
			}
			80% {
				opacity: .5;
				stroke: #6ab0ff;
				stroke-dashoffset: -36;
			}
			100% {
				opacity: 0;
				stroke: #6ab0ff;
				stroke-dashoffset: -76;
			}
		}
	}
</style>
<style lang="less">
.vehicle-marker-wrap{
	.vehicle-marker-img{
		width: 50px;
		// height: 50px;
	}
	.vehicle-marker-mes{
		position: absolute;
		top: -60px;
		left: 50%;
		transform: translateX(-50%);
		padding: 8px 15px 15px;
		width: max-content;
		height: auto;
		background-image: url('../assets/marker/assetsMrakerBg.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: #fff;
		font-size: 12px;
		text-align: left;
	}
	.vehicle-marker-mes-ab{
		top: -40px;
		.vehicle-marker-mes-ab-num{
			color: #FF8461;
		}
	}
}
.vehicle-abcar-popup{
	width: 323px;
	height: 167px;
	background-image: url('../assets/vehicle/popup-bg.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	background-color: transparent;
	.vehicle-abcar-table{
		display: flex;
		flex-direction: column;
		padding-left: 80px;
		padding-right: 25px;
		height: 100%;
		color: #fff;
		font-size: 12px;
		.vehicle-abcar-table-head{
			padding-top: 10px;
			height: 29px;
			line-height: 29px;
			.vehicle-abcar-table-tr{
				border: none;
				span:nth-child(1){
					border: none;
				}
			}
		}
		.vehicle-abcar-table-body{
			flex: 1;
		}
		.vehicle-abcar-table-tr{
			display: flex;
			align-items: center;
			border-top: 1px dashed rgba(106, 176, 255, .3);
			min-height: 24px;
			span:nth-child(1){
				margin: 0 9px;
				width: 18px;
				height: 18px;
				line-height: 18px;
				border: 1px solid #fff;
				border-radius: 50%;
			}
			span:nth-child(2){
				flex: 1;
			}
			span:nth-child(3){
				width: 65px;
			}
		}
	}
}
.mapboxgl-popup-content{
	background-color: transparent;
}
.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip{
	border: none;
}
</style>