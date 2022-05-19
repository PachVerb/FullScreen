<template>
	<div style="height: 100%;">
		<sideTran :thisCrrentSys="thisCrrentSys">
			<div slot="left" style="height: 100%;">
				<sideItem title="用户使用统计" transitionType="left" delay="100" height="20%">
					<div slot='body' style="width: 100%;margin-top: 20px;">
						<div class="flopbox">
							<p class="flopboxtitle" style="width: 85px;">在线用户</p>
							<flop :num="num" :unitil="'人'"></flop>
						</div>
						<div class="flopbox">
							<p class="flopboxtitle">今日用户数据值</p>
							<flop :num="numtow" :unitil="'人'"></flop>
						</div>
					</div>
				</sideItem>
				<sideItem title="网络设备分类统计" transitionType="left" delay="1000" height="25%">
					<div slot='body' class="networkdevicetotal" style="height: 100%;width: 100%;">
						<div id="networkdevicetotal"></div>
					</div>
				</sideItem>
				<sideItem title="设备告警详情" transitionType="left" delay="1500" height="26%">
					<div slot='body' class="equipmentalarmtotal" style="height: 100%;width: 100%;">
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
								<div class="table-item" :style="{width: tableHead[1].width}" :title=item.reason>
									{{ item.reason }}
								</div>
								<div class="table-item" :style="{width: tableHead[2].width}" :title=item.date>
									{{ item.date }}
								</div>
								</div>
							</div>
							</div>
						</div>
						</div>
					</div>
				</sideItem>
				<sideItem title="设备告警趋势统计" transitionType="left" delay="2000" height="28%">
					<div slot='headRight' class="deviceDetail">
						<div class="checkBox">
							<div :class="trendKey==0?'btn checked':'btn'" @click="getTrendAnalyData(0)">近一周</div>
							<div :class="trendKey==1?'btn checked':'btn'" @click="getTrendAnalyData(1)">近一月</div>
							<div :class="trendKey==2?'btn checked':'btn'" @click="getTrendAnalyData(2)">近一年</div>
						</div>
					</div>
					<div slot='body'  style="width: 100%;height: 100%;">
						<div  id="trendChart" ></div>
					</div>
				</sideItem>
			</div>
			<div slot="right" style="height: 100%;">
				<sideItem title="网站安全统计" height="38%" transitionType="right" delay="500">
					<div slot='body' style="width: 100%;height: 100%;">
						<div style="width: 100%;height: 100%;">
							<div class="calendar">
								<p style="color: rgba(255, 255, 255, .6);">时间范围:</p>
								<date-picker v-model="value1" type="daterange" range-separator="至"
									start-placeholder="开始日期" end-placeholder="结束日期">
								</date-picker>
							<!-- 	<img src="@/assets/img/internetstatues/back.png" alt="">
								<img src="@/assets/img/internetstatues/stop.png" alt=""> -->
							</div>
							<!-- <div class="rightpie">
								<img src="../../assets/pieimg/internetstatues/rightpieiner.png"
									class="rightpieimginner">
								<img src="../../assets/pieimg/internetstatues/innercircle.png"
									class="rightpieimginnercircle">
								<img src="../../assets/pieimg/internetstatues/outpie.png" class="rightpieimgout">
								<div id="webSecuritytotalpie"></div>
								<div class="pieRight">
									<div v-for="item in rightpiedata"
										style="margin-top: 10px;text-align: left;margin-left: 80px;">
										<p
											style="display: inline-block;color: rgba(255, 255, 255, .6);font-size: 14px;margin-right: 6px;text-align: left;">
											{{item.name}}:
										</p><span
											style="font-size: 14px;color: rgba(0, 245, 255, 1);">{{item.vale}}</span>
									</div>
								</div>
							</div> -->
							<div id="rightbar" style="margin-top: 20px;"></div>
						</div>
				
						<!-- <div class="echartspie" ref='topPie'></div> -->
					</div>
				</sideItem>
				<sideItem title="服务器安全分析" height="30%" transitionType="right" delay="1000">
					<div slot='body' class="serverSecuritytotal" style="width: 100%;height: 100%;">
						<div class="head">
						  <span>攻击时间</span>
						  <span>源IP</span>
						  <span>目的IP</span>
						  <span>攻击类型</span>
						</div>
						<div class="listBox">
							<div class="content" @mouseenter="dormScrollStop" @mouseleave="dormScrollStart">
								<div class="row" v-for="(item,i) in dormList" :key="i">
									<span style="padding-left: 10px;">{{item.date}}</span>
									<span>{{item.ipaddress}}</span>
									<span>{{item.targetip}}</span>
									<span>{{item.type}}</span>
								</div>
							</div>
						</div>
					</div>
				</sideItem>
				<sideItem title="网站安全分析" height="30%" transitionType="right" delay="1500">
					<div slot='body' class="websiteSecurityanalysis" style="width: 100%;height: 100%;">
						<div class="head">
						  <span>排行</span>
						  <span>域名</span>
						  <span>类型</span>
						  <span>告警数</span>
						</div>
						<div class="listBox">
							<div class="content" @mouseenter="webScrollStop" @mouseleave="webScrollStart">
								<div class="row" v-for="(item,i) in webSafedate" :key="i">
									<span style="padding-left: 10px;">{{item.ranking}}</span>
									<span>{{item.domainName}}</span>
									<span>{{item.type}}</span>
									<span>{{item.numberAlarms}}</span>
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
	import sideTran from '@/components/sideTran'
	import sideItem from '@/components/sideItem.vue'
	import nowpeopleslide from '@/components/nowpeopleslide.vue'
	import flop from '@/components/commonComponent/flop.vue'
	import HeatLayer from '../../js/heatLayer'
	import heatJson from '../../assets/json/heat.json'
	import {
		Table,
		TableColumn,
		DatePicker
	} from 'element-ui'
	import {
		mapGetters
	} from 'vuex'
	import * as echarts from 'echarts';
	export default {
		components: {
			sideTran,
			sideItem,
			nowpeopleslide,
			flop,
			DatePicker,
			elTable: Table,
			elTableColumn: TableColumn
		},
		data() {
			return {
				abTimer:null,//自动滚动定时器
				dormTimer:null,
				webTimer:null,
				dormList: [],
				webSafedate:[],
				value1: "", //时间选择器的值
				trendKey: 2,
				trendWaterKey: 2,
				thisCrrentSys: '',
				num: 12345,
				numtow: 67898,
				unitil: "人",
				rightpiedata: [{
					name: "境外告警数",
					vale: 0
				}, {
					name: "境内告警数",
					vale: 126
				}, {
					name: "影响资产数",
					vale: 5
				}, {
					name: "攻击来源数",
					vale: 18
				}, {
					name: "告警类型数",
					vale: 2
				}],
				tableHead: [{
					name: '严重等级',
					width: '80px'
				}, {
					name: '告警原因',
					width: '100px'
				}, {
					name: '告警时间',
					width: '100px'
				}, ],
				abDetailList: [{
					id: '1',
					name: '一般',
					date: '2021-11-09 15:22:47',
					reason: "#2015柜内存使用率超标"
				}, {
					id: '2',
					name: '正常',
					date: '2021-11-09 15:22:47',
					reason: "#2015柜内存使用率超标"
				}, {
					id: '3',
					name: '正常',
					date: '2021-11-09 15:22:47',
					reason: "#2015柜内存使用率超标"
				}, {
					id: '4',
					name: '正常',
					date: '2021-11-09 15:22:47',
					reason: "#2015柜内存使用率超标"
				}, {
					id: '5',
					name: '正常',
					date: '2021-11-09 15:22:47',
					reason: "#2015柜内存使用率超标"
				},  {
					id: '6',
					name: '正常',
					date: '2021-11-09 15:22:47',
					reason: "#2015柜内存使用率超标"
				},
				{
					id: '7',
					name: '正常',
					date: '2021-11-09 15:22:47',
					reason: "#2015柜内存使用率超标"
				},
				],
				timer: null,
				mesList: [],
				interStatusEqMarkerList: null,
				apList: [],
				apMarkerList: null,
				heatLayer: null,
				heatData: {
					type: "FeatureCollection",
					features: []
				},
				popupMarker: null,
				lineGeoJson: { type: 'FeatureCollection', features: [] },
				opticalFiberList: [],
				opticalFiberMarkerList: null
			}
		},
		computed: {
			...mapGetters(['map','currentSys','currentSysModule'])
		},
		watch: {
			timer(val) {
				console.log(val, "vvvvvvsdds")
			},
			currentSys(val) {
				console.log(val,"watch")
				if (val != 'interstatues') {
					this.abScrollStop();
					this.dormTimer&&this.dormScrollStop();
					this.webTimer&&this.webScrollStop();
				}
			},
			currentSysModule(val){
				if(this.currentSys === 'interstatues'){
					if(this.currentSysModule){
						this.resetLayer()
						switch(this.currentSysModule){
							case 'networkEquipment':
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
								this.mesList = [{
									type: 1,// 车
									cate: 0,
									cateName: '正常',
									name: '巡逻车1号',
									num: 230,
									location: [104.05503605386514, 30.599576983291087]
								},{
									type: 1,// 车
									cate: 0,
									cateName: '正常',
									name: '巡逻车2号',
									num: 230,
									location: [104.0566532045147, 30.595614470505396]
								},{
									type: 1,// 车
									cate: 1,
									cateName: '异常',
									name: '巡逻车3号',
									num: 0,
									location: [104.05911022720113, 30.594363769431368]
								},{
									type: 1,
									cate: 0,
									cateName: '正常',
									name: '巡逻车4号',
									num: 2120,
									location: [104.05290291183809, 30.5921035884149]
								},{
									type: 1,
									cate: 0,
									cateName: '正常',
									name: '巡逻车5号',
									num: 2230,
									location: [104.0624515193606, 30.593249536360887]
								},{
									type: 1,
									cate: 0,
									cateName: '正常',
									name: '巡逻车6号',
									num: 30,
									location: [104.06071569864514, 30.59813182360351]
								},]
								this.createInterStatusEqMraker('mesList', 'interStatusEqMarkerList')
								this.apList = [{
									buildingId: '18780',
									location: [104.05413063965034, 30.59611519612072],
									num: 170,
									abnum: 23
								},{
									buildingId: '18780',
									floor: 4,
									location: [104.05428880285922, 30.59587187630838],
									num: 170,
									abnum: 23
								},{
									buildingId: '18780',
									floor: 1,
									location: [104.05412916135646, 30.596099302686213],
									num: 170,
									abnum: 23
								},{
									buildingId: '18780',
									floor: 1,
									location: [104.05415310028582, 30.595836672570343],
									num: 170,
									abnum: 23
								}]
								this.createApMraker('apList', 'apMarkerList')
							break
							case 'networkHeat':
								this.map.setBearing(0)
								this.map.setPitch(0)
								this.map.setLayoutProperty('modellayer', 'visibility', 'none')
								this.createInterStatusHeatLayer()
							break
							case 'networkOpticalFiber':
								this.map.setBearing(0)
								this.map.setPitch(0)
								this.map.setLayoutProperty('modellayer', 'visibility', 'none')
								this.createOpticalFiberLine()
								this.createOpticalFiberMarker()
							break
							default:
							break
						}
					}
				}
			}
		},
		created() {
			this.getDormStatus()
			this.getWebsafedate()
		},
		mounted(){
    	this.init()
			if(this.currentSysModule){
				this.resetLayer()
				switch(this.currentSysModule){
					case 'networkEquipment':
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
						this.mesList = [{
							type: 1,// 车
							cate: 0,
							cateName: '正常',
							name: '巡逻车1号',
							num: 230,
							location: [104.05503605386514, 30.599576983291087]
						},{
							type: 1,// 车
							cate: 0,
							cateName: '正常',
							name: '巡逻车2号',
							num: 230,
							location: [104.0566532045147, 30.595614470505396]
						},{
							type: 1,// 车
							cate: 1,
							cateName: '异常',
							name: '巡逻车3号',
							num: 0,
							location: [104.05911022720113, 30.594363769431368]
						},{
							type: 1,
							cate: 0,
							cateName: '正常',
							name: '巡逻车4号',
							num: 2120,
							location: [104.05290291183809, 30.5921035884149]
						},{
							type: 1,
							cate: 0,
							cateName: '正常',
							name: '巡逻车5号',
							num: 2230,
							location: [104.0624515193606, 30.593249536360887]
						},{
							type: 1,
							cate: 0,
							cateName: '正常',
							name: '巡逻车6号',
							num: 30,
							location: [104.06071569864514, 30.59813182360351]
						},]
						this.createInterStatusEqMraker('mesList', 'interStatusEqMarkerList')
						this.apList = [{
							buildingId: '18780',
							location: [104.05413063965034, 30.59611519612072],
							num: 170,
							abnum: 23
						},{
							buildingId: '18780',
							floor: 4,
							location: [104.05428880285922, 30.59587187630838],
							num: 170,
							abnum: 23
						},{
							buildingId: '18780',
							floor: 1,
							location: [104.05412916135646, 30.596099302686213],
							num: 170,
							abnum: 23
						},{
							buildingId: '18780',
							floor: 1,
							location: [104.05415310028582, 30.595836672570343],
							num: 170,
							abnum: 23
						}]
						this.createApMraker('apList', 'apMarkerList')
					break
					case 'networkHeat':
						this.map.setBearing(0)
						this.map.setPitch(0)
						this.map.setLayoutProperty('modellayer', 'visibility', 'none')
						this.createInterStatusHeatLayer()
					break
					case 'networkOpticalFiber':
						this.map.setBearing(0)
						this.map.setPitch(0)
						this.map.setLayoutProperty('modellayer', 'visibility', 'none')
						this.createOpticalFiberLine()
						this.createOpticalFiberMarker()
					break
					default:
					break
				}
			}
		},
		beforeDestroy(){
			this.destroySys()
		},
		methods: {
			init() {
				// this.map.flyTo({
				//      center: [104.05999036597285, 30.596105715016634],
				//      bearing: 40,
				//      pitch: 60,
				//      zoom: 14.5,
				//      duration: 1000,
				//      easing(t) {
				//        return t;
				//      }
				// })
				// let body = document.querySelector('body')
				// body.addEventListener('click',this.closePopup)
				this.hideBuildingText()
				this.$nextTick(() => {
					this.thisCrrentSys = 'interstatues'
					setTimeout(() => {
						this.randerBar()
						// this.renderrightpie()
						this.renderrightbar()
					}, 1500)
					setTimeout(() => {
						this.getTrendAnalyData(2);
						this.abScrollStart();
						this.dormScrollStart()
						this.webScrollStart()
					}, 2500)
				})
				
			},
			destroySys(){
				this.showBuildingText()
				this.clearInterStatusEqMarker()
				this.resetLayer()
			},
			//开始自动滚动
			dormScrollStart() {
				console.log("dormScrollStart")
				this.dormList.length && this.$nextTick(() => {
					this.dormScrollStop();
					let scrollBox = document.querySelector('.serverSecuritytotal .listBox');
					let content = document.querySelector('.serverSecuritytotal .listBox .content');
					let items = document.querySelectorAll('.serverSecuritytotal .listBox .content .row');
					let itemH = items[0].clientHeight;
					let nexTop = Math.ceil(scrollBox.clientHeight / itemH) * itemH - scrollBox.clientHeight;
					//检查滚动距离是否过短
					if (content.clientHeight - scrollBox.clientHeight < itemH) return;
					scrollBox.className = 'listBox noScroll';//隐藏滚动条
					this.dormTimer = setInterval(() => {
						//检查滚动距离是否过短
						if (content.clientHeight - scrollBox.clientHeight < itemH) return;
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
			dormScrollStop() {
				clearInterval(this.dormTimer);
				document.querySelector('.serverSecuritytotal .listBox')&&(document.querySelector('.serverSecuritytotal .listBox').className = 'listBox');//显示滚动条
			},
			//开始自动滚动
			abScrollStart() {
				console.log("abScrollStart11")
				this.abDetailList.length && this.dormList.length && this.$nextTick(() => {
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
			createOpticalFiberLine(){
				let lineImg = require('../../assets/img/yellow_line.png')
        if (!this.map.hasImage(`interStatus-line-img`)) {
            this.map.loadImage(lineImg, (err, data) => {
              this.map.addImage(`interStatus-line-img`, data);
            })
        }
				this.lineGeoJson.features.push({
					type: 'line',
					geometry: {"type":"LineString","coordinates":[
						[104.05587811484764, 30.595317813029837],
						[104.0536658257281, 30.595317813029837],
						[104.05366582571304, 30.598247464502933],
						[104.0530351731594, 30.598256080994275],
						[104.05786016571642, 30.5981957655395],
						[104.05786016571642, 30.59668786695383],
						[104.05978215445373, 30.596644783792144],
						[104.05989226839125, 30.596231184466106],
						[104.05978215445373, 30.596644783792144],
						[104.06134377028957, 30.596644783796805],
						[104.06137380136283, 30.594051142183886],
						[104.06063303487173, 30.594145927650615],
						[104.06137380136283, 30.594051142183886],
						[104.06134377028957, 30.596644783796805],
						[104.06330191110817, 30.596700435184715],
						[104.06335196289751, 30.59518389656418],
						[104.06474340265993, 30.595209746853214],
						[104.06474340265993, 30.595614733813036],
					]}
				})
				if (!this.map.getSource('interStatusLineData')) {
						this.map.addSource('interStatusLineData', {
								type: 'geojson',
								data: this.lineGeoJson
						})
				} else {
					this.map.getSource('interStatusLineData').setData(this.lineGeoJson)
				}
				if(!this.map.getLayer('interStatusLineLayer')){
					this.map.addLayer({
						type: 'line',
						source: 'interStatusLineData',
						id: 'interStatusLineLayer',
						paint: {
							'line-width': 8,
							"line-pattern": `interStatus-line-img`,
						},
						layout: {
							'line-cap': 'round',
							'line-join': 'round'
						}
					})
				}
			},
			createOpticalFiberMarker(){
				this.opticalFiberList = [{
					name: '图书馆',
					location: [104.05602940360899, 30.595303140884354]
				},{
					name: '学生宿舍区',
					location: [104.05295526229526, 30.59825378652144]
				},{
					name: '灵奇图书馆',
					location: [104.05992087614413, 30.596143191495827]
				},{
					name: '2号教学楼',
					location: [104.06059181968351, 30.594116556987075]
				},{
					name: '校医院',
					location: [104.0647455665042, 30.59562896941253]
				},]
				let imgsrc = require('../../assets/interstatus/opticalFiber-marker.png')
				let domList = this.opticalFiberList.map(item => {
					let div = document.createElement('div')
					div.className = 'interStatusEq-marker-wrap'
					div.innerHTML = `
						<img class="interStatusEq-marker-img" src="${imgsrc}" />
						<div class="interStatusEq-marker-mes interStatus-OpticalFiber-marker-mes">
							<div class="interStatusEq-marker-num">${item.name}</div>
						</div>
					`
					return {dom: div}
					// let marker = new creeper.Marker({element: div}).setLngLat(item.location).addTo(this.map)
					// this[markerListName].push(marker)
				})
				let geoJson = this.setFeature(this.opticalFiberList)
				this.opticalFiberMarkerList = new creeper.MarkerIndoor(this.map)
				this.opticalFiberMarkerList.addMarker(geoJson,domList,true)
			},
			closePopup(e){
				e.stopPropagation()
				if(e.target.className = 'interStatus-popup-close-btn'){
					if(this.popupMarker){
						this.popupMarker.remove()
						this.popupMarker = null
					}
				}
			},
			setPopup(item){
				if(this.popupMarker){
					this.popupMarker.remove()
					this.popupMarker = null
				}
				let popupDom = document.createElement('div')
				popupDom.className = 'interStatus-popup'
				popupDom.innerHTML = `
					<img class="interStatus-popup-close-btn" src="${require('../../assets/img/close-btn.png')}"/>
					<div class="${item.cate == 0 ? 'interStatus-popup-head' : 'interStatus-popup-head interStatus-popup-abhead'}">连接人数：251人</div>
					<div class="interStatus-popup-body">
						<div><span>设备状态：</span><span class="${item.cate == 0 ? 'interStatus-popup-normal' : 'interStatus-popup-ab'}">${item.cate == 0 ? '正常' : '异常'}</span></div>
						<div><span>设备名称：</span><span>maoop-3-13</span></div>
						<div><span>IP地址：</span><span>192.168.4.205</span></div>
						<div><span>mac地址：</span><span>17:41:3s:78:67</span></div>
					</div>
				`
				popupDom.children[0].onclick = () => {
					if(this.popupMarker){
						this.popupMarker.remove()
						this.popupMarker = null
					}
				}
				this.popupMarker = new creeper.Marker({element: popupDom}).setLngLat(item.location).addTo(this.map)
			},
			createApMraker(listName, markerListName){
				let domList = this[listName].map(item => {
					let div = document.createElement('div')
					div.className = 'interStatusEq-marker-wrap'
					div.innerHTML = `
						<div class="interStatusEq-marker-mes interStatusAp-marker-mes">
							<div class="interStatusAp-title">AP设备</div>
							<div class="interStatusAp-body">
								<div>正常：${item.num}个</div>
								<div>异常：${item.abnum}</div>
							</div>
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
			createInterStatusEqMraker(listName, markerListName){
				let domList = this[listName].map(item => {
					let imgsrc = ''
					if(item.cate == 0){
						imgsrc = require('../../assets/interstatus/interstatus-eq.png')
					} else if (item.cate == 1) {
						imgsrc = require('../../assets/interstatus/interstatus-ab.png')
					}
					let div = document.createElement('div')
					div.className = 'interStatusEq-marker-wrap'
					div.innerHTML = `
						<img class="interStatusEq-marker-img" src="${imgsrc}" />
						<div class="interStatusEq-marker-mes">
							<div class="interStatusEq-marker-num">${item.num}</div>
							<div>连接人数</div>
						</div>
					`
					div.onclick = e => {
						this.setPopup(item)
					}
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
			clearInterStatusEqMarker(){
				if(this.interStatusEqMarkerList) this.interStatusEqMarkerList.remove()
				this.interStatusEqMarkerList = null
				if(this.apMarkerList) this.apMarkerList.remove()
				this.apMarkerList = null
			},
			createInterStatusHeatLayer(){
				console.log('heatJson',heatJson.data[0].statisticData.features)
				this.heatData = {
					// crs: {
					// 	properties: {name: "urn:ogc:def:crs:OGC:1.3:CRS84"},
					// 	type: "name"
					// },
					features: heatJson.data[0].statisticData.features,
					type: "FeatureCollection"
				}
				this.map.getLayer("heat-point") && this.map.removeLayer("heat-point")
				this.heatLayer = new HeatLayer(
					this.map,
					this.heatData,
					"heat-layer",
					"mag",
					"heat-point"
				)
				this.heatLayer.addLayer()
			},
			resetLayer(){
				this.map.setBearing(8)
				this.map.setPitch(60)
        this.map.setZoom(16.1)
				this.map.setLayoutProperty('modellayer', 'visibility', '')
				this.clearInterStatusEqMarker()
				if(this.heatLayer){
					this.heatLayer.destoryLayer()
					this.heatLayer = null
				}
				if(this.popupMarker){
					this.popupMarker.remove()
					this.popupMarker = null
				}
				if(this.map.getSource('interStatusLineData')){
					this.lineGeoJson = { type: 'FeatureCollection', features: [] }
					this.map.getSource('interStatusLineData').setData(this.lineGeoJson)
				}
				if(this.opticalFiberMarkerList){
					this.opticalFiberMarkerList.remove()
					this.opticalFiberMarkerList = null
				}
			},
			getDormStatus() {
			  this.dormList = [
			    { date: '09-01 00:00:00', ipaddress: '122.168.6.14', targetip: '211.234.145.255',type:"web弱命令" },
					{ date: '09-01 00:00:00', ipaddress: '122.168.6.14', targetip: '211.234.145.255',type:"web弱命令" },
					{ date: '09-01 00:00:00', ipaddress: '122.168.6.14', targetip: '211.234.145.255',type:"web弱命令" },
					{ date: '09-01 00:00:00', ipaddress: '122.168.6.14', targetip: '211.234.145.255',type:"web弱命令" },
					{ date: '09-01 00:00:00', ipaddress: '122.168.6.14', targetip: '211.234.145.255',type:"web弱命令" },
					{ date: '09-01 00:00:00', ipaddress: '122.168.6.14', targetip: '211.234.145.255',type:"web弱命令" },
					{ date: '09-01 00:00:00', ipaddress: '122.168.6.14', targetip: '211.234.145.255',type:"web弱命令" },
					{ date: '09-01 00:00:00', ipaddress: '122.168.6.14', targetip: '211.234.145.255',type:"web强命令" },
			  ]
				this.dormScrollStart();
			},
			getWebsafedate() {
			  this.webSafedate = [
			    { ranking: '01', domainName: '192.168.6.14', type: '恶意访问接口',numberAlarms:"15" },
					{ ranking: '02', domainName: '122.168.6.14', type: '恶意访问接口',numberAlarms:"156" },
					{ ranking: '03', domainName: '122.168.6.14', type: '恶意访问接口',numberAlarms:"156" },
					{ ranking: '04', domainName: '122.168.6.14', type: '恶意访问接口',numberAlarms:"156" },
					{ ranking: '05', domainName: '122.168.6.14', type: '恶意访问接口',numberAlarms:"156" },
					{ ranking: '06', domainName: '122.168.6.14', type: '恶意访问接口',numberAlarms:"156" },
					{ ranking: '07', domainName: '122.168.6.14', type: '恶意访问接口',numberAlarms:"156" },
					{ ranking: '08', domainName: '122.168.6.14', type: '恶意访问接口',numberAlarms:"156" },
			  ]
				this.webScrollStart();
			},
			//开始自动滚动
			webScrollStart() {
				this.webSafedate.length && this.$nextTick(() => {
					this.webScrollStop();
					let scrollBox = document.querySelector('.websiteSecurityanalysis .listBox');
					let content = document.querySelector('.websiteSecurityanalysis .listBox .content');
					let items = document.querySelectorAll('.websiteSecurityanalysis .listBox .content .row');
					let itemH = items[0].clientHeight;
					let nexTop = Math.ceil(scrollBox.clientHeight / itemH) * itemH - scrollBox.clientHeight;
					//检查滚动距离是否过短
					if (content.clientHeight - scrollBox.clientHeight < itemH) return;
					scrollBox.className = 'listBox noScroll';//隐藏滚动条
					this.webTimer = setInterval(() => {
						//检查滚动距离是否过短
						if (content.clientHeight - scrollBox.clientHeight < itemH) return;
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
			webScrollStop() {
				clearInterval(this.webTimer);
				document.querySelector('.websiteSecurityanalysis .listBox')&&(document.querySelector('.websiteSecurityanalysis .listBox').className = 'listBox');//显示滚动条
			},
			renderrightbar() {
				let rightbarpieChartDom, rightbarpieChartChart
				rightbarpieChartDom = document.getElementById('rightbar');
				rightbarpieChartChart = echarts.init(rightbarpieChartDom);
				var xData = ["2019-03-01", "2019-03-02", "2019-03-03", "2019-03-04", "2019-03-05", "2019-03-06",
					"2019-03-07", "2019-03-08", "2019-03-09", "2019-03-10", "2019-03-11", "2019-03-12", "2019-03-13",
					"2019-03-14", "2019-03-15", "2019-03-16", "2019-03-17", "2019-03-18", "2019-03-19", "2019-03-20"
				];
				var yData1 = [12, 5, 12, 46, 22, 24, 15, 5, 54, 18, 24, 18, 31, 25, 27, 14, 15, 21, 20, 17];
				var yData2 = [13, 7, 10, 38, 17, 28, 22, 12, 28, 19, 14, 19, 19, 31, 22, 11, 14, 19, 22, 16];
				let option = {
					// tooltip: {
					//     trigger: 'axis',
					//     axisPointer: {
					//         type: 'cross'
					//     }
					// },
					tooltip: {
						trigger: 'axis',
						backgroundColor: 'rgba(44,62,80,0.8)',
						borderColor: 'rgba(153, 209, 246, 0.6)',
						textStyle: {
							align: 'left',
							fontSize: 12,
							color: 'rgba(255,255,255,0.8)',
						},
					},
					legend: {
						x: 'right',
						// y: '40px',

						textStyle: {
							color: '#f2f2f2',
							fontSize: 13,
						},

						//icon: 'circle',
						data: ['总告警数', '投递告警数']
					},
					//     dataZoom: [{
					//             type: 'slider',
					//             show: true,
					//             height: 20,
					//             left: '10%',
					//             right: '10%',
					//             bottom: '2%',
					//             start: 50,
					//             end: 100,
					//             textStyle: {
					//                 color: '#d4ffff',
					//                 fontSize: 11,
					//             },
					//         }, {
					//             type: 'inside'
					//         }

					//     ],
					grid: {
						right: '5%',
						bottom: '10%',
						left: '20px',
						top: '30px',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: xData,
						// name: '时间',
						nameTextStyle: {
							color: '#d4ffff'
						},
						axisLine: {
							lineStyle: {
								color: 'rgba(106, 176, 255, .6)'
							}
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: "rgba(106, 176, 255, .6)",
								type: 'dashed'
							}

						},
						axisTick: {
							show: false,
						},

						axisLabel: {
							show: true,
							textStyle: {
								color: "#FFF",
								fontSize: 12,
							},
							//interval:0,
							//rotate:30
						},
					}],
					yAxis: [{
						type: 'value',
						// name: '次数',
						nameTextStyle: {
							color: '#d4ffff'
						},
						position: 'left',
						axisLine: {
							lineStyle: {
								color: 'rgba(106, 176, 255, .6)',
							}
						},
						splitLine: {
							lineStyle: {
								color: "rgba(106, 176, 255, .6)",
								type: 'dashed'
							}

						},
						axisLabel: {
							color: '#d4ffff',
							fontSize: 12,
						}
					}, ],
					series: [{
							name: '总告警数',
							type: 'line',
							yAxisIndex: 0,
							symbolSize: 4,
							symbol: "circle",
							itemStyle: {
								normal: {
									color: 'rgba(106, 176, 255, 1)',
								}
							},
							data: yData1
						},
						{
							name: '投递告警数',
							type: 'line',
							symbol: "circle",
							yAxisIndex: 0,
							symbolSize: 4,
							itemStyle: {
								normal: {
									color: 'RGBA(144, 122, 214, 1)',
								}
							},
							data: yData2
						}

					]
				};
				rightbarpieChartChart.setOption(option)
				window.addEventListener("resize", function() {
					rightbarpieChartChart.resize();
				});

			},
			renderrightpie() {
				let webSecuritytotalpieChartDom, webSecuritytotalpieChartChart
				webSecuritytotalpieChartDom = document.getElementById('webSecuritytotalpie');
				webSecuritytotalpieChartChart = echarts.init(webSecuritytotalpieChartDom);
				var data = [100, 100, 100, 100, 100];
				var sum = 0;
				var avgValue = 0;
				var seriesData = [];
				var index = 0;
				var curIndex = 0;
				var _that = this
				// var timer = null;
				data.forEach(function(item) {
					sum += item;
				});
				avgValue = sum / 100; //间隙数据
				data.forEach(function(item, index) {
					//实际展示数据
					seriesData.push({
						name: 'a' + (index + 1),
						value: item,
						unit: '人',
					});
					seriesData.push(
						//虚拟数据做间隙使用
						// 实际当前数据是渲染成饼图的一部分，设置了颜色透明，视觉效果是间隙
						{
							name: '',
							value: avgValue, //间隔数据取总数的百分之一
							itemStyle: {
								normal: {
									label: {
										show: false,
									},
									labelLine: {
										show: false,
									},
									color: 'rgba(0, 0, 0, 0)',
									borderColor: 'rgba(0, 0, 0, 0)',
									borderWidth: 0,
								},
							},
						}
					);
				});
				var colorList = ['#5CEDFF', '#259AF0', '#23C376', '#EE8C2C', '#CD2323'];
				var option = {
					grid: {
						width: '100%',
						height: '100%',
						left: 0,
						top: 0,
						show: false,
					},
					legend: [{
						show: false,
					}, ],

					series: [{
							type: 'pie',
							// z: 3,
							center: ['50%', '50%'],
							radius: ['70%', '78%'],
							clockwise: true,
							avoidLabelOverlap: true,
							emphasis: {
								scale: true,
								scaleSize: 2,
							},
							itemStyle: {
								normal: {
									color: function(params) {
										return colorList[params.dataIndex / 2];
									},
								},
							},
							labelLine: {
								show: false,
								length2: 6,
								length: 6,
							},
							label: {
								show: true,
								textStyle: {
									color: "rgba(255,255,255,0.5)"
								},
								offset: [0, 0]
							},
							data: seriesData,
						},

					],
				};
				webSecuritytotalpieChartChart.setOption(option);

				//设置默认选中高亮部分
				webSecuritytotalpieChartChart.dispatchAction({
					type: 'highlight',
					seriesIndex: 0,
					dataIndex: curIndex * 2, //存在间隙 index*2
				});
				//设置高亮
				function setEmphasis(index) {
					if (curIndex != index) {
						webSecuritytotalpieChartChart.dispatchAction({
							type: 'downplay',
							seriesIndex: 0,
							dataIndex: curIndex,
						});
					}

					webSecuritytotalpieChartChart.dispatchAction({
						type: 'highlight',
						seriesIndex: 0,
						dataIndex: index,
					});

					//修改option参数
					// //修改option参数
					curIndex = index;
					option.title[0].text = seriesData[index].value + seriesData[index].unit;
					option.title[1].text = seriesData[index].name;
					webSecuritytotalpieChartChart.setOption(option);
				}
				//自动轮播
				function startAnima() {
					_that.timer = setInterval(function() {
						if (index >= seriesData.length - 1) {
							// index = 0;
							clearInterval(_that.timer);
						} else {
							index += 2;
						}
						setEmphasis(index);
						console.log(_that.timer, "_that.timer")
					}, 1000);
				}
				//取消轮播
				function clearAnima() {
					clearInterval(_that.timer);
				}
				//开始轮播
				startAnima();

				// //鼠标移入事件
				// webSecuritytotalpieChartChart.on('mouseover', function (e) {
				//     clearAnima();
				//     setEmphasis(e.dataIndex);
				// });
				// webSecuritytotalpieChartChart.on('mouseout', function (e) {
				//     startAnima();
				// });

				window.addEventListener('resize', () => {
					webSecuritytotalpieChartChart.resize();
				});
			},
			randerBar() {
				let networkdevicetotalChartDom, networkdevicetotalChartChart
				networkdevicetotalChartDom = document.getElementById('networkdevicetotal');
				networkdevicetotalChartChart = echarts.init(networkdevicetotalChartDom);
				// 指定图表的配置项和数据
				var option = {
					// tooltip: {
					// 	trigger: 'axis',
					// 	axisPointer: {
					// 		type: 'shadow'
					// 	}
					// },
					tooltip: {
						trigger: 'axis',
						backgroundColor: 'rgba(44,62,80,0.8)',
						borderColor: 'rgba(153, 209, 246, 0.6)',
						textStyle: {
							align: 'left',
							fontSize: 12,
							color: 'rgba(255,255,255,0.8)',
						},
					},
					legend: {
						show: true,
						icon: "roundRect",
						data: ['设备总数', '异常设备数'],
						align: 'right',
						right: 10,
						textStyle: {
							color: "#fft"
						},
						itemWidth: 12,
						itemHeight: 8,
						itemGap: 30,
						align: "left"
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '1%',
						top: "40",
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: ['AP设备',
							'交换机',
							'路由器',
							'集线器',
						],
						axisLine: {
							show: true,
							lineStyle: {
								color: "rgba(106, 176, 255, .5)",
								width: 1,
								type: "solid"
							}
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: "white",
							}
						},
					}],
					yAxis: [{
						type: 'value',
						name: "(个)",
						nameTextStyle: {
							color: '#ffffff'
						},
						axisLabel: {
							formatter: '{value} ',
							textStyle: {
								color: "white",
							}
						},
						axisTick: {
							show: false,
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "rgba(106, 176, 255, .5)",
								width: 1,
								type: "solid"
							},
						},
						splitLine: {
							lineStyle: {
								color: "rgba(106, 176, 255, .5)",
								type: "dashed"
							}
						}
					}],
					series: [{
						name: '设备总数',
						type: 'bar',
						data: [20, 50, 80, 58],
						barWidth: 10, //柱子宽度
						barGap: 1, //柱子之间间距
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#598BF1'
								}, {
									offset: 1,
									color: '#598BF1'
								}]),
								opacity: 1,
							}
						}
					}, {
						name: '异常设备数',
						type: 'bar',
						data: [50, 70, 60, 61],
						barWidth: 10,
						barGap: 1,
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#F6886A'
								}, {
									offset: 1,
									color: '#F6886A'
								}]),
								opacity: 1,
							}
						}
					}]
				};
				// 使用刚指定的配置项和数据显示图表。
				networkdevicetotalChartChart.setOption(option);
				window.addEventListener("resize", function() {
					networkdevicetotalChartChart.resize();
				});
			},
			getTrendAnalyData(index) {
				this.trendKey = index;
				let charts = {};
				if (index == 0) {
					charts = {
						unit: '',
						lineX: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
						value: [
							[251, 152, 103, 334, 95, 236, 217],
						]
					}
				} else if (index == 1) {
					charts = {
						unit: '',
						lineX: ['1号', '4号', '7号', '10号', '13号', '16号', '18号', '21号', '24号', '27号', '30号'],
						value: [
							[151, 352, 303, 534, 95, 236, 217, 328, 159, 151, 31],
						]
					}
				} else if (index == 2) {
					charts = {
						unit: '',
						lineX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
						value: [
							[451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 392],
						]
					}
				}

				this.loadTrendAnalyCharts('trendChart', charts)
			},
			loadTrendAnalyCharts(id, data) {
				let dom = document.getElementById(id);
				let chart = echarts.init(dom);
				let parma = {
					names: ['告警次数'],
					...data
				};
				// rgba(106, 176, 255, 1)
				let color = ['rgba(106, 176, 255', 'rgba(106, 176, 255']
				let lineY = []
				for (let i = 0; i < parma.names.length; i++) {
					let data = {
						name: parma.names[i],
						type: 'line',
						animationDuration: 2000,
						color: color[i] + ')',
						// smooth: false,
						// areaStyle: {
						//   normal: {
						//     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						//       offset: 0,
						//       color: color[i] + ', 0.3)'
						//     }, {
						//       offset: 0.8,
						//       color: color[i] + ', 0)'
						//     }], false),
						//     shadowColor: 'rgba(0, 0, 0, 0.1)',
						//     shadowBlur: 10
						//   }
						// },
						symbol: 'circle',
						symbolSize: 5,
						data: parma.value[i]
					}
					lineY.push(data)
				}
				let option = {

					tooltip: {
						trigger: 'axis',
						backgroundColor: 'rgba(44,62,80,0.8)',
						borderColor: 'rgba(153, 209, 246, 0.6)',
						textStyle: {
							align: 'left',
							fontSize: 12,
							color: 'rgba(255,255,255,0.8)',
						},
					},
					legend: {
						show: false,
						top: '0px',
						data: parma.names,
						textStyle: {
							fontSize: 12,
							color: 'F1F1F3'
						},
						right: '20px'
					},
					grid: {
						top: '20px',
						left: '0px',
						right: '14px',
						bottom: '0px',
						containLabel: true
					},
					xAxis: {
						show: true,
						type: 'category',
						boundaryGap: false,
						data: parma.lineX,
						axisLine: {
							show: true,
							lineStyle: {
								color: 'rgba(106, 176, 255, 1)'
							}
						},
						axisLabel: {
							textStyle: {
								color: 'white'
							},
						}
					},
					yAxis: {
						show: true,
						splitArea: {
							show: false,
							areaStyle: {
								color: "transparent"
							}
						},
						type: 'value',
						axisLabel: {
							formatter: '{value}',
							textStyle: {
								color: 'white'
							}
						},
						splitLine: {
							lineStyle: {
								color: 'rgba(106, 176, 255, 1)',
								type: "dashed"
							}
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: 'rgba(106, 176, 255, 1)'
							}
						}
					},
					series: lineY
				}
				chart.clear(); //清除动画
				chart.setOption(option);
				setTimeout(() => {
				  chart.setOption(option, true);
				}, 600)
				window.addEventListener("resize", function() {
					chart.resize();
				});
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	
	.serverSecuritytotal {
		height: 150px;
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
	.flopbox {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.flopboxtitle {
		color: rgba(255, 255, 255, .8);
		text-align: left;
	}

	.networkdevicetotal {
		// height: 140px;
	}

	#networkdevicetotal {
		height: 100%;
		width: 100%;
	}

	.equipmentalarmtotal {
		// height: 100%;

		margin-top: 20px;
	}

	.table-head {
		margin: 0 16px;
		font-size: 14px;
		/* 		position: relative;
		top: -10px; */
		color: rgba(255, 255, 255, .8);
		border-bottom: 1px solid rgba(63, 151, 207, .5);
		display: flex;
		justify-content: space-around;

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
		padding-right: 10px;
		color: white;
	}

	// .ab-list {
	// 	font-size: 12px;
	// 	height: calc(100% - 60px);
	// 	overflow-y: scroll;
	// }

	.ab-item {
		display: flex;
		justify-content: space-between;
		text-align: center;
		margin: 6px 16px 0;
		padding: 0 0 6px;
		border-bottom: 1px solid rgba(63, 151, 207, .5);
	}

	.ab-item-name,
	.ab-item-date {
		/* margin-top: 5px; */
		padding-left: 6px;
		text-align: center;
		/* border-left: 1px solid #00F5FF; */
		color: rgba(255, 255, 255, .5);
	}

	.ab-item-name {
		font-size: 12px;
		color: #F6FAFF;
		/* font-weight: bold; */
	}


	.patrol {
		font-size: 12px;
		// height: 120px;
		// overflow-y: scroll;

		.ab-item-name {
			margin-top: 0;
			font-size: 12px;
			border: none;
		}
	}

	.deviceDetail {
		height: 10px;
	}

	.deviceDetail {
		position: relative;
		padding: 15px 16px 0;

		.checkBox {
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.btn {
				width: 48px;
				line-height: 22px;
				font-size: 12px;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.6);
				background: url(../../assets/img/btn.png) no-repeat 100%;
				margin: 0 4px;
				cursor: pointer;
			}

			.checked {
				color: #00f5ff;
				background: url(../../assets/img/btn-check.png) no-repeat 100%;
			}
		}


	}

	#trendChart {
		// height: 0.85rem;
		height: calc(100% - 30px) ;
		width: 380px;
	}

	#webSecuritytotalpie {
		width: 50%;
		height: 140px;
	}



	.serverSecuritytotal {
		height: 150px;
	}

	.websiteSecurityanalysis {
		height: 150px;
	}

	.calendar {
		padding-top: 10px;
		display: flex;
		justify-content: space-around;
		align-items: center;

		/deep/.el-date-editor {
			height: 30px;
			font-size: 12px;
			// left: 20px!important;
			width: 210px !important;
			background-image: url('../../assets/img/date-bg.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-color: transparent;
			border: none;

			.el-range__icon {
				position: absolute;
				left: 180px;
				line-height: 30px;
				color: #00F5FF;
			}

			.el-range-input {
				background-color: transparent;
				color: #00F5FF;
				font-size: 12px;
			}

			.el-icon-circle-close {
				display: none;
			}


			.el-range-separator {
				color: rgba(0, 245, 255, .6);
				font-size: 12px;
				line-height: 26px;
			}
		}

		img {
			width: 30px;
			height: 30px;
		}
	}

	.rightpie {
		display: flex;
		margin-top: 16px;
		position: relative;
		height: calc(55% - 70px);
	}

	.rightpieimginner {
		width: 60px;
		height: 60px;
		position: absolute;
		left: 66px;
		top: 40px;
	}

	.rightpieimginnercircle {
		width: 90px;
		height: 90px;
		position: absolute;
		left: 50px;
		top: 25px;
	}

	.rightpieimgout {
		width: 120px;
		height: 120px;
		position: absolute;
		left: 35px;
		top: 10px
	}

	#rightbar {
		width: 100%;
		// height: calc(52% - 30px);
		// height: 100%;
		height: calc(90% - 30px);
	}
	.head {
	  position: relative;
	  padding: 10px 0;
	  width: 100%;
	  display: flex;
	  align-items: center;
	  font-size: 14px;
	  font-weight: 500;
	  color: rgba(255,255,255,0.5);
	  span {
	    flex: 1;
	  }
	  &::before {
	    content: "";
	    width: 100%;
	    height: 1px;
	    background: linear-gradient(to left, #112d46, #1b4465, #112d46);
	    position: absolute;
	    left: 0;
	    bottom: -1px;
	  }
	}
	.listBox {
	  margin-top: 10px;
	  width: 100%;
	  flex: 1;
	  height:calc(100% - 50px) ;
	  overflow-y: scroll;
	  .head {
	    position: relative;
	    padding: 10px 0;
	    width: 100%;
	    display: flex;
	    align-items: center;
	    font-size: 14px;
	    font-weight: 500;
	    color: rgba(255,255,255,0.5);
	    span {
	      flex: 1;
	    }
	    &::before {
	      content: "";
	      width: 100%;
	      height: 1px;
	      background: linear-gradient(to left, #112d46, #1b4465, #112d46);
	      position: absolute;
	      left: 0;
	      bottom: -1px;
	    }
	  }
	  .row {
	    position: relative;
	    padding: 10px 0;
	    width: 100%;
	    display: flex;
	    align-items: center;
	    font-size: 12px;
	    font-weight: 400;
	    color: rgba(255, 255, 255, 0.8);
	    border-radius: 2px;
	    span {
	      flex: 1;
	      white-space: nowrap;
	      text-overflow: ellipsis;
	      overflow: hidden;
				font-size: 12px;
	    }
	    &::before {
	      content: "";
	      width: 100%;
	      height: 1px;
	      background: linear-gradient(to left, #112d46, #1b4465, #112d46);
	      position: absolute;
	      left: 0;
	      bottom: -1px;
	    }
	    &:hover {
	      background: rgba(106, 176, 255, 0.2);
	    }
	    .btn-check {
	      width: 58px;
	      height: 30px;
	      color: rgba(255, 255, 255, 0.6);
	      background: url("../../assets/study/btn.png") no-repeat;
	      background-size: 100% 100%;
	      text-align: center;
	      line-height: 30px;
	      cursor: pointer;
	      &:hover {
	        color: rgba(255, 255, 255, 1);
	      }
	    }
	  }
	}
</style>
<style lang="less">
.interStatusEq-marker-wrap{
	z-index: 100;
	.interStatusEq-marker-img{
		width: 50px;
		height: 50px;
	}
	.interStatusEq-marker-mes{
		position: absolute;
		top: -60px;
		left: 50%;
		transform: translateX(-50%);
		padding: 8px 25px 10px;
		width: max-content;
		height: 50px;
		background-image: url('../../assets/marker/assetsMrakerBg.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: #fff;
		font-size: 12px;
		.interStatusEq-marker-num{
			color: rgba(0, 245, 255, 1);
		}
	}
	.interStatusAp-marker-mes{
		padding: 8px 9px 20px;
		height: auto;
		text-align: left;
		.interStatusAp-title{
			text-align: center;
			background-color: rgba(232, 38, 255, 1);
		}
		.interStatusAp-body{
			padding: 0 20px;
		}
	}
	.interStatus-OpticalFiber-marker-mes{
		padding: 6px 25px 10px;
		top: -28px;
		height: auto;
	}
}
.interStatus-popup{
	z-index: 101;
	left: 130px;
	padding: 5px 9px 9px 63px;
	width: 186px;
	height: 100px;
	background-image: url('../../assets/vehicle/popup-bg.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	background-color: transparent;
	color: #fff;
	.interStatus-popup-close-btn{
		position: absolute;
		top: -7px;
		right: -7px;
		width: 30px;
		height: 30px;
		cursor: pointer;
	}
	.interStatus-popup-head{
		background-color: rgb(8,195,61);
		text-align: center;
	}
	.interStatus-popup-abhead{
		background-color: rgb(255,94,38);
	}
	.interStatus-popup-body{
		padding-left: 15px;
		text-align: left;
	}
	.interStatus-popup-normal{
		color: rgb(8,177,59);
	}
	.interStatus-popup-ab{
		color: rgb(234,88,38);
	}
}
</style>
