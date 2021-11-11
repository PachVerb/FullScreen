<template>
  <div class="publichouse" style="height: 100%;">
    <sideTran thisCrrentSys="publichouse">
      <div slot="left" style="height: 100%;">
        <sideItem title="学校概况" delay="100" height="20.69%">
          <div class="schoolState" slot="body">
            <currency v-for="(item,i) in staList" :key="i" :boxnum="item.count" :boxtitle="item.type" :boxcolor="item.color" :boxuntil="item.unit"></currency>
          </div>
        </sideItem>
        <sideItem title="校区公房统计" delay="200" height="25.63%">
          <div class="houseStati" slot="body">
            <div class="row title">
              <span>所属校区</span>
              <span>楼栋数</span>
              <span>房间数</span>
              <span>建筑面积</span>
              <span>使用面积</span>
            </div>
            <div class="row bg" v-for="(item,i) in houseStaList" :key="i">
              <span>{{item.campus}}</span>
              <span>{{item.build}}</span>
              <span>{{item.room}}</span>
              <span>{{item.area}}</span>
              <span>{{item.useArea}}</span>
            </div>
            <div class="row bg total">
              <span>合计</span>
              <span>{{houseStaList.reduce((sum,item)=>sum+item.build,0)}}</span>
              <span>{{houseStaList.reduce((sum,item)=>sum+item.room,0)}}</span>
              <span>{{houseStaList.reduce((sum,item)=>sum+item.area,0)}}</span>
              <span>{{houseStaList.reduce((sum,item)=>sum+item.useArea,0)}}</span>
            </div>
          </div>
        </sideItem>
        <sideItem title="公房使用方向统计" delay="300" height="30%">
          <div class="useStati" slot="body">
            <div class="chart-useStati" id="useStatiChart"></div>
            <div class="detailBox">
              <div class="row" v-for="(item,i) in useStatiList" :key="i">
                <div class="title">
                  <i :style="`border-color:${item.color};`"></i>
                  <span :style="`color:${item.color};`">{{item.name}}</span>
                </div>
                <div class="value">
                  <animated-number :value="item.val" :formatValue="val=>val.toFixed(2)" :duration="4000" />
                  <i>㎡</i>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="学校公房总数统计" delay="400" height="22.76%">
          <div class="totalStati" slot="body">
            <div class="chart-total" id="totalChart"></div>
          </div>
        </sideItem>
      </div>
      <div slot="right" style="height: 100%;">
        <sideItem title="空置房源统计" transitionType="right" delay="100" height="23.91%">
          <div class="freeStati" slot="body">
            <img class="chartImg" src="../../assets/img/pyramid.png" alt />
            <div class="detailBox">
              <div class="row" v-for="(item,i) in freeList" :key="i">
                <div class="title">
                  <i :style="`border-color:${item.color};`"></i>
                  <span :style="`color:${item.color};`">{{item.name}}</span>
                </div>
                <div class="value">
                  <animated-number :value="item.val" :formatValue="val=>val.toFixed()" :duration="4000" />
                  <i>%</i>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="土地情况" transitionType="right" delay="200" height="40%">
          <div slot="body" class="landState">
            <div class="chart-land" id="landChart"></div>
          </div>
        </sideItem>
        <sideItem title="公房使用单位统计" transitionType="right" delay="300" height="36%">
          <div slot="body" class="usepublicunitbox">
            <div class="usebox">
              <img src="../../assets/pieimg/publichouseout.png" class="useboxoutpie" />
              <img src="../../assets/pieimg/publichouseinner.png" class="gear" />
              <div id="usepublic"></div>
            </div>
          </div>
        </sideItem>
      </div>
    </sideTran>
  </div>
</template>

