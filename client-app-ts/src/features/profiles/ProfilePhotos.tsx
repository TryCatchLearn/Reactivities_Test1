import React, { useState } from 'react';
import { Tab, Header, Card, Image, Grid, Button } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import ProfileStore from '../../app/stores/ProfileStore';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';

interface IProps {
  profileStore?: ProfileStore;
}

const ProfilePhotos: React.FC<IProps> = ({ profileStore }) => {
  const {
    profile,
    isCurrentUser,
    uploadPhoto,
    uploadingPhoto,
    setMainPhoto,
    loading,
    targetButton,
    deletePhoto,
    deletingPhoto
  } = profileStore!;
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  const handlePhotoUpload = (image: Blob) => {
    uploadPhoto(image).then(() => setAddPhotoMode(false));
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='image' content='Photos' />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handlePhotoUpload}
              loading={uploadingPhoto}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map(photo => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          name={photo.id}
                          loading={targetButton === photo.id && loading}
                          onClick={e => setMainPhoto(photo, e)}
                          basic
                          color='green'
                          content='Main'
                          disabled={photo.isMain}
                        />
                        <Button
                          onClick={e => deletePhoto(photo, e)}
                          name={photo.id}
                          loading={targetButton === photo.id && deletingPhoto}
                          disabled={photo.isMain}
                          basic
                          color='red'
                          icon='trash'
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default inject('profileStore')(observer(ProfilePhotos));
