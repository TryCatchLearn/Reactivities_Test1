import UserStore from "./UserStore";
import ActivityStore from "./ActivityStore";
import CommonStore from "./CommonStore";
import { AppRouterStore } from "./AppRouterStore";
import { ModalStore } from "./ModalStore";

export class RootStore {
    userStore: UserStore;
    activityStore: ActivityStore;
    commonStore: CommonStore;
    routerStore: AppRouterStore;
    modalStore: ModalStore;
    constructor() {
        this.userStore = new UserStore(this);
        this.activityStore = new ActivityStore(this);
        this.commonStore = new CommonStore(this);
        this.routerStore = new AppRouterStore(this);
        this.modalStore = new ModalStore(this);
    }
}
