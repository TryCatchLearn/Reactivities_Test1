import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import PhotoUploadWidgetDropzone from './PhotoUploadWidgetDropzone';
import PhotoUploadWidgetCropper from './PhotoUploadWidgetCropper';

interface IProps {
  loading: boolean,
  uploadPhoto: (file: Blob) => void;
}

const PhotoUploadWidget: React.FC<IProps> = ({loading, uploadPhoto}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [image, setImage] = useState<Blob | null>(null);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Row />
      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 1 - Add Photo' />
        <PhotoUploadWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 2 - Resize image' />
        {files.length > 0 &&
        <PhotoUploadWidgetCropper setImage={setImage} imagePreview={files[0].preview} />}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 3 - Preview & Upload' />
        {files.length > 0 && (
          <Fragment>
            <div className='img-preview' style={{minHeight: '200px', overflow: 'hidden'}} />
            <Button.Group widths={2}>
              <Button loading={loading} onClick={() => uploadPhoto(image!)} positive icon='check' />
              <Button disabled={loading} icon='close' />
            </Button.Group>
          </Fragment>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default PhotoUploadWidget;
