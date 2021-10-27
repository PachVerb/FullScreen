<template>
  <div>
    <sideTran thisCrrentSys="comprehensive">
      <div slot="left">
        <sideItem title="网络状态">
          <div class="network-status" slot='body'>
            <div class="network-status-left">
              <div class="btn-item" v-for="item in btnList" :key="item.name">
                <div class="btn-icon"><img src="../assets/img/people-up-num.png" alt=""></div>
                <div class="btn-detail">
                  <span class="btn-name">{{item.name}}</span>
                  <span class="btn-mes">{{item.text}}</span>
                  <span class="btn-unit">{{item.unit}}</span>
                </div>
              </div>
            </div>
            <div class="network-status-center">

            </div>
            <div class="network-status-right">

            </div>
          </div>
        </sideItem>
        <sideItem title="一卡通状态">
          <div name='body'></div>
        </sideItem>
        <sideItem title="AI摄像机态势">
          <div name='body'></div>
        </sideItem>
        <sideItem title="馆藏图书">
          <div name='body'></div>
        </sideItem>
      </div>
      <div slot="right">
				<sideItem title="车辆态势">
				  <div name='body'></div>
				</sideItem>
				<sideItem title="学生实时分布2122">
				  <div slot='body' class="studentdistribution">
						<div id="studentdistribution"></div>
					</div>
				</sideItem>
				<sideItem title="AI摄像机态势">4
				  <div slot='body'></div>
				</sideItem>
				<sideItem title="国有资产">
				  <div slot='body'></div>
				</sideItem>
			</div>
    </sideTran>
  </div>
</template>

<script>
	import sideTran from './sideTran'
	import nowpeopleslide from './nowpeopleslide.vue'
	import sideItem from './sideItem.vue'
	import {
		mapGetters
	} from 'vuex'
	import * as echarts from 'echarts';
