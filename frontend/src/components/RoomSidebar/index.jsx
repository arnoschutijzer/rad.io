import React, { Component } from 'react';
import { find, isEmpty, some } from 'underscore';

import './style.scss';
export default class RoomSidebar extends Component {
  constructor(props) {
    super(props);
    
    const children = this.getChildren();
    if (isEmpty(children)) throw new Error('no children to render!');
    if (some(children, child => !this.getComponentName(child))) {
      throw new Error('one or more children have no ComponentName');
    }

    const defaultTab = children.length > 0 ? children[0] : null;
    this.state = {
      activeTab: props.activeTab || defaultTab
    };

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  getChildren() {
    return React.Children.toArray(this.props.children);
  }

  getComponent(name) {
    return find(this.getChildren(), child => {
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

    const tabs = this.getChildren().map(component => {
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
