<template>
  <div class="outer">
    <p class="title">{{boxtitle}}</p>
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
    boxuntil: String,
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
  margin-top: 8px;
  position: relative;
  width: 150px;
  height: 50px;
}

	.inner {
    padding: 10px 0;
    box-sizing: border-box;
    height: 100%;
		display: flex;
		background: url(../assets/img/currencyboxbgc.png) no-repeat;
		background-size: 100%;
		justify-content: center;
    align-items: flex-end;
	}

.title {
  width: 100%;
  position: absolute;
  top: -8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.numfont {
  line-height: 1;
  font-size: 22px;
  font-family: Helvetica-Bold;
}
.unit {
  margin-left: 2px;
  font-size: 12px;
  line-height: 1.4;
  color: rgba(246, 250, 255, 0.3);
}
</style>
