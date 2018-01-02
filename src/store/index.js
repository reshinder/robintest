import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action';
import mutations from './mutation';
import getters from './getter';
import state from './rootState';
Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
export default store;
