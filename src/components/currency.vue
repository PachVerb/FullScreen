<template>
	<div class="outer">
		<p style="font-size: 14px;color: #FFFFFF;" class="title">{{boxtitle}}</p>
		<div class="inner">
			<h3  :style="{'color':boxcolor}"  class="numfont">
				{{numberToCurrency(boxnum,10)}}
			</h3><span style="font-size: 12px;line-height: 58px;color:#F6FAFF;">(人)</span>
		</div>
	</div>
	<!-- numberToCurrency(oneobj.num,10) -->
</template>

<script>
	import {
		numberFilter
	} from './filternum'
	export default {
		data() {
			return {};
		},
		props: {
			boxnum: Number,
			boxtitle: String,
			boxcolor: String,
		},

		mounted() {
			// console.log(this.boxtitle,"888888")
		},
		methods: {
			numberToCurrency(data, cut) {
				return numberFilter(data, cut)
			},
		}
	}
</script>

<style scoped="scoped">
	.outer {
		position: relative;
	}

	.inner {
		display: flex;
		background: url(../assets/img/currencyboxbgc.png) no-repeat;
		width: 150px;
		height: 56px;
		background-size: 100% 80%;
		justify-content: center;
	}

	.title {
		position: absolute;
		left: 50PX;
		top: -10px;
	}

	.numfont {
		font-size: 19px;
		font-family: Helvetica-Bold;
		position: relative;
		top: 14px;
	}
</style>
