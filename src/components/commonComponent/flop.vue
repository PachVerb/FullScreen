<!--
 * @Author: mat
 * @Date: 2019-12-04 14:56:07
 * @LastEditTime: 2022-10-11 21:31:08
 * @LastEditors: wangshan
 * @Description: 实现数字翻牌动态效果，css 属性 writing-mode: vertical-lr，使数字竖直排版，
        2d移动 transform: translate(-50%, -40%); y值控制移动至哪个数字，transition 
        控制transform属性有动画效果 
 -->
<template>
  <div class="outer">
    <div class="chartNum">
      <div class="box-item">
        <li
          :class="{
            'number-item': !isNaN(item),
            'mark-item': isNaN(item),
            'gray-number': isgray ? findStartNum(item, target, index) : false,
          }"
          v-for="(item, index) in orderNum"
          :key="index"
        >
          <span v-if="!isNaN(item)">
            <i ref="numberItem">0123456789</i>
          </span>
          <span class="comma" v-else>{{ item }}</span>
        </li>
      </div>
    </div>
    <span class="boxunitil">{{ unitil }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   orderNum: ["0", "0", ",", "0", "0", "0"], // 默认订单总数
      orderNum: ["0", ",", "0", "0", "0", "0"],
    };
  },
  props: {
    num: {
      default: 0,
    },
    isgray: {
      default: false,
    },
    target: {
      type: Number,
    },
    unitil: "",
  },
  watch: {
    num() {
      //   console.log(this.num, "num1111");
      this.$nextTick(() => {
        setTimeout(() => {
          this.toOrderNum(this.num); // 这里输入数字即可调用
        }, 500);
        // this.randerBar()
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.toOrderNum(this.num); // 这里输入数字即可调用
    }, 1500);
  },
  methods: {
    // 设置文字滚动
    setNumberTransform() {
      const numberItems = this.$refs.numberItem; // 拿到数字的ref，计算元素数量
      const numberArr = this.orderNum.filter((item) => !isNaN(item));
      //   console.log(numberArr, "arry", this.orderNum);
      // 结合CSS 对数字字符进行滚动,显示订单数量
      for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index];
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`;
        // console.log(numberArr[index], "arry444", numberArr[index] * 10);
      }
    },
    // 处理总订单数字
    toOrderNum(num) {
      num = num.toString();
      // 把订单数变成字符串
      //   console.log(num, "nbum22222", num.length, num.length < 5);
      if (num.length < 5) {
        num = "0" + num; // 如未满八位数，添加"0"补位
        this.toOrderNum(num); // 递归添加"0"补位
        // console.log("补位,", num);
      } else if (num.length === 5) {
        // 订单数中加入逗号
        // num = num.slice(0, 2) + ',' + num.slice(2, 5) + ',' + num.slice(5, 8)
        // console.log(num.slice(0, 2), num.slice(2, 5), "889898797489***");
        num = num.slice(0, 1) + "," + num.slice(1, 5);
        this.orderNum = num.split(""); // 将其便变成数据，渲染至滚动数组
        // console.log(this.orderNum, "0000022");
      } else {
        // 订单总量数字超过八位显示异常
        this.$message.warning("总量数字过大");
      }
      this.setNumberTransform();
    },
    findStartNum(num, target, numindex) {
      let targetindex = this.orderNum.findIndex((v) => v == target);
      if (numindex < targetindex) {
        return true;
      } else return false;
    },
  },
};
</script>
<style scoped lang="less">
/*订单总量滚动数字设置*/
.box-item {
  position: relative;
  height: 50px;
  font-size: 34px;
  line-height: 41px;
  text-align: center;
  list-style: none;
  color: #39dce2;
  writing-mode: vertical-lr;
  text-orientation: upright;
  /*文字禁止编辑*/
  -moz-user-select: none;
  /*火狐*/
  -webkit-user-select: none;
  /*webkit浏览器*/
  -ms-user-select: none;
  /*IE10*/
  -khtml-user-select: none;
  /*早期浏览器*/
  user-select: none;
  /* overflow: hidden; */
}

/* 默认逗号设置 */
.mark-item {
  width: 10px;
  height: 30px;
  margin-right: 5px;
  /* line-height: 10px; */
  font-size: 38px;
  position: relative;

  & > span {
    position: absolute;
    width: 100%;
    bottom: 0;
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
}

/*滚动数字设置*/
.number-item {
  width: 30px;
  height: 40px;
  /* 背景图片 */
  background: url(../../assets/images/numberbg.png) no-repeat center center;
  background-size: 100% 100%;
  // background: #ccc;
  list-style: none;
  margin-right: 5px;
  // background:rgba(250,250,250,1);
  border-radius: 4px;
  /* border: 1px solid rgba(221, 221, 221, 1); */

  & > span {
    position: relative;
    display: inline-block;
    margin-right: 10px;
    width: 100%;
    height: 100%;
    writing-mode: vertical-rl;
    text-orientation: upright;
    overflow: hidden;

    & > i {
      font-style: normal;
      position: absolute;
      top: 3px;
      left: 46%;
      transform: translate(-50%, 0);
      transition: transform 1s ease-in-out;
      letter-spacing: 10px;
    }
  }
}

.number-item:last-child {
  margin-right: 0;
}
.comma {
  position: relative !important;
}
.boxunitil {
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  position: absolute;
  right: 0;
  bottom: 6px;
}
.outer {
  display: flex;
  position: relative;
}
.chartNum {
  width: 210px;
}
.gray-number {
  color: #237b8c;
}
</style>
