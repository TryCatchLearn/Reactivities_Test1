import React from 'react';
import { Form, Label, FormFieldProps } from 'semantic-ui-react';
import { FieldRenderProps } from 'react-final-form';

interface IProps extends FieldRenderProps<HTMLInputElement>, FormFieldProps {}

const TextInput: React.FC<IProps> = ({input, width, type, placeholder, meta: {touched, error}}) => {
  return (
    <Form.Field error={touched && !!error} width={width} type={type}>
      <input {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
