import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import LoginScreen from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn()
}));

describe('Tests in LoginScreen component', () => {
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
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );
  });

  test('Should display LoginScreen correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should dispatch startGoogleLogin action', () => {
    wrapper.find('.google-btn').prop('onClick')();
    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test('Should not dispatch startLoginEmailPassword action', () => {
    wrapper.find('form').prop('onSubmit')({
      preventDefault(){}
    });
    expect(startLoginEmailPassword).not.toHaveBeenCalledWith();
  });
});
