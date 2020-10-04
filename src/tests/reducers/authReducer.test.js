import authReducer from '../../reducers/authReducer';
import types from '../../types/types';

describe('Tests in authReducer', () => {
  const uid = 'test_id';
  const displayName = 'Test name';

  test('Should perform login action', () => {
    const initialState = {};
    const action = {
      type: types.login,
      payload: {
        uid,
        displayName
      }
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      uid: uid,
      name: displayName
    });
  });

  test('Should perform logout action', () => {
    const initialState = {
      uid: uid,
      name: displayName
    };
    const action = {
      type: types.logout
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({});
  });

  test('Should return the same state if the action does not exist', () => {
    const initialState = {
      uid: uid,
      name: displayName
    };
    const action = {
      type: 'Invalid'
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
