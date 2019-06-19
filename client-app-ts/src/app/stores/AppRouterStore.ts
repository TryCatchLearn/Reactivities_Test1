import { RouterStore } from 'mobx-react-router';
import { RootStore } from './RootStore';

export class AppRouterStore extends RouterStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    super();
    this.rootStore = rootStore;
  }
}
