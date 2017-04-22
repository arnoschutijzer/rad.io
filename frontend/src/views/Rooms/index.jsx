import React, { Component } from 'react';
import { createConnection } from '../../services';

export default class Rooms extends Component {
  constructor() {
    super();
    this.connect = this.connect.bind(this);
  }

  connect() {
    const socket = createConnection(this);
  }

  onConnect() {
    console.log('We\'re in business!');
  }

  render() {
    return (
      <div className='view'>
        <button onClick={ this.connect }>connect</button>
      </div>
    );
  }
}
