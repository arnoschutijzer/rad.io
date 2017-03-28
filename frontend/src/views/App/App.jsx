import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Home, Auth } from '../';
import './style.scss';

export default class App extends Component {

  render() {
    const Links = [];
    const Routes = [];

    if (this.props.state.auth.auth === true) {
      Links.push((<Link to='/' key='homeLink'>Home</Link>));
      Links.push((<p key='logged'>Logged in</p>));

      Routes.push((<Route exact path='/' component={ Home } key='homePath'/>));
      Routes.push((<Route path='/about' component={ Auth } key='aboutPath'/>));
    } else {
      Links.push((<Link to='/' key='homeLink'>Home</Link>));
      Links.push((<Link to='/about' key='aboutLink'>Authenticate</Link>));

      Routes.push((<Route exact path='/' component={ Home } key='homePath'/>));
      Routes.push((<Route path='/about' component={ Auth } key='aboutPath'/>));
    }

    const Navbar = (
      <div className='navbar'>
        { Links }
      </div>
    );

    const App = (
      <Router>
        <div className='app'>
          { Navbar }

          <div className='view'>
            { Routes }
          </div>

          { this.props.children }
        </div>
      </Router>
    );

    return App;
  }
}
