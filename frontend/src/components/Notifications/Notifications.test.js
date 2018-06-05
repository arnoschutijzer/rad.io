import React from 'react';
import { mount } from 'enzyme';
import { keys } from 'underscore';
import Notifications from './Notifications';

const singleNotificationMock = {
  'notification1': {
    type: 'info',
    response: {
      message: 'hello world'
    }
  }
};
const multipleNotificationsMock = {
  notification1: {
    type: 'info',
    response: {
      message: 'hello world'
    }
  },
  notification2: {
    type: 'error',
    response: {
      message: 'hello error world'
    }
  }
};

test('<Notifications /> mounts with no errors', () => {
  mount(<Notifications></Notifications>);
});

test('<Notifications /> renders a single notification', () => {
  const notificationNode = (<div>
    { singleNotificationMock.notification1.response.message }
  </div>);
  const wrapper = mount(<Notifications notifications={ singleNotificationMock }></Notifications>);
  expect(wrapper.containsMatchingElement(notificationNode)).toEqual(true);
});

test('<Notifications /> renders multiple notifications', () => {
  const wrapper = mount(<Notifications notifications={ multipleNotificationsMock }></Notifications>);
  const _keys = keys(multipleNotificationsMock);
  _keys.forEach(key => {
    const config = multipleNotificationsMock[ key ];
    const notificationNode = (
      <div>
        { config.response.message }
      </div>
    );
    expect(wrapper.containsMatchingElement(notificationNode)).toEqual(true);
  });
});

test('<Notifications /> calls dismissNotification on click', () => {
  const mockDismiss = jest.fn();
  const wrapper = mount(
    <Notifications notifications={ multipleNotificationsMock } dismissNotification={ mockDismiss }>
    </Notifications>
  );

  const _keys = keys(multipleNotificationsMock);
  _keys.forEach(key => {
    const notificationNode = wrapper.findWhere(node => node.key() === key);
    notificationNode.simulate('click');  
  });
  expect(mockDismiss.mock.calls.length).toBe(_keys.length);  
});