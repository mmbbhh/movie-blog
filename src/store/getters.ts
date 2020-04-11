import { State } from "./state";

export const getters = {
  ifLogin(state: State) {
    return ! (typeof (state.user.id) == 'undefined')
  }
}