<template>
  <div>
    <sideTran thisCrrentSys="comprehensive">
      <div slot="left">
        <sideItem title="网络状态">
          <div class="network-status" slot='body'>
            <div class="network-status-left">
              <div class="" v-for="item in btnList" :key="item.name">
                <img src="../assets/img/people-up-num.png" alt="">
                <span>{{item.name}}</span>
                <span>{{item.unit}}</span>
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
      }]
    }
  }
}
</script>

<style scoped>

</style>