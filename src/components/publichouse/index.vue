<template>
  <div class="publichouse" style="height: 100%;">
    <sideTran thisCrrentSys="publichouse">
      <div slot="left" style="height: 100%;">
        <sideItem title="学校概况" delay="100" height="20%">
          <div class="schoolState" slot="body">
            <currency
              v-for="(item, i) in staList"
              :key="i"
              :boxnum="item.count"
              :boxtitle="item.type"
              :boxcolor="item.color"
              :boxuntil="item.unit"
            ></currency>
          </div>
        </sideItem>
        <sideItem title="公房使用方向统计" delay="300" height="26%">
          <div class="useStati" slot="body">
            <div class="chart-useStati" id="useStatiChart"></div>
            <div class="detailBox">
              <div class="row" v-for="(item, i) in useStatiList" :key="i">
                <div class="title">
                  <i :style="`border-color:${item.color};`"></i>
                  <span :style="`color:${item.color};`">{{ item.name }}</span>
                </div>
                <div class="value">
                  <animated-number
                    :value="item.val"
                    :formatValue="(val) => val.toFixed(2)"
                    :duration="4000"
                  />
                  <i :style="{ marginLeft: '3px' }">(间)</i>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="管理部门统计" delay="200" height="54%">
          <div class="houseStati" slot="body">
            <div class="row title">
              <span>管理部门名称</span>
              <!-- <span>楼栋数</span> -->
              <span>房间数</span>
              <span>建筑面积</span>
              <span>使用面积</span>
            </div>
            <div class="row bg" v-for="(item, i) in houseStaList" :key="i">
              <el-tooltip
                effect="dark"
                :content="item.campus"
                placement="bottom"
              >
                <span>{{ item.campus }}</span>
              </el-tooltip>
              <span>{{ item.room }}</span>
              <span>{{ item.area }}</span>
              <span>{{ item.useArea }}</span>
            </div>
            <!-- <div class="row bg total">
              <span>合计</span>
              <span>{{
                houseStaList.reduce((sum, item) => sum + item.build, 0)
              }}</span>
              <span>{{
                houseStaList.reduce((sum, item) => sum + item.room, 0)
              }}</span>
              <span>{{
                houseStaList.reduce((sum, item) => sum + item.area, 0)
              }}</span>
              <span>{{
                houseStaList.reduce((sum, item) => sum + item.useArea, 0)
              }}</span>
            </div> -->
          </div>
        </sideItem>

        <!-- <sideItem title="学校公房总数统计" delay="400" height="22.76%">
          <div class="totalStati" slot="body">
            <div class="chart-total" id="totalChart"></div>
          </div>
        </sideItem> -->
      </div>
      <div slot="right" style="height: 100%;">
        <!-- <sideItem
          title="空置房源统计"
          transitionType="right"
          delay="100"
          height="23.91%"
        >
          <div class="freeStati" slot="body">
            <div class="imgBox">
              <img class="img1" src="../../assets/img/free-img1.png" alt />
              <img class="img2" src="../../assets/img/free-img2.png" alt />
              <img class="img3" src="../../assets/img/free-img3.png" alt />
            </div>
            <div class="detailBox">
              <div class="row" v-for="(item, i) in freeList" :key="i">
                <div class="title">
                  <i :style="`border-color:${item.color};`"></i>
                  <span :style="`color:${item.color};`">{{ item.name }}</span>
                </div>
                <div class="value">
                  <animated-number
                    :value="item.val"
                    :formatValue="(val) => val.toFixed()"
                    :duration="4000"
                  />
                  <i>%</i>
                </div>
              </div>
            </div>
          </div>
        </sideItem> -->
        <sideItem
          title="学校楼栋情况"
          transitionType="right"
          delay="200"
          height="30%"
        >
          <div slot="body" class="landState">
            <div class="chart-land" id="landChart"></div>
          </div>
        </sideItem>
        <sideItem title="部门使用前十排行" :delay="200" height="40%">
          <div slot="body" class="chart-wrap">
            <div id="totalAssets"></div>
          </div>
        </sideItem>
        <sideItem
          title="公房使用单位统计"
          transitionType="right"
          delay="300"
          height="30%"
        >
          <div slot="body" class="usepublicunitbox">
            <div class="usebox">
              <img
                src="../../assets/pieimg/publichouseout.png"
                class="useboxoutpie"
              />
              <img
                src="../../assets/pieimg/publichouseinner.png"
                class="gear"
              />
              <div id="usepublic"></div>
            </div>
          </div>
        </sideItem>
      </div>
    </sideTran>
  </div>
