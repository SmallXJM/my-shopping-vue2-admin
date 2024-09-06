/*
 * @Author: yingzi
 * @Date: 2024-08-06 14:23:51
 * @LastEditors: yingzi
 * @LastEditTime: 2024-08-08 20:14:23
 * @Description: 请填写简介
 */
import Vue from 'vue'
import md5 from 'js-md5';
import App from './App.vue'

//引入VueRouter
import VueRouter from 'vue-router'
import router from './router'


//引入Vuex
import Vuex from 'vuex'
import store from './store'
//引入Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题

// src/router/index.js
// const VueRouterPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (to) {
//   return VueRouterPush.call(this, to).catch(err => err)
// }
// const originalReplace = VueRouter.prototype.replace;
// VueRouter.prototype.replace = function replace(location) {
//   return originalReplace.call(this, location).catch(err => err);
// };

const orderStatus = {
  0: '待支付',
  1: '已支付',
  2: '配货完成',
  3: '出库成功',
  4: '交易成功',
  '-1': '手动关闭',
  '-2': '超时关闭',
  '-3': '商家关闭'
}

// const app = createApp(App) // 生成 Vue 实例 app

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

// 全局方法
Vue.prototype.$filters = {
  orderMap(status) {
    return orderStatus[status] || '未知状态'
  },
  prefix(url) {
    if (url && url.startsWith('http')) {
      return url
    } else {
      //url = `http://backend-api-02.newbee.ltd${url}`
      url = `http://localhost:8088${url}`
      return url
    }
  }
}

Vue.prototype.goTop = function () {
  const main = document.querySelector('.main')
  main.scrollTop = 0
}

Vue.prototype.$md5 = md5;


Vue.config.productionTip = false  //关闭生产环境的提示

//应用Vuex插件
Vue.use(Vuex);
//应用插件
Vue.use(VueRouter);
//应用插件
Vue.use(ElementUI);

new Vue({
  render: h => h(App),//渲染函数
  store,
  router
}).$mount('#app')
