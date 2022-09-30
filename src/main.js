/*
 * @LastEditTime: 2022-09-30 21:55:04
 * @Description:
 * @Date: 2022-09-30 21:30:46
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./icons"; // icon
/* 
修改node_modules  方法refreshRem为以下函数：
function refreshRem(){
    var width = docEl.getBoundingClientRect().width;
    if (width / dpr > 540) {
        width = width * dpr;
    }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
}
*/
import "lib-flexible/flexible.js";
import "element-ui/lib/theme-chalk/index.css";
import "vant/lib/index.css";
import "./common/font/font.css";
import VideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");

Vue.use(VideoPlayer);

// import echarts from 'echarts';
// import ElementUI from 'element-ui';
// import Vant from 'vant';
// import $ from 'jquery'
// Vue.use(Vant);
// import axios from 'axios'
// Vue.prototype.$http = axios
// Vue.prototype.$ = $
// Vue.use(ElementUI);

/**
https://github.com/surmon-china/surmon-china.github.io/blob/source/projects/vue-awesome-swiper/examples/13-centered.vue
git官网：https://codechina.csdn.net/mirrors/surmon-china/vue-awesome-swiper?utm_source=csdn_github_accelerator
direction:vertical 设置为垂直状态
需要在最外层的容器上增加class="swiper-no-swiping" 禁止滑动
在需要的组件中使用！
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.min.css'

 */
import vueSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";
Vue.use(vueSwiper);

import mixins from "./components/mixins";
Vue.mixin(mixins);

window.vue = new Vue({
  // echarts,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

//全局设置多次点击
// Vue.directive('throttle', {
//     inserted(el, binding) {
//         el.addEventListener('click', () => {
//             el.style.pointerEvents = 'none';
//             if (!el.disabled) {
//                 setTimeout(() => {
//                     el.style.pointerEvents = 'auto';
//                 }, binding.value || 5000);
//             }
//         });
//     }
// });
