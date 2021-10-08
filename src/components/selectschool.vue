<template>
	<div style="width=200px">
		<div class="outer select-container" >
			<span class="outerwz" @click="selectclick()">{{selectvalue}}</span>
			<img src="../assets/img/selectschoolimg.png" style="margin-left: 18px;" alt="">
			<ul class="model-select-option" v-show="selectbox">
				<li v-for="(item,i) in list" @click="selectitem(i)" >{{item.schoolname}}</li>
			<!-- 	<li data-option="1">0707</li>
				<li data-option="2">0808</li>
				<li data-option="3">0909</li> -->
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selectvalue: "全部校区",
				selectbox: false,
				list: [{
					schoolname:"0707"
				},
				{
					schoolname:"0808"
				},
				]
			}
		},
		methods: {
			selectlist() {
				var list = document.getElementsByClassName('select-container');
				for (var i = 0; i < list.length; i++) {
					list[i].children[1].value = list[i].children[2].children[0].innerText.trim();
				}
			},
			selectitem(index){
				this.list.forEach((item,itemindex)=>{
					if(index == itemindex){
						this.selectvalue = item.schoolname
						this.selectbox = false
						return
					}
				})
				console.log(index,"8888")
			},
			selectclick() {
				console.log(this.selectbox, "this.selectbox")
				if (this.selectbox) {
					this.selectbox = false
				} else {
					this.selectbox = true
				}
			}
		},
		created() {
			// this.getWeather(document)
		},
		mounted() {
			// this.selectlist()
		},
	}
</script>

<style scoped="scoped">
	.outer {
		width: 40%;
		height: 40px;
		background: url(../assets/img/selectschoolbgc.png) no-repeat;
		cursor: pointer
	}

	.outerwz {
		color: #00F5FF;
		font-size: 16px;
		line-height: 40px;
	}
</style>
<style type="text/css" scoped>
	ul {
		list-style: none;
	}

	.model-select-box {
		width: 100px;
		height: 34px;
		line-height: 34px;
		border: 1px solid #000;
		float: left;
		margin-right: 20px;
		text-indent: 5px;
		position: relative;
		font-size: 18px;
		box-sizing: border-box
	}

	.model-select-text {
		height: 34px;
		padding-right: 27px;
		cursor: pointer;
		/* -moz-user-select: none;
	      -webkit-user-select: none;
	      user-select: none; */
	}

	.model-select-option {
		position: absolute;
		background: #fff;
		width: 40%;
		left: -1px;
		border: 1px solid #000;
	}

	.model-select-option li {
		height: 30px;
		line-height: 30px;
		color: #00F5FF;
		cursor: pointer;
	}

	.model-select-option li.selected {
		background: #06C;
		color: #fff;
	}
</style>
