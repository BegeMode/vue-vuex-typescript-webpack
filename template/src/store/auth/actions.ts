import { ActionTree } from 'vuex';
import api from '../../api/login';
import { IUser } from '../profile/types';
import { IRootState } from '../types';
import { setDefaultAuthHeaders } from './index';
import { IAuthState } from './types';

export const actions: ActionTree<IAuthState, IRootState> = {
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state);
    dispatch('validate');
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters, state }, { username, password } = {}): Promise<IUser> {
    if (getters.isAuthentificated) {
      return dispatch('validate');
    }

    return api.login(username, password).then(response => {
      const user: IUser = response.data;
      commit('SET_CURRENT_USER', user);
      return user;
    });
  },

  // Logs out the current user.
  logOut({ commit }): void {
    commit('SET_CURRENT_USER', null);
    api.logout();
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate({ commit, state }): Promise<IUser> | Promise<null> {
    if (!state.currentUser) {
      return Promise.resolve(null);
    }
    return api.checkUser()
      .then(response => {
        const user: IUser = response.data;
        commit('SET_CURRENT_USER', user);
        return user;
      })
      .catch(error => {
        if (error.response.status === 401) {
          commit('SET_CURRENT_USER', null);
        }
        return null;
      });
  },
};
