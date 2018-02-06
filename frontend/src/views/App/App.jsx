import React, { Component } from 'react';
import {
  HashRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { Home, Auth, Account, Broadcast, Browse, SpotifyConnection } from 'views';
import { Notifications } from 'components';
import './style.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { Navbar, View } =
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
export const buildAuthenticatedRouting = (props) => {
  const Navbar = (
    <div className='navbar'>
      <NavLink exact to='/browse'>Browse</NavLink>
      <NavLink exact to='/account'>Hi, { props.auth.user.username }!</NavLink>
    </div>
  );

  const View = (
    <Switch>
      <Route path='/account' component={ Account } />
      <Route path='/browse' component={ Browse } />
      <Route path='/broadcast/:id' component={ Broadcast } />
      <Route path='/connect/:type/:accessToken/:refreshToken' component={ SpotifyConnection } />
      <Route render={ () => (<Redirect to='/browse'/>) } />
    </Switch>
  );

  return { Navbar, View };
};

export const buildDefaultRouting = () => {
  const Navbar = undefined;

  const View = (
    <Switch>
      <Route exact path='/' component={ Home } />
      <Route exact path='/auth' component={ Auth } />
      <Route render={ () => (<Redirect to='/'/>) } />
    </Switch>
  );

  return { Navbar, View };
};
