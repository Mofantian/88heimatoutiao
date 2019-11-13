import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home' // 简写路径,简写了index.vue
import login from '../views/login' // 简写路径,简写了index.vue

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  name: 'home',
  component: Home
}, {
  path: '/login',
  name: 'login',
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
