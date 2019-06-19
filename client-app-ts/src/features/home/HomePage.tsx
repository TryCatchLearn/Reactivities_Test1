import React, { Fragment } from 'react';
import { Container, Segment, Header, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import UserStore from '../../app/stores/UserStore';
import { ModalStore } from '../../app/stores/ModalStore';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

interface IProps {
  userStore: UserStore;
  modalStore: ModalStore;
}

const HomePage: React.FC<IProps> = ({ userStore, modalStore }) => {
  const { isLoggedIn, user } = userStore;
  const {openModal} = modalStore;
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {isLoggedIn ? (
          <Fragment>
            <Header
              as='h2'
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Header
              as='h3'
              inverted
              content='Click below to go to activities'
            />
            <Button as={Link} to={'/activities'} size='huge' inverted>
              Go to Activities!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as='h2' inverted content='Welcome to Reactivities' />
            <Button onClick={() => openModal({
              component: <LoginForm />,
              header: 'Sign in!'
            })} size='huge' inverted>
              Login!
            </Button>
            <Button size='huge' inverted onClick={() => openModal({
              component: <RegisterForm />,
              header: 'Register to Reactivities!'
            })}>
              Register!
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default inject('userStore', 'modalStore')(observer(HomePage));
