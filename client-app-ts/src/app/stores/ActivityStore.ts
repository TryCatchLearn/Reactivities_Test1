import {createContext, SyntheticEvent} from 'react';
import {observable, action, computed} from 'mobx';
import agent from '../api/agent';
import Activity from '../models/activity';

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activity: Activity | null = null;
    @observable editMode = false;
    @observable loadingInitial = false;
    @observable loading = false;
    @observable submitting = false;
    @observable target: string | null = null;

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
    }

    @action loadActivities = () => {
        this.loadingInitial = true;
        return agent.Activities.list()
            .then((activities) => {
                activities.forEach((activity: Activity) => {
                    activity.date = new Date(activity.date);
                    this.activityRegistry.set(activity.id, activity);
                })
            })
            .finally(() => this.loadingInitial = false);
    }

    @action loadActivity = (id: string, {acceptCached = true}) => {
        if (acceptCached) {
            const activity = this.getActivity(id);
            if (activity) {
                this.activity = activity;
                return Promise.resolve(activity);
            } 
        }
        this.loading = true;
        return agent.Activities.get(id)
            .then((activity: Activity) => {
                activity.date = new Date(activity.date);
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
            })
            .then((activity) => {
                return Promise.resolve(activity);
            })
            .catch(error => {
                throw error;
            })
            .finally(() => this.loading = false);
    }

    @action createActivity = (activity: Activity) => {
        this.submitting = true;
         return agent.Activities.create(activity)
            .then(() => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
            })
            .catch((error) => {
                throw error;
            })
            .finally(() => this.submitting = false);
    }

    @action editActivity = (activity: Activity) => {
        this.submitting = true;
        return agent.Activities.update(activity)
            .then(() => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
            })
            .catch((error) => {
                throw error
            })
            .finally(() => this.submitting = false);
    }

    @action deleteActivity = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = e.currentTarget.name;
        agent.Activities.delete(id)
            .then(() => {
               this.activityRegistry.delete(id);
               this.activity = null;
               this.editMode = false;
            })
            .finally(() => this.submitting = false);
    }

    @action selectActivity = (id: string) => {
        let selectedActivity = this.activityRegistry.get(id);
        if (selectedActivity) this.activity = selectedActivity;
        this.editMode = false;
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    groupActivitiesByDate(activities: Activity[]) {
        const sortedActivities = activities.sort(
            (a, b) => a.date.getTime() - b.date.getTime()
        );
        return Object.entries(
            sortedActivities.reduce((activities, activity) => {
                const date = activity.date.toISOString().split('T')[0];
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }
}

export default createContext(new ActivityStore())