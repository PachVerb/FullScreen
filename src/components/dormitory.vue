<template>
  <div>
    <sideTran thisCrrentSys="dormitory">
      <div slot="left">
        <div class="side-item-title">
          <img src="../assets/img/side-item-title.png" alt="">
          <span>今日归寝情况</span>
        </div>
      </div>
      <div slot="right">
				<div class="side-item-title">
				  <img src="../assets/img/side-item-title.png" alt="">
				  <span>未归寝人员名单</span>
				</div>
				<div class="nohomelist">
					<div style="display: flex;">
						<img src="../assets/img/nohomeimg.png" alt="">
						<div class="nohomelistbox">
							
						</div>
					</div>
				</div>
			</div>
    </sideTran>
  </div>
</template>

<script>
import sideTran from './sideTran'
export default {
  components: {
    sideTran
  }
}
</script>

<style scoped>
.side-item-title{
	margin-left: 20px;
	margin-top: 10px;
	width: 40%;
  display: flex;
  align-items: center;
  /* margin-top: .066667rem; */
  padding: 3px;
  padding-left: .106667rem;
  color: #00F5FF;
  font-size: .08rem;
	border-bottom: 1px solid #00F5FF;
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
.nohomelist{
}
.nohomelistbox{
	height:56px ;
	width: 80%;
	background: url(../assets/img/nohomebox.png) no-repeat;
}
</style>