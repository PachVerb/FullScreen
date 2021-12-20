<template>
  <div style="height: 100%;">
    <sideTran thisCrrentSys="studystatues">
      <div slot="left" style="height: 100%;">
        <sideItem title="学生到课统计" delay="100" height="25.44%" :loading="loading1">
          <div slot="body" class="studentschool">
            <div class="outbox">
              <div class="oneleftbox">
                <img src="../../assets/pieimg/study/arc.png" class="arcposition" />
                <img src="../../assets/pieimg/study/innercir.png" class="cirposition" />
                <div id="studentchart"></div>
              </div>
              <span class="value">
                21102
                <i>人</i>
              </span>
              <span class="name">学生总人数</span>
            </div>
            <div class="itembox">
              <div class="item" v-for="(item,i) in classList" :key="i">
                <span class="value">
                  {{item.val}}
                  <i>人</i>
                </span>
                <img :src="item.icon" alt />
                <span class="name">{{item.name}}</span>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="教学综合情况" delay="200" height="22.55%">
          <div class="studyStatus" slot="body">
            <div class="item" v-for="(item,i) in staList" :key="i">
              <div class="row">
                <span class="name">{{item.name}}</span>
                <span class="value" :style="i==2||i==3?`background:#25A87B;`:''">{{item.val}}</span>
              </div>
              <div class="line"></div>
            </div>
          </div>
        </sideItem>
        <sideItem title="各宿舍楼归寝情况" delay="300" height="51.9%">
          <div slot="body" class="dormState">
            <div class="statiBox">
              <div class="group" style="color:#46B1F6;">
                <i class="p" style="background:#46B1F6;"></i>
                <span class="detail">使用中/24.9%</span>
                <span class="value">173</span>
              </div>
              <div class="group" style="color:#E5BC80;">
                <i class="p" style="background:#E5BC80;"></i>
                <span class="detail">空闲中/75.1%</span>
                <span class="value">695</span>
              </div>
            </div>
            <div class="bar">
              <span class="pro">
                <span class="val" :style="`width:${dormProVal}%;`"></span>
              </span>
            </div>
            <div class="navBox">
              <span :class="dormKey?`text checked`:'text'" @click="getDormStatus(true)">使用中</span>
              <span style="margin:0 20px;">|</span>
              <span :class="dormKey?`text`:'text checked'" @click="getDormStatus(false)">空闲中</span>
            </div>
            <div class="listBox">
              <div class="head">
                <span>教室</span>
                <span>所在位置</span>
                <span>使用人</span>
                <span>查看</span>
              </div>
              <div class="scroll">
                <div class="content" @mouseenter="dormScrollStop" @mouseleave="dormScrollStart">
                  <div class="row" v-for="(item,i) in roomMesList" :key="i">
                    <span>{{item.room}}</span>
                    <span>{{item.loca}}</span>
                    <span>{{item.person}}</span>
                    <span>
                      <span class="btn-check" @click="handleCheckLocation(item)">查看</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
      </div>
      <!-- 右边 -->
      <div slot="right" style="height: 100%;">
        <sideItem title="教室分类统计" transitionType="right" delay="100" height="25.19%">
          <div class="roomTyp" slot="body">
            <div class="chartBox">
              <img src="../../assets/study/bg-type.png" class="bg-type" />
              <div class="chart-room" id="roomChart"></div>
            </div>
            <div class="detailBox">
              <div class="row" v-for="(item,i) in roomList" :key="i">
                <div class="title">
                  <i :style="`background:linear-gradient(${item.color[0]},${item.color[1]});`"></i>
                  <span>{{item.name}}</span>
                </div>
                <div class="value">
                  <span>{{item.val}}</span>
                  <i>%</i>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="当前行课统计" transitionType="right" delay="200" height="37.46%">
          <div slot="body" class="courseStati">
            <div class="item" v-for="(item,i) in courseList" :key="i">
              <div class="imgbox">
                <img class="icon" :src="item.icon" alt />
                <img class="light" src="../../assets/study/bg-l.png" alt />
                <img src="../../assets/study/bg-b.png" alt />
              </div>
              <span class="value">
                {{item.val}}
                <i>({{item.unit}})</i>
              </span>
              <span class="text">{{item.name}}</span>
            </div>
          </div>
        </sideItem>
        <sideItem title="出勤异常统计" transitionType="right" delay="300" height="37.3%">
          <div slot="body" class="attendStati">
            <div class="head">
              <span style="flex:1;"></span>
              <span>姓名</span>
              <span>异常次数</span>
              <span>班级</span>
            </div>
            <div class="scroll">
              <div class="content" @mouseenter="attendScrollStop" @mouseleave="attendScrollStart">
                <div class="row" v-for="(item,i) in attendList" :key="i">
                  <span style="flex:1;">
                    <img v-if="item.type==1" src="../../assets/study/warn1.png" alt />
                    <img v-else src="../../assets/study/warn2.png" alt />
                  </span>
                  <span>{{item.name}}</span>
                  <span>{{item.num}}</span>
                  <span>{{item.class}}</span>
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
import sideTran from '../sideTran'
import sideItem from '../sideItem.vue'
export default {
  components: {
    sideTran,
    sideItem
  },
  data() {
    return {
      loading1: false,
      classList: [],
      staList: [],
      dormKey: true,//使用中,空闲中
      dormProVal: 0,
      dormList: [],
      roomList: [],
      courseList: [],
      attendList: [],
      dormTimer: null,
      attendTimer: null,
      roomMesList: []
    }
  },
  computed: {
    ...mapGetters(['map','currentSys']),
    scrollOpt() {
      return {
        step: 1, // 数值越大速度滚动越快
        limitMoveNum: this.dormList.length, // 开始无缝滚动的数据量
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 52, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
        mesList: [],
        markerList: null,
        markerNameList: [],
        roomLayer: null
      }
    }
  },
  watch: {
    currentSys(val) {
      if (val != 'studystatues') {
        this.dormScrollStop();
        this.attendScrollStop();
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
      this.hideBuildingText()
      this.$nextTick(() => {
        setTimeout(() => {
          this.getStuClass();
          this.getStudyStatus();
          this.getDormStatus();
          this.getRoomType();
          this.getCourseStati();
          this.getAttendStati();
        }, 500)
      })
      this.mesList = [{
        useNum: 34,
        freeNum: 14,
        location: [104.05472382086708, 30.597631663126307]
      },{
        useNum: 34,
        freeNum: 14,
        location: [104.05941489815547, 30.594458469748886]
      },{
        useNum: 34,
        freeNum: 14,
        location: [104.06086882491559, 30.594363377308042]
      },{
        useNum: 34,
        freeNum: 14,
        location: [104.06017342377481, 30.59212966788519]
      },{
        useNum: 34,
        freeNum: 14,
        location: [104.05996892566299, 30.596361187505224]
      },{
        useNum: 34,
        freeNum: 14,
        location: [104.06014443556603, 30.597449607212354]
      },]
      this.createStudystatusMraker('mesList', 'markerList')
      this.createRoomLayer()
    },
    destroySys(){
      this.showBuildingText()
      this.clearStudystatusMarker()
      if(this.roomLayer){
        this.roomLayer.remove()
        this.roomLayer = null
      }
    },
    handleCheckLocation(msg){
      let detail = {
        floor: msg.floor,
        location: msg.center
      }
      this.SET_DETAIL_MSG(detail)
    },
    createRoomLayer(){
      if(this.roomLayer){
        this.roomLayer.remove()
        this.roomLayer = null
      }
      this.roomLayer = new creeper.LayerIndoor(this.map)
      this.roomMesList = [{
        type: 0,
        floor: 0,
        buildingId: "17746",
        num: 33,
        room: '法医实验室', 
        loca: '文科实验楼1', 
        person: '张锦',
        center: [104.06032902565136, 30.591759379410234],
        location: [[[104.06030589667,30.59173094939],[104.06030379654,30.5918125773],[104.06034770009,30.5918134148],[104.06034979954,30.59173178626],[104.06030589667,30.59173094939]]]
      },{
        type: 0,
        floor: 0,
        buildingId: "17746",
        num: 26,
        room: '法医实验室', 
        loca: '文科实验楼1', 
        person: '张锦',
        center: [104.06028569277896, 30.591759379410234],
        location: [[[104.0603072164,30.59173094735],[104.0602626412,30.59173009742],[104.06026044132,30.59181172599],[104.06030501504,30.59181257591],[104.0603072164,30.59173094735]]]
      },{
        type: 1,
        floor: 0,
        buildingId: "17746",
        room: '法医实验室', 
        loca: '文科实验楼1', 
        person: '张锦',
        center: [104.06037520447688, 30.591763167383718],
        location: [[[104.06039628747,30.59173264484],[104.060350795,30.59173177776],[104.06034859432,30.59181340695],[104.0603940868,30.59181427402],[104.06039628747,30.59173264484]]]
      }]
      let geojsonpolygon = {
        "type": "FeatureCollection",
        "features": []
      }
      geojsonpolygon.features = this.setRoomFeature(this.roomMesList)
      console.log('geojsonpolygon',geojsonpolygon)
      this.roomLayer.addLayer(geojsonpolygon,{
          sourceId:"studyStatusRoomData",
          layerId:"studyStatusRoom-layer",
          type:"fill",
          paint:{
              "fill-color": ['get', 'color'], 
              //"line-width":5
              
          },
          layout:{
          },
          isIndoor: true,
          layerBefore: 'room23',
          isBuildingDivision: true,
      })
      this.roomLayer.addLayer(geojsonpolygon,{
          sourceId:"studyStatusRoomTextData",
          layerId:"studyStatusRoomText-layer",
          type:"symbol",
          paint:{
             'text-color': '#fff'
          },
          layout:{
            'text-field': ['get', 'title'],
            'text-size': 12,
          },
          isIndoor: true,
          isBuildingDivision: true,
      })
    },
    setRoomFeature(roomList){
      let featureList = roomList.map(room => {
        let feature = {
            "type": "Feature",
            "properties": {
                "name": "fdggff",
                "status": "0",
                "color": room.type == 0 ? 'rgb(70, 177, 246)' : 'rgb(255,151,0)',
                "title": "B109" + '\n' + (`状态：${room.type==0 ? '使用中' : '空闲中'}`) + '\n' + (room.type == 0 ? `人数：${room.num}人` : '') + '\n',
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": room.location,
            }
        }
        if(room.floor !== undefined) feature.properties.floor = room.floor
        if(room.buildingId !== undefined) feature.properties.buildingId = room.buildingId
        return feature
      })
      return featureList
    },
    createStudystatusMraker(listName, markerListName){
      let imgsrc = require('../../assets/study/study-marker.png')
      let domList = this[listName].map(item => {
        let div = document.createElement('div')
        div.className = 'studystatus-marker-wrap'
        div.innerHTML = `
          <img class="studystatus-marker-img" src="${imgsrc}" />
          <div class="studystatus-marker-mes">
            <div><span>使用中：</span><span>${item.useNum}间</span></div>
            <div><span>空闲中：</span><span>${item.freeNum}间</span></div>
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
    //学生到课统计
    getStuClass() {
      this.loading1 = true;
      setTimeout(() => {
        this.loading1 = false;
        this.classList = [
          { name: '今日应上课人数', val: 21040, icon: require('../../assets/study/stati1.png') },
          { name: '今日已到课人数', val: 62, icon: require('../../assets/study/stati2.png') },
          { name: '今日请假人数', val: 865, icon: require('../../assets/study/stati3.png') },
          { name: '今日缺课人数', val: 67, icon: require('../../assets/study/stati4.png') },
        ]
        this.$nextTick(() => {
          this.renderBar();
        })
      }, 3000)
    },
    renderBar() {
      let chartDom = document.getElementById('studentchart');
      let chart = echarts.init(chartDom);
      var value = 0.54;
      chart.setOption({
        animationDuration: 3000,
        title: [
          {
            text: (value * 100).toFixed(0) + '%',
            left: '48%',
            top: '40%',
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
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [//设置渐变色
                  { offset: 0, color: '#69AFFD' },
                  { offset: 1, color: '#69AFFD' },
                ]),
              },
            },
          },
        ],
      });

    },
    //教学综合情况
    getStudyStatus() {
      this.staList = [
        { name: '教师人数', val: 1577 }, { name: '实验室', val: 1577 },
        { name: '学生人数', val: 1577 }, { name: '教学楼', val: 1577 },
        { name: '学院总数', val: 1577 }, { name: '学院建筑', val: 1577 },
      ]
    },
    //各宿舍楼归寝情况
    getDormStatus(flag = true) {
      this.dormKey = flag;
      this.dormList = flag ? [
        { room: '法医实验室', loca: '文科实验楼1', person: '张锦' },
        { room: '化学实验室', loca: '文科实验楼2', person: '李达' },
        { room: '统计大数据实验室', loca: '文科实验楼3', person: '王晓悦' },
        { room: '现代旅游服务技能实验室', loca: '文科实验楼4', person: '程慕' },
        { room: '网络统计实验室', loca: '文科实验楼5', person: '杨澜' },
        { room: '网络统计实验室', loca: '文科实验楼6', person: '杨澜' },
        { room: '网络统计实验室', loca: '文科实验楼7', person: '杨澜' },
        { room: '网络统计实验室', loca: '文科实验楼8', person: '杨澜' },
      ] : [
        { room: '地理实验室', loca: '理科实验楼1', person: '张锦' },
        { room: '生化实验室', loca: '理科实验楼2', person: '李达' },
        { room: '政治思想实验室', loca: '理科实验楼3', person: '王晓悦' },
        { room: '现代军事技能实验室', loca: '理科实验楼4', person: '程慕' },
        { room: '计算机1实验室', loca: '理科实验楼5', person: '杨澜' },
        { room: '计算机2实验室', loca: '理科实验楼6', person: '李治' },
        { room: '计算机3实验室', loca: '理科实验楼7', person: '张三' },
        { room: '计算机4实验室', loca: '理科实验楼8', person: '杨澜' },
      ]
      this.dormProVal = 0;
      let t = setInterval(() => {
        if (this.dormProVal < 30.6) {
          this.dormProVal += 0.1;
        } else {
          clearInterval(t)
        }
      }, 8);
      this.dormScrollStart();
    },
    //开始自动滚动
    dormScrollStart() {
      this.roomMesList.length && this.$nextTick(() => {
        this.dormScrollStop();
        let scrollBox = document.querySelector('.dormState .scroll');
        let content = document.querySelector('.dormState .scroll .content');
        let items = document.querySelectorAll('.dormState .scroll .content .row');
        let itemH = items[0].clientHeight;
        let flag = true;
        let nexTop = Math.ceil(scrollBox.clientHeight / itemH) * itemH - scrollBox.clientHeight;
        //检查滚动距离是否过短
        if (content.clientHeight - scrollBox.clientHeight < itemH) return;
        scrollBox.className = 'scroll noScroll';//隐藏滚动条
        this.dormTimer = setInterval(() => {
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
    dormScrollStop() {
      clearInterval(this.dormTimer);
      document.querySelector('.dormState .scroll')&&(document.querySelector('.dormState .scroll').className = 'scroll');//显示滚动条
    },
    //教室分类统计
    getRoomType() {
      this.roomList = [
        { name: "普通教室", val: 40, color: ['#D3A4FF', '#6F76FF'] },
        { name: "实验室", val: 25, color: ['#FF95C4', '#FFBBAE'] },
        { name: "智慧教室", val: 20, color: ['#FF7B57', '#F5BB90'] },
        { name: "培训教室", val: 15, color: ['#08B6AC', '#58F2BE'] }
      ];
      let dom = document.getElementById('roomChart');
      let chart = echarts.init(dom);
      let list = []
      for (let i in this.roomList) {
        list.push({
          value: this.roomList[i].val,
          name: this.roomList[i].name,
          itemStyle: {
            normal: {
              borderWidth: 5,
              borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: this.roomList[i].color[0] },
                { offset: 1, color: this.roomList[i].color[1] },
              ]),
            }
          }
        }, {
          value: 100 / 30,
          name: '',
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: 'transparent',
              borderColor: 'transparent',
              borderWidth: 0
            }
          }
        })
      }
      let option = {
        tooltip: {
          show: false
        },
        series: [
          {
            name: '',
            type: 'pie',
            clockWise: false,
            startAngle: '90',
            center: ['50%', '50%'],
            radius: ['80%', '81%'],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            data: list,
            animationDuration: 3000,
          },
          {
            name: '',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['70%', '70%'], //设置饼状图的宽高
            itemStyle: {
              color: 'transparant'
            },
            startAngle: '90',
            data: [{
              value: 100,
              name: '',
              label: {
                normal: {
                  show: true,
                  formatter: '{c|总计}' + '\n' + '{a|854}{b|间}',
                  rich: {
                    c: {
                      color: 'rgba(255, 255, 255, .8)',
                      fontSize: 14,
                      lineHeight: 22
                    },
                    a: {
                      color: 'rgba(0, 245, 255, 0.8)',
                      fontSize: 22,
                      lineHeight: 22
                    },
                    b: {
                      color: 'rgba(255, 255, 255, .4)',
                      fontSize: 12,
                      lineHeight: 20
                    },
                  },
                  position: 'center'
                }
              }
            }]
          }
        ]
      }
      chart.setOption(option, true);
    },
    //当前行课统计
    getCourseStati() {
      this.courseList = [
        { name: '当前应上课程数', val: 112, unit: '节', icon: require('../../assets/study/img-class1.png') },
        { name: '当前应上学生数', val: 299, unit: '人', icon: require('../../assets/study/img-class2.png') },
        { name: '实际课程数', val: 28, unit: '节', icon: require('../../assets/study/img-class3.png') },
        { name: '实际上课学生数', val: 245, unit: '人', icon: require('../../assets/study/img-class4.png') },
      ]
    },
    //出勤异常统计
    getAttendStati() {
      this.attendList = [
        { name: '周雨生1', num: 19, class: '土木工程12班', type: 1 },
        { name: '周雨生2', num: 29, class: '土木工程12班', type: 2 },
        { name: '周雨生3', num: 39, class: '土木工程12班', type: 1 },
        { name: '周雨生4', num: 49, class: '土木工程12班', type: 1 },
        { name: '周雨生5', num: 59, class: '土木工程12班', type: 2 },
        { name: '周雨生6', num: 69, class: '土木工程12班', type: 2 },
        { name: '周雨生7', num: 79, class: '土木工程12班', type: 1 },
        { name: '周雨生8', num: 89, class: '土木工程12班', type: 1 },
      ]
      this.attendScrollStart();
    },
    //开始自动滚动
    attendScrollStart() {
      this.attendList.length && this.$nextTick(() => {
        this.attendScrollStop();
        let scrollBox = document.querySelector('.attendStati .scroll');
        let content = document.querySelector('.attendStati .scroll .content');
        let items = document.querySelectorAll('.attendStati .scroll .content .row');
        let itemH = items[0].clientHeight;
        let flag = true;
        let nexTop = Math.ceil(scrollBox.clientHeight / itemH) * itemH - scrollBox.clientHeight;
        //检查滚动距离是否过短
        if (content.clientHeight - scrollBox.clientHeight < itemH) return;
        scrollBox.className = 'scroll noScroll';//隐藏滚动条
        this.attendTimer = setInterval(() => {
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
    attendScrollStop() {
      clearInterval(this.attendTimer);
      document.querySelector('.attendStati .scroll')&&(document.querySelector('.attendStati .scroll').className = 'scroll');//显示滚动条
    },
  }
}
</script>

<style lang="less" scoped>
.studentschool {
  margin-top: 10px;
  padding: 0 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .outbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    .oneleftbox {
      position: relative;
      .arcposition {
        position: absolute;
        left: 0;
        width: 100%;
        animation: myMove 5s infinite linear;
      }
      .cirposition {
        position: absolute;
        left: 0;
        width: 100%;
      }
      #studentchart {
        height: 120px;
        width: 120px;
      }
    }
    .value {
      color: #00f5ff;
      font-size: 16px;
      font-weight: bold;
      i {
        color: rgba(246, 250, 255, 0.4);
        font-size: 12px;
        font-weight: 400;
      }
    }
    .name {
      margin-top: 4px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .itembox {
    flex: 1;
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .value {
        margin-top: 4px;
        color: #00f5ff;
        font-size: 16px;
        font-weight: bold;
        i {
          color: rgba(246, 250, 255, 0.4);
          font-size: 12px;
          font-weight: 400;
        }
      }
      img {
        width: 35px;
        height: 39px;
      }
      .name {
        margin-top: 4px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
.studyStatus {
  padding: 0 16px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .item {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .row {
      padding: 0 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        font-size: 14px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.8);
      }
      .value {
        padding: 6px 10px;
        background: #1bb5b8;
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
        border-radius: 2px;
      }
    }
    .line {
      margin-top: 5px;
      position: relative;
      width: 164px;
      height: 1px;
      background: rgba(105, 175, 253, 1);
      &:before {
        content: "";
        width: 3px;
        height: 3px;
        background: rgba(105, 175, 253, 1);
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: calc(50% - 1.5px);
      }
      &:after {
        content: "";
        width: 3px;
        height: 3px;
        background: rgba(105, 175, 253, 1);
        border-radius: 50%;
        position: absolute;
        right: 0;
        top: calc(50% - 1.5px);
      }
    }
  }
}
.dormState {
  padding: 10px 12px 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .statiBox {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .group {
      display: flex;
      align-items: center;
      .p {
        width: 3px;
        height: 6px;
        border-radius: 50%;
        margin-right: 5px;
      }
      .detail {
        font-size: 12px;
        font-weight: 400;
        margin-right: 10px;
      }
      .value {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  .bar {
    margin-top: 5px;
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
    background: url("../../assets/study/bg-bar.png") no-repeat;
    background-size: 100% 100%;
    .pro {
      width: 100%;
      height: 14px;
      background: #e5bc80;
      display: flex;
    }
    .val {
      height: 100%;
      background: #46b1f6;
    }
  }
  .navBox {
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    .text {
      cursor: pointer;
    }
    .checked {
      position: relative;
      font-size: 16px;
      font-weight: 500;
      color: #00f5ff;
      &::before {
        content: "";
        width: 100%;
        height: 2px;
        background: linear-gradient(to left, #0f6878, #00f5ff, #0f6878);
        position: absolute;
        left: 0;
        bottom: -4px;
      }
    }
  }
  .listBox {
    margin-top: 10px;
    width: 100%;
    flex: 1;
    // height: 300px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .head {
      position: relative;
      padding: 10px 0;
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
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
    .scroll {
      flex: 1;
      width: 100%;
      overflow-y: auto;
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
}
.roomTyp {
  padding: 10px 16px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .chartBox {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .bg-type {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .chart-room {
      width: 150px;
      height: 150px;
    }
  }
  .detailBox {
    flex: 1;
    height: 150px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 5px;
      border-bottom: 2px dotted rgba(106, 176, 255, 0.6);
      .title {
        i {
          width: 10px;
          height: 10px;
          display: inline-block;
          margin-right: 4px;
        }
        span {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
        }
      }
      .value {
        span {
          font-size: 14px;
          font-weight: 400;
          color: #00f5ff;
          margin-right: 2px;
        }
        i {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}
.courseStati {
  padding: 0 16px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  .item {
    margin: 8px 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .imgbox {
      width: 100px;
      height: 85px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      .icon {
        animation: ani-icon 2s infinite linear;
        animation-direction: alternate;
      }
      .light {
        animation: ani-light 2s infinite linear;
        animation-direction: alternate;
      }
      @keyframes ani-light {
        0% {
          opacity: 0.3;
          transform: scale(0);
          top: 30%;
        }
        100% {
          opacity: 1;
          transform: scale(1.1);
          top: 0;
        }
      }
      @keyframes ani-icon {
        0% {
          top: -5px;
        }
        100% {
          top: 5px;
        }
      }
    }

    .value {
      margin-top: 5px;
      font-size: 16px;
      font-weight: bold;
      color: rgba(0, 245, 255, 0.8);
      i {
        margin-left: 2px;
        font-size: 12px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    .text {
      margin-top: 5px;
      font-size: 12px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
.attendStati {
  padding: 0 12px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .head {
    position: relative;
    padding: 10px 0;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    span {
      flex: 2;
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
  .scroll {
    flex: 1;
    width: 100%;
    overflow-y: auto;
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
      flex: 2;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      img {
        width: 16px;
        height: 16px;
      }
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
  }
}

.noScroll {
  &::-webkit-scrollbar {
    visibility: hidden;
  }
  &::-webkit-scrollbar-thumb {
    visibility: hidden;
  }
}
@keyframes myMove {
  /**关键帧名称**/
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
<style lang="less">
.studystatus-marker-wrap{
	.studystatus-marker-img{
		width: 50px;
		height: 50px;
	}
	.studystatus-marker-mes{
		position: absolute;
		top: -60px;
		left: 50%;
		transform: translateX(-50%);
		padding: 8px 15px 10px;
		width: max-content;
		height: 50px;
		background-image: url('../../assets/marker/assetsMrakerBg.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: #fff;
		font-size: 12px;
		text-align: left;
	}
}
</style>