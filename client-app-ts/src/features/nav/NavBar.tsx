import React from 'react';
import { Menu, Container, Button, Image, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import UserStore from '../../app/stores/UserStore';
import { inject } from 'mobx-react';

interface IProps {
  userStore?: UserStore;
}

const NavBar: React.FC<IProps> = ({userStore}) => {
  const {user, logout, isLoggedIn} = userStore!
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src='/assets/logo.png' alt='logo' style={{marginRight: '10px'}} />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name='Activities'/>
        <Menu.Item as={NavLink} to='/testForm' name='Test Form'/>
        <Menu.Item>
            <Button as={Link} to='/createActivity' positive content='Create Activity' />
        </Menu.Item>

        {isLoggedIn && user &&
        <Menu.Item position='right'>
          <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
          <Dropdown pointing='top left' text={user.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/${user.username}`}
                text='My Profile'
                icon='user'
              />
              <Dropdown.Item onClick={logout} text='Logout' icon='power' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>}
      </Container>
    </Menu>
  );
};

export default inject('userStore')(observer(NavBar));
