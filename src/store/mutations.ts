import { Mutation, MutationTree } from 'vuex';
import { UserOptions } from './state'

interface StateOptions {
  user: UserOptions
}

const types = {
  login: 'LOGIN',
  logout: 'LOGOUT'
}

// mutation的泛型用于定义state类型
const login:Mutation<StateOptions> = function(state, payload: UserOptions) {
  state.user = { ...state.user, ...payload };
}

const logout: Mutation<StateOptions> = function(state) {
  state.user = {};
}

// 定义mutations
// MutationTree的泛型用于定义store的state类型
const mutations: MutationTree<StateOptions> = {
  [types.login]: login,
  [types.logout]: logout
}

export {
  mutations,
  UserOptions,
  types
}