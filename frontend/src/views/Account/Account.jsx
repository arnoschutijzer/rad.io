import React, { Component } from 'react';

export default class Account extends Component {
  render() {
    return (
      <div className='view'>
        <button onClick={ this.props.logout }>logout</button>
      </div>
    );
  }
}
