/**
 * @author yurt
 * @date 2018-6-6 15:38
 */


import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import action from './action'
import getters from './getters'
import mutations from './mutations'


Vue.use(Vuex);

export default new Vuex.Store({
  state, action, getters, mutations
})
