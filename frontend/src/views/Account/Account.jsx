import React, { Component } from 'react';

import './Account.scss';

export default class Account extends Component {
  render() {
    return (
      <div className='view'>
        <div className='profile'>
          <div className="settings">
            <button>do something else</button>
            <button onClick={ this.props.logout }>logout</button>
          </div>
        </div>
      </div>
    );
  }
}
