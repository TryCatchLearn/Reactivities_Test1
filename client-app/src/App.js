import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/values')
      .then(response => {
        this.setState({ values: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Fragment>
        <Header as='h1'>Reactivities</Header>
        <List>
          {this.state.values.map(value => (
            <List.Item key={value.id}>
              {value.id} - {value.name}
            </List.Item>
          ))}
        </List>
      </Fragment>
    );
  }
}

export default App;
