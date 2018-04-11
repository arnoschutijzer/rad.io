import React, { Component } from 'react';
import { createConnection } from '../../services';
import { Chatroom, RoomSidebar } from '../../components';
import Youtube from 'react-youtube';
import moment from 'moment';
import './style.scss';

export default class Broadcast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomId: props.match.params.id,
      currentVideoId: ''
    };

    this.connect = this.connect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    this.emitEvent = this.emitEvent.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onNotification = this.onNotification.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
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
    this.props.fetchChatlog(this.state.roomId).then(() => {
      this.connect();
    });
  }

  componentWillUnmount() {
    if (this.state.socket) {
      this.state.socket.disconnect();
      this.state.socket = undefined;
    }
  }

  emitEvent(args) {
    if (this.state.socket) {
      const data = Object.assign({
        roomId: this.state.roomId
      }, args);

      this.state.socket.emit(data.type, data);
    } else {
      this.props.createNotification(
        'error',
        { message: 'You\'re not connected!' }
      );
    }
  }

  onDisconnect() {
    this.props.createNotification(
      'error',
      { message: 'Disconnected!' }
    );
  }

  onMessage(message) {
    this.props.receiveMessage(message);
  }

  onPlay(data) {
    // We first clear the currentVideoId to force the player to play the next song,
    // even if it has the same id as the last one.
    this.setState({
      currentVideoId: ''
    });

    // Add some `buffer seconds` to account for loading and network delay but only when startAt is defined.
    let startAt = data.startAt ? moment.duration(data.startAt).asSeconds() + 1 : 0;

    this.setState({
      currentVideoId: data.videoId,
      startAt: startAt
    });
  }

  onNotification(data) {
    this.props.createNotification(
      data.type,
      { message: data.message }
    );
  }

  onStop() {
    this.setState({
      currentVideoId: ''
    });
  }

  onRefresh(event) {
    this.setState({
      users: event.payload.users
    });
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
      message: message,
      author: this.props.auth.user,
      roomId: this.state.roomId
    };

    this.state.socket.send(Message);
  }

  render() {
    let messagesToDisplay = this.props.messages;

    const playerOpts = {
      playerVars: {
        autoplay: 1,
        start: this.state.startAt
      }
    };

    return (
      <div className='view'>
        <div className='playerContainer'>
          <Youtube
            videoId={ this.state.currentVideoId }
            opts={ playerOpts }>
          </Youtube>
        </div>
        <RoomSidebar>
          <Chatroom
            user = { this.props.auth.user }
            users = { this.state.users }
            messages={ messagesToDisplay }
            connect={ this.connect }
            sendMessage={ this.sendMessage }
            emitEvent={ this.emitEvent }>
          </Chatroom>
        </RoomSidebar>
      </div>
    );
  }
}
