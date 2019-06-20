import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import Activity from '../models/activity';
import { toast } from 'react-toastify';
import { IUserForLogin, IUserForRegister, IUser } from '../models/user';
import { IProfile, IPhoto } from '../models/profile';

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
      .then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios.post(url, formData, {
      headers: {'Content-type': 'multipart/form-data'}
    })
    .then(responseBody);
  }
};

const Activities = {
  list: () => requests.get(`/activities`),
  get: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: Activity) => requests.post(`/activities`, activity),
  update: (activity: Activity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (activityId: string) => requests.del(`/activities/${activityId}`),
  attend: (activityId: string) => requests.post(`/activities/${activityId}/attend`, {}),
  unattend: (activityId: string) => requests.del(`/activities/${activityId}/attend`)
};

const User = {
  current: (): Promise<IUser> => requests.get(`/user`),
  login: (user: IUserForLogin): Promise<IUser> => requests.post(`/user/login`, user),
  register: (user: IUserForRegister): Promise<IUser> => requests.post(`/user/register`, user)
};

const Profiles = {
  get: (username: string): Promise<IProfile> => requests.get(`/profiles/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos`, photo),
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.del(`/photos/${id}`),
  updateProfile: (profile: Partial<IProfile>) => requests.put(`/profiles`, profile)
}

export default {
  Activities,
  User,
  Profiles
};
