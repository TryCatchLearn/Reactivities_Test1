import React from 'react';
import { Form, Label, FormFieldProps } from 'semantic-ui-react';

interface IProps extends FormFieldProps {}

const TextInputFormik: React.FC<IProps> = ({input, width, type, placeholder, meta: {touched, error}}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <input {...input} placeholder={placeholder} type={type} />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInputFormik;
