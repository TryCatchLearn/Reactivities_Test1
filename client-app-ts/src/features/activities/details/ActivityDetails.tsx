import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import {format, parseISO} from 'date-fns';
import ActivityStore from '../../../app/stores/ActivityStore';

const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {editFormOpen, cancelSelectActivity, activity} = activityStore;

  if (activity) {
    return (
      <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span>{format(parseISO(activity.date), 'dd LLL yyyy')}</span>
          </Card.Meta>
          <Card.Description>
            {activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
              <Button basic color='blue' content='Edit' onClick={() => editFormOpen(activity.id)}/>
              <Button basic color='grey' content='Cancel' onClick={cancelSelectActivity}/>
          </Button.Group>
        </Card.Content>
      </Card>
    );
  } else {
    return <h2>Activity not found</h2>
  }
};

export default ActivityDetails;
