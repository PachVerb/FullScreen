<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {}
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

html {
  overflow: hidden;
  width: 100%;
  height:100%;
}
body {
  position: relative;
  width: 100%;
  height:100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height:100%;

}
.v-modal{
  z-index: 9 !important;
}
</style>
<style>
/* 滚动条(滚动条会占用内容宽度) */
::-webkit-scrollbar{
  width: 6px;
  background: rgba(106, 176, 255, 0.2);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb{
  width: 4px;
  background: rgba(106, 176, 255, 0.6);
  border-radius: 2px;
}
</style>
