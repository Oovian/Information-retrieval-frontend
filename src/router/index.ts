import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import about from '../views/AboutView.vue'
import Search from '../views/Search.vue'
import pdfview from '../views/pdfview.vue'
import author from '../views/author.vue'
import UserHome from '../views/UserHome.vue'
import graph from '../views/graph.vue'

const routes = [
  
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: about
  },
  { 
    path: '/', 
    component: Search,
    children: [{
      // 当 /user/:id/profile 匹配成功
      // UserProfile 将被渲染到 User 的 <router-view> 内部
      path: 'pdfview',
      name:'pdfview',
      component: pdfview,
    },
    {
      // 当 /user/:id/posts 匹配成功
      // UserPosts 将被渲染到 User 的 <router-view> 内部
      path: 'author/:name',
      name:'author',
      component: author,
    },
    { path: '', component: UserHome },
  {
    path: '/graph/:name',
    name:'graph',
    component: graph,
  },
  ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
