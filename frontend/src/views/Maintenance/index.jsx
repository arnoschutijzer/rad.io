import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-center">
          <h1>
            Sorry!
          </h1>
          <p>
            We're offline for maintenance. Check back again later or ping <a href="https://twitter.com/vleesbrood">me</a>.
          </p>
        </div>
      </div>
    );
  }
}