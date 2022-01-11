<!-- 地图内容区 -->
<template>
  <div class="vmap-content-container">
    <!-- 'start-select' -->
    <div id="map-box"></div>
    <div id="map-floor"></div>
  </div>
</template>

<script>
/* 加载静态资源 */
import BUILDING_JSON from "../assets/json/building.json";
import WATER_JSON from "../assets/json/water.json";
import STYLEBLACK_JSON from "../assets/json/styleblack.json";
import BUILDINGANDROUTE_GEOJSON from "../assets/json/buildingandroute.json";
/* 加载静态资源 */
import Bus from "../js/Bus";
import {mapGetters, mapMutations} from 'vuex'

import * as turf from "@turf/turf";
let mapIp = "https://wisec.you07.com/cmgis-server";
let token = 'd2lzZWM6NzkzNmZkN2UzNWI5MGY2YWNhZWI3MjVhYzIyOTlkYzM=9';

let map2D = {
  mapId: 9, // 地图Id
  styleId: 3,  // 样式id
  mapCenter: [104.05788702900719, 30.59531754516823], //地图中心点
  mapZoom: 16.2, // 地图放大级别
  mapPitch: 60,
  mapBearing: 0,
}
let map25D = {
  mapId: 43, // 地图Id
  styleId: 3,  // 样式id
  mapCenter: [113.99723367196878,33.007189704534724], //地图中心点
  mapZoom: 16, // 地图放大级别
  mapPitch: 0,
  mapBearing: 0,
}

// 定义3D模型
const threeLayer = new creeper.ThreeLayer({
    id:"modellayer",
    threemapOption:{
        useDraggingObjects:false,
        useTooltip: false,
        useSelectingObjects:false,
				usePostprocessing:true,
        passiveRendering: false,
        skySrc: require('../assets/img/sky.png')
    }
});
// 计数器，计算点数
let counter = 0

