/*
 * @LastEditTime: 2022-10-03 22:05:40
 * @Description:
 * @Date: 2022-10-03 14:56:03
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  //   {
  //     path: "/Login",
  //     name: "Login",
  //     component: Login,
  //   },
];

const router = new VueRouter({
  routes,
});
// router.beforeEach(function(to, from, next) {
//     if (!localStorage.getItem("username")) {
//         if (to.path !== '/Login') {
//             return next('/Login')
//         }
//     }
//     next()
// })
export default router;
