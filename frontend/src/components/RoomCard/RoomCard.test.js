import React from 'react';
import { mount } from 'enzyme';
import { RoomCard } from './index';

const roomMock = {
  _id: 1,
  topic: 'this is a topic',
  name: 'this is a name',
  creator: {
    username: 'Arno'
  }
};

test('<RoomCard /> mounts with no errors', () => {
  mount(<RoomCard room={ roomMock }></RoomCard>);
});

test('<RoomCard /> renders a title', () => {
  const wrapper = mount(<RoomCard room={roomMock}></RoomCard>);
  expect(wrapper.find('.room-title.title').exists()).toEqual(true);
  expect(wrapper.find('.room-title.title').text()).toEqual('this is a name');
});

test('<RoomCard /> renders a description', () => {
  const wrapper = mount(<RoomCard room={roomMock}></RoomCard>);
  expect(wrapper.find('.description').exists()).toEqual(true);
  expect(wrapper.find('.description').text()).toEqual(roomMock.topic);
});

test('<RoomCard /> renders a creator', () => {
  const wrapper = mount(<RoomCard room={roomMock}></RoomCard>);
  const creatorNode = (<p>
      created by { roomMock.creator.username }
  </p>);
  expect(wrapper.containsMatchingElement(creatorNode)).toEqual(true);
});
