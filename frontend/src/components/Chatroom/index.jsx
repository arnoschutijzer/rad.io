import React, { Component } from 'react';
import './style.scss';

export default class Chatroom extends Component {
  constructor() {
    super();

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      if (this.state.message === '/connect') {
        event.target.value = '';
        this.props.connect();
        return;
      }

      this.props.sendMessage(event.target.value);
      event.target.value = '';
    }
  }

  render() {
    const Messages = [];

    let messagesToDisplay = [{
        id: 0,
        content: {
          user: 'System',
          message: 'Type /connect to connect to the server.'
        }
      }];

    if (this.props.messages.length > 0) {
      messagesToDisplay = this.props.messages;
    }

    for (let message of messagesToDisplay) {
      Messages.push(
        <div className='message' key={ message.id }>
          <div className='user'>
            { message.content.user }
          </div>
          <div className='message-content'>
            { message.content.message }
          </div>
        </div>
      );
    }

    return (
      <div className='chatroom'>
        <div className='history'>
          { Messages }
        </div>
        <div className='messageBox'>
          <input
            className='inputField'
            type='text'
            onKeyPress={ this.handleKeyPress }
            onChange={ (event) => {
              this.setState({message: event.target.value});
            } }>
          </input>

          <button>
            Send
          </button>
        </div>
      </div>
    );
  }
}
