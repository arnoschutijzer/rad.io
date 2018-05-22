import React, { Component } from 'react';
import { keys } from 'underscore';
import style from '../../styles/_vars.scss';
import styled from 'styled-components';

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
    const NotificationsContainer = styled.div`
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 1;
    `;

    return (
      <NotificationsContainer>
        { Notifications }
      </NotificationsContainer>
    );
  }

  buildNotifications() {
    const Notifications = [];
    const _keys = keys(this.props.notifications);

    for (let key of _keys) {
      const notification = this.props.notifications[key];

      let color = notification.type === 'info' ? style.infoColorOpac : style.errorColorOpac;
      const NotificationContainer = styled.div`
        cursor: pointer;
        margin-top: 5px;
        padding: 20px;
        background-color: ${color};
      `;

      const Notification = (
        <NotificationContainer
          key= { key }
          onClick={ () => { this.dismissNotification(key); } }>
          { notification.response.message }
        </NotificationContainer>
      );
      Notifications.push(Notification);
    }

    return Notifications;
  }
}
