import React from 'react';
import { mount } from 'enzyme';
import RoomSidebar from 'components/RoomSidebar';

test('<RoomSidebar /> should throw an error when there are no children', () => {
  function fn() {
    mount(<RoomSidebar />);
  }

  expect(fn).toThrow();
});