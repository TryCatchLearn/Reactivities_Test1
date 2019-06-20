import React, { useRef } from 'react';
import 'cropperjs/dist/cropper.css';
import ReactCropper from 'react-cropper';

interface IProps {
  setImage: (file: any) => void;
  imagePreview: string;
}

const PhotoUploadWidgetCropper: React.FC<IProps> = ({
  setImage,
  imagePreview
}) => {
  const cropper = useRef<ReactCropper>(null);
  const cropImage = () => {
    if (
      cropper.current &&
      typeof cropper.current.getCroppedCanvas() === 'undefined'
    ) {
      return;
    }
    cropper &&
      cropper.current &&
      cropper.current.getCroppedCanvas().toBlob(blob => {
        setImage(blob);
      }, 'image/jpeg');
  };

  return (
    <ReactCropper
      ref={cropper}
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
      // Cropper.js options
      aspectRatio={1}
      preview='.img-preview'
      guides={false}
      viewMode={1}
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
    />
  );
};

export default PhotoUploadWidgetCropper;
