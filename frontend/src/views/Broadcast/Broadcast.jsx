import React, { Component } from 'react';
import { createConnection } from '../../services';
import { Chatroom, Player } from '../../components';
import './style.scss';

export default class Broadcast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomId: props.match.params.id
    };
    this.connect = this.connect.bind(this);
    this.emitEvent = this.emitEvent.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  connect() {
    // The token contains 'JWT' in the beginning of the string, here we take this out,
    // to successfully establish a connection.
    const token = this.props.auth.token.substr(3, this.props.auth.token.length+1).trim();

    this.setState({
      socket: createConnection(this, token, this.state.roomId)
    });
  }

  componentWillMount() {
    this.props.fetchChatlog(this.state.roomId);
  }

  componentWillUnmount() {
    if (this.state.socket) {
      this.state.socket.disconnect();
      this.state.socket = undefined;
    }
  }

  emitEvent(args) {
    if (this.state.socket) {
      const data = Object.assign({}, args, {
        roomId: this.state.roomId
      });

      this.state.socket.emit(data.type, data);
    } else {
      this.props.createNotification(
        'error',
        { message: 'You\'re not connected!' }
      );
    }
  }

  onMessage(message) {
    this.props.receiveMessage(message);
  }

  onPlay(data) {
    console.log(data);
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
      room: this.state.roomId,
      message: message,
      author: this.props.auth.user,
    };

    this.state.socket.send(Message);
  }

  render() {
    const systemMsg = {
      _id: 0,
      author: {
        username: 'System',
      },
      message: 'Type /connect to connect'
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
          sendMessage={ this.sendMessage }
          emitEvent={ this.emitEvent }>
        </Chatroom>
      </div>
    );
  }
}
