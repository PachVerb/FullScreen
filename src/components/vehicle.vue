<template>
  <div>
    <sideTran thisCrrentSys="vehicle">
      <div slot="left">
        <sideItem title="违规车辆统计">
          <div class="network-status" slot='body'>

          </div>
        </sideItem>
        <sideItem title="违规事件统计">
          <div slot='body'></div>
        </sideItem>
        <sideItem title="违规车辆详情">
          <div slot='body'>
            <date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </date-picker>
          </div>
        </sideItem>
      </div>
      <div slot="right"></div>
    </sideTran>
  </div>
</template>

<script>
import sideTran from './sideTran'
import sideItem from './sideItem.vue'
import {DatePicker} from 'element-ui'
export default {
  components: {
    sideTran,
    sideItem,
    DatePicker
  },
  data(){
    return {
      value1: ''
    }
  }
}
</script>

<style lang="less" scoped>

</style>