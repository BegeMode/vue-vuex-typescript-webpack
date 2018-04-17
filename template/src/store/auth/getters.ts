import { GetterTree } from 'vuex';
import { IRootState } from '../types';
import { IAuthState } from './types';

export const getters: GetterTree<IAuthState, IRootState> = {
  isAuthentificated(state: any): any {
    const { currentUser } = state;
    if (currentUser != null) {
      return true;
    }
    return false;
  }
};
