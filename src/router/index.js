import Vue from 'vue'
import VueRouter from 'vue-router'
import CesiumView from '../views/View.vue'
Vue.use(VueRouter)

const routes = [
  {
      path: '/',
      name: 'Cesium',
      component: CesiumView
  },
  // {
  //     path: '/sub',
  //     name: 'SubCesium',
  //     component: SubCesiumView
  // }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
