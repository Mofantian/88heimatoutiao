import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout' // 简写路径,简写了index.vue
import login from '@/views/login' // 简写路径,简写了index.vue
// @是vueCLI中提供的一种特殊的路径规则,它直接指向了src目录路径
// 注意:在vueCLI创建的项目中,无论你在哪里使用@,它永远指向src
import home from '@/views/home'
import article from '@/views/article'
import publish from '@/views/publish'
import comment from '@/views/comment'
import media from '@/views/media'
import account from '@/views/account'
import commentlist from '@/views/comment-list'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: layout,
  children: [{
    path: '',
    component: home
  }, {
    path: '/article',
    component: article
  }, {
    path: '/publish',
    component: publish
  },
  // 如果从a路由跳转到b路由,如果两个路由使用的同一个组件,那么这个组件不会重新渲染
  // 正常的路由跳转,会销毁离开的路由,渲染新匹配到的组件
  // 组件销毁也就意味着它的数据之类都被清除了
  {
    path: '/publish/:articleID',
    component: publish
  }, {
    path: '/comment',
    component: comment
  }, {
    path: '/comment/:articleID',
    component: commentlist,
    // 将路由参数映射给组件的props数据,这样获取参数更方便
    props: true
  }, {
    path: '/media',
    component: media
  }, {
    path: '/account',
    component: account
  }]
}, {
  path: '/login',
  component: login
}
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 路由的拦截器beforeEach方法,该方法接收一个函数作为参数
// 参数1:to, 表示去哪里的的路由信息
// 参数2:from, 表示来自哪里的路由信息
// 参数3:next, 一个方法,用于路由放行
// 具体要做的就是:判断用户的登录状态,有就通过,没有就跳转到登录页
router.beforeEach((to, from, next) => {
  // 开启顶部导航进度条特效
  NProgress.start()
  // console.log('所有的页面访问都要经过这里')
  // 如果是非登录页面才校验登录状态
  // 如果访问的是登录页面,直接放行
  if (to.path === '/login') {
    // 访问那里就往那里走
    next()
    // 停止代码往后执行
    return
  }
  // 非登录页面校验登录状态
  // 获取用户的token
  const token = window.localStorage.getItem('user-token')
  // 判断是否有token 有就通过
  if (token) {
    next()
  } else {
    // 没有就跳转登录页
    window.alert('请先登录')
    next('/login')
    // 如果在登录页并且是非登录状态访问非登陆页,要手动停止进度条,否则进度条不会停止
    NProgress.done()
  }
})

// 当路由导航结束以后触发的路由函数
router.afterEach((to, next) => {
  // 结束顶部的导航进度条
  NProgress.done()
})

export default router
