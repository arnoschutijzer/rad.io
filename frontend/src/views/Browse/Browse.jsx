import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      const link = '/broadcast/' + key;
      let style = {};
      if (this.props.rooms[key].style) {
        style.backgroundColor = `${this.props.rooms[key].style.top}`;
        style.backgroundImage = `linear-gradient(140deg,
          ${this.props.rooms[key].style.top},
          ${this.props.rooms[key].style.bottom})`;
      }

      const element = (
        <Link key={ key } to={ link } className="room" style={ style }>
          <h2 className="room-title">
            { this.props.rooms[key].name }
          </h2>
          <div>
            <p>
              created by { this.props.rooms[key].creator.username }
            </p>
            <p className="description">{ this.props.rooms[key].topic }</p>
          </div>
        </Link>
      );

      Rooms.push(element);
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