import Vue from 'vue';
import vuex, { StoreOptions } from 'vuex';
import { auth } from './auth/index';
import { IRootState } from './types';

Vue.use(vuex);

const store: StoreOptions<IRootState> = {
  state: {
    version: '1.0.0' // a simple property
  },
  modules: {
    auth
  }
};

export default new vuex.Store<IRootState>(store);
