import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import Swal from 'sweetalert2';

import AppRouter from '../../routers/AppRouter';
import { login } from '../../actions/auth';
import { firebase } from '../../firebase/firebase-config';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

jest.mock('../../actions/auth', () => ({
  login: jest.fn()
}));

describe('Tests in AppRouter router', () => {
  const initialState = {
    auth: {},
    ui: {
      loading: false,
      msgError: null
    },
    notes: {
      active: {
        id: 'test_id',
      },
      notes: []
    }
  };
  let store;
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  test('Should dispatch login action if the user is authenticated', async() => {
    let user;

    await act(async () => {
      // Login in our test database
      const userCredentials = await firebase.auth().signInWithEmailAndPassword('test@test.com', 'password');
      user = userCredentials.user;
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(login).toHaveBeenCalled();
  });
});
