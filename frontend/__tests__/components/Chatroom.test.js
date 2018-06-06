import React from 'react';
import { mount } from 'enzyme';
import Chatroom from 'components/Chatroom';

test('<Chatroom /> should mount correctly', () => {
  mount(<Chatroom messages={ [] }/>);
});