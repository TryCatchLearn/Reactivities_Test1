import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import Activity from '../../../app/models/activity';
import {format, parseISO} from 'date-fns';

interface IProps {
  activity: Activity;
  setSelectedActivity: (activity: Activity | null) => void;
  setEditMode: (editMode: boolean) => void;
}

const ActivityDetails: React.FC<IProps> = ({activity, setSelectedActivity, setEditMode}) => {
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
            <Button basic color='blue' content='Edit' onClick={() => setEditMode(true)}/>
            <Button basic color='grey' content='Cancel' onClick={() => setSelectedActivity(null)}/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
