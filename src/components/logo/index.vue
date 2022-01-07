<template>
  <div class="logo-wrap">
    <img class="logo" alt="logo" src="../../assets/img/toptitle.png" />
    <div class="logo2-wrap">
      <img class="logo2" alt="logo" src="../../assets/img/toptitle2.png" />
      <div class="logo2-box span1"></div>
      <div class="logo2-box span2"></div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.logo-wrap{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.logo{
  display: inline-block;
  width: 95%; 
}
.logo2-wrap{
  position: absolute;
  top: 7px;
  width: 107%;
  height: 119%;
}
.logo2{
  width: 100%;
  height: 100%;
}
.logo2-box{
  position: absolute;
  top: 0;
  left: 50%;
  width: 20px;
  height: 100%;
  background-color: transparent;
}
</style>