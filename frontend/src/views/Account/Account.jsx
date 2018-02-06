import React, { Component } from 'react';
import { BASE, CLIENT_ID, SCOPES } from '../../config/config';

export default class Account extends Component {
  constructor() {
    super();

    const redirectUri = `${BASE}/spotify`;
    this.spotifyUrl = 
      `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scopes=${SCOPES}`;
  }

  render() {
    return (
      <div className='view'>
        <div className='profile'>
          <a href={ this.spotifyUrl }>Connect to Spotify</a>
          <button onClick={ this.props.logout }>logout</button>
        </div>
      </div>
    );
  }
}
