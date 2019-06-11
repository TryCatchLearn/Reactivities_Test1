import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid} from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/ActivityStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity,
    loadActivity,
    loading
  } = activityStore;

  useEffect(
    () => {
      loadActivity(match.params.id, {acceptCached: true})
    }, [activityStore ,loadActivity, match.params.id]
  );

  if (loading) return <LoadingComponent content='Loading activity...' />

  if (activity) {
    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity} />
          <ActivityDetailedInfo activity={activity} />
          <ActivityDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar />
        </Grid.Column>
      </Grid>
    );
  } else {
    return <h2>Activity not found</h2>;
  }
};

export default observer(ActivityDetails);
