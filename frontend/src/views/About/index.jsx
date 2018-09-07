import React, { Component } from 'react';
import styled from 'styled-components';
import { FullHeader, Image, Wrapper } from 'components';
import roomsImage from './images/rooms.png';
import roomImage from './images/room.png';
import playingImage from './images/playing.png';

const WrapperWithPadding = styled(Wrapper)`
  & > h1 {
    padding-top: 10%;
  }

  & > p {
    padding-top: 5%;
    padding-bottom: 5%;
  }

  padding-bottom: 10%;
`;
const Table = styled.table`
  td, th {
    padding: 10px;
    width: 50%;
    border: 1px solid white;
  }
`;

export default class Account extends Component {
  render() {
    return (
      <FullHeader>
        <WrapperWithPadding>
          <h1 className="title">
            How does it work?
          </h1>
          <p>
            Remember <a href="https://en.wikipedia.org/wiki/Turntable.fm">turntables.fm</a>? It's kinda like that, but different.
          </p>
          <p>
            There's rooms:
          </p>
          <Image src={roomsImage} />
          <p>
            You can join a room (and chat and view the users):
          </p>
          <Image src={roomImage} />
          <p>
            You can use the following commands to manipulate the room playlist:
          </p>
          <Table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ '/add <url>' }</td>
                <td>
                  Adds a url to the playlist. The currently only accepted source is Youtube.
                </td>
              </tr>
              <tr>
                <td>{ '/rtv' }</td>
                <td>Tell the server you want to skip the song, if at least 50% of the people in the current room also rtv, the video is skipped.</td>
              </tr>
              <tr>
                <td>{ '/connect' }</td>
                <td>Try and reconnect to the server. Use this if you get the 'disconnected' notification.</td>
              </tr>
            </tbody>
          </Table>
          <p>
            And finally you can jam out to songs:
          </p>
          <Image src={playingImage}></Image>
        </WrapperWithPadding>
      </FullHeader>
    );
  }
}
