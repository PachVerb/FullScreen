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

        <sideItem title="各宿舍楼归寝情况" delay="300">
          <div slot="body">
            <div class="boxthir"></div>
          </div>
        </sideItem>
      </div>
      <!-- 右边 -->
      <div slot="right" style="height: 100%;">
        <sideItem title="未归寝名单" transitionType="right" delay="100"></sideItem>
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
    }
  },
  computed: {
    ...mapGetters(['currentSys'])
  },
  watch: {},
  methods: {
    init() {
      this.getStuClass();
      this.getStudyStatus();
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
      },3000)
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
  .item{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .row{
      padding: 0 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name{
        font-size: 14px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.8);
      }
      .value{
        padding: 6px 10px;
        background: #1BB5B8;
        font-size: 18px;
        font-weight: bold;
        color: #FFFFFF;
        border-radius: 2px;
      }
    }
    .line{
      margin-top: 5px;
      position: relative;
      width: 164px;
      height: 1px;
      background: rgba(105, 175, 253, 1);
      &:before{
        content: '';
        width: 3px;
        height: 3px;
        background: rgba(105, 175, 253, 1);
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: calc(50% - 1.5px);
      }
      &:after{
        content: '';
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

@-webkit-keyframes myMove {
  /**关键帧名称**/
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
