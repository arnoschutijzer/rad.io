import React, { Component } from 'react';
import { Element, Link } from 'react-scroll';
import './style.scss';

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  login() {
    if (!this.state.loginUsername || !this.state.loginPassword) {
      this.props.createNotification(
        'info', { message: 'Please fill in all fields.' }
      );
      return;
    }

    const username = this.state.loginUsername;
    const password = this.state.loginPassword;
    this.props.login(username, password);
  }

  register() {
    if (!this.state.registerPassword || !this.state.registerUsername ||
         !this.state.registerConfirmPassword) {
      this.props.createNotification(
        'info', { message: 'Please fill in all fields.' }
      );
      return;
    }

    if (this.state.registerPassword !== this.state.registerConfirmPassword) {
      this.props.createNotification(
        'info', { message: 'Passwords don\'t match.' }
      );
      return;
    }

    const username = this.state.registerUsername;
    const password = this.state.registerPassword;
    this.props.register(username, password);
  }

  render() {
    return (
      <div className='full-view'>
        <div className='login'>
          <div className='form'>
            <input type='text'
              placeholder='username'
              onKeyPress={ (event) => {
                if (event.key === 'Enter') {
                  this.passwordField.focus();
                }
              } }
              onChange={ (event) => {
                this.setState({ loginUsername: event.target.value });
              }}></input>
            <input type='password'
              placeholder='password'
              ref={ (input) => { this.passwordField = input; } }
              onKeyPress={ (event) => {
                if (event.key === 'Enter') {
                  this.login();
                }
              } }
              onChange={ (event) => {
                this.setState({ loginPassword: event.target.value });
              }}></input>
            <button onClick={ this.login }>
              login
            </button>
            <Link to='register' smooth={ true } className='link'>
              I don't have an account
            </Link>
          </div>
        </div>

        <Element className='register' name='register'>
          <div className='form'>
            <input type='text'
              placeholder='username'
              onKeyPress={ (event) => {
                if (event.key === 'Enter') {
                  this.registerPasswordField.focus();
                }
              } }
              onChange={ (event) => {
                this.setState({ registerUsername: event.target.value });
              }}>
            </input>
            <input type='password'
              placeholder='password'
              ref={ (input) => {  this.registerPasswordField = input; } }
              onKeyPress={ (event) => {
                if (event.key === 'Enter') {
                  this.registerConfirmPasswordField.focus();
                }
              } }
              onChange={ (event) => {
                this.setState({ registerPassword: event.target.value });
              }}>
            </input>
            <input type='password'
              placeholder='confirm password'
              ref={ (input) => {  this.registerConfirmPasswordField = input; } }
              onKeyPress={ (event) => {
                if (event.key == 'Enter') {
                  this.register();
                }
              } }
              onChange={ (event) => {
                this.setState({ registerConfirmPassword: event.target.value });
              }}>
            </input>
            <button onClick={ this.register }>
              register
            </button>
          </div>
        </Element>
      </div>
    );
  }
}
