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
    // The token contains 'JWT' in the beginning of the string, here we take this out,
    // to successfully establish a connection.
    const token = this.props.auth.token.substr(3, this.props.auth.token.length+1).trim();
    const roomId = this.props.match.params.id;

    this.setState({
      socket: createConnection(this, token, roomId)
    });
  }

  componentWillUnmount() {
    if (this.state.socket) {
      this.state.socket.disconnect();
      this.state.socket = undefined;
    }
  }

  onConnect() {
    this.props.fetchChatlog();
  }

  onMessage(message) {
    this.props.receiveMessage(message);
  }

  sendMessage(message) {
    if (!this.state.socket) {
      this.props.createNotification(
        'error',
        { message: 'You\'re not connected!' }
      );
      return;
    }

    const Message = {
      room: this.props.match.params.id,
      message: message,
      author: this.props.auth.user,
    };

    this.state.socket.send(Message);
  }

  render() {
    const systemMsg = {
      _id: 0,
      content: {
        author: {
          username: 'System',
        },
        message: 'Type /connect to connect'
      }
    };

    let messagesToDisplay = this.props.messages;

    if (!this.state.socket) {
      messagesToDisplay = messagesToDisplay.concat([ systemMsg ]);
    }

    return (
      <div className='view'>
        <h1>Broadcast</h1>
        <div className='playerContainer'>
          <Player></Player>
        </div>
        <Chatroom
          user = { this.props.auth.user }
          messages={ messagesToDisplay }
          connect={ this.connect }
          sendMessage={ this.sendMessage }>
        </Chatroom>
      </div>
    );
  }
}
