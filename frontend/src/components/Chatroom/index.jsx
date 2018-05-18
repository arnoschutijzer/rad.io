import React, { Component } from 'react';
import styled from 'styled-components';

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

  scrollToBottom () {
    this.chatroom.scrollTop = this.chatroom.scrollHeight;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  render() {
    const Messages = [];
    let messagesToDisplay = this.props.messages;

    const Message = styled.div`
      display: flex;
      padding: 5px;
    `;

    const User = styled.div`
      margin-right: 20px;
    `;

    const MessageContent = styled.div`
      word-break: break-word;
    `;

    for (let message of messagesToDisplay) {
      Messages.push(
        <Message key={ message._id }>
          <User>
            { '<' }{ message.author.username }{ '>' }
          </User>
          <MessageContent className='messageContent'>
            { message.message }
          </MessageContent>
        </Message>
      );
    }

    const Chatroom = styled.div`
      display: flex;
      flex-direction: column;
      width: 20%;
      height: 100%;
    `;

    const History = styled.div`
      height: 90%;
      overflow-y: scroll;
    `;

    const MessageBox = styled.div`
      display: flex;
      justify-content: space-around;
    `;

    const InputField = styled.input`
      width: 90%;
    `;

    return (
      <Chatroom>
        <h1>Chat</h1>
        <History innerRef={ (chatroom) => { this.chatroom = chatroom; } }>
          { Messages }
        </History>
        <MessageBox>
          <InputField
            type='text'
            innerRef={ (input) => { this.inputField = input; } }
            onKeyPress={ this.handleKeyPress }
            onChange={ (event) => {
              this.setState({ message: event.target.value });
            } }>
          </InputField>
          
          <button onClick= { this.handleMessage }>
            Send
          </button>
        </MessageBox>
      </Chatroom>
    );
  }
}
