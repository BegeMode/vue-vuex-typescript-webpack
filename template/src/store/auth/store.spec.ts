import { expect } from 'chai';
import rewiremock from 'rewiremock';
import { testAction } from '../../util/actions-test';
import { getters } from './getters';
import { mutations } from './mutations';
import { IAuthState } from './types';

const user = {
  login: 'user',
  firstName: 'u',
  lastName: 'l',
  email: '@@@'
};
const { SET_CURRENT_USER } = mutations;
let fakeState: IAuthState;
let actions;

describe('auth mutations', () => {
  it('SET_CURRENT_USER', () => {
    // arrange: initial state
    const state: IAuthState = {
      currentUser: null
    };
    // act: apply mutation
    SET_CURRENT_USER(state, user);
    // assert: evaluate the result
    expect(state.currentUser).to.not.equal(null);
    expect(state.currentUser.login).to.equal('user');
  });
});

describe('auth getters', () => {
  it('isAuthentificated', () => {
    // arrange
    fakeState = {
      currentUser: user
    };

    // act
    const result = getters.isAuthentificated(fakeState, getters, null, null);

    // assert
    expect(result).to.deep.equal(true);
  });
});

rewiremock('../../api/login').withDefault({
  login(username, password) {
    return Promise.resolve({ data: user });
  },
  // tslint:disable-next-line:no-empty
  logout() {
  },
  checkUser() {
    return Promise.reject({ response: { status: 401 } });
  }
});

describe('auth actions', () => {
  beforeEach(() => {
    fakeState = {
      currentUser: null
    };
    rewiremock.enable();
    actions = require('./actions').actions;
  });
  afterEach(() => {
    rewiremock.disable();
  });

  it('log in', done => {
    const mockGetters = {
      isAuthentificated: false
    };
    testAction(actions.logIn, { username: 'name', password: 'psw' }, fakeState, mockGetters, [
      { type: 'SET_CURRENT_USER', payload: user },
    ], done);
  });

  it('log out', done => {
    fakeState = {
      currentUser: user
    };
    testAction(actions.logOut, {}, fakeState, getters, [
      { type: 'SET_CURRENT_USER', payload: null },
    ], done);
  });

  it('validate error', done => {
    fakeState = {
      currentUser: user
    };
    testAction(actions.validate, {}, fakeState, getters, [
      { type: 'SET_CURRENT_USER', payload: null },
    ], done);
  });
});
