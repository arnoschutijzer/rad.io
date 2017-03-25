import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { Home } from './';

export default class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>

          <Route exact path="/" component={ Home }/>
          <Route path="/about" component={ Home }/>

          { this.props.children }
        </div>
      </Router>
    );
  }
}