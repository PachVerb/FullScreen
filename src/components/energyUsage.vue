/* 能耗态势 */
<template>
  <div class="energy">
    <sideTran thisCrrentSys="energyUsage">
      <div slot="left">
        <sideItem title="用电设备统计" delay="200">
          <div class="deviceStati" slot="body">
            <currency v-for="(item,i) in statiList" :key="i" :boxnum="item.count" :boxtitle="item.type" :boxcolor="item.color" boxuntil="个" style="margin-top:12px;"></currency>
          </div>
        </sideItem>
        <sideItem title="用电概况" delay="400">
          <div class="survey" slot="body">
            <div class="l">
              <img class="bg" src="../assets/img/frameA.png" alt />
              <div class="title">用电概况 | 今年</div>
              <div class="row">
                <div class="total">
                  <span class="num">9686</span>
                  <i class="unit">KWh</i>
                </div>
                <div class="percent">
                  <span class="text">比去年</span>
                  <img class="arrow" src="../assets/img/arrow-down.png" alt />
                  <i class="perc">42%</i>
                </div>
              </div>
              <div class="row">
                <div class="item" style="margin-right:10px;">
                  <span class="text">日均：</span>
                  <span class="num">86</span>
                  <i class="unit">KWh</i>
                </div>
                <div class="item">
                  <span class="text">月均：</span>
                  <span class="num">256</span>
                  <i class="unit">KWh</i>
                </div>
              </div>
              <div class="row" style="justify-content:space-around;">
                <div class="group">
                  <img src="../assets/img/survey.png" alt />
                  <div class="percent">
                    <img class="arrow" src="../assets/img/arrow-down.png" alt />
                    <i class="perc">4.3%</i>
                  </div>
                  <span class="text">日均同比</span>
                </div>
                <div class="group">
                  <img src="../assets/img/survey.png" alt />
                  <div class="percent">
                    <img class="arrow" src="../assets/img/arrow-up.png" alt />
                    <i class="perc red">25%</i>
                  </div>
                  <span class="text">月均同比</span>
                </div>
              </div>
            </div>
            <div class="r">
              <div class="group">
                <img class="bg" src="../assets/img/frameB.png" alt />
                <div class="title">用电概况 | 今月</div>
                <div class="total">
                  <span class="num">168.62</span>
                  <i class="unit">KWh</i>
                </div>
                <div class="percent">
                  <span class="text">比去年</span>
                  <img class="arrow" src="../assets/img/arrow-down.png" alt />
                  <i class="perc">42%</i>
                </div>
              </div>
              <div class="group">
                <img class="bg" src="../assets/img/frameB.png" alt />
                <div class="title">用电概况 | 今日</div>
                <div class="total">
                  <span class="num">12.56</span>
                  <i class="unit">KWh</i>
                </div>
                <div class="percent">
                  <span class="text">比去年</span>
                  <img class="arrow" src="../assets/img/arrow-down.png" alt />
                  <i class="perc">42%</i>
                </div>
              </div>
            </div>
          </div>
        </sideItem>
        <sideItem title="设备用电占比" delay="600">
          <div slot="body">
            <!-- <div id="allTotalAssets"></div> -->
          </div>
        </sideItem>
        <sideItem title="用电趋势分析" delay="800">
          <div slot="body">
            <!-- <div id="allTotalAssets"></div> -->
          </div>
        </sideItem>
      </div>
      <div slot="right">
        <sideItem title="用水设备统计" transitionType="right" delay="200">
          <div slot="body">
            <!-- <div id="webSecurity"></div> -->
          </div>
        </sideItem>
        <sideItem title="用水概况" transitionType="right" delay="400">
          <div slot="body">
            <!-- <div id="serverSecurity"></div> -->
          </div>
        </sideItem>
        <sideItem title="设备用水占比" transitionType="right" delay="600">
          <div slot="body"></div>
        </sideItem>
        <sideItem title="用水趋势分析" transitionType="right" delay="800">
          <div slot="body"></div>
        </sideItem>
      </div>
    </sideTran>
  </div>
</template>

<script>
import sideTran from './sideTran'
import sideItem from './sideItem.vue'
import currency from './currency'//通用box组件
import { mapGetters } from 'vuex'
import * as echarts from 'echarts';
export default {
  components: {
    sideTran,
    sideItem,
    currency
  },
  data() {
    return {
      statiList: [],//设备统计
    }
  },
  computed: {
    ...mapGetters(['currentSys'])
  },
  watch: {},
  mounted() { },
  methods: {
    //初始化
    init() {
      this.getDeviceStatiList();
    },
    //获取设备统计列表
    getDeviceStatiList() {
      this.statiList = [
        { type: '设备总数', count: 2349, color: '#00F5FF' },
        { type: '异常设备数', count: 86, color: '#F2896B' },
        { type: '超出使用设备数', count: 45, color: '#DBBB8A' },
        { type: '超出使用总量', count: 298, color: '#A488EF' },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
i {
  font-style: normal;
  line-height: 1;
}
span {
  display: inline-block;
  line-height: 1;
}
.energy {
  color: #f6faff;
  .deviceStati {
    padding: 10px 16px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  .survey {
    padding: 10px 16px 0;
    display: flex;
    .l {
      position: relative;
      width: 220px;
      padding: 0 10px;
      box-sizing: border-box;
      z-index: 1;
      .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        z-index: -1;
      }
      .title {
        text-align: left;
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
        line-height: 2.5;
      }
      .row {
        padding: 5px 0;
        display: flex;
        align-items: flex-end;
        .total {
          display: flex;
          align-items: flex-end;
        }
        .num {
          font-size: 22px;
          font-weight: bold;
          color: #00f5ff;
          line-height: 0.8;
          margin-right: 4px;
        }
        .unit {
          font-size: 12px;
          font-weight: 400;
          color: rgba(246, 250, 255, 0.3);
        }
        .percent {
          margin-left: 16px;
          display: flex;
          align-items: flex-end;
        }
        .text {
          white-space: nowrap;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
        }
        .arrow {
          margin: 0 2px;
          width: 8px;
          height: 12px;
        }
        .perc {
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 224, 79, 0.8);
        }
        .red {
          color: rgba(242, 137, 107, 0.8);
        }
        .item {
          display: flex;
          align-items: flex-end;
          .num {
            font-size: 18px;
          }
        }
        .group {
          display: flex;
          flex-direction: column;
          align-items: center;
          .percent {
            margin: 8px 0;
          }
        }
      }
    }
    .r {
      margin-left: 10px;
      width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .group {
        width: 100%;
        padding: 0 10px 8px;
        position: relative;
        z-index: 1;
        .bg {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          z-index: -1;
        }
        .title {
          text-align: left;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          line-height: 2.5;
        }
        .total {
          padding: 0 0 10px;
          display: flex;
          align-items: flex-end;
          .num {
            font-size: 22px;
            font-weight: bold;
            color: #00f5ff;
            line-height: 0.8;
            margin-right: 4px;
          }
          .unit {
            font-size: 12px;
            font-weight: 400;
            color: rgba(246, 250, 255, 0.3);
          }
        }

        .percent {
          display: flex;
          align-items: flex-end;
          .text {
            font-size: 12px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.8);
          }
          .arrow {
            margin: 0 2px;
            width: 8px;
            height: 12px;
          }
          .perc {
            font-size: 12px;
            font-weight: 400;
            color: rgba(0, 224, 79, 0.8);
          }
        }
      }
    }
  }
}
</style>