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
                <span class="val" :style="`width:${24.9}%;`"></span>
              </span>
            </div>
            <div class="navBox">
              <span :class="dormKey?`text checked`:'text'" @click="dormKey=true">使用中</span>
              <span style="margin:0 20px;">|</span>
              <span :class="dormKey?`text`:'text checked'" @click="dormKey=false">空闲中</span>
            </div>
            <div class="listBox">
              <div class="head">
                <span>教室</span>
                <span>所在位置</span>
                <span>使用人</span>
                <span>查看</span>
              </div>
              <div class="row" v-for="(item,i) in dormList" :key="i">
                <span>{{item.room}}</span>
                <span>{{item.loca}}</span>
                <span>{{item.person}}</span>
                <span>
                  <span class="btn-check">查看</span>
                </span>
              </div>
            </div>
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
      dormKey:true,//使用中,空闲中
      dormList:[],
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
      this.getDormStatus();
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
    //各宿舍楼归寝情况
    getDormStatus(){
      this.dormList=[
        { room: '法医实验室', loca: '文科实验楼',person:'张锦' },
        { room: '化学实验室', loca: '文科实验楼',person:'李达' },
        { room: '统计大数据实验室', loca: '文科实验楼',person:'王晓悦' },
        { room: '现代旅游服务技能实验室', loca: '文科实验楼',person:'程慕' },
        { room: '网络统计实验室', loca: '文科实验楼',person:'杨澜' },
        { room: '网络统计实验室', loca: '文科实验楼',person:'杨澜' },
        { room: '网络统计实验室', loca: '文科实验楼',person:'杨澜' },
        { room: '网络统计实验室', loca: '文科实验楼',person:'杨澜' },
      ]
    }
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
        font-size: 16px;
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
.dormState{
  padding: 10px 12px 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .statiBox{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .group{
      display: flex;
      align-items: center;
      .p{
        width: 3px;
        height: 6px;
        border-radius: 50%;
        margin-right: 5px;
      }
      .detail{
        font-size: 12px;
        font-weight: 400;
        margin-right: 10px;
      }
      .value{
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  .bar{
    margin-top: 5px;
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
    background: url('../../assets/study/bg-bar.png') no-repeat;
    background-size: 100% 100%;
    .pro{
      width: 100%;
      height: 14px;
      background: #E5BC80;
      display: flex;
    }
    .val{
      height: 100%;
      background: #46B1F6;
    }
  }
  .navBox{
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    .text{
      cursor: pointer;
    }
    .checked{
      position: relative;
      font-size: 16px;
      font-weight: 500;
      color: #00F5FF;
      &::before{
        content: '';
        width: 100%;
        height: 2px;
        background: linear-gradient(to left,#0F6878,#00F5FF,#0F6878);
        position: absolute;
        left: 0;
        bottom: -4px;
      }
    }
  }
  .listBox{
    margin-top: 10px;
    width: 100%;
    height: 300px;
    overflow-y: auto;
    .head{
      position: relative;
      padding: 10px 0;
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      color: #FFFFFF;
      span{
        flex:1;
      }
      &::before{
        content: '';
        width: 100%;
        height: 1px;
        background: linear-gradient(to left,#112D46,#1B4465,#112D46);
        position: absolute;
        left: 0;
        bottom: -1px;
      }
    }
    .row{
      position: relative;
      padding: 10px 0;
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
      border-radius: 2px;
      span{
        flex:1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow:hidden;
      }
      &::before{
        content: '';
        width: 100%;
        height: 1px;
        background: linear-gradient(to left,#112D46,#1B4465,#112D46);
        position: absolute;
        left: 0;
        bottom: -1px;
      }
      &:hover{
        background: rgba(106, 176, 255, 0.2);
      }
      .btn-check{
        width: 58px;
        height: 30px;
        color: rgba(255, 255, 255, 0.6);
        background: url('../../assets/study/btn.png') no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        &:hover{
          color: rgba(255, 255, 255, 1);
        }
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
