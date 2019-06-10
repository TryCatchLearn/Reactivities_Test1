import React, { Fragment, useState, useEffect, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Activity from '../models/activity';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import {format, parseISO} from 'date-fns';

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const handleCreateActivity = (activity: Activity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
      })
      .then(() => {
        setSubmitting(false);
      });
  };

  const handleEditActivity = (activity: Activity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter(a => a.id !== activity.id),
          activity
        ]);
      })
      .then(() => {
        setEditMode(false);
        setSubmitting(false);
      });
  };

  const handleDeleteActivity = (
    e: SyntheticEvent<HTMLButtonElement>,
    activityId: string
  ) => {
    setSubmitting(true);
    setTarget(e.currentTarget.name);
    agent.Activities.delete(activityId)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== activityId)]);
      })
      .then(() => {
        setSubmitting(false);
      });
  };

  const handleOpenCreateForm = () => {
    setEditMode(true);
    setSelectedActivity(null);
  };

  useEffect(() => {
    agent.Activities.list()
      .then(values => {
        values.forEach((activity: Activity) => {
          if (activity.date) {
            activity.date = format(parseISO(activity.date), "yyyy-LL-dd'T'HH:mm")
          }
        });
        setActivities(values);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingComponent content='Loading activities...' />;

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          target={target}
          activities={activities}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          setEditMode={setEditMode}
          editMode={editMode}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
};

export default App;
