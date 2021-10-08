<template>
  <div>
    <sideTran thisCrrentSys="assets">
      <div slot="left">
        <sideItem title="网络状态">
          <div name='body'></div>
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
      <div slot="right">8888888</div>
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
  }
}
</script>

<style scoped>

</style>