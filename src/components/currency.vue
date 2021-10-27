<template>
	<div class="outer">
		<p style="font-size: 12px;color: #FFFFFF;" class="title">{{boxtitle}}</p>
		<div class="inner">
			<animated-number  :value="boxnum" :formatValue="formatToPrice" :duration="duration" />
			<!-- <h3 :style="{'color':boxcolor}" class="numfont">{{numberToCurrency(boxnum,10)}}</h3> -->
			<span  class="unit">({{boxuntil}})</span>
		</div>
	</div>
	<!-- numberToCurrency(oneobj.num,10) -->
</template>

<script>
	import AnimatedNumber from "animated-number-vue";
	import {
		numberFilter
	} from './filternum'
	export default {
		data() {
			return {
				duration: 4000
			};
		},
		props: {
			boxnum: Number,
			boxtitle: String,
			boxcolor: String,
			boxuntil: String,
		},
		components: {
			AnimatedNumber
		},
		mounted() {
			// console.log(this.boxtitle,"888888")
		},
		methods: {
			formatToPrice(value) {
				let color =  this.boxcolor
				return `<h3  style="color:${color};font-size: 26px;font-family: Helvetica-Bold;position: relative;top: 10px;"  >${Number(value).toFixed(0)}</h3>`;
			},
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
		background-size: 100%;
		height: 56px;
		/* background-size: 100% 80%; */
		justify-content: center;
	}

	.title {
		position: relative;
		top: 6px;
		text-align: center;
	}

	.numfont {
		font-size: 19px;
		font-family: Helvetica-Bold;
		position: relative;
		top: 14px;
	}

	.unit {
		margin-left: 2px;
		font-size: 12px;
		line-height: 64px;
		color: rgba(246, 250, 255, 0.3);
	}
</style>
