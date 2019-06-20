import { action, observable, computed } from 'mobx';
import agent from '../api/agent';
import { RootStore } from './RootStore';
import { IProfile, IPhoto } from '../models/profile';
import { toast } from 'react-toastify';
import { SyntheticEvent } from 'react';

export default class ProfileStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable profile: IProfile | null = null;
  @observable loadingProfile = false;
  @observable uploadingPhoto = false;
  @observable loading = false;
  @observable deletingPhoto = false;
  @observable targetButton = null;

  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile)
      return this.rootStore.userStore.user.username === this.profile.username;
    return null;
  }

  @action loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      this.profile = await agent.Profiles.get(username);
      this.loadingProfile = false;
    } catch (err) {
      console.log(err);
    }
  };

  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.Profiles.uploadPhoto(file);
      if (this.profile) {
        this.profile.photos.push(photo);
        if (photo.isMain && this.rootStore.userStore.user) {
          this.rootStore.userStore.user.image = photo.url;
          this.profile.image = photo.url;
        }
        this.uploadingPhoto = false;
      }
    } catch (error) {
      console.log(error);
      toast.error('Problem uploading photo');
      this.uploadingPhoto = false;
    }
  };

  @action setMainPhoto = (photo: IPhoto, e: any) => {
    this.loading = true;
    this.targetButton = e.target.name
    agent.Profiles.setMainPhoto(photo.id)
      .then(() => {
        this.rootStore.userStore.user!.image = photo.url;
        this.profile!.photos.find(a => a.isMain)!.isMain = false;
        this.profile!.photos.find(a => a.id === photo.id)!.isMain = true;
        this.profile!.image = photo.url;
      })
      .catch(err => {
        toast.error('Problem setting photo as main')
      })
      .finally(() => {
        this.loading = false;
        this.targetButton = null;
      } )
  }

  @action deletePhoto = (photo: IPhoto, e: any) => {
    this.targetButton = e.target.name;
    this.deletingPhoto = true;
    agent.Profiles.deletePhoto(photo.id)
      .then(() => {
        this.profile!.photos = this.profile!.photos.filter(a => a.id !== photo.id);
      })
      .catch(err => {
        toast.error(err);
      })
      .finally(() => {
        this.deletingPhoto = false;
        this.targetButton = null;
      })
  }
}
