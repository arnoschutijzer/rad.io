import React, { Component } from 'react';

// We keep a reference of the ComponentName to add it to the class.
// The names internally used by React can't be used since they are minified.
// see https://github.com/facebook/react/issues/4915
const ComponentName = 'UserList';
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
UserList.ComponentName = ComponentName;