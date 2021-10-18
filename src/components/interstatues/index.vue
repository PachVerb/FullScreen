<template>
	<div>
		<sideTran :thisCrrentSys="thisCrrentSys">
			<div slot="left">
				<nowpeopleslide title="用户使用统计">
					<div slot='body' style="height: 20%;">
						<div class="flopbox">
							<p class="flopboxtitle" style="width: 85px;">在线用户</p>
							<flop :num="num" :unitil = "unitil"></flop>
						</div>
						<div class="flopbox">
							<p class="flopboxtitle">今日用户数据值</p>
							<flop :num="numtow" :unitil = "unitil"></flop>
						</div>
					</div>
				</nowpeopleslide>
				<sideItem title="网络设备统计">
					<div slot='body'>
						<div id="totalAssets"></div>
					</div>
				</sideItem>
				<sideItem title="设备告警统计">
					<div slot='body'>
						<div id="allTotalAssets"></div>
					</div>
				</sideItem>
				<sideItem title="设备告警详情">
					<div slot='body'>
						<div id="allTotalAssets"></div>
					</div>
				</sideItem>
			</div>
			<div slot="right">
				<sideItem title="网站安全统计">
					<div slot='body'>
						<div id="webSecurity"></div>
					</div>
				</sideItem>
				<sideItem title="服务器安全分析">
					<div slot='body'>
						<div id="serverSecurity"></div>
					</div>
				</sideItem>
			</div>
		</sideTran>
	</div>
</template>

<script>
	import sideTran from '@/components/sideTran'
	import sideItem from '@/components/sideItem.vue'
	import nowpeopleslide from '@/components/nowpeopleslide.vue'
	import flop from '@/components/commonComponent/flop.vue'
	import {
		mapGetters
	} from 'vuex'
	import * as echarts from 'echarts';
	let totalAssetsChartDom,
		totalAssetsChart,
		allTotalAssetschartDom,
		allTotalAssetsChart,
		webSecurityChartDom,
		webSecurityChart,
		serverSecurityChartDom,
		serverSecurityChart
	export default {
		components: {
			sideTran,
			sideItem,
			nowpeopleslide,
			flop
		},
		data() {
			return {
				thisCrrentSys: '',
				num:12345,
				numtow:67898,
				unitil:"人"
			}
		},
		computed: {
			...mapGetters(['currentSys'])
		},
		watch: {},
		mounted() {

		},
		methods: {
			init() {
				this.$nextTick(() => {
					this.thisCrrentSys = 'interstatues'
				})
			},
		
		}
	}
</script>

<style type="text/css" scoped="scoped">
	.flopbox{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.flopboxtitle{
		color: rgba(255, 255, 255, .8);
		text-align: left;
	}
</style>
