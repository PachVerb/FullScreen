<template>
  <div class="outer">
    <p style="font-size: .08rem;color: #FFFFFF;" class="title">{{boxtitle}}</p>
    <div class="inner">
      <h3 :style="{'color':boxcolor}" class="numfont">{{numberToCurrency(boxnum,10)}}</h3>
      <span class="unit">({{boxuntil}})</span>
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
		boxuntil:String,
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
  background-size: 100%;
  width: 0.9rem;
  height: 0.3rem;
  justify-content: center;
}

.title {
  position: absolute;
  left: 50px;
  top: -10px;
}

.numfont {
  font-size: .1rem;
  font-family: Helvetica-Bold;
  position: relative;
  top: 14px;
}
.unit {
	margin-left: 2px;
  font-size: 0.01rem;
  line-height: 0.4rem;
  color: rgba(246, 250, 255, 0.3);
}
</style>
