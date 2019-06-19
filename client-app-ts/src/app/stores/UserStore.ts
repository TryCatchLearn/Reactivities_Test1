import { observable, action, computed, runInAction } from 'mobx';
import agent from '../api/agent';
import { RootStore } from './RootStore';
import { IUser, IUserForLogin, IUserForRegister } from '../models/user';

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable loading = false;
  @observable user: any = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = (user: IUserForLogin) => {
    this.loading = true;
    return agent.User.login(user)
      .then((user: IUser) => {
        this.rootStore.commonStore.setToken(user.token);
        this.rootStore.modalStore.closeModal();
        this.rootStore.routerStore.push('/activities');
      })
      .catch(error => {
        throw error;
      })
      .finally(() => (this.loading = false));
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    this.rootStore.routerStore.push('/');
  };

  @action register = async (userValues: IUserForRegister) => {
    this.loading = true;
    try {
      const user = await agent.User.register(userValues);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      this.rootStore.routerStore.push('/activities');
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loading = false;
      });
      throw error;
    }
  };

  @action getUser = async () => {
    this.loading = true;
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
