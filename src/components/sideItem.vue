<template>
  <div class="side-item">
    <div class="side-item-title">
      <img src="../assets/img/side-item-title.png" alt="">
      <span>{{title}}</span>
    </div>
     <div class="title-border"></div>
    <slot name="body"></slot>
    <div class="border"><img src="../assets/img/side-item-border.png" alt=""></div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  
}
</script>

<style scoped>
.side-item-title{
  display: flex;
  align-items: center;
  margin-top: .066667rem;
  padding: 3px;
  padding-left: .106667rem;
  color: #00F5FF;
  font-size: .08rem;
}
.side-item-title img{
  margin-right: .04rem;
  width: .106667rem;
}
.border{
  display: flex;
  justify-content: center;
  padding: 0 10%;
}
.border img {
  width: 100%;
}
.title-border{
  margin: 3px;
  margin-bottom: .16rem;
  margin-left: .106667rem;
  width: .583333rem;
  height: 1px;
  background-color: #00F5FF;
}
</style>