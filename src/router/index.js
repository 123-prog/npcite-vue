import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Index from '@/components/Index'
import Info from '@/components/UserInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/user/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/register',
      name:'register',
      component: Register
    },
    {
      path:'/index/show',
      name:'index',
      component: Index
    },
    {
      path:'/user/info',
      name:'info',
      component: Info
    }
  ]
})
