import {mapGetters, mapMutations} from 'vuex'
export default {
		computed: {
			...mapGetters(['map','currentSys'])
		},
		watch: {

		},
		mounted(){
			console.log(888888,6666)
		},
		methods: {
			hideBuildingText(){
				let domList = [...document.querySelectorAll('.buildingtext')]
				domList.forEach(item => {
					item.style.opacity = 0
				})
			},
			showBuildingText(){
				let domList = [...document.querySelectorAll('.buildingtext')]
				domList.forEach(item => {
					item.style.opacity = 1
				})
			}
		}
}