import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Browse from '@/components/Browse'
import Search from '@/components/Search'
import MyBook from '@/components/MyBook'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Browse',
      name: 'Browse',
      component: Browse
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/MyBook',
      name: 'MyBook',
      component: MyBook
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