export default {
  name: "MapContent",
  props: {
    Fllo:Number,
  },
  components: {
  },
  data() {
    return {
      vMap: null, //地图对象
      buildingoutcircle: [],
      routeoutcircle: [],
      buildingdata: [],
      lineData: [], //路线数据
      domainUrl: window.location.href.split('#')[0],
      circleInterval: null,
      circleList: [],
      circleIndex: 0,
      floor2: null
    };
  },
  computed: {
    nowZoom() {
      return this.vMap.getZoom()
    },
    nowBuild() {
      return this.vMap.floorComponent.nowBuildingId
    },
    ...mapGetters(['map','schoolList', 'mapMes','lineLoad'])
  },
  created() {
    counter = 0
    Bus.$on("lngLat", (val) => {
      console.log(val.leaf+1)
        this.vMap.flyTo({center:val.lngLat.coordinates, zoom: 18});
        this.vMap.once('moveend', () => {
          this.vMap.setLevel(val.leaf)
        })
    });
  },
  mounted() {
    const _this = this;
    this.Map();
    // Promise.all([this.apiToken(), this.apiMapId(), this.apiMapIp()])
    //   .then(() => {
    //     this.Map();
    //     //主要是loading问题
    //   })
    //   .catch((err) => {
    //     // 抛出错误信息
    //   });
  },
  watch: {
    Fllo(val){//  切换楼层
      this.vMap.setLevel(val)
    },
    lineLoad(val){
      if(val){
        if(this.floor2){
          threeLayer.threemap.remove(this.floor2)
          this.floor2 = null
        }
      }
    },
  },
  methods: {
    ...mapMutations(['SET_MAP', 'SET_MAP_LOAD', 'SET_CURRENTFLOOR','SET_LINE_LOAD']),
    toHome() {
      let param = {
        center: this.vMap.getStyle().center,
        zoom: this.vMap.getStyle().zoom,
      }
      param = {...param, pitch:map2D.mapPitch,bearing:map2D.mapBearing}
      this.vMap.flyTo(param)
    },
    Map() {
      this.vMap&&this.vMap.remove()
      this.SET_MAP(null)
      this.SET_MAP_LOAD(true)
      this.$nextTick(() => {
        // 获取建筑和路线数据
        this.getBuildingAndRouteFn()
        //获取建筑信息
        this.getBuildingFn()
        //获取路线信息
        this.lineData = this.getLineRoute([
            [[[ 104.04438225523825, 30.590859031757148], [104.0520259740045, 30.590965706491346]],[[104.0520259740045, 30.590965706491346],[104.064137435021, 30.591233205127864]]],
            [[[ 104.0641336053904, 30.591121119890843], [104.05203039721283, 30.59079531591118]],[[104.05203039721283, 30.59079531591118],[104.0443878828446, 30.590648538762807]]],
            [[[ 104.04867384106075, 30.603724579183023], [104.04841078534338, 30.596635156415786]],[[104.04841078534338, 30.596635156415786],[104.04804555382111, 30.59041450122902]],[[104.04804555382111, 30.59041450122902],[104.04801719955606, 30.587295394378316]]],
            [
                [[  104.06900014634311, 30.58796169547024], [104.06903411684874, 30.590745048843033]],
                [[104.06903411684874, 30.590745048843033],[104.06931015449743, 30.596805608709175]],
                [[104.06931015449743, 30.596805608709175],[104.07116915682354,  30.59681221243629]],
                [[104.07116915682354,  30.59681221243629],[104.07119505594596, 30.59971363197485]],
                [[104.07119505594596, 30.59971363197485],[104.07346099244108, 30.599619326447836]]]
        ])
        
        let _mapIp = mapIp
        let _mapId = map2D.mapId
        let _styleId = map2D.styleId
        let _mapCenter = map2D.mapCenter
        let _mapZoom = map2D.mapZoom
        let _mapPitch = map2D.mapPitch
        let _mapBearing = map2D.mapBearing
        creeper.CreeperConfig.token = token;
        this.vMap = new creeper.VectorMap("map-box", _mapId, _mapIp + "/");
        // if(this.currentPanel === 0){
        //   this.vMap = new creeper.RasterMap("map-box", _mapId, _mapIp + "/");
        // }else{
        //   this.vMap = new creeper.VectorMap("map-box", _mapId, _mapIp + "/");
        // }
        //获取地图样式
        this.getMapStyle()
        this.vMap.on("load", () => {
          this.vMap.flyTo({
            center: _mapCenter,
            pitch: _mapPitch,
            bearing: _mapBearing,
            zoom: _mapZoom
          })
          // 获取地图样式
          this.SET_MAP_LOAD(false)
          this.SET_MAP(this.vMap)
          // 设置地图初始值
          // this.vMap.setZoom(_mapZoom)
          // this.vMap.setCenter({lng: _mapCenter[0], lat: _mapCenter[1]})
          // this.vMap.setPitch(_mapPitch)
          // this.vMap.setBearing(_mapBearing)
          this.vMap.on('contextmenu', (e) => {
            return false // 屏蔽网页本身的右击效果
          })
          this.$nextTick(() => {
            this.mapLoadFn()
          })
        });
        this.vMap.on("moveend", (e) => {
          let features =  this.vMap.queryRenderedFeatures( this.vMap.project( this.vMap.getCenter()))
          if(!features[0] || !features[0].hasOwnProperty("source")) return
          if(features[0].source != 'outdoor' || features[0].properties.hasOwnProperty("building:levels")){
            if(this.vMap.getZoom() >= 18){
              this.$emit('zoomdata', this.vMap.floorComponent)
            }else{
              this.$emit('zoomdata', false)
            }
          }else{
            this.$emit('zoomdata', false)
          }
        });
        var SelectFloor =
        new creeper.FloorSelector(this.vMap,{
            id: 'map-floor', // 必传， 楼层组件存放的容器id ，div标签的id名称
            currentFloor: 0, //楼层 0是1楼  非必传默认是1楼
            displaySize: 8, //展示的数量  非必传默认是5个楼层信息
            displayZoom: 18,//显示的最小地图放大等级  非必传默认是18

            onChange: (level) => {
              console.log(level) // 更改的楼层  1楼为0，-1楼为-1
              this.SET_CURRENTFLOOR(level)
            }, // 变化的回调

        })
      });
    },

    //路线处理
    getLineRoute(lngLatArray) {
      let lingarray=[]
      for (let i = 0; i<lngLatArray.length; i++) {
        let arc1=[]
        for (let j = 0; j < lngLatArray[i].length; j++) {
        let LineString = turf.lineString(lngLatArray[i][j])
        let lineDistance = turf.length(LineString, { unit: 'kilometers' });
        let bearing = turf.bearing(lngLatArray[i][j][0], lngLatArray[i][j][1])
          for (let i = 0; i < lineDistance; i += 0.002) {
            let segment = turf.along(LineString, i, { unit: 'kilometers' });
            arc1.push([segment.geometry.coordinates, bearing, 60]); 
            //arc1.push([segment.geometry.coordinates, item.startFloor, item.indoor, bearing]);
          }
        }
        lingarray.push(arc1)
      }
      return lingarray
    },
    // 获取建筑和路线数据
    getBuildingAndRouteFn() {
      //给info赋值给定义好的变量
      const pageData = BUILDINGANDROUTE_GEOJSON;
      let buildingoutcircle = []
      let routeoutcircle = []
      for(var i=0;i<pageData.features.length;i++){
        if (pageData.features[i].geometry.type=="Polygon"&&pageData.features[i].properties.newid=="14") {
          buildingoutcircle.push(pageData.features[i])
        }else{
          if (pageData.features[i].geometry.type=="LineString") {
            routeoutcircle.push(pageData.features[i])
          }
          
        }
      }
      this.buildingoutcircle = buildingoutcircle
      this.routeoutcircle = routeoutcircle
			
			console.log("this.routeoutcircle",this.routeoutcircle)
    },
    //获取建筑信息
    getBuildingFn() {
      //给info赋值给定义好的变量
      const pageData=BUILDING_JSON.data.content;
      let buildingdata = []
      let ids = [8165,21209,19771]
      pageData.forEach(element => {
        buildingdata.push({
          id: element.id,
          center: JSON.parse('['+element.center+']'),
          name:element.tags.name || '',
          text:element.tags.name || '',  
          coordinates: JSON.parse(element.geom)[0],
          height: element.tags.height / 10 || 0
        })
      });
      console.log('buildingdata', buildingdata)
      this.buildingdata = buildingdata
    },
    //获取地图样式
    getMapStyle() {
      const pageData = STYLEBLACK_JSON;
      console.log(pageData)
      this.vMap.setStyle(pageData)
    },
    // 地图加载完成
    mapLoadFn() {
      this.vMap.setLayoutProperty("building_3d_hasroom","visibility","none")
      this.vMap.setLayoutProperty("building1_3D","visibility","none")
      this.vMap.setLayoutProperty("ziti_dalou","visibility","none")
      this.vMap.addLayer(threeLayer); // 将3D模型的图层加入地图
      this.vMap.setLayerZoomRange('modellayer', 10, 18); // 给模型设置地图等级
      this.loadOjbFn()
      this.loadTree()
			this.loadWater()
			this.vMap.on("click",e=>{
				console.log(e)
			})
      setTimeout(() => {
        this.load3DLine()
        // this.loadAniCircle()  
      }, 4000) // 3S之后加载路线
      
    },
    // 加载树
    loadTree(){
      threeLayer.threemap
      .loadModel({
        url: `${this.domainUrl}/static/3dl_cs/lou1.obj`,
        type: 'obj',
        units: 'meters',
          mtl: `${this.domainUrl}/static/3dl_cs/lou1.mtl`,
          properties:{
              id:"2345",
              name:"树",
              buildingId:"254862",

          },
          scale:1
      })
      .then(group => {
        // model=group
        // group.addSprite("教学楼1栋")
        console.log("building",group);
        group.setCoords([104.06057600331104, 30.594222243844968]);
        threeLayer.threemap.add(group);
               
        // setTimeout(() => {
        //     let model1=model.duplicate()
        //     model1.setCoords([ 104.05888701417172, 30.592952287792542])
        //     threeLayer.threemap.add(model1);
        // }, 1000);
               
      });
      threeLayer.threemap
      .loadModel({
        url: `${this.domainUrl}/static/3dl_cs/lxzx.obj`,
        type: 'obj',
        units: 'meters',
        mtl: `${this.domainUrl}/static/3dl_cs/lxzx.mtl`,
        properties:{
            id:"2345",
            name:"树",
            buildingId:"267297"
        },
        scale:1,
				
      })
      .then(group => {
        // model=group
        //group.addSprite("理想中心4栋")
        console.log("building",group);
        group.setCoords([104.06079320286767, 30.59740962355285]);
        threeLayer.threemap.add(group);
        // setTimeout(() => {
        //     let model1=model.duplicate()
        //     model1.setCoords([ 104.05888701417172, 30.592952287792542])
        //     threeLayer.threemap.add(model1);
        // }, 1000);
               
      });
			threeLayer.threemap //理想中心1栋
			.loadModel({
			  url: `${this.domainUrl}/static/3dl_cs/lxzx.obj`,
			  type: 'obj',
			  units: 'meters',
			  mtl: `${this.domainUrl}/static/3dl_cs/lxzx.mtl`,
			  properties:{
			      id:"2345",
			      name:"树",
			      buildingId:"8151"
			  },
			  scale:1
			})
			.then(group => {
			  console.log("building",group);
			  group.setCoords([104.060117836916,30.5973737561687]);
				group.rotation.z = 270 * Math.PI / 180;
			  threeLayer.threemap.add(group);
			});
			threeLayer.threemap //理想中心2栋
			.loadModel({
			  url: `${this.domainUrl}/static/3dl_cs/lxzx.obj`,
			  type: 'obj',
			  units: 'meters',
			  mtl: `${this.domainUrl}/static/3dl_cs/lxzx.mtl`,
			  properties:{
			      id:"2345",
			      name:"树",
			      buildingId:"8149"
			  },
			  scale:1
			})
			.then(group => {
			  console.log("building",group);
			  group.setCoords([104.06016700206,30.5980489899401]);
				group.rotation.z = 180 * Math.PI / 180;
			  threeLayer.threemap.add(group);
			});
			threeLayer.threemap //理想中心3栋
			.loadModel({
			  url: `${this.domainUrl}/static/3dl_cs/lxzx.obj`,
			  type: 'obj',
			  units: 'meters',
			  mtl: `${this.domainUrl}/static/3dl_cs/lxzx.mtl`,
			  properties:{
			      id:"2345",
			      name:"树",
			      buildingId:"8150"
			  },
			  scale:1
			})
			.then(group => {
			  console.log("building",group);
			  group.setCoords([104.060911014572,30.5979985455168]);
				group.rotation.z = 90 * Math.PI / 180;
			  threeLayer.threemap.add(group);
			});
      threeLayer.threemap
      .loadModel({
        url: `${this.domainUrl}/static/3dl_cs/lou2.obj`,
        type: 'obj',
        units: 'meters',
        mtl: `${this.domainUrl}/static/3dl_cs/lou2.mtl`,
        properties:{
            id:"2345",
            name:"树",
            buildingId:"256300"
        },
        scale:1
      })
      .then(group => {
        // model=group
        //group.addSprite("教学楼1栋")
        console.log("building123",group);
        group.setCoords([104.05997525589669, 30.596176830376905]);
        threeLayer.threemap.add(group);  
        // setTimeout(() => {
        //     let model1=model.duplicate()
        //     model1.setCoords([ 104.05888701417172, 30.592952287792542])
        //     threeLayer.threemap.add(model1);
        // }, 1000);
               
      });
			threeLayer.threemap  //行政楼
			.loadModel({
			  url: `${this.domainUrl}/static/3dl_cs/xzl.obj`,
			  type: 'obj',
			  units: 'meters',
			  mtl: `${this.domainUrl}/static/3dl_cs/xzl.mtl`,
			  properties:{
			      id:"2345",
			      name:"树",
			      buildingId:"13151"
			  },
			  scale:1
			})
			.then(group => {
			  console.log("building222",group);
			  group.setCoords([104.058717899916,30.5979507224382]);
			  threeLayer.threemap.add(group);  
			});
			threeLayer.threemap  //博物馆
			.loadModel({
			  url: `${this.domainUrl}/static/3dl_cs/bwg.obj`,
			  type: 'obj',
			  units: 'meters',
			  mtl: `${this.domainUrl}/static/3dl_cs/bwg.mtl`,
			  properties:{
			      id:"2345",
			      name:"树",
			      buildingId:"12365"
			  },
			  scale:1
			})
			.then(group => {
			  console.log("building222",group);
			  group.setCoords([104.062421047911,30.596558067554]);
			  threeLayer.threemap.add(group);  
			});
			
			threeLayer.threemap  //1号教学楼
			.loadModel({
			  url: `${this.domainUrl}/static/3dl_cs/1hjxl.obj`,
			  type: 'obj',
			  units: 'meters',
			  mtl: `${this.domainUrl}/static/3dl_cs/1hjxl.mtl`,
			  properties:{
			      id:"2345",
			      name:"树",
			      buildingId:"21805"
			  },
			  scale:1
			})
			.then(group => {
			  group.setCoords([104.05914462694,30.5942922024909]);
			  threeLayer.threemap.add(group);  
			});
    },
		loadWater(){
			//给info赋值给定义好的变量
			let waterpng =require("../assets/img/waternormals.jpg")
			const pageData=WATER_JSON.data.content;
			let waterdata = pageData.map(element => {
				return {
			    id: element.id,
			    coordinates: JSON.parse(element.geom)[0],
			  }
			})
			let water_3D=threeLayer.threemap.objects.water(waterdata,waterpng,0xffffff)
			threeLayer.threemap.add(water_3D)
		},
    // 加载3D建筑
    loadBuildFn() {
      let that = this
			const buildingpng=require("../assets/img/building.png")
      this.vMap.flyTo({
        bearing:40,
        center:[ 104.05619359161085, 30.594327139005628],
        zoom:16.1,
        easing: (t) => {
          console.log(that.buildingdata,'5555555555555555555555', t)
          if (t==1) {
            //加载建筑
            console.log("1111111111111111111111111111");
						let ids = [8165,12365,8149,8150,8151]
						let buildingdata = that.buildingdata.filter(item => !ids.includes(item.id))
            let building_3D=threeLayer.threemap.objects.building(buildingdata,buildingpng)
            threeLayer.threemap.add(building_3D)
            //建筑标签
            let textArr = ['音乐舞蹈大楼','紫荆餐厅','图书馆','行政大楼','1号教学楼','2号教学楼','灵奇图书馆','机电信息实验大楼','体育馆','主体育场','中原农耕文化博物馆','理想中心4栋','科技实验大楼']
            that.buildingdata.forEach(e=>{
              if (e.center && textArr.includes(e.text)) {
								let img = require("../assets/img/light.png")
								// let div = `<div>
								// 		<div class="buildingtext">${e.text}</div>
								// 		<img src=${img} >
								// 		</div>`
                let div=document.createElement("div")
                div.className="buildingtext"
                div.innerHTML=				`<div class="buildingTitle">${e.text}</div>
																			<img src=${img} >`
								// div.innerHTML=`<img src=${img} >`
                let label=threeLayer.threemap.objects.add2DLabel(div,[...e.center,e.height+0.5])
                threeLayer.threemap.add(label)
              }
            })

            //立体标签，注释掉了，没有加入场景中
            setTimeout(() => {
              that.vMap.flyTo({
                center:[104.0578925643049, 30.596282208297538],
                zoom:16.8,
                bearing: 30
              })
              let divtets=document.createElement("div")
              divtets.className="LABEL2D"
              let divinner=document.createElement("div")
              divinner.className="labeldiv"
              //divinner.classList.add('animate__animated', 'animate__bounceInLeft');
              divtets.appendChild(divinner)
              let canvasdiv=document.createElement("div")
              canvasdiv.className="canvasdiv"
              //divtets.appendChild(canvasdiv)
              
              divinner.innerHTML=`<font class="text" style="color:rgb(0,250,250);family:fantasy;size:30" >用水:`+String(100)+`m</br>`+`用电:`+String(300)+`kw</font>`
              var canvas = document.createElement('canvas');
              canvas.width = "1000";
              canvas.height ="1000";
              // canvas.style.width="100px"
              // canvas.style.height="100px"
              canvas.style.position="absolute"
              canvas.style.bottom="0px"
              var context = canvas.getContext('2d');
              //context.scale(4, 4);
              context.beginPath();
              context.lineWidth=10
              context.strokeStyle = "rgb(0,250,250)";
              context.fillStyle = "rgb(0,250,250)"
              //实验证明第一次lineTo的时候和moveTo功能一样
              context.lineTo(0.5, 999.5);
              //之后的lineTo会以上次lineTo的节点为开始
              context.lineTo(200.5, 0.5);
              context.lineTo(999.5, 0.5);
              
              context.stroke();
              console.log(    "context.backingStorePixelRatio",context.backingStorePixelRatio);
              divtets.appendChild(canvas)
              let label=threeLayer.threemap.objects.add3DLabel(divtets,[104.0572094396718, 30.595124736109923,4],[Math.PI/2,Math.PI,0])
              label.scale.set(0.0015,0.0015,1)
              //let canvaslabel=threeLayer.threemap.objects.add3DLabel(canvasdiv,[104.0572094396718, 30.595124736109923,2],[Math.PI/2,Math.PI,0])
              //canvaslabel.scale.set(0.0029,0.0029,1)
              //let point=label.position
              // console.log("point",point);
              //label.position.set(point.x,point.y,4) 
              //console.log("label",label)
              //threeLayer.threemap.add(label)
              //threeLayer.threemap.add(canvaslabel)
              let divtets1=document.createElement("div")
              divtets1.className="LABEL2D"
              let divinner1=document.createElement("div")
              divinner1.className="labeldiv"
              divtets1.appendChild(divinner1)
              divinner1.innerHTML=`<font class="text" style="color:rgb(0,250,250);family:fantasy;size:30" >摄像头:`+String(100)+`个</br>`+`空调:`+String(300)+`个</font>`
              var canvas1 = document.createElement('canvas');
              canvas1.width = "1000";
              canvas1.height ="1000";
              // canvas.style.width="100px"
              // canvas.style.height="100px"
              canvas1.style.position="absolute"
              canvas1.style.bottom="0px"
              var context1 = canvas1.getContext('2d');
              //context.scale(4, 4);
              context1.beginPath();
              context1.lineWidth=10
              context1.strokeStyle = "rgb(0,250,250)";
              context1.fillStyle = "rgb(0,250,250)"
              //实验证明第一次lineTo的时候和moveTo功能一样
              context1.lineTo(0.5, 999.5);
              //之后的lineTo会以上次lineTo的节点为开始
              context1.lineTo(200.5, 0.5);
              context1.lineTo(999.5, 0.5);
              
              context1.stroke();

              divtets1.appendChild(canvas1)

              let label2=threeLayer.threemap.objects.add3DLabel(divtets1,[ 104.05745924744474, 30.595047272850607,2],[Math.PI/2,Math.PI,0])
              label2.scale.set(0.0015,0.0015,1)
              //threeLayer.threemap.add(label2)
              this.loadAniCenterBuilding()
            }, 5000);
          }
      
          return t

        }
      })
    },
    // 加载3D OJB模型
    loadOjbFn() {
      threeLayer.threemap.loadModel({
				url: `${this.domainUrl}/static/max/xqchp.obj`,
				type: 'obj',
				units: 'meters',
        mtl: `${this.domainUrl}/static/max/xqchp.obj`,
        scale:0.01,
        properties:{
            id:"1234",
            name:"树"
        },
				glow:false
			}).then(group => {
        // console.log("group",group);
        let carlist = []
        let carmodel = group
        //model.addSprite("教学楼1栋")
				carmodel.setCoords(this.lineData[0][0][0]);
        carlist.push(carmodel)
        for (let m = 0; m < this.lineData.length-1; m++) {
            carlist.push(carmodel.duplicate())
        }
        // group.addLabel("101","树",true)
				// group.setCoords([104.05990195913569, 30.594737262126316]);
        // group.fog=false
        //console.log(group);
        // let model1=group.duplicate()
        // console.log("aware",group,model1);
        // model1.setCoords([ 104.06057060523614, 30.59520054490551])
        
        //group.drawBoundingBox()
				let change=false
        let mapease=false
        let animatecar = () => {
        // console.log("group",group, carlist);
          // 计算滑动到那个点
          for (let n = 0; n < carlist.length; n++) {
            let pointcar=threeLayer.threemap.projectToWorld(this.lineData[n][counter][0]);
            //console.log(pointcar);
            carlist[n].position.set(pointcar.x,pointcar.y,0)
            carlist[n].rotation.set(0,0,-this.lineData[n][counter][1]*Math.PI/180-Math.PI/2)
              
          }

          //console.log(pointcar,route,steps);
          //这里随便取的是最小的路线数据集合长度，实际应该是每条路线的长度不一样，动画的时间不一样
          if (counter<=600&&!change) {
            // this.vMap.flyTo({
            //     center:this.lineData[0][counter][0],
            //     bearing:this.lineData[0][counter][1],
            //     zoom:17.5
            // })
          }else{
            if (!change&&!mapease) {
              // this.vMap.flyTo({
              //   center:this.vMap.getCenter(),
              //   zoom:15
              // })
              mapease=true
            }
          }
              
          if (counter <852 ) {
            requestAnimationFrame(animatecar);
          }else{
            change=true
            counter=0
            requestAnimationFrame(animatecar);
          }

          counter = counter + 1;
        }
        // 开始动画
        setTimeout(() => {
            carlist.forEach(e=>{
              threeLayer.threemap.add(e);
            })
            animatecar();
        }, 6000);
        //threeLayer.threemap.add(model1);
                
      });
    },
    // 加载外围路线
    load3DLine() {
      let that = this
      this.vMap.flyTo({
        center:[104.05482544141955, 30.59284920246894],
        zoom:15,
        // bearing:0,
        // pitch:60,
        easing: (t) => {
          if (t==1) {
            setTimeout(() => {
              //外围路线
              let line2= threeLayer.threemap.objects.line(
                that.routeoutcircle,
								12,
                require("../assets/img/3DLine.png")
              )
              threeLayer.threemap.add(line2)

              //let count=0
              // animate=()=>{
              //     buildingout.scale.set(1,1,count)
              //     count=count+0.1
              //     let id=requestAnimationFrame(animate())
              //     if (count>=1.1) {
              //         cancelAnimationFrame(id)
              //     }
              // } 
              // animate()  
              setTimeout(() => {
                //外围建筑
                let buildingout=threeLayer.threemap.objects.buildingoutside(that.buildingoutcircle,[104.05768654235203, 30.59122228071986])
        
                threeLayer.threemap.add(buildingout)

                // this.floor2 = threeLayer.threemap.objects.circlewithwireframe([104.05768654235203, 30.59122228071986,0],0x00ffff,[100,100])

                // threeLayer.threemap.add(this.floor2)
                setTimeout(() => {
                  this.loadAniCircle()
                }, 2500)
              }, 2000);
                          
            }, 500);
              
          }
          return t
        }
      })
    },
    loadAniCircle(){
      // 旋转动画
      this.vMap.flyTo({
        center: map2D.mapCenter,
        pitch: map2D.mapPitch,
        bearing: map2D.mapBearing,
        zoom: map2D.mapZoom,
        easing: (t) => {
          if(t == 1){
            this.circleInterval = setInterval(() => {
              if(this.circleIndex >= 360){ // 旋转度数
                clearInterval(this.circleInterval)
                this.circleInterval = null
                // this.loadAniLine()
                this.loadBuildFn()
                return
              }
              this.vMap.setBearing(this.circleIndex)
              this.circleIndex += .7
            }, 1000/60)
          }
          return t
        }
      })
    },
    loadAniCenterBuilding(){
      this.vMap.flyTo({
        center: [104.05999036597285, 30.596105715016634],
        zoom: 17.5,
        duration: 2800,
        bearing: 0,
				pitch: 60,
        easing: (t) => {
          if(t == 1){
            this.SET_LINE_LOAD(true)
          }
          return t
        }
      })
    }
  },
  beforeDestroy(){
    this.SET_CURRENTSYS('')
    this.SET_LINE_LOAD(false)
    if(this.circleInterval){
      clearInterval(this.circleInterval)
      this.circleInterval = null
    }
  }

};
</script>

