import React, { Component } from 'react';
import {
  HashRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { Home, Auth } from '../';
import './style.scss';

export default class App extends Component {
  render() {
    const {Navbar, View} =
      this.props.auth.token ?
        authenticatedRouting() : defaultRouting();

    const App = (
      <Router>
        <div className='app'>
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
function authenticatedRouting() {
  const Navbar = (
    <div className='navbar'>
      <NavLink exact to='/'>Home</NavLink>
      <NavLink exact to='/radio'>Radio</NavLink>
      <NavLink exact to='/account'>Account</NavLink>
    </div>
  );

  const View = (
    <div className='view'>
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/radio' />
        <Route exact path='/account' />
        <Route render={ () => (<Redirect to='/'/>) } />
      </Switch>
    </div>
  );

  return {Navbar, View};
}

function defaultRouting() {
  const Navbar = (
    <div className='navbar'>
      <NavLink exact to='/'>Home</NavLink>
      <NavLink exact to='/auth'>Authenticate</NavLink>
    </div>
  );

  const View = (
    <div className='view'>
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/auth' component={ Auth } />
        <Route render={ () => (<Redirect to='/'/>) } />
      </Switch>
    </div>
  );

  return {Navbar, View};
}
