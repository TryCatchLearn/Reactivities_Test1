import React from 'react';
import { Form, Label, FormFieldProps } from 'semantic-ui-react';
import { FieldRenderProps } from 'react-final-form';
import { DateTimePicker } from 'react-widgets';

interface IProps extends FieldRenderProps<HTMLInputElement>, FormFieldProps {}

const DateInput: React.FC<IProps> = ({input, width, date = false, time = false, type, placeholder, meta: {touched, error}}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
    <DateTimePicker 
        value={input.value || null}
        placeholder={placeholder}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onKeyDown={(e) => e.preventDefault()}
        date={date}
        time={time}
    />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;