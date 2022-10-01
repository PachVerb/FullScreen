/*
 * @LastEditTime: 2022-10-02 01:46:37
 * @Description:
 * @Date: 2022-07-11 10:05:48
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon"; // svg component

// register globally
Vue.component("svg-icon", SvgIcon);

const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const result = requireAll(req);
// console.log(result,"result")
