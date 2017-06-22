import React, { Component } from 'react';
import './style.scss';

export default class Chatroom extends Component {
  constructor() {
    super();

    this.state = {
      message: ''
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleMessage() {
    this.inputField.value = '';

    if (this.state.message === '/connect') {
      this.props.connect();
      return;
    }
    if (this.state.message.indexOf('/add') === 0) {
      const splitUrl = this.state.message.replace('/add', '').trim().split(' ');

      this.props.emitEvent({
        type: 'add',
        url: splitUrl[0]
      });
      return;
    }
    if (this.state.message.indexOf('/rtv') === 0) {
      this.props.emitEvent({
        type: 'rtv'
      });
      return;
    }

    this.props.sendMessage(this.state.message);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleMessage();
    }
  }

  componentDidUpdate() {
    this.chatroom.scrollTop = this.chatroom.scrollHeight;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  render() {
    const Messages = [];
    let messagesToDisplay = this.props.messages;

    for (let message of messagesToDisplay) {
      Messages.push(
        <div className='message' key={ message._id }>
          <div className='user'>
            { '<' }{ message.author.username }{ '>' }
          </div>
          <div className='messageContent'>
            { message.message }
          </div>
        </div>
      );
    }

    return (
      <div className='chatroom'>
        <h1>Chat</h1>
        <div className='history' ref={ (chatroom) => { this.chatroom = chatroom; } }>
          { Messages }
        </div>
        <div className='messageBox'>
          <input
            className='inputField'
            type='text'
            ref={ (input) => { this.inputField = input; } }
            onKeyPress={ this.handleKeyPress }
            onChange={ (event) => {
              this.setState({ message: event.target.value });
            } }>
          </input>

          <button onClick= { this.handleMessage }>
            Send
          </button>
        </div>
      </div>
    );
  }
}
