import React, { Component } from 'react';

export default class SpotifyConnection extends Component {
  constructor({ match, receiveSpotifyCredentials }) {
    super();

    receiveSpotifyCredentials(match.params);
  }

  render() {
    return (
      <div className="view">
        <div>
          authenticating, hold on....
        </div>
      </div>
    );
  }
}