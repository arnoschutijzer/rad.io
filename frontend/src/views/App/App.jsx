import React, { Component } from 'react';
import {
  HashRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { Home, Auth, Account } from '../';
import { Notifications } from '../../components';
import './style.scss';

export default class App extends Component {
  render() {
    const {Navbar, View} =
      this.props.auth.token ?
        buildAuthenticatedRouting() : buildDefaultRouting();

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
function buildAuthenticatedRouting() {
  const Navbar = (
    <div className='navbar'>
      <NavLink exact to='/'>Home</NavLink>
      <NavLink exact to='/radio'>Radio</NavLink>
      <NavLink exact to='/account'>Account</NavLink>
    </div>
  );

  const View = (
    <Switch>
      <Route exact path='/' component={ Home } />
      <Route exact path='/radio' />
      <Route path='/account' component={ Account } />
      <Route render={ () => (<Redirect to='/'/>) } />
    </Switch>
  );

  return {Navbar, View};
}

function buildDefaultRouting() {
  const Navbar = (
    <div className='navbar'>
      <NavLink exact to='/'>Home</NavLink>
      <NavLink exact to='/auth'>Authenticate</NavLink>
    </div>
  );

  const View = (
    <Switch>
      <Route exact path='/' component={ Home } />
      <Route exact path='/auth' component={ Auth } />
      <Route render={ () => (<Redirect to='/'/>) } />
    </Switch>
  );

  return {Navbar, View};
}
