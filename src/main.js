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
Vue.prototype.$axios = axios // 将axios共享给所有的实例使用

Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
