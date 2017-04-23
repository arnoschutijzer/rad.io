import React, { Component } from 'react';
import { createConnection } from '../../services';
import { Chatroom } from '../../components';

export default class Broadcast extends Component {
  constructor() {
    super();

    this.state = {};
    this.connect = this.connect.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  connect() {
    this.setState({
      socket: createConnection(this)
    });

    this.props.createNotification('info', {
      message: 'Connected!'
    });
  }

  onConnect() {
    console.log('We\'re in business!');
  }

  onMessage(message) {
    this.props.receiveMessage(message);
  }

  sendMessage(message) {
    if (!this.state.socket) {
      this.props.createNotification(
        'error',
        {message: 'You\'re not connected!'}
      );
      return;
    }

    const Message = {
      message: message,
      user: this.props.auth.user.username
    };

    this.state.socket.send(Message);
  }

  render() {
    return (
      <div className='view'>
        <Chatroom
          user = { this.props.auth.user }
          messages={ this.props.messages }
          connect={ this.connect }
          sendMessage={ this.sendMessage }>
        </Chatroom>
      </div>
    );
  }
}