export default {
  components: {
    sideTran,
    sideItem
  },
	computed: {
		...mapGetters(['currentSys'])
	},
  data(){
    return {
      btnList: [{
        name: '在线人数',
        text: '2222',
        unit: '人'
      },{
        name: '在线人数',
        text: '2222',
        unit: '人'
      },{
        name: '在线人数',
        text: '2222',
        unit: '人'
      },{
        name: '在线人数',
        text: '2222',
        unit: '人'
      },{
        name: '在线人数',
        text: '2222',
        unit: '人'
      },{
        name: '在线人数',
        text: '2222',
        unit: '人'
      },]
    }
  },
	methods:{
		init() {
			this.$nextTick(() => {
				this.thisCrrentSys = 'networkoperation'
				var _this = this
				// this.initcolor()
				setTimeout(function() {
					_this.renderpie()
				}, 1500);
			})
		},
		renderpie(){
			
			let studentdistributionChartDom, studentdistributionChartChart, option
			studentdistributionChartDom = document.getElementById('studentdistribution');
			studentdistributionChartChart = echarts.init(studentdistributionChartDom);
			let series = [];
			let pieDatas = [
			    {
			        "value": 30,
			        "name": "系列一"
			    },
			    {
			        "value": 14,
			        "name": "系列二"
			    },
			    {
			        "value": 26,
			        "name": "系列三"
			    },
			    {
			        "value": 20,
			        "name": "系列四"
			    },
			    {
			        "value": 10,
			        "name": "系列五"
			    },
			    {
			        "value": 10,
			        "name": "系列六"
			    }
			];
			let maxRadius =  80,
			    barWidth = 5,
			    barGap =  5;
			let sumValue = 0;
			let showValue = true,showPercent = true;
			pieDatas.map(item => {
			    sumValue += item.value;
			})
			let barColor =  [
			        {
			            "color1": "rgba(222, 125, 255, 1)",
			            "color2": ""
			        },
			        {
			            "color1": "rgba(250, 118, 121, 1)",
			            "color2": ""
			        },
			        {
			            "color1": "rgba(53, 198, 215, 1)",
			            "color2": ""
			        },
			        {
			            "color1": "rgba(101, 223, 138, 1)",
			            "color2": ""
			        },
			        {
			            "color1": "rgba(253, 161, 79, 1)",
			            "color2": ""
			        },
			        {
			            "color1": "rgba(68,165,255,1)",
			            "color2": ""
			        }
			    ];
			pieDatas.map((item, i) => {
			    series.push({
			        type: 'pie',
			        clockWise: false, //顺时加载
			        hoverAnimation: false, //鼠标移入变大
			        radius: [(maxRadius - i * (barGap + barWidth)) + '%', (maxRadius - (i + 1) * barWidth - i * barGap) + '%'],
			        center: [ "30%", "50%"],
			        label: {
			            show: false
			        },
			        itemStyle: {
			            label: {
			                show: false,
			            },
			            labelLine: {
			                show: false
			            },
			            borderWidth: 5,
			        },
			        data: [{
			            value: item.value,
			            name: item.name,
			            itemStyle: {
			                color: barColor[i]&&barColor[i].color1 || 'rgba(68,165,255,1)'
			            }
			        }, {
			            value: sumValue - item.value,
			            name: '',
			            itemStyle: {
			                color: "transparent",
			            },
			            tooltip: {
			                show: false
			            },
			            hoverAnimation: false
			        }]
			    })
			    series.push({
			        name: 'blank',
			        type: 'pie',
			        silent: true,
			        z: 0,
			        clockWise: false, //顺时加载
			        hoverAnimation: false, //鼠标移入变大
			        radius: [(maxRadius - i * (barGap + barWidth)) + '%', (maxRadius - (i + 1) * barWidth - i * barGap) + '%'],
			        center: [ "30%", "50%"],
			        label: {
			            show: false
			        },
			        itemStyle: {
			            label: {
			                show: false,
			            },
			            labelLine: {
			                show: false
			            },
			            borderWidth: 5,
			        },
			        data: [{
			            value: 1,
			            itemStyle: {
			                color: "rgba(255, 255, 255,.13)",
			                borderWidth: 0
			            },
			            tooltip: {
			                show: false
			            },
			            hoverAnimation: false
			        }]
			    });
			})
			studentdistributionChartChart.setOption({
			    grid: {
			        left:  0,
			        right:  0,
			        top:  0,
			        bottom:  0,
			    },
			    tooltip: {
			        show: true,
			        trigger: "item",
			    },
			    legend: {
			        show: false,
			        left: '60%',
			        top: 'middle',
			        icon: "circle",
			        itemWidth: 10,
			        itemHeight: 10,
			        itemGap:  20,
			        textStyle: {
			            fontSize:  16,
			            color:  '#fff',
			        },
			        formatter: (name) => {
			                var datas = pieDatas;
			                let total = 0;
			                datas.map(item => {
			                    total += (item.value - 0)
			                })
			                let valueIndex = datas.map(item => item.name).indexOf(name);
			                return name + "  " + (showValue ? datas[valueIndex].value + (option.legendValueUnit || '') + ' ' : '') + (showPercent ? ((datas[valueIndex].value / total) * 100).toFixed(2) + "%" : '');
			            } ,
			    },
			    series: series,
			});

		}
	}
}
</script>

<style lang="less" scoped>
.network-status-left{
  margin-left: .106rem;
  text-align: left;
}
.btn-item{
  display: inline-flex;
  align-items: center;
  margin-right: 0.05rem;
  font-size: .106667rem;
  .btn-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: .053333rem;
    width: .20rem;
    height: .20rem;
    background-image: url('../assets/img/btn-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    img{
      width: .13rem;
    }
  }
  .btn-detail{
    display: flex;
    justify-content: space-between;
    // align-items: center;
    padding: 0 .053333rem;
    width: .766667rem;
    height: .20rem;
    line-height: .2rem;
    background-image: url('../assets/img/btn-img.png');
    background-size: 100% 100%;
    font-size: 14px;
    color: rgba(255, 255, 255, .5);
    .btn-mes{
      color: rgba(0, 245, 255, 1);
      font-weight: bold;
    }
    .btn-unit{
      font-size: 12px;
    }
  }
}
.studentdistribution{
	height:200px;
	width: 50%;
}
#studentdistribution{
	height: 200px;
	height: 200px;
}
</style>