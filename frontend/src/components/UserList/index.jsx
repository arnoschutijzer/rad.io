import React, { Component } from 'react';

export default class UserList extends Component {
  render() {
    const users = this.props.users || [];

    return (
      <div>
        {
          users.map((user) => {
            return <p key={ user._id }>{ user.username }</p>;
          })
        }
      </div>
    );
  }
}