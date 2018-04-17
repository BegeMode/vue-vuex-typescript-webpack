import axios from 'axios';
import { Module } from 'vuex';
import { IUser } from '../profile/types';
import { IRootState } from '../types';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { IAuthState } from './types';

export const state: IAuthState = {
  currentUser: getSavedState('auth.currentUser'),
};

const namespaced: boolean = true;

export const auth: Module<IAuthState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};

// ===
// Private helper
// ===
function getSavedState(key: string): IUser | undefined {
  const user = window.localStorage.getItem(key);
  if (user != null) return JSON.parse(user);
  return undefined;
}

export function setDefaultAuthHeaders(authState: IAuthState | any): void {
  axios.defaults.headers.common.Authorization = authState.currentUser
    ? authState.currentUser.token
    : '';
}