<style lang="less" scope>
.vmap-content-container {
  width: 100%;
  height:100%;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  flex: 1;
  background-size: cover;
  background-position: center;

  #map-box {
    width: 100%;
    height: 100%;
  }
  .start-select {
    canvas {
      cursor: crosshair;
    }
  }


  //地图样式
  .divcss5{
      // font-family: 'Times New Roman', Times, serif;
  }
  #rotate{
      position:absolute;
      top:15px;
      left: 20px;
      display: none;

      
  }
  #delete{
      position:absolute;
      top: 15px;
      left: 120px;
      display: none;
  }
  #spritetext{
      position: absolute;
      top: -500px;
      left:-600px;
      color:#e6eff0;
      font-family: auto;
      font-weight:300;
      text-shadow: 0 0 50px rgb(123, 225, 238);
      font-size: 50px;
      padding: 2px 10px 2px 10px;
      background-color:rgba(127,255,255,0.5); 
      border-radius: 5px 5px 5px 5px;
      box-shadow: 0 0 50px darkturquoise;
  }
  .EM{
      width:200px;
      height: 400px;
      border-radius: 5px 5px 5px 5px;
      /* border:0.5px solid gray; */
      box-shadow: 0 0 10px rgb(102, 241, 230);
  }
  .TE{
      width: 90%;
      height: 10%;
      background-color:rgb(207 229 232 / 60%) ;
      border-radius: 5px 5px 5px 5px;
      position: relative;
      left: 5%;
      top:1.25%
  }
  @keyframes myfirst
  {
      0%   { left:-1000px;}
      25%  { left:-500px;}
      50%  { left:50px;}
      75%  { left:100px;}
      100% { left:200px;}
  }
  
  @-webkit-keyframes myfirst /* Safari 与 Chrome */
  {
      0%   { left:100px; top:0px;}
      25%  { left:80px; top:0px;}
      50%  { left:60px; top:0px;}
      75%  { left:40px; top:0px;}
      100% { left:0px; top:0px;}
  }
  .labeldiv{
      
      position: absolute;
      bottom: 1100px;
      left: 200px;
      background-color: rgba(0,0,0,0.8);
      border: solid 10px rgb(0,250,250);
      border-radius: 20px;
      box-shadow: 0px 0px 100px rgb(0,250,250);
      height: 510px;
      width: 800px;
      font-size: 100px;
      text-shadow: 0 0 50px rgb(19 228 34);
      animation: fadeInUp; /* referring directly to the animation's @keyframe declaration */
      animation-duration: 1s; /* don't forget to set a duration! */

  }
  .LABEL2D{
      width: 1000px;
      height: 2000px;
  }
  .canvasdiv{
      /* position:absolute;
      bottom: 0px; */
      width: 1000px;
      height: 1000px;
  }
  .text{
      position: absolute;
      margin-left: 50px;
      margin-top: 50px;
      line-height: 2;
  }
  .buildingtext{
      font-size: 18px;
      color: white;
      //text-shadow: 0px 0px 12px white, 2px 2px 15px white,-2px -2px 12px white;
      // font-family: 'Times New Roman', Times, serif;
      
  }
	.buildingTitle{
		font-size: 18px;
		color: white;
	}
}
#map-floor{
  position: fixed;
  right: 420px;
  bottom: 200px;
  transition: all 1s;
  .creeper-level-list{
    background-color: rgb(12,30,53);
    border: 1px solid rgb(11,74,94);
  }
  .creeper-level-item{
    color: rgb(98,162,235);
  }
  .creeper-current-level{
    background-color: rgb(4,206,220);
    color: #fff;
  }
}
</style>



