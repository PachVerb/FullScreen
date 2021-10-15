import {mapGetters} from 'vuex'
export default {
		computed: {
			...mapGetters(['currentSys'])
		},
		watch: {

		},
		mounted(){
			console.log(888888,6666)
		}
}