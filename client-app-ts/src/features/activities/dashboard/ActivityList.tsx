import React, { SyntheticEvent } from 'react';
import { Item, Button, Segment, Label } from 'semantic-ui-react';
import Activity from '../../../app/models/activity';
import {format, parseISO} from 'date-fns';

interface IProps {
  activities: Activity[];
  submitting: boolean;
  target: string;
  selectActivity: (activity: Activity) => void;
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, activityId: string) => void;
}

const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  target
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities && activities.map(activity => (
          <Item key={activity.id.toString()}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{format(parseISO(activity.date), 'dd LLL yyyy')}</Item.Meta>
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
                  onClick={() => selectActivity(activity)}
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

export default ActivityList;
