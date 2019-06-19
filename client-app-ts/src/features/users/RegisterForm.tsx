import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import { FORM_ERROR } from 'final-form';
import { inject, observer } from 'mobx-react';
import UserStore from '../../app/stores/UserStore';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';

interface IProps {
  userStore?: UserStore;
}

const validate = combineValidators({
  displayName: isRequired('displayName'),
  username: isRequired('username'),
  email: isRequired('email'),
  password: isRequired('password')
});

const RegisterForm: React.FC<IProps> = ({ userStore }) => {
  const { register, loading } = userStore!;
  return (
    <FinalForm
      validate={validate}
      onSubmit={(user: any) =>
        register(user).catch(error => ({ [FORM_ERROR]: error }))
      }
      render={({
        handleSubmit,
        invalid,
        pristine,
        submitError,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name='displayName'
            component={TextInput}
            placeholder='Display Name'
          />
          <Field
            name='username'
            component={TextInput}
            placeholder='User Name'
          />
          <Field name='email' component={TextInput} placeholder='Email' />
          <Field
            name='password'
            component={TextInput}
            placeholder='Password'
            type='password'
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
            />
          )}
          <Button
            disabled={invalid && !dirtySinceLastSubmit}
            loading={loading}
            positive
            content='Register'
            fluid
          />
        </Form>
      )}
    />
  );
};

export default inject('userStore')(observer(RegisterForm));
