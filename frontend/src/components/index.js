import styled from 'styled-components';

export { default as Chatroom } from './Chatroom';
export { default as Notifications } from './Notifications';
export { RoomCard as RoomCard } from './RoomCard';
export { default as RoomSidebar } from './RoomSidebar';
export { default as UserList } from './UserList';

export const FullHeader = styled.div`
  background-size: cover;
  
  height: 100%;
  width: 100%;
`;

export const Wrapper = styled.div`
  margin-left: 10%;
  margin-right: 10%;
`;

export const Image = styled.img`
  width: 100%;
  max-height: 10%;
`;