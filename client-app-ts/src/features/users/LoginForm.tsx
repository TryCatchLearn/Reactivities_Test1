import React from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import { FORM_ERROR } from 'final-form';
import { inject, observer } from 'mobx-react';
import UserStore from '../../app/stores/UserStore';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import { IUserForLogin } from '../../app/models/user';

interface IProps {
  userStore?: UserStore;
}

const validate = combineValidators({
  email: isRequired('email'),
  password: isRequired('password')
});

const LoginForm: React.FC<IProps> = ({ userStore }) => {
  const { login, loading } = userStore!;
  return (
    <FinalForm
      validate={validate}
      onSubmit={(user: any) =>
        login(user).catch(error => ({ [FORM_ERROR]: error }))
      }
      render={({
        handleSubmit,
        invalid,
        pristine,
        submitError,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
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
              text='Invalid username or password'
            />
          )}
          <Button
            disabled={invalid && !dirtySinceLastSubmit}
            loading={loading}
            positive
            content='Login'
            fluid
          />
        </Form>
      )}
    />
  );
};

export default inject('userStore')(observer(LoginForm));
