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
      <div slot="right">999999</div>
    </sideTran>
  </div>
</template>

<script>
import sideTran from './sideTran'
import sideItem from './sideItem.vue'
export default {
  components: {
    sideTran,
    sideItem
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
</style>