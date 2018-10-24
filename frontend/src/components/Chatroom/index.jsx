import React, { Component } from 'react';
import styled from 'styled-components';

// We keep a reference of the ComponentName to add it to the class.
// The names internally used by React can't be used since they are minified.
// see https://github.com/facebook/react/issues/4915
const ComponentName = 'Chatroom';
export default class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.chatroom = React.createRef();
    this.inputField = React.createRef();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleMessage() {
    this.inputField.current.value = '';

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
    this.focusInputField();
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleMessage();
    }
  }

  focusInputField () {
    this.inputField.current.focus();
  }

  scrollToBottom () {
    this.chatroom.current.scrollTop = this.chatroom.current.scrollHeight;
  }

  componentDidUpdate() {
    this.scrollToBottom();
    this.focusInputField();
  }

  componentDidMount() {
    this.scrollToBottom();
    this.focusInputField();
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
      height: 100%;
    `;

    const History = styled.div`
      height: 90%;
      overflow-y: scroll;
    `;

    const MessageBox = styled.div`
      display: flex;
      justify-content: space-around;

      @media (max-width: 1000px) {
        display: flex;
        flex-direction: column;
      }
    `;

    const InputField = styled.input`
      width: 90%;

      @media (max-width: 1000px) {
        width: auto;
      }
    `;

    return (
      <Chatroom>
        <h1>Chat</h1>
        <History ref={ this.chatroom }>
          { Messages }
        </History>
        <MessageBox>
          <InputField
            type='text'
            ref={ this.inputField }
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
Chatroom.ComponentName = ComponentName;