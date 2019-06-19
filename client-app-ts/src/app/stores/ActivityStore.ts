import { SyntheticEvent } from 'react';
import { observable, action, computed } from 'mobx';
import agent from '../api/agent';
import Activity, { Attendee } from '../models/activity';
import { RootStore } from './RootStore';
import { setActivityProps, createAttendee } from '../common/util/util';
import { toast } from 'react-toastify';

export default class ActivityStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable activityRegistry = new Map();
  @observable activity: Activity | null = null;
  @observable loadingInitial = true;
  @observable loading = false;
  @observable submitting = false;
  @observable target: string | null = null;

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  @action loadActivities = () => {
    const user = this.rootStore.userStore.user;
    return agent.Activities.list()
      .then(activities => {
        activities.forEach((activity: Activity) => {
          setActivityProps(activity, user!);
          this.activityRegistry.set(activity.id, activity);
        });
      })
      .finally(() => (this.loadingInitial = false));
  };

  @action loadActivity = (id: string, { acceptCached = true }) => {
    if (acceptCached) {
      const activity = this.getActivity(id);
      if (activity) {
        this.activity = activity;
        return Promise.resolve(activity);
      }
    }
    this.loadingInitial = true;
    const user = this.rootStore.userStore.user;
    return agent.Activities.get(id)
      .then((activity: Activity) => {
        setActivityProps(activity, user!);
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
      })
      .then(activity => {
        return Promise.resolve(activity);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => (this.loadingInitial = false));
  };

  @action createActivity = (activity: Activity) => {
    this.submitting = true;
    const attendee = createAttendee(this.rootStore.userStore.user!);
    attendee.isHost = true;
    let attendees: Attendee[] = []
    attendees.push(attendee);
    activity.attendees = attendees
    return agent.Activities.create(activity)
      .then(() => {
        activity.isGoing = true;
        activity.isHost = true;
        activity.host = attendee;
        this.activityRegistry.set(activity.id, activity);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => (this.submitting = false));
  };

  @action editActivity = (activity: Activity) => {
    this.submitting = true;
    return agent.Activities.update(activity)
      .then(() => {
        this.activityRegistry.set(activity.id, activity);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => (this.submitting = false));
  };

  @action deleteActivity = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = e.currentTarget.name;
    agent.Activities.delete(id)
      .then(() => {
        this.activityRegistry.delete(id);
        this.activity = null;
      })
      .finally(() => (this.submitting = false));
  };

  @action selectActivity = (id: string) => {
    let selectedActivity = this.activityRegistry.get(id);
    if (selectedActivity) this.activity = selectedActivity;
  };

  @action attendActivity = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      if (this.activity) {
        await agent.Activities.attend(this.activity.id);
        this.activity.attendees.push(attendee);
        this.activity.isGoing = true;
        this.activityRegistry.set(this.activity.id, this.activity);
        this.loading = false;
      }
    } catch (error) {
      this.loading = false;
      toast.error('Problem signing up to event');
    }
  };

  @action cancelAttendance = async () => {
    const user = this.rootStore.userStore.user;
    if (this.activity && user) {
      try {
        this.loading = true;
        await agent.Activities.unattend(this.activity.id);
        this.activity.attendees = this.activity.attendees.filter(
          a => a.username !== user.username
        );
        this.activity.isGoing = false;
        this.activityRegistry.set(this.activity.id, this.activity);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        toast.error('Oops - problem cancelling attendance');
      }
    }
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  groupActivitiesByDate(activities: Activity[]) {
    const sortedActivities = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return Object.entries(
      sortedActivities.reduce(
        (activities, activity) => {
          const date = activity.date.toISOString().split('T')[0];
          activities[date] = activities[date]
            ? [...activities[date], activity]
            : [activity];
          return activities;
        },
        {} as { [key: string]: Activity[] }
      )
    );
  }
}
