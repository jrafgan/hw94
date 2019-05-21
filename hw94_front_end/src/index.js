import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import App from './App';
import {ConnectedRouter} from "connected-react-router";
import store, {history} from './store/configureStore';
import 'react-notifications/lib/notifications.css';

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
