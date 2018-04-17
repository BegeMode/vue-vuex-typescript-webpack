import axios, { AxiosPromise } from 'axios';
import { IUser } from '../store/profile/types';

// Fake REST API
const url: string = 'https://reqres.in/api/';

const login = (username: string, password: string): AxiosPromise<IUser> => {
  return axios.post<IUser>(url + 'login', { email: 'peter@klaven', password: 'cityslicka' });
};

const logout = (): void => {
  axios.post(url + 'logout');
};

const checkUser = (): AxiosPromise<IUser> => {
  return axios.get<IUser>(url + 'login');
};

export default {
  login,
  logout,
  checkUser
};
