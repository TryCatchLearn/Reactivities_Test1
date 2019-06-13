import React from 'react';
import { Form, Label, FormFieldProps } from 'semantic-ui-react';
import { FieldRenderProps } from 'react-final-form';

interface IProps extends FieldRenderProps<HTMLTextAreaElement>, FormFieldProps {}

const TextAreaInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  rows,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <textarea {...input} rows={rows} placeholder={placeholder} />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextAreaInput;
