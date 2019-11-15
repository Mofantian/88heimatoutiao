import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout' // 简写路径,简写了index.vue
import login from '@/views/login' // 简写路径,简写了index.vue
// @是vueCLI中提供的一种特殊的路径规则,它直接指向了src目录路径
// 注意:在vueCLI创建的项目中,无论你在哪里使用@,它永远指向src
import home from '@/views/home'
import article from '@/views/article'
import publish from '@/views/publish'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/layout'
}, {
  path: '/layout',
  component: layout,
  children: [{
    path: '',
    redirect: '/layout/home'
  }, {
    path: '/layout/home',
    component: home
  }, {
    path: '/layout/article',
    component: article
  }, {
    path: '/layout/publish',
    component: publish
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

export default router
