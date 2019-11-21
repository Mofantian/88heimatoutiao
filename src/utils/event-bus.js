import Vue from 'vue'

// 该模块导出一个新建的空的vue实例

export default new Vue()

// 如何使用
// Vue实例有两个用于通信的方法
// 发布订阅
// 在通信的a端(组件)使用event-bus订阅一个自定义事件
// eventBus.$on('事件名称', () => {
//   // 自定义逻辑代码
// })
// 在通信的b端(组件),根据你的业务发布调用自定义事件
// event.$emit('事件名称', 如果有数据可以放在这里)
