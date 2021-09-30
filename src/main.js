import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'lib-flexible/flexible.js';
import echarts from 'echarts';
import ElementUI from 'element-ui';
import Vant from 'vant';
import 'vant/lib/index.css';
import $ from 'jquery'
Vue.use(Vant);
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$http = axios
Vue.prototype.$ = $
Vue.use(ElementUI);

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.min.css'

Vue.use(vueSwiper)



window.vue = new Vue({
    echarts,
    router,
    store,
    render: h => h(App)
}).$mount("#app");

//全局设置多次点击
Vue.directive('throttle', {
    inserted(el, binding) {
        el.addEventListener('click', () => {
            el.style.pointerEvents = 'none';
            if (!el.disabled) {
                setTimeout(() => {
                    el.style.pointerEvents = 'auto';
                }, binding.value || 5000);
            }
        });
    }
});