<script>
// let color = ['#A985EE', '#C490BF', '#13B5B1', '#45dbf7', '#f69846', '#44aff0', '#4777f5', '#5045f6', '#ad46f3',
// 	'#f845f1'
// ];
import sideTran from '../sideTran'
import nowpeopleslide from '../nowpeopleslide.vue'
import sideItem from '../sideItem.vue'
import currency from '../currency.vue'//通用box组件
import AnimatedNumber from "animated-number-vue";
import {
  mapGetters
} from 'vuex'
import * as echarts from 'echarts';
import 'echarts-gl'
export default {
  components: {
    sideTran,
    sideItem,
    currency,
    AnimatedNumber
  },
  data() {
    return {
      name: ["生活用水", "浇灌用水", "其他"],
      value: [1114, 444, 501],
      fontcolor: [],
      fontcolorobj: [],
      staList: [],
      houseStaList: [],
      freeList: [],
      useStatiList:[],
    }
  },
  computed: {
    ...mapGetters(['currentSys'])
  },
  watch: {},
  mounted() { },
  methods: {
    init() {
      this.$nextTick(() => {
        // this.initcolor()
        setTimeout(() => {
          this.renderpie()
          this.getSchoolState();
          this.getHouseStati();
          this.getUseStati();
          this.getTotalStati();
          this.getFreeStati();
          this.getLandState();
        }, 500);
      })
    },
    //学校概况
    getSchoolState() {
      this.staList = [
        { type: '总占地面积', count: 172469, color: '#00F5FF', unit: '㎡' },
        { type: '总楼栋数', count: 63, color: '#F2896B', unit: '栋' },
        { type: '总房间数', count: 87, color: '#DBBB8A', unit: '间' },
        { type: '总房间面积', count: 28227, color: '#A488EF', unit: '㎡' },
      ]
    },
    //校区公房统计
    getHouseStati() {
      this.houseStaList = [
        { campus: '东校区', build: 13, room: 195, area: 13012.68, useArea: 8043.58 },
        { campus: '西校区', build: 7, room: 41, area: 2785.37, useArea: 1764.83 },
        { campus: '南校区', build: 16, room: 510, area: 39013.36, useArea: 23284.54 },
      ]
    },
    //公房使用方向统计
    getUseStati() {
      let dom = document.getElementById('useStatiChart');
      let chart = echarts.init(dom);
      this.useStatiList = [
        { name: "教学用房", val: 3211.56, color: 'rgba(106, 176, 255,.8)' },
        { name: "办公用房", val: 17325.68, color: 'rgba(19, 181, 177,.8)' },
        { name: "科研用房", val: 5124.65, color: 'rgba(229, 188, 128,.8)' },
      ]
      let sum = this.useStatiList.reduce((t,item)=>t+item.val,0);//数据总数
      // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
      function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, height) {
        height=height/sum*5;//换算高度
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
        k = typeof k !== 'undefined' ? k : 1 / 3;

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

          x: function (u, v) {
            if (u < startRadian) {
              return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
              return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
          },

          y: function (u, v) {
            if (u < startRadian) {
              return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
              return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
          },

          z: function (u, v) {
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
          typeof internalDiameterRatio !== 'undefined'
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3;

        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i++) {
          sumValue += pieData[i].value;

          let seriesItem = {
            name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
            type: 'surface',
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

          if (typeof pieData[i].itemStyle != 'undefined') {
            let itemStyle = {};

            typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
            typeof pieData[i].itemStyle.opacity != 'undefined'
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
          console.log(series[i]);
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
            formatter: (params) => {
              if (params.seriesName !== 'mouseoutSeries') {
                return `<span style="display:inline-block;margin-right:5px;border-radius:8px;width:8px;height:8px;background-color:${params.color};"></span>${params.seriesName}<br/>${option.series[params.seriesIndex].pieData.value}㎡`;
              }
            },
            backgroundColor: 'rgba(44,62,80,0.8)',
            borderColor: 'rgba(153, 209, 246, 0.6)',
            padding:[4,4,4,4],
            textStyle: {
              align: 'left',
              fontSize: 12,
              color: 'rgba(255,255,255,0.8)',
            },
          },
          legend: {
            show: false,
            data: legendData,
            textStyle: {
              color: '#fff',
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
            boxHeight: 20,
            //top: '30%',
            bottom: '50%',
            // environment: '#021041',
            viewControl: {
              distance: 240,
              alpha: 40,
              beta: 130,
            },
          },
          series: series,
        };
        return option;
      }

      // 传入数据生成 option
      let option = getPie3D(
        this.useStatiList.map(item=>{
          return {
            name: item.name,
            value: item.val,
            itemStyle: {
              opacity: 0.5,
              color: item.color,
            }
          }
        }),this.useStatiList.length
      );
      // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
      function bindListen(myChart) {
        let selectedIndex = '';
        let hoveredIndex = '';
        // 监听点击事件，实现选中效果（单选）
        myChart.on('click', function (params) {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
          let isSelected = !option.series[params.seriesIndex].pieStatus.selected;
          let isHovered = option.series[params.seriesIndex].pieStatus.hovered;
          let k = option.series[params.seriesIndex].pieStatus.k;
          let startRatio = option.series[params.seriesIndex].pieData.startRatio;
          let endRatio = option.series[params.seriesIndex].pieData.endRatio;
          // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
          if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
            option.series[selectedIndex].parametricEquation = getParametricEquation(option.series[
              selectedIndex].pieData
              .startRatio, option.series[selectedIndex].pieData.endRatio, false, false, k, option.series[
                selectedIndex].pieData
              .value);
            option.series[selectedIndex].pieStatus.selected = false;
          }
          // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
          option.series[params.seriesIndex].parametricEquation = getParametricEquation(startRatio, endRatio,
            isSelected,
            isHovered, k, option.series[params.seriesIndex].pieData.value);
          option.series[params.seriesIndex].pieStatus.selected = isSelected;
          // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
          isSelected ? selectedIndex = params.seriesIndex : null;
          // 使用更新后的 option，渲染图表
          myChart.setOption(option);
        });
        // 监听 mouseover，近似实现高亮（放大）效果
        myChart.on('mouseover', function (params) {
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
            if (hoveredIndex !== '') {
              // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
              isSelected = option.series[hoveredIndex].pieStatus.selected;
              isHovered = false;
              startRatio = option.series[hoveredIndex].pieData.startRatio;
              endRatio = option.series[hoveredIndex].pieData.endRatio;
              k = option.series[hoveredIndex].pieStatus.k;
              // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
              option.series[hoveredIndex].parametricEquation = getParametricEquation(startRatio, endRatio,
                isSelected,
                isHovered, k, option.series[hoveredIndex].pieData.value);
              option.series[hoveredIndex].pieStatus.hovered = isHovered;
              // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
              hoveredIndex = '';
            }
            // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
            if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
              // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
              isSelected = option.series[params.seriesIndex].pieStatus.selected;
              isHovered = true;
              startRatio = option.series[params.seriesIndex].pieData.startRatio;
              endRatio = option.series[params.seriesIndex].pieData.endRatio;
              k = option.series[params.seriesIndex].pieStatus.k;
              // 对当前点击的扇形，执行高亮操作（对 option 更新）
              option.series[params.seriesIndex].parametricEquation = getParametricEquation(startRatio, endRatio,
                isSelected, isHovered, k, option.series[params.seriesIndex].pieData.value + 1);
              option.series[params.seriesIndex].pieStatus.hovered = isHovered;
              // 记录上次高亮的扇形对应的系列号 seriesIndex
              hoveredIndex = params.seriesIndex;
            }
            // 使用更新后的 option，渲染图表
            myChart.setOption(option);
          }
        });
        // 修正取消高亮失败的 bug
        myChart.on('globalout', function () {
          // 准备重新渲染扇形所需的参数
          let isSelected;
          let isHovered;
          let startRatio;
          let endRatio;
          let k;
          if (hoveredIndex !== '') {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected = option.series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            k = option.series[hoveredIndex].pieStatus.k;
            startRatio = option.series[hoveredIndex].pieData.startRatio;
            endRatio = option.series[hoveredIndex].pieData.endRatio;
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            option.series[hoveredIndex].parametricEquation = getParametricEquation(startRatio, endRatio,
              isSelected,
              isHovered, k, option.series[hoveredIndex].pieData.value);
            option.series[hoveredIndex].pieStatus.hovered = isHovered;
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = '';
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(option);
        });
      }
      chart.clear();//清除动画
      chart.setOption(option, true);
      bindListen(chart)
    },
    //学校公房总数统计
    getTotalStati() {
      let dom = document.getElementById('totalChart');
      let chart = echarts.init(dom);
      let parma = {
        names: ['总量', '超出'],
        lineX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        value: [
          [351, 452, 183, 284, 135, 236, 287, 188, 359, 151, 231, 132],
          [260, 345, 80, 192, 30, 110, 192, 80, 250, 53, 152, 28]
        ]
      };
      let color = ['rgb(106, 176, 255)', 'rgb(242, 137, 107)']
      let lineY = []
      for (let i = 0; i < parma.names.length; i++) {
        let data = {
          name: parma.names[i],
          type: 'line',
          animationDuration: 2000,
          color: color[i],
          smooth: false,
          symbol: 'circle',
          symbolSize: 5,
          data: parma.value[i]
        }
        lineY.push(data)
      }
      let option = {
        tooltip: {
          confine: true,//提示框限制在图表内
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
          top: '0px',
          data: parma.names,
          textStyle: {
            fontSize: 12,
            color: 'F1F1F3'
          },
          right: '20px'
        },
        grid: {
          top: '30px',
          left: '0px',
          right: '5px',
          bottom: '0px',
          containLabel: true
        },
        xAxis: {
          show: true,
          type: 'category',
          boundaryGap: false,
          data: parma.lineX,
          axisLabel: {
            textStyle: {
              color: 'rgba(246, 250, 255, 0.8)'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.5)',
              width: 2
            }
          }
        },
        yAxis: {
          show: true,
          splitArea: {
            show: true,
            areaStyle: {
              color: "transparent"
            }
          },
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: 'rgba(246, 250, 255, 0.8)',
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.5)',
              type: 'dotted',
              width: 2
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.5)',
              width: 2
            }
          }
        },
        series: lineY
      }
      chart.clear();//清除动画
      chart.setOption(option, true);
      // setTimeout(() => {
      //   chart.clear();//清除动画
      //   chart.setOption(option, true);
      // }, 600)
    },
    //空置房源统计
    getFreeStati() {
      this.freeList = [
        { name: "北校区", val: 11, color: '#7892FF' },
        { name: "北校区", val: 22, color: '#5172FF' },
        { name: "东校区", val: 67, color: '#0C72F0' },
      ]
    },
    //土地情况
    getLandState() {
      let dom = document.getElementById('landChart');
      let chart = echarts.init(dom);
      let parma = {
        names: ['总使用权面积', '划拨使用权面积', '出让使用权面积'],
        unit: '(亿元)',
        lineX: ['北校区', '北校区', '东校区'],
        value: [
          [218, 218, 218], [85, 85, 85], [44, 44, 44],
        ],
        color: ['#6AB0FF', '#E5BC80', '#C490BF']
      };
      let option = {
        animationDuration: 2000,
        tooltip: {
          confine: true,//提示框限制在图表内
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: 'rgba(44,62,80,0.8)',
          borderColor: 'rgba(153, 209, 246, 0.6)',
          textStyle: {
            align: 'left',
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          },
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '0',
          top: '24%',
          containLabel: true
        },
        legend: {
          data: parma.names.map((item, i) => {
            return {
              name: item,
              textStyle: {
                color: parma.color[i],
                fontSize: 12
              }
            }
          }),
          right: '0',
          itemWidth: 10,
          itemHeight: 5,
          orient: 'vertical',
        },
        xAxis: {
          type: 'category',
          data: parma.lineX,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.5)'
            }
          },
          axisLabel: {
            textStyle: {
              color: "rgba(246, 250, 255, 0.8)"
            }
          },
        },

        yAxis: {
          name: parma.unit,
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.5)'
            }
          },
          axisLabel: {
            textStyle: {
              color: "rgba(246, 250, 255, 0.8)"
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(106, 176, 255, 0.5)',
              type: 'dotted',
            }
          },
        },
        series: parma.value.map((item, i) => {
          return {
            name: parma.names[i],
            type: 'bar',
            barWidth: '12px',
            barGap: '100%',//数据之间的距离
            label: {
              normal: {
                show: true,
                position: 'top',
                fontSize: 12,
                color: '#fff',
              },
            },
            itemStyle: {
              normal: {
                color: parma.color[i]
              },
            },
            data: item
          }
        })
      };
      chart.clear();//清除动画
      chart.setOption(option, true);
    },

    initcolor() {
      let tempobj = {}
      this.fontcolor = color.slice(0, this.name.length);
      // this.fontcolor.forEach(el => {
      // 	tempobj.color = el
      // 	this.fontcolorobj.push(tempobj)
      // })
      let len = this.fontcolor.length
      let array = [];
      for (let i = 0; i < len; i++) {
        array.push({
          "color": this.fontcolor[i]
        });
      }
      console.log(array, "bbbbbbb", this.fontcolor)
    },
    //公房使用单位统计
    renderpie() {
      let usepublicChartDom, usepublicChartChart, option
      usepublicChartDom = document.getElementById('usepublic');
      usepublicChartChart = echarts.init(usepublicChartDom);
      var seriesData = [{
        name: "土木工程学院",
        value: "40",
        label: {
          color: "#73DDFF"
        }
      }, {
        name: "物理学院",
        value: "40",
        label: {
          color: "#73ACFF"
        }
      }, {
        name: "数学学院",
        value: "53",
        label: {
          color: "#FDD56A"
        }
      }, {
        name: "软件工程学院",
        value: "40",
        label: {
          color: "#FDB36A"
        }
      }, {
        name: "继续教育学院",
        value: "60",
        label: {
          color: "#FD866A"
        }
      }, {
        name: "文法学院",
        value: "10",
        label: {
          color: "#9E87FF"
        }
      }, {
        name: "计算机科学学院",
        value: "40",
        label: {
          color: "#58D5FF"
        },
      }, {
        name: "马克思主义学院",
        value: "40",
        label: {
          color: "#18DDA7"
        },
      }, {
        name: "外国语学院",
        value: "40",
        label: {
          color: "#40CA53"
        },
      }, {
        name: "化学化工学院",
        value: "40",
        label: {
          color: "#E782AF"
        },
      }];
      let title = "总计"
      let formatNumber = function (num) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ',');
      }
      let total = seriesData.reduce((a, b) => {
        return a + b.value * 1
      }, 0);
      var legendData = seriesData.map(item=>item.name);
      var colorList = seriesData.map(item=>item.label.color);
      usepublicChartChart.setOption({
        // title: {
        //     text: `总计`,
        //     x: 'center',
        //     y: 'center',
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        title: [{
          text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}{unit|间}',
          top: 'center',
          left: 'center',
          textStyle: {
            rich: {
              name: {
                fontSize: 12,
                fontWeight: 'normal',
                color: 'rgba(255,255,255,0.8)',
                padding: [10, 0]
              },
              val: {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#00F5FF',
              },
              unit: {
                fontSize: 12,
                color: 'rgba(255,255,255,0.5)',
              }
            }
          }
        }],
        tooltip: {
          // trigger: 'item',
          // borderColor: 'rgba(255,255,255,.3)',
          backgroundColor: 'rgba(13,5,30,.6)',
          borderWidth: 1,
          padding: 5,
          formatter: function (parms) {
            var str = parms.marker + "" + parms.data.name + "</br>" +
              // "数量：" + parms.data.value + "头</br>" +
              "占比：" + parms.percent + "%";
            return str;
          },
          textStyle: {
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          },
        },
        legend: {
          show: false,
          // type: "scroll",
          orient: 'vertical',
          left: 'left',
          align: 'auto',
          top: 'middle',
          textStyle: {
            color: '#fft'
          },
          data: legendData
        },
        series: [{
          type: 'pie',
          z: 3,
          center: ['50%', '50%'],
          radius: ['50%', '65%'],
          clockwise: true,
          animationDuration: 2000,
          avoidLabelOverlap: true,
          hoverOffset: 15,
          itemStyle: {
            normal: {
              color: function (params) {
                return colorList[params.dataIndex]
              },

            }
          },
          label: {
            show: true,
            position: 'outside',
          },
          labelLine: {
            normal: {
              length: 20,
              length2: 15,
              lineStyle: {
                width: 1
              }
            }
          },
          data: seriesData
        },]
      });
    }
  }
}
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
    width: 100%;
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
            color: rgba(255, 255, 255, 0.5);
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
    .chartImg {
      width: 145px;
      height: 150px;
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
      width: 340px;
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
