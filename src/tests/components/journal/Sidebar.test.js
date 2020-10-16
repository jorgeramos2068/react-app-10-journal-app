import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Sidebar from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn()
}));

jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn()
}));

describe('Tests in Sidebar component', () => {
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
    wrapper = mount(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );
  });

  test('Should display Sidebar correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should dispatch startLogout action when required', () => {
    wrapper.find('.btn').prop('onClick')();
    expect(startLogout).toHaveBeenCalled();
  });

  test('Should dispatch startNewNote action when required', () => {
    wrapper.find('.journal__new-entry').prop('onClick')();
    expect(startNewNote).toHaveBeenCalled();
  });
});
