import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import Activity from '../../../app/models/activity';
import {format} from 'date-fns';
import { Link } from 'react-router-dom';

const eventImageStyle = {
    filter: "brightness(30%)"
  };
  
  const eventImageTextStyle = {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white"
  };

const ActivityDetailedHeader: React.FC<{activity: Activity}> = ({activity}) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={activity.title}
                  style={{ color: 'white' }}
                />
                <p>{activity.date && format(activity.date, 'dddd do MMMM')}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        <Button color='teal'>Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button
          as={Link}
          to={`/manage/${activity.id}`}
          color='orange'
          floated='right'
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default ActivityDetailedHeader;
