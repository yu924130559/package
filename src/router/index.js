import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import content from '../views/content/content.vue'
import content_info from '../views/content/content_info.vue'
import content_list from '../views/content/content_list.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/content',
    // name: 'content',
    component:content,
    children: [
      {
         path: 'content_info',
        component:content_info
      },
      {
           path: 'content_list',
        component: content_list
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
