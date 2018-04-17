import React, { Component } from 'react';
import { find } from 'underscore';

import './style.scss';

export default class RoomSidebar extends Component {
  constructor(props) {
    super(props);

    const children = React.Children.toArray(props.children);
    if (Object.keys(props.childrenMap).length === 0 && children.length !== 0) {
      throw new Error('ChildrenMap is invalid');
    }
    const defaultTab = Object.keys(props.childrenMap).length > 0 ? Object.keys(props.childrenMap)[0] : null;

    this.state = {
      activeTab: props.activeTab || defaultTab,
      availableTabs: props.childrenMap
    };

    this.setActiveTab.bind(this);
  }

  setActiveTab(name) {
    this.setState({ activeTab: name });
  }

  getComponent(name) {
    return find(React.Children.toArray(this.props.children), (child) => {
      return child.type.name === this.state.availableTabs[name];
    });
  }

  render() {
    const activeComponent = this.getComponent(this.state.activeTab);
    const children = Object.keys(this.state.availableTabs).map((key) => {
      return {
        label: key,
        type: this.state.availableTabs[key]
      };
    });
    const tabs = children.map((child) => {
      return (
        <div className="tab" key={ child.label } onClick={() => { this.setActiveTab(child.label); }}>
          { child.label }
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