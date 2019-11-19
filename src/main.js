import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
import 'nprogress/nprogress.css'
import JSONbig from 'json-bigint'
import moment from 'moment'

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

Vue.use(Element, {
  // 项目中所有拥有size属性的组件的默认尺寸均为small
  size: 'small'
})

// 全局过滤器: 任何组件模板都可以直接访问
// 参数1:过滤器名称
// 参数2:函数
// 调用方式:在模板中{{ 数据|过滤器 }}
// | 管道符前面的数据就会作为参数传递给过滤器函数
// 过滤器函数的第1个参数始终是
// value, format是形参 是一个名字
// vue在版本1的时候有很多内置过滤器
// 升级版本的时候移除了所有的内置过滤器,但是保留了过滤器的功能
// 用户可以继续自定义添加过滤器来使用
// 过滤器:处理一些简单的文本格式化
Vue.filter('dateFormat', (value, format = 'YYYY-MM-DD') => {
  return moment(value).format(format)
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
