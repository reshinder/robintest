import Vue from 'vue'
import Router from 'vue-router'
/*import VeeValidate from 'vee-validate'
 import qs from 'qs'*/
import Home from '../components/home'
import Trade from '../components/trade/trade.vue'
import User from '../components/usersystem/UserSystem.vue'
import Login from '../components/usersystem/Login.vue' //登录界面
import FindPassword from '../components/usersystem/findpassword/FindPassword.vue' //找回密码
import RequestConfirm from '../components/usersystem/findpassword/children/RequestConfirm.vue'
import EmailSendTip from '../components/usersystem/findpassword/children/EmailSendTip.vue'
import PasswordEndter from '../components/usersystem/findpassword/children/PasswordEndter.vue'
import ResetSuccessful from '../components/usersystem/findpassword/children/ResetSuccessful.vue'

import Authentication from '../components/usersystem/authentication/Authentication.vue' //登录认证界面
import SmsAuthentication from '../components/usersystem/authentication/children/SmsAuthentication.vue' //登录认证界面sms
import GoogleAuthentication from '../components/usersystem/authentication/children/GooleAuthentication.vue' //登录认证界面gl
import AuthenticationSuccess from '../components/usersystem/authentication/children/AuthenticationSuccess.vue' //登录认证成功
import Account from '../components/usersystem/Account.vue'
import Security from '../components/usersystem/Security.vue'
import Notification from '../components/usersystem/Notification.vue'
import Verification from '../components/usersystem/Verification.vue'
import AddressBook from '../components/usersystem/AddressBook.vue'
import Report from '../components/usersystem/report/Report.vue'
import OrderHistory from '../components/usersystem/report/children/OrderHistory.vue'
import Balance from '../components/usersystem/report/children/Balance.vue'
import Deposit from '../components/usersystem/report/children/Deposit.vue'
import Withdraw from '../components/usersystem/report/children/Withdraw.vue'

import Assets from '../components/assets/assets.vue'


Vue.use(Router)
//Vue.use(VeeValidate);
//Vue.use(qs);

export default new Router({
  routes: [
    {
      path: '/user',
      component: User,
      children: [
        {
          path: '',
          component: Account
        },
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
              path: '',
              component: Balance
            },
            {
              path: 'balance',
              component: Balance
            },
            {
              path: 'order_history',
              component: OrderHistory
            },
            {
              path: 'deposit',
              component: Deposit
            },
            {
              path: 'withdraw',
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
      children: [
        {
          path: '',
          component: RequestConfirm
        },
        {
          path: 'email_send_tip',
          component: EmailSendTip
        },
        {
          path: 'password_enter',
          component: PasswordEndter
        },
        {
          path: 'reset_successful',
          component: ResetSuccessful
        }
      ]
    },
    {
      path: '/authentication',
      component: Authentication,
      children: [
        {
          path: 'sms_authentication',
          component: SmsAuthentication
        },
        {
          path: 'google_authentication',
          component: GoogleAuthentication
        },
        {
          path: 'authentication_success',
          component: AuthenticationSuccess
        }
      ]
    },
    {
      path: '/trade', component: Trade,
    },
    {
      path: '/home', component: Home,
    },
    {path: '/', redirect: '/login'}
  ]
})
