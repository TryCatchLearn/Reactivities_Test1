import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import Activity from '../models/activity';
import { toast } from 'react-toastify';
import { IUserForLogin, IUserForRegister, IUser } from '../models/user';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error && error.response && error.response.status === 400) {
    throw error.response;
  }
  if (error && error.response && error.response.status === 401) {
    throw error.response;
  }
  if (error && error.response && error.response.status === 404) {
    throw error.response;
  }
  if (error && error.response && error.response.status === 500) {
    toast.error(error.response.data.errors);
  }
});

const responseBody = (res: AxiosResponse) => res.data;

const sleep = (ms: number) => (x: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(x), ms));

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody)
};

const Activities = {
  list: () => requests.get(`/activities`),
  get: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: Activity) => requests.post(`/activities`, activity),
  update: (activity: Activity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (activityId: string) => requests.del(`/activities/${activityId}`)
};

const User = {
  current: (): Promise<IUser> => requests.get(`/user`),
  login: (user: IUserForLogin): Promise<IUser> => requests.post(`/user/login`, user),
  register: (user: IUserForRegister): Promise<IUser> => requests.post(`/user/register`, user)
};

export default {
  Activities,
  User
};
