import reduceMsg from 'state/reducers/messages';
import {
  RECEIVE_CHATLOG,
  RECEIVE_CHAT_MESSAGE,
  SEND_CHAT_MESSAGE
} from 'state/actions/messages';
import {
  LOGOUT
} from 'state/actions/auth';

describe('reducers/messages', () => {
  test('should return initial state', () => {
    const state = reduceMsg(undefined, {});
    expect(state).toEqual([]);
  });

  test('should append new message to state', () => {
    const message = {
      text: 'test',
      user: {
        username: 'test'
      }
    };
    const firstState = reduceMsg(undefined, {
      type: SEND_CHAT_MESSAGE,
      content: message
    });
    expect(firstState).toEqual([ message ]);

    const secondMessage = {
      text: 'hello world',
      user: {
        username: 'test'
      }
    };
    const secondState = reduceMsg(firstState, {
      type: RECEIVE_CHAT_MESSAGE,
      content: secondMessage
    });
    expect(secondState).toEqual([ message, secondMessage ]);
  });

  test('should return initial state when logging out', () => {
    const message = {
      text: 'test',
      user: {
        username: 'test'
      }
    };
    const state = reduceMsg(undefined, {
      type: RECEIVE_CHAT_MESSAGE,
      content: message
    });
    expect(state).toEqual([ message ]);

    const actualState = reduceMsg(state, {
      type: LOGOUT
    });
    expect(actualState).toEqual([]);
  });

  test('should replace chatlog in state', () => {
    const message = {
      text: 'test',
      user: {
        username: 'test'
      }
    };
    const initialState = reduceMsg(undefined, {
      type: RECEIVE_CHAT_MESSAGE,
      content: message
    });
    const messages = [ {
      text: 'hello world',
      user: {
        username: 'test'
      }
    }, {
      text: 'hello world2',
      user: {
        username: 'test'
      }
    } ];
    const actualState = reduceMsg(initialState, {
      type: RECEIVE_CHATLOG,
      payload: messages
    });

    expect(actualState).toEqual([ ...messages ]);
  });
});