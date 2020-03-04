import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

// 引入 Mint-UI 库
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Indicator } from 'mint-ui'
Vue.use(MintUI)

// 声明 axios 模块
import axios from 'axios';
import { AxiosInstance } from 'axios';
Vue.prototype.$axios = axios;
declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
  }
};

// 请求拦截
axios.interceptors.request.use(config => {
  Indicator.open();
  return config;
},error => {
  return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(response => {
  setTimeout(() => {
    Indicator.close();
  }, 500);
  return response;
},error => {
  return Promise.reject(error);
});

// 注册路由钩子函数
import Component from 'vue-class-component'
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// 加载微信控制台
export const loadScript = (url:string, callback:Function) => {
  const script = document.createElement('script');
  script.onload = () => callback();
  script.src = url;
  document.body.appendChild(script);
};

declare class VConsole {}

!true && loadScript(
  'https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js',
  () => {
      new VConsole();
  });