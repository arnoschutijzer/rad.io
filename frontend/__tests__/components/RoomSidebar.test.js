import React, { Component } from 'react';
import { mount } from 'enzyme';
import RoomSidebar from 'components/RoomSidebar';

const TestComponent1Name = 'TestComponent1';
class TestComponent1 extends Component {
  render() {
    return (
      <div>hello from { TestComponent1Name }</div>
    )
  }
}
TestComponent1.ComponentName = TestComponent1Name;

const TestComponent2Name = 'TestComponent2';
class TestComponent2 extends Component {
  render() {
    return (
      <div>hello from { TestComponent2Name }</div>
    );
  }
}
TestComponent2.ComponentName = TestComponent2Name;

class TestComponentWithNoName extends Component {
  render() {
    return(
      <div>hello from invalid component</div>
    );
  }
}

test('<RoomSidebar /> should throw an error when there are no children', () => {
  function fn() {
    mount(<RoomSidebar />);
  }

  expect(fn).toThrow();
});

test('<RoomSidebar /> should throw an error with invalid child', () => {
  function fn() {
    mount(
      <RoomSidebar>
        <TestComponentWithNoName></TestComponentWithNoName>
      </RoomSidebar>
    );
  }

  expect(fn).toThrow();
});

test('<RoomSidebar> should not throw with valid children', () => {
  mount(
    <RoomSidebar>
      <TestComponent1></TestComponent1>
      <TestComponent2></TestComponent2>
    </RoomSidebar>
  );
});