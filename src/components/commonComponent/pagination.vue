<template>
  <div class="pageination-box">
    <el-pagination
      small
      layout="total, prev, pager, next"
      :total="100">
    </el-pagination>
  </div>
</template>

<script>
import {
  Pagination
} from 'element-ui'
export default {
  props: {

  },
  components: {
    [Pagination.name]: Pagination
  }
}
</script>

<style lang='less' scoped>
.pageination-box{
  /deep/.el-pagination{
    display: flex;
    background-color: transparent;
    .el-pagination__total{
      flex: 1;
    }
    button{
      background-color: transparent;
      color: rgba(255, 255, 255, .5);
    }
    button:disabled{
      background-color: transparent;
    }
    .el-pager li{
      margin-left: 3px;
      background-color: rgba(106, 176, 255, 0.2);
      color: rgba(255, 255, 255, .5);
    }
    .el-pager li.active{
      background-color: rgb(106,176,255);
      color: #fff;
    }
  }
}
</style>