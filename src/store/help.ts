// helper.ts
import store from './';
// 从我们定义好的mutations中导入UserOptions
import { UserOptions, types } from './mutations';

function commitLogin(info: UserOptions) {
  store.commit(types.login, info);
}

function commitLogout() {
  store.commit(types.logout)
}

export {
  commitLogin,
  commitLogout
}