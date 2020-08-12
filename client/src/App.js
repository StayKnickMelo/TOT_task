import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/auth';

import PrivateRoute from './routing/PrivateRoute';
import Nav from './components/layout/Nav';
import Alert from './components/layout/Alert';
import Login from './components/layout/Login';
import Register from './components/layout/Register';
import FloodChat from './components/chats/flood/FloodChat';
import { loadUser } from './actions/auth';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Nav />
        </Fragment>
        <div className="ui container">
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Register}/>
            <PrivateRoute exact path='/flood' component={FloodChat} />
          </Switch>
        </div>
      </Router>
    </Provider>

  );
}

export default App;
