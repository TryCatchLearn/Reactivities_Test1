import { observable, action } from "mobx";
import { RootStore } from "./RootStore";

export class ModalStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
    }

    @observable modal = {
        open: false,
        header: null,
        component: null
    };

    @action openModal = (props: any) => {
        this.modal.open = true;
        this.modal.header = props.header;
        this.modal.component = props.component;
    }

    @action closeModal = () => {
        this.modal.open = false;
        this.modal.header = null;
        this.modal.component = null;
    }
}