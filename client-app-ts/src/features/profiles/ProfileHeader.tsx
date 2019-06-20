import React from 'react';
import { Segment, Item, Header, Button } from 'semantic-ui-react';
import { IProfile } from '../../app/models/profile';
import { observer } from 'mobx-react';

interface IProps {
  profile: IProfile
}

const ProfileHeader: React.FC<IProps> = ({profile}) => {
  return (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
          <Item.Content verticalAlign='middle'>
            <Header as='h1'>{profile.displayName}</Header>
            <Item.Extra>
              <Button basic content={'Follow'} color={'teal'} />
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

export default observer(ProfileHeader);
