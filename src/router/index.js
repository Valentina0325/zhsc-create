import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import ProDetail from '@/views/prodetail'
import Pay from '@/views/pay'
import MyOrder from '@/views/myorder'
import store from '@/store'

const Layout = () => import('@/views/layout')
const Cart = () => import('@/views/layout/cart')
const Category = () => import('@/views/layout/category')
const Home = () => import('@/views/layout/home')
const User = () => import('@/views/layout/user')
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: 'cart', component: Cart },
        { path: 'category', component: Category },
        { path: 'home', component: Home },
        { path: 'user', component: User }
      ]
    },
    { path: '/login', component: Login },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/searchlist',
      component: SearchList
    },
    {
      path: '/prodetail/:id',
      component: ProDetail
    },
    {
      path: '/pay',
      component: Pay
    },
    {
      path: '/myorder',
      component: MyOrder
    }]
})
const authUrl = ['/pay', '/myorder', '/cart']
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  if (!authUrl.includes(to.path)) {
    next()
    return
  }
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
