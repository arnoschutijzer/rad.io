import React, { Component } from 'react';
import { keys } from 'underscore';
import './style.scss';

export default class Notifications extends Component {
  constructor(props) {
    super(props);

    this.dismissNotification = this.dismissNotification.bind(this);
  }

  dismissNotification(id) {
    this.props.dismissNotification(id);
  }

  render() {
    const Notifications = this.buildNotifications();

    return (
      <div className='notifications'>
        { Notifications }
      </div>
    );
  }

  buildNotifications() {
    const Notifications = [];
    const _keys = keys(this.props.notifications);

    for (let key of _keys) {
      const notification = this.props.notifications[key];
      const styling = 'notification ' + notification.type;
      const Notification = (
        <div key= { key }
          onClick={ () => { this.dismissNotification(key); } }
          className={ styling }>
          { notification.response.message }
        </div>
      );
      Notifications.push(Notification);
    }

    return Notifications;
  }
}
