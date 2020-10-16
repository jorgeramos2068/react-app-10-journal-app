import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import JournalEntry from '../../../components/journal/JournalEntry';
import { activateNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Tests in JournalEntry component', () => {
  const initialState = {};
  let store;
  let wrapper;
  const note = {
    id: 'test_id',
    title: 'Test title',
    body: 'Test body',
    date: 0,
    url: 'https://test.com/test.jpg'
  }

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <JournalEntry {...note} />
      </Provider>
    );
  });

  test('Should display JournalEntry correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should active the current note', () => {
    wrapper.find('.journal__entry').prop('onClick')();
    expect(store.dispatch).toHaveBeenCalledWith(
      activateNote(note.id, {...note})
    );
  });
});
