import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';
import ActivityStore from '../../../app/stores/ActivityStore';
import { inject, observer } from 'mobx-react';

interface DetailParams {
  id: string;
}

interface IProps extends RouteComponentProps<DetailParams> {
  activityStore: ActivityStore
}

const ActivityDetails: React.FC<IProps> = ({
  match,
  history,
  activityStore
}) => {
  const { activity, loadActivity, loading } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id, { acceptCached: true })
      .catch((error) => {
        if (error.status === 404) {
          history.push('/notfound')
        }
      })
  }, [loadActivity, match.params.id, history]);

  if (loading || !activity)
    return <LoadingComponent content='Loading activity...' />;

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
};
export default inject('activityStore')(observer(ActivityDetails));
