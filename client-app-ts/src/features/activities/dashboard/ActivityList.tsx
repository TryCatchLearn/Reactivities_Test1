import React from 'react';
import { Item, Button, Segment, Label } from 'semantic-ui-react';
import Activity from '../../../app/models/activity';

interface IProps {
  activities: Activity[];
  selectActivity: (activity: Activity) => void;
  deleteActivity: (activityId: string) => void;
}

const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id.toString()}>
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
                  onClick={() => selectActivity(activity)}
                />
                <Button
                  floated='right'
                  content='Delete'
                  color='red'
                  onClick={() => deleteActivity(activity.id)}
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
