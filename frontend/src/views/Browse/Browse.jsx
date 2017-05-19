import React, { Component } from 'react';
import { RoomCard } from 'components/RoomCard';
import { keys } from 'underscore';
import './style.scss';

export default class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      topic: ''
    };
  }

  componentWillMount() {
    this.props.fetchRooms();
  }

  createRoom(name, topic) {
    this.props.createRoom(name, topic);
    this.setState({
      name: '',
      topic: ''
    });
  }

  render() {
    let Rooms = [];
    const _keys = keys(this.props.rooms);
    _keys.forEach(key => {
      Rooms.push((
        <RoomCard key={ key } room={ this.props.rooms[key] }></RoomCard>
      ));
    });

    return (
      <div className="view">
        <div className="create-room">
          <input type="text"
            onChange={(event) => {
              this.setState({ name: event.target.value });
            }}
            value={ this.state.name }
            placeholder="name"/>
          <input type="text"
            onChange={(event) => {
              this.setState({ topic: event.target.value });
            }}
            value={ this.state.topic }
            placeholder="topic"/>

          <button className="btn" onClick={ () => {
            this.createRoom(this.state.name, this.state.topic);
          }}>Create room</button>
        </div>
        <div className="rooms">
          { Rooms }
        </div>
      </div>
    );
  }
}