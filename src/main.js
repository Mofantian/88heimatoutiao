import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
import 'nprogress/nprogress.css'
import JSONbig from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// axios默认会把后端返回的数据使用JSON.parse转为对象给我们使用
// 同时它也提供了让我们自定义转换的功能
// 我们这里手动配置使用 JSONbig.parse(data)
axios.defaults.transformResponse = [function (data, headers) {
  // console.log('后端原始数据', data)
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
    // 一但try里面的代码执行引发异常,那么久进入catch执行
    return {}
  }
}]
// axios响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
// axios请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求拦截器函数中的config是本次请求相关的配置对象
  // config就是最后要发给后端的那个配置对象
  // 我们可以在拦截器中对config进行统一配置定制
  const token = window.localStorage.getItem('user-token')
  // 统一添加token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // return config是通行的规则
  return config
}, function (error) {
  return Promise.reject(error)
})
Vue.prototype.$axios = axios // 将axios共享给所有的实例使用

Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
