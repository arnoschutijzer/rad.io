import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
import './style.scss';

export const RoomCard = (props) => {
  const link = '/broadcast/' + props.room._id;

  let style = {};
  if (props.room.style) {
    style.backgroundColor = `${props.room.style.top}`;
    style.backgroundImage = `linear-gradient(140deg,
      ${props.room.style.top},
      ${props.room.style.bottom})`;
  }

  return (
    <HashRouter>
      <Link key={ props.room._id } to={ link } className="room" style={ style }>
        <h2 className="room-title title">
          { props.room.name }
        </h2>
        <div>
          <p className="description">{ props.room.topic }</p>
          <p>
          created by { props.room.creator.username }
          </p>
        </div>
      </Link>
    </HashRouter>
  );
};