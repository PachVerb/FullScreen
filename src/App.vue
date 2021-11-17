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

<style lang="less">
*{
  margin: 0;
  padding: 0;
  font-family: pingfang;
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
  .el-picker-panel{
    background: rgba(44,62,80,.9);
    border-color: rgba(153, 209, 246, 0.6);
  }
  .el-date-range-picker__content.is-left{
    border-color: rgba(153, 209, 246, 0.6);
  }
  .el-date-range-picker__header{
    color: #fff;
  }
  .el-date-table th{
    color: #fff;
    border-color: rgba(153, 209, 246, 0.6);
  }
  .el-date-table .available{
    color: rgba(255,255,255,1);
  }
  .el-date-table .next-month{
    color: rgba(255,255,255,0.1);
  }
  .el-date-table td.in-range div, .el-date-table td.in-range div:hover, .el-date-table.is-week-mode .el-date-table__row.current div, .el-date-table.is-week-mode .el-date-table__row:hover div{
    background-color: transparent;
  }
}
i {
  font-style: normal;
  line-height: 1;
}
span {
  display: inline-block;
  line-height: 1;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height:100%;
  user-select: none;
  background:RGBA(18, 35, 63, 0.8);
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
