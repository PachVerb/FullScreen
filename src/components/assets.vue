<template>
  <div style="height: 100%;">
    <sideTran thisCrrentSys="assets">
      <div slot="left" style="height: 100%;">
        <sideItem
          title="学校资产统计"
          transitionType="left"
          delay="500"
          height="20%"
        >
          <div slot="body" style="width: 100%;margin-top: 20px;">
            <div class="flopbox">
              <p class="flopboxtitle">资产总值</p>
              <flop :num="num" :unitil="'套'" :isgray="true" :target="3"></flop>
            </div>
            <div class="flopbox">
              <p class="flopboxtitle">资产价值</p>
              <flop
                :num="numtow"
                :unitil="'万元'"
                :isgray="true"
                :target="4"
              ></flop>
            </div>
          </div>
        </sideItem>
        <sideItem title="各部门资产总数统计" :delay="200" height="40%">
          <div slot="body" class="chart-wrap">
            <div id="totalAssets"></div>
          </div>
        </sideItem>
        <!-- <sideItem title="资产使用统计" :delay="1500" height="40%">
          <div slot="body" class="chart-wrap">
            <div id="allTotalAssets"></div>
          </div>
        </sideItem> -->
        <sideItem title="资产使用统计" delay="200" height="40%">
          <div class="houseStati" slot="body">
            <div class="row title">
              <span>资产名称</span>
              <span>数量</span>
              <span>使用方向</span>
              <span>使用部门</span>
              <span>使用负责人</span>
            </div>
            <div class="row bg" v-for="(item, i) in sourceStaList" :key="i">
              <el-tooltip effect="dark" :content="item.name" placement="bottom">
                <span>{{ item.name }}</span>
              </el-tooltip>
              <span>{{ item.num }}</span>
              <span>{{ item.useto }}</span>
              <el-tooltip
                effect="dark"
                :content="item.usepart"
                placement="bottom"
              >
                <span>{{ item.usepart }}</span>
              </el-tooltip>
              <span>{{ item.people }}</span>
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
      </div>
      <div slot="right" style="height: 100%;">
        <sideItem
          title="学校资产分类统计"
          :transitionType="'right'"
          :delay="500"
          height="55%"
        >
          <div slot="body" class="websafe chart-wrap">
            <div id="webSecurity"></div>
          </div>
        </sideItem>
        <sideItem
          title="资产使用方向统计"
          :transitionType="'right'"
          :delay="1000"
          height="45%"
        >
          <div slot="body" class="serversafebox-wrap">
            <div class="serversafebox">
              <img
                src="../assets/pieimg/assets/assetsarc.png"
                class="assetsarc"
              />
              <img
                src="../assets/pieimg/assets/assetsinner.png"
                class="assetsinner"
              />
              <div id="serverSecurity"></div>
            </div>
            <div class="detailBox">
              <div class="row" v-for="(item, i) in ratioList" :key="i">
                <div class="title">
                  <i :style="`border-color:${item.color};`"></i
                  ><span :style="`color:${item.color};`">{{ item.name }}</span>
                </div>
                <div class="value">
                  <animated-number
                    :value="(item.val / ratioAbTotal) * 100"
                    :formatValue="(val) => val.toFixed()"
                    :duration="4000"
                  /><i>%</i>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
      </div>
    </sideTran>
    <modal :show="showAssetsDetailFlag">
      <div class="assets-modal">
        <div class="assets-modal-head">
          <span>机电信息实验大楼 > B109</span>
          <i @click="handleHideAssetsDetail" class="el-icon-close"></i>
        </div>
        <div class="assets-modal-body">
          <div class="assets-modal-body-top">
            <div class="assets-detail-mes">
              <div class="assets-detail-mes-top">
                <img src="../assets/assets/assets-type.png" alt="" />
                <span>7类</span>
              </div>
              <div class="assets-detail-mes-bottom">资产类别</div>
            </div>
            <div class="assets-detail-mes">
              <div class="assets-detail-mes-top">
                <img src="../assets/assets/assets-num.png" alt="" />
                <span>34套</span>
              </div>
              <div class="assets-detail-mes-bottom">资产数量</div>
            </div>
            <div class="assets-detail-mes">
              <div class="assets-detail-mes-top">
                <img src="../assets/assets/assets-company.png" alt="" />
                <span>资产处</span>
              </div>
              <div class="assets-detail-mes-bottom">使用单位</div>
            </div>
          </div>
          <div class="assets-modal-body-bottom">
            <div class="assets-modal-body-bottom-title">资产明细</div>
            <div class="assets-modal-body-bottom-table">
              <div class="assets-modal-body-bottom-table-head">
                <div class="assets-modal-body-bottom-table-tr">
                  <div
                    class="assets-modal-body-bottom-table-td"
                    v-for="th in tableHead"
                    :key="th.cname"
                    :style="{ width: th.width }"
                  >
                    {{ th.cname }}
                  </div>
                </div>
              </div>
              <div class="assets-modal-body-bottom-table-body">
                <div
                  class="assets-modal-body-bottom-table-tr"
                  v-for="(tr, trIndex) in tableBody"
                  :key="trIndex"
                >
                  <div
                    class="assets-modal-body-bottom-table-td"
                    v-for="(val, key) in tr"
                    :key="key"
                    :style="{ width: tableHead[key].width }"
                  >
                    {{ val }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import sideTran from "./sideTran";
import sideItem from "./sideItem.vue";
import { mapGetters } from "vuex";
import * as echarts from "echarts";
import nowpeopleslide from "@/components/nowpeopleslide.vue";
import flop from "@/components/commonComponent/flop.vue";
import modal from "@/components/commonComponent/modal.vue";
import AnimatedNumber from "animated-number-vue";
import { Icon } from "element-ui";

import mdata from "../mock/alldata.json";

let totalAssetsChartDom,
  totalAssetsChart,
  allTotalAssetschartDom,
  allTotalAssetsChart,
  webSecurityChartDom,
  webSecurityChart,
  serverSecurityChartDom,
  serverSecurityChart;
export default {
  components: {
    sideTran,
    sideItem,
    nowpeopleslide,
    flop,
    AnimatedNumber,
    modal,
    [Icon.name]: Icon,
  },
  data() {
    return {
      markerIndoor: null,
      markerList: [],
      color: ["rgb(106,176,255"],
      assetsMesList: [],
      ratioList: [],
      totalAssetsOption: {
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
          right: "50px",
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
            color: "#333",
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
            fontSize: 12,
            formatter: function(value) {
              return value.length > 5 ? value.substring(0, 5) + "..." : value;
            },
            color: "#333",
          },
          data: [
            "图书馆",
            "心理学系",
            "中丹学院",
            "科研处",
            "材料科学与光电技术学院",
            "纳米科学与技术学院",
            "党政办公室",
            "物理科学学院",
            "未来科技学院",
          ].reverse(),
        },
        series: [
          {
            type: "bar",
            barWidth: "5px",
            animationDuration: 2500,
            data: [10, 6, 2, 1, 6, 2, 1, 1, 1].reverse(),
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
      },
      allTotalAssetsOption: {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(44,62,80,0.8)",
          borderColor: "rgba(153, 209, 246, 0.6)",
          textStyle: {
            align: "left",
            fontSize: 12,
            color: "rgba(255,255,255,0.8)",
          },
        },
        grid: {
          top: "20px",
          left: "40px",
          right: "30px",
          bottom: "30px",
        },
        xAxis: {
          type: "category",
          data: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
          axisLine: {
            lineStyle: {
              color: "#6AB0FF",
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgb(20,46,74)",
            },
          },
          axisLabel: {
            show: true,
            fontSize: 10,
            formatter: function(value) {
              return value;
            },
            color: "#333",
          },
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#6AB0FF",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgb(20,46,74)",
            },
          },
          axisLabel: {
            show: true,
            fontSize: 10,
            formatter: function(value) {
              return value;
            },
            color: "#333",
          },
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
            animationDuration: 2500,
            symbol: "circle",
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,

                      color: "rgba(106,176,255,0.4)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(106,176,255,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: "rgb(106,176,255)", //折点颜色
                lineStyle: {
                  color: "rgb(106,176,255)", //折线颜色
                },
              },
            },
          },
        ],
      },
      serverSecurityOption: {
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(44,62,80,0.8)",
          borderColor: "rgba(153, 209, 246, 0.6)",
          textStyle: {
            align: "left",
            fontSize: 12,
            color: "rgba(255,255,255,0.8)",
          },
        },
        // legend: {
        //   top: '5%',
        //   left: 'center'
        // },
        series: [
          {
            type: "pie",
            animationDuration: 2500,
            radius: ["85%", "95%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 57, name: "科研用" },
              { value: 43, name: "非科研用" },
            ],
          },
        ],
      },
      num: 30,
      numtow: 410,
      unitil: "人",
      showAssetsDetailFlag: false,
      geoJson: {
        type: "FeatureCollection",
        features: [],
      },
      tableHead: {
        1: {
          cname: "资产编号",
          width: "90px",
          name: 1,
        },
        2: {
          cname: "资产名称",
          width: "150px",
          name: 2,
        },
        3: {
          cname: "分类名称",
          width: "80px",
          name: 3,
        },
        4: {
          cname: "型号",
          width: "80px",
          name: 4,
        },
        5: {
          cname: "购置日期",
          width: "155px",
          name: 5,
        },
        6: {
          cname: "数量",
          width: "50px",
          name: 6,
        },
        7: {
          cname: "生产厂家",
          width: "136px",
          name: 7,
        },
        8: {
          cname: "领用人姓名",
          width: "100px",
          name: 8,
        },
        9: {
          cname: "使用单位名称",
          width: "120px",
          name: 9,
        },
        10: {
          cname: "使用科室名称",
          width: "120px",
          name: 10,
        },
      },
      tableBody: [
        {
          1: "20080356",
          2: "物理设计性实验装置",
          3: "设备",
          4: "JW-SJ3",
          5: "2021-10-01 00:00:00",
          6: "1套",
          7: "南京嘉沃公司",
          8: "王秀杰",
          9: "理学院",
          10: "理学院实验中心",
        },
        {
          1: "20080356",
          2: "物理设计性实验装置",
          3: "设备",
          4: "JW-SJ3",
          5: "2021-10-01 00:00:00",
          6: "1套",
          7: "南京嘉沃公司",
          8: "王秀杰",
          9: "理学院",
          10: "理学院实验中心",
        },
        {
          1: "20080356",
          2: "物理设计性实验装置",
          3: "设备",
          4: "JW-SJ3",
          5: "2021-10-01 00:00:00",
          6: "1套",
          7: "南京嘉沃公司",
          8: "王秀杰",
          9: "理学院",
          10: "理学院实验中心",
        },
        {
          1: "20080356",
          2: "物理设计性实验装置",
          3: "设备",
          4: "JW-SJ3",
          5: "2021-10-01 00:00:00",
          6: "1套",
          7: "南京嘉沃公司",
          8: "王秀杰",
          9: "理学院",
          10: "理学院实验中心",
        },
        {
          1: "20080356",
          2: "物理设计性实验装置",
          3: "设备",
          4: "JW-SJ3",
          5: "2021-10-01 00:00:00",
          6: "1套",
          7: "南京嘉沃公司",
          8: "王秀杰",
          9: "理学院",
          10: "理学院实验中心",
        },
        {
          1: "20080356",
          2: "物理设计性实验装置",
          3: "设备",
          4: "JW-SJ3",
          5: "2021-10-01 00:00:00",
          6: "1套",
          7: "南京嘉沃公司",
          8: "王秀杰",
          9: "理学院",
          10: "理学院实验中心",
        },
      ],
      sourceStaList: [],
    };
  },
  computed: {
    ...mapGetters(["map", "currentSys", "isInDoor", "currentFloor"]),
    ratioAbTotal() {
      return this.ratioList.reduce((sum, item) => sum + item.val, 0);
    },
  },
  watch: {
    isInDoor(val) {
      if (this.currentSys !== "assets") return;
      if (val && this.currentFloor === 0) {
        this.setGeoJson();
      } else {
        this.geoJson.features = [];
        this.map.getSource("assetsRoomData") &&
          this.map.getSource("assetsRoomData").setData(this.geoJson);
      }
    },
    currentFloor(val) {
      if (this.currentSys !== "assets") return;
      if (val === 0 && this.isInDoor) {
        this.setGeoJson();
      } else {
        this.geoJson.features = [];
        this.map.getSource("assetsRoomData") &&
          this.map.getSource("assetsRoomData").setData(this.geoJson);
      }
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroySys();
  },
  methods: {
    init() {
      this.map.flyTo({
        center: [116.674756545935, 40.4066055539153],
        bearing: 1,
        pitch: 45,
        zoom: 17.5,
        duration: 1000,
        easing(t) {
          return t;
        },
      });
      let domList = [...document.querySelectorAll(".buildingtext")];
      domList.forEach((item) => {
        item.style.opacity = 0;
      });
      this.$nextTick(() => {
        setTimeout(() => {
          totalAssetsChartDom = document.getElementById("totalAssets");
          totalAssetsChart = echarts.init(totalAssetsChartDom);
          totalAssetsChart.setOption(this.totalAssetsOption);
        }, 1500);
        // setTimeout(() => {
        //   allTotalAssetschartDom = document.getElementById("allTotalAssets");
        //   allTotalAssetsChart = echarts.init(allTotalAssetschartDom);
        //   allTotalAssetsChart.setOption(this.allTotalAssetsOption);
        // }, 2000);
        setTimeout(() => {
          webSecurityChartDom = document.getElementById("webSecurity");
          webSecurityChart = echarts.init(webSecurityChartDom);
          webSecurityChart.setOption(
            this.getEcharts3DBar(
              [
                "房屋构建物",
                "家具用具装修",
                "通用设备",
                "图书档案",
                "专用设备",
                "标本文物和用具",
              ],
              [27, 10, 260, 27, 130, 8],
              "01"
            )
          );
          this.ratioList = [
            { name: "科研用", val: 1100, color: "rgba(13, 119, 5, .8)" },
            { name: "非科研用", val: 444, color: "rgba(200, 161, 111, .8)" },
          ];
        }, 1500);
        setTimeout(() => {
          serverSecurityChartDom = document.getElementById("serverSecurity");
          serverSecurityChart = echarts.init(serverSecurityChartDom);
          serverSecurityChart.setOption(this.serverSecurityOption);
          window.addEventListener("resize", function() {
            // allTotalAssetsChart.resize();
            totalAssetsChart.resize();
            webSecurityChart.resize();
            serverSecurityChart.resize();
          });
        }, 2000);
        // this.myChart2.setOption(this.getEcharts3DBar(['z'], [20], '01'))
        this.sourceStaList = mdata.sourceuse;

        this.assetsMesList = [
          {
            num: 4,
            unit: 4,
            value: 62,
            location: [116.67488669601147, 40.406300277420314],
          },
          {
            num: 3,
            unit: 1,
            value: 26,
            location: [116.67474653819329, 40.4080012617503],
          },
          {
            num: 4,
            unit: 2,
            value: 26,
            location: [116.67231245078762, 40.40945985510473],
          },
          {
            num: 10,
            unit: 3,
            value: 106,
            location: [116.6729899373413, 40.4074603218766],
          },
          {
            num: 2,
            unit: 1,
            value: 182,
            location: [116.67406285322318, 40.4064118565067],
          },
        ];
        // this.map.on("click", (e) => {
        //   console.log(e);
        //   this.map.setCenter(e.lngLat);
        //   console.log(this.map.queryRenderedFeatures(e.point));
        // });
        this.createAssetsMraker();
        // this.createLayer();
      });
    },
    destroySys() {
      let domList = [...document.querySelectorAll(".buildingtext")];
      domList.forEach((item) => {
        item.style.opacity = 1;
      });
      if (this.markerIndoor) {
        this.markerIndoor.remove();
        this.markerIndoor = null;
      }
      this.geoJson = {
        type: "FeatureCollection",
        features: [],
      };
      this.map.getSource("assetsRoomData") &&
        this.map.getSource("assetsRoomData").setData(this.geoJson);
      this.map.off("click", "assetsRoomBg", this.handleShowAssetsDetail);
    },
    createAssetsMraker() {
      let domList = [];
      this.assetsMesList.forEach((item) => {
        let div = document.createElement("div");
        div.className = "assets-marker-wrap";
        div.innerHTML = `
          <div><span>资产数量：</span><span>${item.num}套</span></div>
          <div><span>资产单位：</span><span>${item.unit}个</span></div>
          <div><span>资产价值：</span><span>${item.value}万元</span></div>
        `;
        domList.push({ dom: div });
        // let marker = new creeper.Marker({element: div}).setLngLat(item.location).addTo(this.map)
        // this.markerList.push(marker)
      });
      let geoJson = this.setFeature(this.assetsMesList);
      //   console.log("geoJson", geoJson);
      this.markerIndoor = new creeper.MarkerIndoor(this.map);
      this.markerIndoor.addMarker(geoJson, domList, true);
    },
    setFeature(markerList) {
      let list = markerList.map((item) => {
        return {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: JSON.parse(JSON.stringify(item.location)),
          },
        };
      });
      return {
        type: "FeatureCollection",
        features: list,
      };
    },
    setGeoJson() {
      this.geoJson.features.push({
        type: "fill",
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
        properties: {
          blank: "\n",
          title: "B109" + "\n",
          num: "资产数量：27套" + "\n",
          unit: "资产单位：3个" + "\n",
          company: "资产价值：67万元" + "\n",
          handle: "点击查看详情" + "\n",
          blank2: "\n",
        },
      });
      this.map.getSource("assetsRoomData") &&
        this.map.getSource("assetsRoomData").setData(this.geoJson);
    },
    createLayer() {
      if (!this.map.getSource("assetsRoomData")) {
        this.map.addSource("assetsRoomData", {
          type: "geojson",
          data: this.geoJson,
        });
      } else {
        this.map.getSource("assetsRoomData") &&
          this.map.getSource("assetsRoomData").setData(this.geoJson);
      }
      // 文字图层
      if (!this.map.getLayer("assetsRoomText")) {
        this.map.addLayer({
          id: "assetsRoomText",
          source: "assetsRoomData", //上述定义的source
          type: "symbol", //图层类型，见3.5节中图层描述
          layout: {
            "text-field": [
              "format",
              ["get", "blank"],
              {
                "font-scale": 0.8,
              },
              ["get", "title"],
              {
                "font-scale": 0.8,
              },
              ["get", "num"],
              {
                "font-scale": 0.8,
              },
              ["get", "unit"],
              {
                "font-scale": 0.8,
              },
              ["get", "company"],
              {
                "font-scale": 0.8,
              },
              ["get", "handle"],
              {
                "font-scale": 0.8,
                "text-color": "rgba(0, 48, 171, 1)",
              },
              ["get", "blank2"],
              {
                "font-scale": 0.8,
              },
            ],
            "text-allow-overlap": true,
            "text-size": 14,
            // 'text-halo-color': '0px 1px 4px rgba(10, 30, 52, 0.6)'
          },
          paint: {
            "text-color": "#fff",
          },
        });
      }
      // 背景图层
      if (!this.map.getLayer("assetsRoomBg")) {
        this.map.addLayer(
          {
            id: "assetsRoomBg",
            source: "assetsRoomData", //上述定义的source
            type: "fill", //图层类型，见3.5节中图层描述
            layout: {
              // 'text-field': ['get', 'title']
            },
            paint: {
              "fill-color": "rgba(70, 177, 246, 1)",
              // 'text-color': '#fff'
            },
          },
          "room23"
        );
      }
      this.map.on("click", "assetsRoomBg", this.handleShowAssetsDetail);
    },
    handleShowAssetsDetail(e) {
      //   console.log(e);
      this.showAssetsDetailFlag = true;
    },
    handleHideAssetsDetail() {
      this.showAssetsDetailFlag = false;
    },
    getEcharts3DBar(xAxisData, data, colorType) {
      var colorArr = [];
      if (colorType == "01") {
        colorArr = ["#5783FF", "#68ABF7", "#68ABF7"];
      } else {
        colorArr = ["#28c1c6", "#50dac0", "#87e8c7"];
      }
      var color = {
        type: "linear",
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: colorArr[0],
          },
          {
            offset: 0.5,
            color: colorArr[0],
          },
          {
            offset: 0.5,
            color: colorArr[1],
          },
          {
            offset: 1,
            color: colorArr[1],
          },
        ],
      };
      var barWidth = 20;
      var constData = [];
      var showData = [];
      data.filter(function(item) {
        if (item) {
          constData.push(1);
          showData.push(item);
        } else {
          constData.push(0);
          showData.push({
            value: 1,
            itemStyle: {
              normal: {
                borderColor: "rgba(0,0,0,0)",
                borderWidth: 2,
                color: "rgba(0,0,0,0)",
              },
            },
          });
        }
      });
      return {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(44,62,80,0.8)",
          borderColor: "rgba(153, 209, 246, 0.6)",
          textStyle: {
            align: "left",
            fontSize: 12,
            color: "rgba(255,255,255,0.8)",
          },
          formatter: function(params) {
            var str = params[0].axisValue + "：";
            params.filter(function(item) {
              if (item.componentSubType == "bar") {
                str += "<br/>" + item.seriesName + "：" + item.value;
              }
            });
            return str;
          },
        },
        grid: {
          left: "3%", //图表距边框的距离
          right: "3%",
          top: "10%",
          bottom: "0",
          containLabel: true,
        },
        xAxis: {
          data: xAxisData,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#6AB0FF",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgb(20,46,74)",
            },
          },
          axisLabel: {
            show: true,
            fontSize: 12,
            rotate: 20,
            formatter: function(value) {
              return value.length > 5 ? value.substring(0, 5) + "..." : value;
            },
            color: "#F6FAFF",
          },
        },
        yAxis: {
          name: "(万元)",
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#6AB0FF",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgb(20,46,74)",
            },
          },
          axisLabel: {
            show: true,
            fontSize: 10,
            formatter: function(value) {
              return value;
            },
            color: "#F6FAFF",
          },
        },
        series: [
          {
            z: 1,
            name: "数据",
            type: "bar",
            animationDuration: 2500,
            barWidth: barWidth,
            barGap: "0%",
            data: data,
            itemStyle: {
              normal: {
                color: color,
              },
            },
            label: {
              show: true,
              position: "top",
              valueAnimation: true,
              color: "#D4E7F4",
            },
          },
          {
            z: 2,
            name: "数据",
            type: "pictorialBar",
            animationDuration: 2500,
            data: constData,
            symbol: "diamond",
            symbolOffset: ["0%", "50%"],
            symbolSize: [barWidth, 10],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#68ABF7", // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: "#68ABF7", // 60% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#5783FF", // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            z: 3,
            name: "数据",
            type: "pictorialBar",
            animationDuration: 2500,
            symbolPosition: "end",
            data: showData,
            symbol: "diamond",
            symbolOffset: ["0%", "-50%"],
            symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  1,
                  0,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#68ABF7", // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: "#5783FF", // 60% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#5783FF", // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
            tooltip: {
              show: false,
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="less" scoped>
#totalAssets {
  width: 100%;
  height: 100%;
}
#allTotalAssets {
  width: 100%;
  height: 100%;
}
#webSecurity {
  width: 100%;
  height: 100%;
}
#serverSecurity {
  width: 180px;
  height: 180px;
  margin-left: 100px;
  /* margin-top: 24px; */
  position: absolute;
  left: 34px;
}
.serversafebox-wrap {
  width: 100%;
}
.serversafebox {
  position: relative;
  margin: 20px 0;
  height: 180px;
}
.websafe {
  /* height: 360px; */
}
.assetsarc {
  position: absolute;
  left: 115px;
  top: -14px;
  width: 210px;
  height: 210px;
  animation: myMove 5s;
  -webkit-animation: myMove 5s infinite linear;
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
.assetsinner {
  position: absolute;
  left: 134px;
  top: 0px;
  width: 180px;
  height: 180px;
}
.flopbox {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.flopboxtitle {
  //   color: rgb(255, 255, 255);
  color: #333;
  text-align: left;
}

.houseStati {
  padding: 0 8px;
  width: 95%;
  min-height: 100%;
  margin: 0 24px;
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
.detailBox {
  flex: 1;
  height: 100%;
  margin: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 18px;
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
.chart-wrap {
  width: 100%;
  height: 100%;
}
.assets-modal {
  width: 1184px;
  color: #fff;
  &-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 21px;
    height: 40px;
    background-color: rgba(50, 75, 160, 1);
  }
  &-body {
    padding: 41px 47px 47px;
    height: 585px;
    background-color: rgba(22, 42, 112, 0.76);
    border: 1px solid #00f5ff;
    border-top: none;
    border-radius: 0 0 4px 4px;
    &-top {
      display: flex;
      justify-content: space-between;
      .assets-detail-mes {
        padding: 31px 30px 21px;
        background-color: rgba(106, 176, 255, 0.5);
        &-top {
          display: flex;
          align-items: center;
          padding: 14px 28px;
          width: 224px;
          background-color: rgba(13, 25, 139, 0.45);
          img {
            height: 68px;
          }
          span {
            margin-left: 42px;
            font-size: 20px;
            line-height: 68px;
          }
        }
        &-bottom {
          margin-top: 16px;
          font-size: 18px;
        }
      }
    }
    &-bottom {
      &-title {
        margin-bottom: 22px;
        padding-top: 32px;
        font-size: 18px;
        font-weight: bold;
        color: #00f5ff;
        text-align: left;
      }
      &-table {
        background-color: rgba(106, 176, 255, 0.3);
        // &-head{
        //   display: flex;
        // }
        &-body {
          height: 275px;
          overflow-y: scroll;
        }
        &-tr {
          display: flex;
          width: calc(100% - 4px);
          border-bottom: 1px solid rgba(106, 176, 255, 0.3);
        }
        &-td {
          box-sizing: border-box;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 48px;
          overflow: hidden;
          border-right: 1px solid rgba(106, 176, 255, 0.3);
        }
        &-td:last-child {
          border: none;
        }
      }
    }
  }
}
.el-icon-close {
  cursor: pointer;
}
</style>
<style lang="less">
.assets-marker-wrap {
  padding: 8px 15px 15px;
  width: 133px;
  height: 65px;
  //   background-image: url("../assets/marker/assetsMrakerBg.png");
  //   background-size: 100% 100%;
  //   background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.8);
  color: #666;
  font-size: 12px;
  text-align: left;
  text-align: left;
  font-family: PingFang SC;
  font-weight: 400;
}
</style>
