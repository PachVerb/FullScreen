<!-- 地图内容区 -->
<template>
  <div id="clock">
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

let week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
let weekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let timerID = null
export default {
    name: "Clock",
    props: {
    },
    components: {
    },
    data() {
        return {
            time: null,
            date: null,
            week: null
        };
    },
    computed: {
        ...mapGetters([])
    },
    created() {
    },
    mounted() {
        timerID && clearInterval(timerID)
        timerID = setInterval(this.updateTime, 1000);
        this.updateTime();

    },
    watch: {
        time(val) {
            console.log(val, 'time')
        },
        date(val) {
            console.log(val, 'date')
        },
        week(val) {
            console.log(val, 'week')
        },
    },
    methods: {
        ...mapMutations([]),
        //更新时间
        updateTime() {
            let cd = new Date();
            this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
            this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2);
            this.week = weekEn[cd.getDay()]
        },
        zeroPadding(num, digit) {
            let zero = '';
            for(let i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }
    },
    beforeDestroy(){
    }

};
</script>

<style lang="less" scope>
#clock {
}
</style>



