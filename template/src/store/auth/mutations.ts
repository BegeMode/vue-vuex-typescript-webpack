import { MutationTree } from 'vuex';
import { IUser } from '../profile/types';
import { setDefaultAuthHeaders } from './index';
import { IAuthState } from './types';

export const mutations: MutationTree<IAuthState> = {
  // tslint:disable-next-line:function-name
  SET_CURRENT_USER(state: IAuthState, newValue: IUser): void {
    state.currentUser = newValue;
    saveState('auth.currentUser', newValue);
    setDefaultAuthHeaders(state);
  },
};

// ===
// Private helper
// ===
function saveState(key: string, user: any): void {
  window.localStorage.setItem(key, JSON.stringify(user));
}
