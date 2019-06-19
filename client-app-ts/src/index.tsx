import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './app/layout/styles.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import dateFnsLocalizer from 'react-widgets-date-fns';
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore } from 'mobx-react-router';
import 'react-widgets/dist/css/react-widgets.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { RootStore } from './app/stores/RootStore';

dateFnsLocalizer();
const browserHistory = createBrowserHistory();
const rootStore = new RootStore();

const history = syncHistoryWithStore(browserHistory, rootStore.routerStore);

ReactDOM.render(
  <Provider {...rootStore}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
