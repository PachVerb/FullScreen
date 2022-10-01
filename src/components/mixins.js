/*
 * @LastEditTime: 2022-10-02 01:45:53
 * @Description: 
 * @Date: 2022-10-01 15:41:29
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["map", "currentSys", ""]),
  },
  watch: {},
  mounted() {
    // console.log(888888,6666)
  },
  methods: {
    ...mapMutations(["SET_DETAIL_MSG"]),
    hideBuildingText() {
      let domList = [...document.querySelectorAll(".buildingtext")];
      domList.forEach((item) => {
        item.style.opacity = 0;
      });
    },
    showBuildingText() {
      let domList = [...document.querySelectorAll(".buildingtext")];
      domList.forEach((item) => {
        item.style.opacity = 1;
      });
    },
  },
};
