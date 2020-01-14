// @flow
import axios, { AxiosPromise } from 'axios';
const url_base = 'http://localhost:4000/user';
import { User } from './modelService';

export class UserService {
  static getUser(): AxiosPromise<User> {
    let url = url_base + '';
    let token = localStorage.getItem('token');
    return axios.get(url, {}, { headers: { 'x-access-token': token } }).then(response => {
      return response;
    });
  }
}