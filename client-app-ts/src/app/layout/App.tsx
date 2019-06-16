import React, { Fragment, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import {ToastContainer} from "react-toastify";
import './App.css';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/ActivityStore';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import TestForm from '../../features/activities/form/TestForm';

const App: React.FC<RouteComponentProps> = ({location}) => {
  const activityStore = useContext(ActivityStore);
  const { loadingInitial } = activityStore;

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (loadingInitial)
    return <LoadingComponent content='Loading activities...' />;

  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <ToastContainer position='bottom-right' />
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch key={location.key}>
                <Route exact path='/activities' component={ActivityDashboard} />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route path='/testForm' component={TestForm} />
                <Route path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
