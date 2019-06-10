import React, { Fragment, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import './App.css';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/ActivityStore';

const App: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { loadingInitial } = activityStore;

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (loadingInitial)
    return <LoadingComponent content='Loading activities...' />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
