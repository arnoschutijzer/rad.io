import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Element, Link } from 'react-scroll';
import './style.scss';

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.state = {};
  }

  login() {
    if (!this.state.email || !this.state.password) {
      return;
    }

    const email = this.state.email;
    const password = this.state.password;
    this.props.login(email, password);
  }

  register() {
    if (this.state.password !== this.state.confirmPassword ||
        this.state.email !== this.state.confirmEmail) {
      return;
    }

    const email = this.state.email;
    const password = this.state.password;
    this.props.register(email, password);
  }

  render() {
    return (
      <div className='full-view'>
        <div className='login'>
          <div className='form'>
            <input type='text'
              placeholder='email'
              onChange={ (event) => {
                this.setState({email: event.target.value});
              }}></input>
            <input type='password'
              placeholder='password'
              onChange={ (event) => {
                this.setState({password: event.target.value});
              }}></input>
            <button onClick={ () => { this.login(); } }>
              login
            </button>
            <Link to='register' smooth={ true } className='link'>
              I don't have an account
            </Link>
          </div>
        </div>

        <Element className='register' name='register'>
          <div className='form'>
            <input type='email'
              placeholder='email'
              onChange={ (event) => {
                this.setState({email: event.target.value});
              }}>
            </input>
            <input type='email'
              placeholder='confirm email'
              onChange={ (event) => {
                this.setState({confirmEmail: event.target.value});
              }}>
            </input>
            <input type='password'
              placeholder='password'
              onChange={ (event) => {
                this.setState({password: event.target.value});
              }}>
            </input>
            <input type='password'
              placeholder='confirm password'
              onChange={ (event) => {
                this.setState({confirmPassword: event.target.value});
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
