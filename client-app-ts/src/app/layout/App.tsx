import React, { Fragment, useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import axios from 'axios';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Activity from '../models/activity';

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const handleCreateActivity = (activity: Activity) => {
    setActivities([...activities, activity]);
  };

  const handleEditActivity = (activity: Activity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setEditMode(false);
  };

  const handleDeleteActivity = (activityId: string) => {
    setActivities([...activities.filter(a => a.id !== activityId)])
  }

  const handleOpenCreateForm = () => {
    console.log('handle create fired');
    setEditMode(true);
    setSelectedActivity(null);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(values => {
      setActivities(values.data);
    });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          setEditMode={setEditMode}
          editMode={editMode}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
