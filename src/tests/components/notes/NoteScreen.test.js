import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import NoteScreen from '../../../components/notes/NoteScreen';
import { activateNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/notes', () => ({
  activateNote: jest.fn()
}));

describe('Tests in NoteScreen component', () => {
  const initialState = {
    auth: {
      uid: 'test_id',
      name: 'Test'
    },
    ui: {
      loading: false,
      msgError: null
    },
    notes: {
      active: {
        id: 'test_id',
        title: 'Test',
        body: 'Test body',
        date: 0
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
        <NoteScreen />
      </Provider>
    );
  });

  test('Should display NoteScreen correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should dispatch activateNote action when required', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Test change'
      }
    });
    expect(activateNote).toHaveBeenLastCalledWith('test_id', {
      id: 'test_id',
      title: 'Test change',
      body: 'Test body',
      date: 0
    });
  });
});
