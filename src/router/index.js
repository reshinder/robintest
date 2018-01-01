import Vue from 'vue'
import Router from 'vue-router'
import VeeValidate from 'vee-validate'
import qs from 'qs'
import Home from '../components/home'
import Trade from '../components/trade/trade.vue'
import User from '../components/usersystem/UserSystem.vue'
import Login from '../components/usersystem/Login.vue' //登录界面
import FindPassword from '../components/usersystem/FindPassword.vue' //找回密码
import Authentication from '../components/usersystem/Authentication.vue' //登录认证界面
import Account from '../components/usersystem/Account.vue'
import Security from '../components/usersystem/Security.vue'
import Notification from '../components/usersystem/Notification.vue'
import Verification from '../components/usersystem/Verification.vue'
import AddressBook from '../components/usersystem/AddressBook.vue'
import Report from '../components/usersystem/Report.vue'
import OrderHistory from '../components/usersystem/OrderHistory.vue'
import Balance from '../components/usersystem/Balance.vue'
import Deposit from '../components/usersystem/Deposit.vue'
import Withdraw from '../components/usersystem/Withdraw.vue'

import Assets from '../components/assets/assets.vue'


Vue.use(Router)
Vue.use(VeeValidate);
//Vue.use(qs);

export default new Router({
  routes: [
    {
      path: '/user', component: User,
      children: [
         {
         path: 'account',
         component: Account
         },
         {
         path: 'security',
         component: Security
         },
         {
          path: 'notification',
          component: Notification
         },
         {
          path: 'verification',
          component: Verification
         },
        {
          path: 'address_book',
          component: AddressBook
        },
        {
          path: 'report',
          component: Report,
          children: [
            {
              path:'balance',
              component: Balance
            },
            {
              path:'order_history',
              component: OrderHistory
            },
            {
              path:'deposit',
              component: Deposit
            },
            {
              path:'withdraw',
              component: Withdraw
            }
          ]
        },
      ]
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/findpassword',
      component: FindPassword,
    },
    {
      path: '/login_authentication',
      component: Authentication,
    },
    {
      path: '/trade', component: Trade,
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
    {
      path: '/home', component: Home,
    },
    { path: '/', redirect: '/login' }
  ]
})
