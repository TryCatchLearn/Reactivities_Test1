import React, { Fragment, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import {ToastContainer} from "react-toastify";
import './App.css';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import LoginForm from '../../features/users/LoginForm';
import { inject } from 'mobx-react';
import ActivityStore from '../stores/ActivityStore';
import CommonStore from '../stores/CommonStore';
import UserStore from '../stores/UserStore';
import ModalContainer from '../common/modals/ModalContainer';

interface IProps extends RouteComponentProps {
  commonStore?: CommonStore,
  userStore?: UserStore
}

const App: React.FC<IProps> = ({location, commonStore, userStore}) => {
  const {setAppLoaded, token, appLoaded} = commonStore!;
  const {getUser} = userStore!;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded)
    return <LoadingComponent content='Loading app...' />;

  return (
    <Fragment>
      <ModalContainer />
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
                <Route path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(inject('activityStore', 'userStore', 'commonStore')(observer(App)));
