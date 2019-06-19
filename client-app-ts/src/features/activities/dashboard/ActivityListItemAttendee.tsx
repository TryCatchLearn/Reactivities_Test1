import React from 'react';
import { observer } from 'mobx-react';
import { ListItem, Image, List, Popup } from 'semantic-ui-react';
import { Attendee } from '../../../app/models/activity';
import { Link } from 'react-router-dom';

interface IProps {
  attendees: Attendee[];
}

const ActivityListItemAttendee: React.FC<IProps> = observer(({ attendees }) => (
  <List horizontal>
    {attendees.map(attendee => (
      <ListItem key={attendee.username} as={Link} to={`/profile/${attendee.username}`}>
          <Popup 
            header={attendee.displayName}
            trigger={<Image size={'mini'} circular src={attendee.image || '/assets/user.png'} />}
          />
      </ListItem>
    ))}
  </List>
));

export default ActivityListItemAttendee;
