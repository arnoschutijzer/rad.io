import React, { Component } from 'react';
import { createConnection } from '../../services';
import { Chatroom, Player } from '../../components';
import './style.scss';

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
  }

  onConnect() {
    this.props.receiveMessage({
      user: 'System',
      message: 'Connected!'
    });
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
        <h1>Broadcast</h1>
        <div className='playerContainer'>
          <Player></Player>
        </div>
        <Chatroom
          user = { this.props.auth.user }
          messages={ this.props.messages }
          connect={ this.connect }
          receiveMessage={ this.props.receiveMessage }
          sendMessage={ this.sendMessage }>
        </Chatroom>
      </div>
    );
  }
}
