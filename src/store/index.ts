import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import { mutations } from "./mutations"
import { actions } from "./actions";
import { getters } from "./getters";

//数据持久化插件
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  },
  plugins: [createPersistedState({
    storage:window.sessionStorage
  })]
})
