import React, {useEffect} from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import { inject } from 'mobx-react';
import ActivityStore from '../../../app/stores/ActivityStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

interface IProps {
  activityStore: ActivityStore
}

const ActivityDashboard: React.FC<IProps> = ({activityStore}) => {
  const {loadActivities, loadingInitial} = activityStore;

  useEffect(() => {
    loadActivities();
  }, [loadActivities])

  if (loadingInitial) return <LoadingComponent content='Loading activities...' />

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity feed?</h2>
      </Grid.Column>
    </Grid>
  );
};

export default inject('activityStore')(observer(ActivityDashboard));