</template>

<script>
import sideTran from "../sideTran";
import nowpeopleslide from "../nowpeopleslide.vue";
import sideItem from "../sideItem.vue";
import currency from "../currency.vue"; //通用box组件
import AnimatedNumber from "animated-number-vue";
import { mapGetters } from "vuex";
import * as echarts from "echarts";
import "echarts-gl";
import { Tooltip } from "element-ui";

import mdata from "../../mock/alldata.json";

let allTotalAssetschartDom, allTotalAssetsChart;
export default {
  components: {
    sideTran,
    sideItem,
    currency,
    AnimatedNumber,
  },
  data() {
    return {
      staList: [],
      houseStaList: [],
      freeList: [],
      useStatiList: [],
      buildList: [], //大楼信息
      markers: null, //大楼标签
      roomList: [], //室内信息
      roomMarkers: null, //室内标签
    };
  },
  computed: {
    ...mapGetters(["currentSys", "map", "isInDoor", "currentFloor"]),
    flagLayer() {
      return `${this.isInDoor}${this.currentFloor}`;
    },
  },
  watch: {
    flagLayer() {
      if (this.currentSys !== "publichouse") return;
      if (this.isInDoor) {
        this.createRoomLayer(
          this.roomList.filter((item) => item.floor == this.currentFloor)
        );
      } else {
        this.createRoomLayer();
      }
    },
  },
  mounted() {
    this.init();
    // setTimeout(() => {
    //   window.addEventListener("resize", () => {
    //     allTotalAssetsChart.resize();
    //   });
    // });
  },
  beforeDestroy() {
    this.destroySys();
  },
  methods: {
    init() {
      this.map.flyTo({
        center: [116.674824090496, 40.4065246736501],
        bearing: 0,
        pitch: 45,
        zoom: 17.5,
        duration: 1000,
        easing(t) {
          return t;
        },
      });
      this.toggleBuilds(0);
      this.initMarkerLayer();
      this.$nextTick(() => {
        setTimeout(() => {
          this.renderpie();
          this.getSchoolState();
          this.getHouseStati();
          this.getUseStati();
          //   this.getTotalStati();
          this.getFreeStati();
          this.getPubPaiHang();
          this.getLandState();
          //   this.getLandState();
        }, 500);
      });
    },
    //初始化marker和layer
    initMarkerLayer() {
      this.buildList = [
        {
          count: 32,
          unit: 24,
          area: 321,
          loca: ["116.67344628015638", "40.40746491006294"],
        },
        {
          count: 28,
          unit: 26,
          area: 281,
          loca: ["116.67399602291641", "40.40640950868166"],
        },
        {
          count: 32,
          unit: 26,
          area: 368,
          loca: ["116.67439046818055", "40.40725696582612"],
        },
      ];
      this.createBuildMarker(this.buildList);
      this.roomList = [
        {
          id: 1,
          buildingId: "17746",
          name: "B112多媒体教室",
          area: 76.59,
          part: "后基处",
          color: "#FF9700",
          floor: 0,
          center: ["104.06033145841116", "30.591803834370793"],
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [104.06030589667, 30.59173094939],
                [104.06030379654, 30.5918125773],
                [104.06034770009, 30.5918134148],
                [104.06034979954, 30.59173178626],
                [104.06030589667, 30.59173094939],
              ],
            ],
          },
          areaDetail: { build: 110.5, use: 106.8, self: 106.8, rent: 0 },
        },
      ];
      this.createRoomMarker(this.roomList);
      this.createRoomLayer();
    },
    //创建大楼marker
    createBuildMarker(list = []) {
      let obj = {
        doms: [],
        geoJson: { type: "FeatureCollection", features: [] },
      };
      list.forEach((item) => {
        let div = document.createElement("div");
        div.className = "build-marker";
        div.innerHTML = `<p>公房数量：${item.count}间</p><p>公房单位：${item.unit}个</p><p>公房面积：${item.area}㎡</p>`;
        obj.doms.push({ dom: div });
        obj.geoJson.features.push({
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [...item.loca],
          },
        });
      });
      this.markers = new creeper.MarkerIndoor(this.map);
      this.markers.addMarker(obj.geoJson, obj.doms, true);
      // console.log(this.markers)
    },
    //创建室内marker
    createRoomMarker(list = []) {
      let obj = {
        doms: [],
        geoJson: { type: "FeatureCollection", features: [] },
      };
      list.forEach((item) => {
        let div = document.createElement("div");
        div.className = "build-marker none";
        div.innerHTML = `<p>建筑面积：${item.areaDetail.build}㎡</p><p>使用面积：${item.areaDetail.use}㎡</p><p>自用面积：${item.areaDetail.self}㎡</p><p>租用面积：${item.areaDetail.rent}㎡</p>`;
        obj.doms.push({ dom: div });
        obj.geoJson.features.push({
          type: "Feature",
          properties: { ...item },
          geometry: {
            type: "Point",
            coordinates: [...item.center],
          },
        });
      });
      this.roomMarkers = new creeper.MarkerIndoor(this.map);
      this.roomMarkers.addMarker(obj.geoJson, obj.doms, true);
      // console.log(this.roomMarkers)
    },
    //创建室内layer
    createRoomLayer(list = []) {
      let geoJson = { type: "FeatureCollection", features: [] };
      if (!this.map.getSource("pubRoomData")) {
        this.map.addSource("pubRoomData", {
          type: "geojson",
          data: geoJson,
        });
      }
      // 文字图层
      if (!this.map.getLayer("pubRoomText")) {
        this.map.addLayer({
          id: "pubRoomText",
          source: "pubRoomData", //上述定义的source
          type: "symbol", //图层类型，见3.5节中图层描述
          layout: {
            "text-field": ["format", ["get", "content"], { "font-scale": 0.8 }],
            "text-allow-overlap": true,
            "text-size": 14,
          },
          paint: {
            "text-color": "#fff",
          },
        });
        this.map.on("click", "pubRoomText", this.ShowRoomDetail);
      }
      // 背景图层
      if (!this.map.getLayer("pubRoomBg")) {
        this.map.addLayer(
          {
            id: "pubRoomBg",
            source: "pubRoomData", //上述定义的source
            type: "fill", //图层类型，见3.5节中图层描述
            paint: {
              "fill-color": ["get", "color"],
            },
          },
          "room23"
        );
      }

      geoJson.features = list.map((item) => {
        return {
          type: "fill",
          geometry: item.geometry,
          properties: {
            content: `${item.name}\n使用面积：${item.area}㎡\n使用部门：${item.part}`,
            ...item,
          },
        };
      });
      this.map.getSource("pubRoomData").setData(geoJson);
    },
    //显示室内详细信息
    ShowRoomDetail(e) {
      let data = this.map.queryRenderedFeatures(e.point)[0].properties;
      let marker = this.roomMarkers.allmarkerInfoList.find(
        (item) => item.properties.id == data.id
      );
      if (marker.markerDom.className.includes("none")) {
        marker.markerDom.classList.remove("none");
      } else {
        marker.markerDom.classList.add("none");
      }
    },
    //销毁模块
    destroySys() {
      if (this.markers) {
        this.markers.remove();
        this.markers = null;
      }
      if (this.roomMarkers) {
        this.roomMarkers.remove();
        this.roomMarkers = null;
      }
      this.createRoomLayer();
      this.toggleBuilds(1);
    },
    //学校概况
    getSchoolState() {
      this.staList = [
        { type: "总占地面积", count: 21382, color: "#00F3FE", unit: "㎡" },
        { type: "总楼栋数", count: 31, color: "#A075e8", unit: "栋" },
        { type: "总房间数", count: 750, color: "#bd84b5", unit: "间" },
        { type: "总房间面积", count: 112471, color: "#0cac58", unit: "㎡" },
      ];
    },
    //校区公房统计
    getHouseStati() {
      this.houseStaList = mdata.houseuse;
    },
    //公房使用方向统计
    getUseStati() {
      let dom = document.getElementById("useStatiChart");
      let chart = echarts.init(dom);
      this.useStatiList = [
        { name: "教学用房", val: 609, color: "rgba(106, 176, 255,.9)" },
        { name: "办公用房", val: 635, color: "rgba(19, 181, 177,.9)" },
        { name: "科研用房", val: 479, color: "rgba(229, 188, 128,.9)" },
        { name: "其他", val: 27, color: "rgba(147, 107, 150, .9)" },
      ];
      let sum = this.useStatiList.reduce((t, item) => t + item.val, 0); //数据总数
      // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
      function getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        height
      ) {
        height = (height / sum) * 5; //换算高度
        // 计算
        let midRatio = (startRatio + endRatio) / 2;

        let startRadian = startRatio * Math.PI * 2;
        let endRadian = endRatio * Math.PI * 2;
        let midRadian = midRatio * Math.PI * 2;

        // 如果只有一个扇形，则不实现选中效果。
        if (startRatio === 0 && endRatio === 1) {
          isSelected = false;
        }

        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== "undefined" ? k : 1 / 3;

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
        let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        let hoverRate = isHovered ? 1.05 : 1;

        // 返回曲面参数方程
        return {
          u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32,
          },

          v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
          },

          x: function(u, v) {
            if (u < startRadian) {
              return (
                offsetX +
                Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            if (u > endRadian) {
              return (
                offsetX +
                Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
          },

          y: function(u, v) {
            if (u < startRadian) {
              return (
                offsetY +
                Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            if (u > endRadian) {
              return (
                offsetY +
                Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
          },

          z: function(u, v) {
            if (u < -Math.PI * 0.5) {
              return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
              return Math.sin(u);
            }
            return Math.sin(v) > 0 ? 1 * height : -1;
          },
        };
      }

      // 生成模拟 3D 饼图的配置项
      function getPie3D(pieData, internalDiameterRatio) {
        let series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        let legendData = [];
        let k =
          typeof internalDiameterRatio !== "undefined"
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3;

        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i++) {
          sumValue += pieData[i].value;

          let seriesItem = {
            name:
              typeof pieData[i].name === "undefined"
                ? `series${i}`
                : pieData[i].name,
            type: "surface",
            parametric: true,
            wireframe: {
              show: false,
            },
            pieData: pieData[i],
            pieStatus: {
              selected: false,
              hovered: false,
              k: k,
            },
          };

          if (typeof pieData[i].itemStyle != "undefined") {
            let itemStyle = {};

            typeof pieData[i].itemStyle.color != "undefined"
              ? (itemStyle.color = pieData[i].itemStyle.color)
              : null;
            typeof pieData[i].itemStyle.opacity != "undefined"
              ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
              : null;

            seriesItem.itemStyle = itemStyle;
          }
          series.push(seriesItem);
        }
        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
          endValue = startValue + series[i].pieData.value;
          series[i].pieData.startRatio = startValue / sumValue;
          series[i].pieData.endRatio = endValue / sumValue;
          series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            series[i].pieData.value
          );

          startValue = endValue;

          legendData.push(series[i].name);
        }

        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        let option = {
          tooltip: {
            show: false,
            formatter: (params) => {
              if (params.seriesName !== "mouseoutSeries") {
                return `<span style="display:inline-block;margin-right:5px;border-radius:8px;width:8px;height:8px;background-color:${
                  params.color
                };"></span>${params.seriesName}<br/>${
                  option.series[params.seriesIndex].pieData.value
                }㎡`;
              }
            },
            backgroundColor: "rgba(44,62,80,0.8)",
            borderColor: "rgba(153, 209, 246, 0.6)",
            padding: [4, 4, 4, 4],
            textStyle: {
              align: "left",
              fontSize: 12,
              color: "rgba(255,255,255,0.8)",
            },
          },
          legend: {
            show: false,
            data: legendData,
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
          },
          xAxis3D: {
            min: -1,
            max: 1,
          },
          yAxis3D: {
            min: -1,
            max: 1,
          },
          zAxis3D: {
            min: -1,
            max: 1,
          },
          grid3D: {
            show: false,
            boxHeight: 30,
            //top: '30%',
            // bottom: "50%",
            // environment: '#021041',
            viewControl: {
              distance: 240,
              alpha: 25,
              beta: 350,
            },
          },
          series: series,
        };
        return option;
      }

      // 传入数据生成 option
      let option = getPie3D(
        this.useStatiList.map((item) => {
          return {
            name: item.name,
            value: item.val,
            itemStyle: {
              opacity: 0.5,
              color: item.color,
            },
          };
        }),
        1.5
      );
      // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
      function bindListen(myChart) {
        let selectedIndex = "";
        let hoveredIndex = "";
        // 监听点击事件，实现选中效果（单选）
        myChart.on("click", function(params) {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
          let isSelected = !option.series[params.seriesIndex].pieStatus
            .selected;
          let isHovered = option.series[params.seriesIndex].pieStatus.hovered;
          let k = option.series[params.seriesIndex].pieStatus.k;
          let startRatio = option.series[params.seriesIndex].pieData.startRatio;
          let endRatio = option.series[params.seriesIndex].pieData.endRatio;
          // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
          if (selectedIndex !== "" && selectedIndex !== params.seriesIndex) {
            option.series[
              selectedIndex
            ].parametricEquation = getParametricEquation(
              option.series[selectedIndex].pieData.startRatio,
              option.series[selectedIndex].pieData.endRatio,
              false,
              false,
              k,
              option.series[selectedIndex].pieData.value
            );
            option.series[selectedIndex].pieStatus.selected = false;
          }
          // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
          option.series[
            params.seriesIndex
          ].parametricEquation = getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            option.series[params.seriesIndex].pieData.value
          );
          option.series[params.seriesIndex].pieStatus.selected = isSelected;
          // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
          isSelected ? (selectedIndex = params.seriesIndex) : null;
          // 使用更新后的 option，渲染图表
          myChart.setOption(option);
        });
        // 监听 mouseover，近似实现高亮（放大）效果
        myChart.on("mouseover", function(params) {
          // 准备重新渲染扇形所需的参数
          let isSelected;
          let isHovered;
          let startRatio;
          let endRatio;
          let k;
          // 如果触发 mouseover 的扇形当前已高亮，则不做操作
          if (hoveredIndex === params.seriesIndex) {
            return;
            // 否则进行高亮及必要的取消高亮操作
          } else {
            // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
            if (hoveredIndex !== "") {
              // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
              isSelected = option.series[hoveredIndex].pieStatus.selected;
              isHovered = false;
              startRatio = option.series[hoveredIndex].pieData.startRatio;
              endRatio = option.series[hoveredIndex].pieData.endRatio;
              k = option.series[hoveredIndex].pieStatus.k;
              // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
              option.series[
                hoveredIndex
              ].parametricEquation = getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                option.series[hoveredIndex].pieData.value
              );
              option.series[hoveredIndex].pieStatus.hovered = isHovered;
              // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
              hoveredIndex = "";
            }
            // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
            if (
              params.seriesName !== "mouseoutSeries" &&
              params.seriesName !== "pie2d"
            ) {
              // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
              isSelected = option.series[params.seriesIndex].pieStatus.selected;
              isHovered = true;
              startRatio = option.series[params.seriesIndex].pieData.startRatio;
              endRatio = option.series[params.seriesIndex].pieData.endRatio;
              k = option.series[params.seriesIndex].pieStatus.k;
              // 对当前点击的扇形，执行高亮操作（对 option 更新）
              option.series[
                params.seriesIndex
              ].parametricEquation = getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                option.series[params.seriesIndex].pieData.value + 1
              );
              option.series[params.seriesIndex].pieStatus.hovered = isHovered;
              // 记录上次高亮的扇形对应的系列号 seriesIndex
              hoveredIndex = params.seriesIndex;
            }
            // 使用更新后的 option，渲染图表
            myChart.setOption(option);
          }
        });
        // 修正取消高亮失败的 bug
        myChart.on("globalout", function() {
          // 准备重新渲染扇形所需的参数
          let isSelected;
          let isHovered;
          let startRatio;
          let endRatio;
          let k;
          if (hoveredIndex !== "") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected = option.series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            k = option.series[hoveredIndex].pieStatus.k;
            startRatio = option.series[hoveredIndex].pieData.startRatio;
            endRatio = option.series[hoveredIndex].pieData.endRatio;
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            option.series[
              hoveredIndex
            ].parametricEquation = getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              option.series[hoveredIndex].pieData.value
            );
            option.series[hoveredIndex].pieStatus.hovered = isHovered;
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = "";
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(option);
        });
      }
      chart.clear(); //清除动画
      chart.setOption(option, true);
      bindListen(chart);
    },
    //学校公房总数统计
    getTotalStati() {
      let dom = document.getElementById("totalChart");
      let chart = echarts.init(dom);
      let parma = {
        names: ["总量", "超出"],
        lineX: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
        value: [
          [351, 452, 183, 284, 135, 236, 287, 188, 359, 151, 231, 132],
          [260, 345, 80, 192, 30, 110, 192, 80, 250, 53, 152, 28],
        ],
      };
      let color = ["rgb(106, 176, 255)", "rgb(242, 137, 107)"];
      let lineY = [];
      for (let i = 0; i < parma.names.length; i++) {
        let data = {
          name: parma.names[i],
          type: "line",
          animationDuration: 2000,
          color: color[i],
          smooth: false,
          symbol: "circle",
          symbolSize: 5,
          data: parma.value[i],
        };
        lineY.push(data);
      }
      let option = {
        tooltip: {
          confine: true, //提示框限制在图表内
          trigger: "axis",
          backgroundColor: "rgba(44,62,80,0.8)",
          borderColor: "rgba(153, 209, 246, 0.6)",
          textStyle: {
            align: "left",
            fontSize: 12,
            color: "rgba(255,255,255,0.8)",
          },
        },
        legend: {
          top: "0px",
          data: parma.names,
          textStyle: {
            fontSize: 12,
            color: "F1F1F3",
          },
          right: "20px",
        },
        grid: {
          top: "30px",
          left: "0px",
          right: "5px",
          bottom: "0px",
          containLabel: true,
        },
        xAxis: {
          show: true,
          type: "category",
          boundaryGap: false,
          data: parma.lineX,
          axisLabel: {
            textStyle: {
              color: "rgba(246, 250, 255, 0.8)",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(106, 176, 255, 0.5)",
              width: 2,
            },
          },
        },
        yAxis: {
          show: true,
          splitArea: {
            show: true,
            areaStyle: {
              color: "transparent",
            },
          },
          type: "value",
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "rgba(246, 250, 255, 0.8)",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(106, 176, 255, 0.5)",
              type: "dotted",
              width: 2,
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(106, 176, 255, 0.5)",
              width: 2,
            },
          },
        },
        series: lineY,
      };
      chart.clear(); //清除动画
      chart.setOption(option, true);
      // setTimeout(() => {
      //   chart.clear();//清除动画
      //   chart.setOption(option, true);
      // }, 600)
    },
    //空置房源统计
    getFreeStati() {
      this.freeList = [
        { name: "北校区", val: 11, color: "#7892FF" },
        { name: "南校区", val: 22, color: "#5172FF" },
        { name: "东校区", val: 67, color: "#0C72F0" },
      ];
    },
    //土地情况
    getLandState() {
      //   console.log("土地使用情况图标");
      let dom = document.getElementById("landChart");
      let chart = echarts.init(dom);
      let parma = {
        names: ["建筑面积", "使用面积"],
        unit: "(m²)",
        lineX: ["行政办公楼", "实验室", "图书馆", "餐厅食堂"],
        value: [
          [20, 45, 80, 58],
          [52, 70, 60, 64],
        ],
        color: ["#6AB0FF", "#cd735e"],
      };
      let option = {
        animationDuration: 2000,
        tooltip: {
          confine: true, //提示框限制在图表内
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: "rgba(44,62,80,0.8)",
          borderColor: "rgba(153, 209, 246, 0.6)",
          textStyle: {
            align: "left",
            fontSize: 12,
            color: "rgba(255,255,255,0.8)",
          },
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "0",
          top: "15%",
          containLabel: true,
        },
        legend: {
          data: parma.names.map((item, i) => {
            return {
              name: item,
              textStyle: {
                color: parma.color[i],
                fontSize: 12,
              },
            };
          }),
          right: "0",
          itemWidth: 10,
          itemHeight: 5,
          //   orient: "vertical",
        },
        xAxis: {
          type: "category",
          data: parma.lineX,
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(106, 176, 255, 0.5)",
            },
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "rgba(246, 250, 255, 0.8)",
            },
          },
        },

        yAxis: {
          name: parma.unit,
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(106, 176, 255, 0.5)",
            },
          },
          axisLabel: {
            textStyle: {
              color: "rgba(246, 250, 255, 0.8)",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(106, 176, 255, 0.5)",
              type: "dotted",
            },
          },
        },
        series: parma.value.map((item, i) => {
          return {
            name: parma.names[i],
            type: "bar",
            barWidth: "12px",
            barGap: "100%", //数据之间的距离
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: 12,
                color: "#fff",
              },
            },
            itemStyle: {
              normal: {
                color: parma.color[i],
              },
            },
            data: item,
          };
        }),
      };
      chart.clear(); //清除动画
      chart.setOption(option, true);
    },
    // 部门使用前十排行
    getPubPaiHang() {
      let allTotalAssetschartDom = document.getElementById("totalAssets");
      let allTotalAssetsChart = echarts.init(allTotalAssetschartDom);
      //   console.log("排行", allTotalAssetschartDom);
      let totalAssetsOption = {
        tooltip: {
          // trigger: 'axis',
          backgroundColor: "rgba(44,62,80,0.8)",
          borderColor: "rgba(153, 209, 246, 0.6)",
          textStyle: {
            align: "left",
            fontSize: 12,
            color: "rgba(255,255,255,0.8)",
          },
        },
        grid: {
          top: "10px",
          left: "100px",
          right: "40px",
          bottom: "30px",
        },
        xAxis: {
          name: "(套)",
          type: "value",
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: "#F6FAFF",
            fontSize: 10,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#213a5f",
            },
          },
        },
        yAxis: {
          type: "category",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            fontSize: 10,
            formatter: function(value) {
              return value.length > 5 ? value.substring(0, 5) + "..." : value;
            },
            color: "#F6FAFF",
          },
          data: [
            "雁西湖校区管理办公室",
            "教务部",
            "化学科学学院",
            "地球与行星科学学院",
            "生命科学学院",
            "材料科学与观点技术学院",
            "外语系",
            "物理学科学院",
            "人文学院",
            "计算科学版与技术学院",
          ].reverse(),
        },
        series: [
          {
            type: "bar",
            barWidth: "5px",
            animationDuration: 2500,
            data: [501, 163, 121, 81, 80, 68, 61, 60, 57, 45].reverse(),
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  1,
                  0,
                  0,
                  0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                  [
                    { offset: 0, color: "#6AB0FF" },
                    // {offset: 0.5, color: '#5172FF'},
                    { offset: 1, color: "#5172FF" },
                  ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                ),
                barBorderRadius: [15, 15, 15, 15],
              },
            },
            encode: {
              // Map the "amount" column to X axis.
              x: "amount",
              // Map the "product" column to Y axis
              y: "product",
            },
            label: {
              show: true,
              precision: 1,
              position: "right",
              valueAnimation: true,
              fontFamily: "monospace",
              color: "#F6FAFF",
            },
          },
        ],
      };

      //   allTotalAssetsChart.setOption(totalAssetsOption);
      allTotalAssetsChart.clear(); //清除动画
      allTotalAssetsChart.setOption(totalAssetsOption, true);
    },
    //公房使用单位统计
    renderpie() {
      let usepublicChartDom, usepublicChartChart, option;
      usepublicChartDom = document.getElementById("usepublic");
      usepublicChartChart = echarts.init(usepublicChartDom);
      var seriesData = [
        {
          name: "土木工程学院",
          value: "40",
          label: {
            color: "#73DDFF",
          },
        },
        {
          name: "物理学院",
          value: "40",
          label: {
            color: "#73ACFF",
          },
        },
        {
          name: "数学学院",
          value: "53",
          label: {
            color: "#FDD56A",
          },
        },
        {
          name: "软件工程学院",
          value: "40",
          label: {
            color: "#FDB36A",
          },
        },
        {
          name: "继续教育学院",
          value: "60",
          label: {
            color: "#FD866A",
          },
        },
        {
          name: "文法学院",
          value: "10",
          label: {
            color: "#9E87FF",
          },
        },
        {
          name: "计算机科学学院",
          value: "40",
          label: {
            color: "#58D5FF",
          },
        },
        {
          name: "马克思主义学院",
          value: "40",
          label: {
            color: "#18DDA7",
          },
        },
        {
          name: "外国语学院",
          value: "40",
          label: {
            color: "#40CA53",
          },
        },
        {
          name: "化学化工学院",
          value: "40",
          label: {
            color: "#E782AF",
          },
        },
      ];
      let title = "总计";
      let formatNumber = function(num) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ",");
      };
      let total = seriesData.reduce((a, b) => {
        return a + b.value * 1;
      }, 0);
      var legendData = seriesData.map((item) => item.name);
      var colorList = seriesData.map((item) => item.label.color);
      usepublicChartChart.setOption({
        // title: {
        //     text: `总计`,
        //     x: 'center',
        //     y: 'center',
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        title: [
          {
            text:
              "{name|" +
              title +
              "}\n{val|" +
              formatNumber(total) +
              "}{unit|间}",
            top: "center",
            left: "center",
            textStyle: {
              rich: {
                name: {
                  fontSize: 12,
                  fontWeight: "normal",
                  color: "rgba(255,255,255,0.8)",
                  padding: [10, 0],
                },
                val: {
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#00F5FF",
                },
                unit: {
                  fontSize: 12,
                  color: "rgba(255,255,255,0.5)",
                },
              },
            },
          },
        ],
        tooltip: {
          // trigger: 'item',
          // borderColor: 'rgba(255,255,255,.3)',
          backgroundColor: "rgba(13,5,30,.6)",
          borderWidth: 1,
          padding: 5,
          formatter: function(parms) {
            var str =
              parms.marker +
              "" +
              parms.data.name +
              "</br>" +
              // "数量：" + parms.data.value + "头</br>" +
              "占比：" +
              parms.percent +
              "%";
            return str;
          },
          textStyle: {
            fontSize: 12,
            color: "rgba(255,255,255,0.8)",
          },
        },
        legend: {
          show: false,
          // type: "scroll",
          orient: "vertical",
          left: "left",
          align: "auto",
          top: "middle",
          textStyle: {
            color: "#fft",
          },
          data: legendData,
        },
        series: [
          {
            type: "pie",
            z: 3,
            center: ["50%", "50%"],
            radius: ["50%", "65%"],
            clockwise: true,
            animationDuration: 2000,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              position: "outside",
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 15,
                lineStyle: {
                  width: 1,
                },
              },
            },
            data: seriesData,
          },
        ],
      });
    },
    //显示隐藏地图大楼标签
    toggleBuilds(flag = 0) {
      Array.from(document.querySelectorAll(".buildingtext")).forEach((item) => {
        item.style.opacity = flag;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.publichouse {
  color: #f6faff;
  .schoolState {
    padding: 0 16px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  .houseStati {
    padding: 0 16px;
    width: 92%;
    min-height: 100%;
    .row {
      margin-top: 5px;
      width: 100%;
      display: flex;
      align-items: center;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      span {
        flex: 1;
        line-height: 30px;
      }
    }
    .title {
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.8);
    }
    .total {
      color: #00f5ff;
    }
    .bg {
      span {
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      background: rgba(106, 176, 255, 0.3);
    }
  }
  .useStati {
    padding: 0 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .chart-useStati {
      width: 180px;
      height: 200px;
    }
    .detailBox {
      flex: 1;
      height: 200px;
      margin-left: 10px;
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
            border: 2px solid;
            border-radius: 4px;
            display: inline-block;
            height: 5px;
            margin-right: 4px;
          }
          span {
            font-size: 14px;
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
            color: #fff;
          }
        }
      }
    }
  }

  .totalStati {
    padding: 0 16px;
    width: 100%;
    .chart-total {
      width: 340px;
      height: 150px;
    }
  }
  .freeStati {
    padding: 10px 20px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .imgBox {
      width: 145px;
      height: 150px;
      position: relative;
      img {
        position: absolute;
        cursor: pointer;
        &:hover {
          filter: drop-shadow(0 0 2px #ddd);
        }
      }
      .img1 {
        width: 57px;
        top: 0;
        left: calc(50% - 28.5px);
        z-index: 3;
        animation: aniImg1 3s linear 1;
      }
      .img2 {
        width: 96px;
        top: 38px;
        left: calc(50% - 48px);
        z-index: 2;
        animation: aniImg2 2s linear 1;
      }
      .img3 {
        width: 145px;
        bottom: 0;
        left: calc(50% - 72.5px);
        z-index: 1;
        animation: aniImg3 1s linear 1;
      }
      @keyframes aniImg1 {
        0% {
          top: 148px;
          opacity: 0;
        }
        33% {
          top: 93px;
          opacity: 0;
        }
        66% {
          top: 47px;
          opacity: 0;
        }
        100% {
          top: 0;
          opacity: 1;
        }
      }
      @keyframes aniImg2 {
        0% {
          top: 148px;
          opacity: 0;
        }
        50% {
          top: 82px;
          opacity: 0;
        }
        100% {
          top: 38px;
          opacity: 1;
        }
      }
      @keyframes aniImg3 {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
    .detailBox {
      flex: 1;
      height: 150px;
      margin-left: 25px;
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
            border: 2px solid;
            border-radius: 4px;
            display: inline-block;
            height: 5px;
            margin-right: 4px;
          }
          span {
            font-size: 14px;
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
  .landState {
    padding: 0 16px;
    width: 100%;
    .chart-land {
      width: 430px;
      height: 300px;
    }
  }

  .usepublicunitbox {
    width: 100%;
    height: 100%;
    .usebox {
      margin-top: 16px;
      display: flex;
      position: relative;
      #usepublic {
        width: 100%;
        height: 220px;
      }
      .useboxoutpie {
        position: absolute;
        width: 170px;
        top: calc(50% - 85px);
        left: calc(50% - 85px);
      }
      .gear {
        position: absolute;
        width: 100px;
        top: calc(50% - 50px);
        left: calc(50% - 50px);
      }
    }
  }

  #totalAssets,
  .chart-wrap {
    width: 100%;
    height: 100%;
  }

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
}
</style>
<style lang="less">
.build-marker {
  padding: 8px 15px 21px;
  min-width: 99px;
  background-image: url("../../assets/marker/assetsMrakerBg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #fff;
  font-size: 12px;
  text-align: left;
  p {
    white-space: nowrap;
    word-break: break-all;
  }
}
.none {
  display: none;
}
</style>
