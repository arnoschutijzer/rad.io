import React, { Component } from 'react';
import {
  HashRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { Home, Auth, Account, Broadcast } from '../';
import { Notifications } from '../../components';
import './style.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {Navbar, View} =
      this.props.auth.token ?
        buildAuthenticatedRouting(this.props) : buildDefaultRouting();

    const App = (
      <Router>
        <div className='app'>
          <Notifications></Notifications>

          { Navbar }

          { View }

          { this.props.children }
        </div>
      </Router>
    );

    return App;
  }
}

/** Helper functions **/
function buildAuthenticatedRouting(props) {
  const Navbar = (
    <div className='navbar'>
      <NavLink exact to='/broadcast'>Broadcast</NavLink>
      <NavLink exact to='/account'>Hi, { props.auth.user.username }!</NavLink>
    </div>
  );

  const View = (
    <Switch>
      <Route path='/account' component={ Account } />
      <Route path='/broadcast' component={ Broadcast } />
      <Route render={ () => (<Redirect to='/broadcast'/>) } />
    </Switch>
  );

  return {Navbar, View};
}

function buildDefaultRouting() {
  const Navbar = undefined;

  const View = (
    <Switch>
      <Route exact path='/' component={ Home } />
      <Route exact path='/auth' component={ Auth } />
      <Route render={ () => (<Redirect to='/'/>) } />
    </Switch>
  );

  return {Navbar, View};
}
