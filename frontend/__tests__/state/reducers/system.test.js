import {
  FETCH_SYSTEM_STATUS_REQUEST,
  FETCH_SYSTEM_STATUS_RESPONSE,
  FETCH_SYSTEM_STATUS_ERROR
} from 'state/actions/system';
import reduceSys from 'state/reducers/system';

describe('reducers/system', () => {
  test('should return initial state', () => {
    const state = reduceSys(undefined, {});
    expect(state).toEqual({
      loading: false
    });
  });

  test('should return loading state', () => {
    const state = reduceSys(undefined, {
      type: FETCH_SYSTEM_STATUS_REQUEST
    });
    expect(state).toEqual({
      loading: true
    });
  });

  test('should set online to true when system responds', () => {
    const state = reduceSys(undefined, {
      type: FETCH_SYSTEM_STATUS_RESPONSE
    });
    expect(state).toEqual({
      loading: false,
      online: true
    });
  });

  test('should set online to false when system errors', () => {
    const state = reduceSys(undefined, {
      type: FETCH_SYSTEM_STATUS_ERROR
    });
    expect(state).toEqual({
      loading: false,
      online: false
    });
  });
});