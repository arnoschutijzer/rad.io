import {
  FETCH_PROFILE_RESPONSE,
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGOUT,
  UNAUTHORIZED
} from 'state/actions/auth';
import reduceAuth from 'state/reducers/auth';

describe('reducers/auth', () => {
  test('should return default state', () => {
    const state = reduceAuth(undefined, {});
    expect(state).toEqual({
      loading: false
    });
  });

  test('should return loading state', () => {
    const state = reduceAuth(undefined, {
      type: LOGIN_REQUEST
    });

    expect(state).toEqual({
      loading: true
    });
  });

  test('should add token & user to state', () => {
    const payload = {
      token: '1234-token',
      user: {
        username: 'test'
      }
    };
    const state = reduceAuth(undefined, {
      type: LOGIN_RESPONSE,
      payload
    });

    expect(state).toEqual({
      loading: false,
      user: payload.user,
      token: payload.token
    });
  });

  test('should add token & user to state when defined in action', () => {
    const payload = {
      user: {
        username: 'test'
      }
    };
    const token = '1234-token';
    const state = reduceAuth(undefined, {
      type: FETCH_PROFILE_RESPONSE,
      token,
      payload
    });

    expect(state).toEqual({
      loading: false,
      user: payload.user,
      token
    });
  });

  test('should return initial state when unauthorized', () => {
    // first create a state where we have an authenticated user
    const payload = {
      token: '1234-token',
      user: {
        username: 'test'
      }
    };
    const authorizedState = reduceAuth(undefined, {
      type: LOGIN_RESPONSE,
      payload
    });
    expect(authorizedState).toEqual({
      loading: false,
      user: payload.user,
      token: payload.token
    });

    // next fire the unauthorized action
    const actualState = reduceAuth(authorizedState,{
      type: UNAUTHORIZED
    });
    expect(actualState).toEqual({
      loading: false
    });
  });

  test('should return initial state when logout', () => {
    const payload = {
      token: '1234-token',
      user: {
        username: 'test'
      }
    };
    const authorizedState = reduceAuth(undefined, {
      type: LOGIN_RESPONSE,
      payload
    });

    const loggedOutState = reduceAuth(authorizedState, {
      type: LOGOUT
    });
    expect(loggedOutState).toEqual({
      loading: false
    });
  });
});