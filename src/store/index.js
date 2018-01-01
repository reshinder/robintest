import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './action';
import * as mutations from './mutation';
import * as getters from './getter';
import state from './rootState';
Vue.use(Vuex)
const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
export default store;
