import React, { Component } from 'react';
import { find } from 'underscore';

import './style.scss';

export default class RoomSidebar extends Component {
  constructor(props) {
    super(props);

    const children = React.Children.toArray(props.children).map(item => item.type.name);

    this.state = {
      activeTab: props.activeTab || children[0],
      availableTabs: children
    };

    this.setActiveTab.bind(this);
  }

  setActiveTab(name) {
    this.setState({ activeTab: name });
  }

  getComponent(name) {
    const children = React.Children.toArray(this.props.children);
    return find(children, child => child.type.name === name);
  }

  render() {
    const activeComponent = this.getComponent(this.state.activeTab);
    const children = this.state.availableTabs;
    const tabs = children.map((child) => {
      return (
        <div className="tab" key={ child } onClick={() => { this.setActiveTab(child); }}>
          { child }
        </div>
      );
    });
    const hasMultipleTabs = tabs.length > 1;

    if (!hasMultipleTabs) {
      return (
        <div className="room-sidebar">
          { activeComponent }
        </div>
      );
    }

    return (
      <div className="room-sidebar">
        <div className="tabs">
          { tabs }
        </div>
        <div className="content">
          { activeComponent }
        </div>
      </div>
    );
  }
}