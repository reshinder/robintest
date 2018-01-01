import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import Trade from '../components/trade/trade.vue'
import User from '../components/usersystem/UserSystem.vue'
import Assets from '../components/assets/assets.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user', component: User,
      children: [
         {
         path: 'account',
         component: User
         },
       /*  {
         path: 'security',
         component: Security
         },*/


      ]
    },
    {
      path: '/trade', component: Trade
    },
    {
      path: '/home', component: Home,
      children: [
        /* {
         path: 'account',
         component: Account
         },
         {
         path: 'security',
         component: Security
         },
         ...*/
      ]
    },
    { path: '/', redirect: '/user' }
  ]
})
