<template>
  <div class="loading">
    <img src="../../assets/gif/loading.gif" alt="">
  </div>
</template>

<script>
export default {
  props: {
    
  }
}
</script>

<style scoped lang="less">
.loading{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  width: 100%;
  height: calc(100% - 40px);
  img{
    width: 50%;
  }
}
</style>