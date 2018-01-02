import Axios from '../assets/js/axios_default'


export default {
  getUserBase({ commit, state },playload) {
    Axios.get('/user_account.act?cmd=login&',{params:playload}).
    then(res => {
      commit('SAVE_BASE_DATA', playload) //首次无验证登录成功 存储输入信息
    })
  }
}
