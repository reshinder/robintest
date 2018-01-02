const GET_BASE_DATA = 'GET_BASE_DATA'
const SAVE_BASE_DATA = 'SAVE_BASE_DATA'


export default {
  [GET_BASE_DATA](state, payload) {
    if (payload.res.status == 200) {
      state.baseInfo = payload.res.data;
    }
  },
  [SAVE_BASE_DATA](state, payload) {
      state.userName = payload.userName;
      state.password = payload.password;
  }
}
