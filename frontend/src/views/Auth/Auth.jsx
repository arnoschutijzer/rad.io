import React, { Component } from 'react';

export default class Auth extends Component {
  login() {
    this.props.login('test@test.be', 'test');
  }

  render() {
    return (<div>
      <button onClick={ () => { this.login(); } }>
        login
      </button>
    </div>);
  }
}
