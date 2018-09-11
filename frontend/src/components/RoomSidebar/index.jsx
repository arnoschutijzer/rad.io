import React, { Component } from 'react';
import { find } from 'underscore';

import './style.scss';
export default class RoomSidebar extends Component {
  constructor(props) {
    super(props);
    
    if (!props.children) throw new Error('no children to render!');

    const defaultTab = props.children.length > 0 ? props.children[0] : null;
    this.state = {
      activeTab: props.activeTab || defaultTab
    };

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  getComponent(name) {
    return find(this.props.children, child => {
      return this.getComponentName(child) === name;
    });
  }

  getComponentName(component) {
    if (!component) return null;
    return component.type.ComponentName;
  }

  setActiveTab(component) {
    this.setState({
      activeTab: component
    });
  }

  render() {
    const activeTabName = this.getComponentName(this.state.activeTab);
    const activeTab = this.getComponent(activeTabName);

    const tabs = this.props.children.map(component => {
      return {
        name: this.getComponentName(component),
        component: component
      };
    }).map(component => {
      return (
        <div className="tab" key={ component.name } onClick={ () => this.setActiveTab(component.component) }>
          { component.name }
        </div>
      );
    });
    
    return (
      <div className="room-sidebar">
        <div className="tabs">
          { tabs }
        </div>

        <div className="content">
          { activeTab }
        </div>
      </div>
    );
  }
}
