import React, { useState } from 'react';
import { Tab, Grid, Header, Button } from 'semantic-ui-react';
import ProfileEditForm from './ProfileEditForm';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import ProfileStore from '../../app/stores/ProfileStore';

interface IProps {
  profileStore?: ProfileStore;
}

const ProfileDescription: React.FC<IProps> = ({ profileStore }) => {
  const { isCurrentUser, profile, updateProfile, loading } = profileStore!;
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={`About ${profile!.displayName}`} />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Edit Profile'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? <ProfileEditForm updateProfile={updateProfile} profile={profile!} loading={loading} /> : <span>{profile!.bio}</span>}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default inject('profileStore')(observer(ProfileDescription));
