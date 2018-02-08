import React from 'react';

export const Users = (props) => {
  if (!props.users) {
    return (
      <div>
        <p>No users found</p>
      </div>
    );
  }
  const mappedUsers = props.users.map((user) => {
    return (
      <div className="user" key={user._id}>
        <div>
          <p>
            { user.username }
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="userlist">
      <h3>Users</h3>
      { mappedUsers }
    </div>
  );
};