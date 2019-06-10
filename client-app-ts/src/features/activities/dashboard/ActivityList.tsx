import React, { useContext } from 'react';
import { Item, Button, Segment, Label } from 'semantic-ui-react';
import {format, parseISO} from 'date-fns';
import ActivityStore from '../../../app/stores/ActivityStore';
import { observer } from 'mobx-react-lite';

const ActivityList: React.FC = () => {

  const activityStore = useContext(ActivityStore);
  const {activitiesByDate: activities, selectActivity, submitting, target, deleteActivity} = activityStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {activities && activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.venue}, {activity.city}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated='right'
                  content='View'
                  color='blue'
                  onClick={() => selectActivity(activity.id)}
                />
                <Button
                  loading={target === activity.id && submitting}
                  name={activity.id}
                  floated='right'
                  content='Delete'
                  color='red'
                  onClick={(e) => deleteActivity(e, activity.id)}
                />
                <Label basic>{activity.category}</Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
