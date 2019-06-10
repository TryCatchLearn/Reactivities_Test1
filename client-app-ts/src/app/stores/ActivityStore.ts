import {createContext, SyntheticEvent} from 'react';
import {observable, action, computed} from 'mobx';
import agent from '../api/agent';
import Activity from '../models/activity';

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activity: Activity | null = null;
    @observable editMode = false;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target: string | null = null;

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    @action loadActivities() {
        this.loadingInitial = true;
        return agent.Activities.list()
            .then((activities) => {
                activities.forEach((activity: Activity) => {
                    this.activityRegistry.set(activity.id, activity);
                })
            })
            .finally(() => this.loadingInitial = false);
    }

    @action createActivity = (activity: Activity) => {
        this.submitting = true;
        agent.Activities.create(activity)
            .then(() => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
            })
            .finally(() => this.submitting = false);
    }

    @action editActivity = (activity: Activity) => {
        this.submitting = true;
        agent.Activities.update(activity)
            .then(() => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
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

    @action cancelSelectActivity = () => {
        this.activity = null;
    }

    @action createFormOpen = () => {
        this.editMode = true;
        this.activity = null;
    }

    @action editFormOpen = (id: string) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = true;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }
}

export default createContext(new ActivityStore())