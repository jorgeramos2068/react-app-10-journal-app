import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, startLogout, startLoginEmailPassword } from '../../actions/auth';
import types from '../../types/types';

describe('Tests for auth actions', () =>{
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let store;
  
  beforeEach(() => {
    store = mockStore({
      auth: {
        uid: 'test_id'
      },
    });
  });

  test('Should create the object for login action', () => {
    const uid = 'test_uid';
    const displayName = 'test_display_name';
    const action = login(uid, displayName);
    expect(action).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName
      }
    });
  });

  test('Should create the object for logout action', () => {
    const action = logout();
    expect(action).toEqual({
      type: types.logout
    });
  });

  test('Should perform logout with startLogout action', async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.logout
    });
    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning
    });
  });

  test('Should perform login with startLoginEmailPassword action', async () => {
    const email = 'test@test.com';
    const password = 'password';
    await store.dispatch(startLoginEmailPassword(email, password));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: expect.any(String),
        displayName: null
      }
    });
  });
});
