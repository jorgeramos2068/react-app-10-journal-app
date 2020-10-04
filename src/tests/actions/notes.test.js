import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import types from '../../types/types';
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Create store mock
const store = mockStore({
  auth: {
    uid: 'test_id'
  }
});

describe('Tests for notes actions', () => {
  test('Should create a new note with startNewNote action', async() => {
    await store.dispatch(startNewNote());
    const payload = {
      id: expect.any(String),
      title: '',
      body: '',
      date: expect.any(Number)
    };
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload
    });
    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload
    });
    const docId = actions[0].payload.id;
    await db.collection('test_id/journal/notes').doc(docId).delete();
  });
});
