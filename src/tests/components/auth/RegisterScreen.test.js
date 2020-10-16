import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import RegisterScreen from '../../../components/auth/RegisterScreen';
import types from '../../../types/types';
import { startRegisterWithEmailPasswordName } from '../../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/auth', () => ({
  startRegisterWithEmailPasswordName: jest.fn()
}));

describe('Tests in RegisterScreen component', () => {
  const initialState = {
    auth: {},
    ui: {
      loading: false,
      msgError: null
    }
  };
  let store;
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );
  });

  test('Should display LoginScreen correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should not dispatch startRegisterWithEmailPasswordName action when email is empty', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: expect.any(String)
    });
  });

  test('Should show message when there is an error', () => {
    const initialState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Invalid email'
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initialState.ui.msgError);
  });

  test('Should dispatch startRegisterWithEmailPasswordName action', async () => {
    store.dispatch = jest.fn();
    const emailField = wrapper.find('input[name="email"]');
    const nameField = wrapper.find('input[name="name"]');
    const pwdField = wrapper.find('input[name="password"]');
    const pwd2Field = wrapper.find('input[name="password2"]');
    emailField.simulate('change', {
      target: {
        value: 'test@test.com',
        name: 'email'
      }
    });
    nameField.simulate('change', {
      target: {
        value: 'test',
        name: 'name'
      }
    });
    pwdField.simulate('change', {
      target: {
        value: 'test_pwd',
        name: 'password'
      }
    });
    pwd2Field.simulate('change', {
      target: {
        value: 'test_pwd',
        name: 'password2'
      }
    });
    await wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });
    expect(startRegisterWithEmailPasswordName).toHaveBeenCalled();
  });
});
