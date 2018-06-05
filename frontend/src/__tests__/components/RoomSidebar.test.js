import React from 'react';
import { mount } from 'enzyme';
import RoomSidebar from '../../components/RoomSidebar';

test('<RoomSidebar /> should mount correctly', () => {
  const childrenMap = { 'chat': 'Chatroom', 'users': 'users' };

  mount(
    <RoomSidebar childrenMap={ childrenMap }>
    </RoomSidebar>
  );
});