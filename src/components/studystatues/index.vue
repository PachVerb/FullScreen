<template>
	<div>
		<sideTran :thisCrrentSys="thisCrrentSys">
			<div slot="left" class="left">
				<sideItem title="学生到课统计" delay="500">
					<div slot='body' >
						<div class="studentschool">
							
						</div>
					</div>
				</sideItem>

				<sideItem title="教学综合情况" delay="1000">
					<div style="height: 30%;" slot='body'>
						
					</div>
				</sideItem>

				<sideItem title="各宿舍楼归寝情况" delay="1500">
					<div slot='body' style="height: 40%;">
						<div id="returntoBed" ref="returntoBed">
						</div>
					</div>
				</sideItem>

			</div>
			<!-- 右边 -->
			<div slot="right" class="right">
				<sideItem title="未归寝名单" transitionType="right" >
					
				</sideItem>
			</div>
		</sideTran>
	</div>
</template>

<script>
	import * as echarts from 'echarts'
	import {
		mapGetters
	} from 'vuex'
	import sideTran from '../sideTran'
	import sideItem from '../sideItem.vue'
	export default {
		components: {
			sideTran,
			sideItem
		},
		computed: {
			...mapGetters(['currentSys'])
		},
		watch: {

		},
		methods: {
			init() {
				this.$nextTick(() => {
					this.thisCrrentSys = 'studystatues'
					// this.randerBar()
				})
			},

		},
		mounted() {
			// this.randerBar()
			// setTimeout(console.log(this.$echarts,"5555",this.$ref.returntoBed), 3000 )

		},
		data() {
			return {
				thisCrrentSys: '',
			}
		}
	}
</script>

<style scoped="scoped">
	.studentschool{
		height: 200px;
	}
</style>
