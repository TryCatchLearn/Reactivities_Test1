import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';
import {format} from 'date-fns'
import { inject } from 'mobx-react';
import ActivityStore from '../../../app/stores/ActivityStore';

interface IProps {
  activityStore?: ActivityStore
}

const ActivityList: React.FC<IProps> = ({activityStore}) => {
  const { activitiesByDate: activities } = activityStore!;

  return (
    <Fragment>
      {activities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color='teal'>
            {format(new Date(group), 'eeee do LLLL')}
          </Header>
          {activities &&
            activities.map(activity => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default inject('activityStore')(observer(ActivityList));
