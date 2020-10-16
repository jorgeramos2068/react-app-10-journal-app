import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import uploadFile from '../../helpers/uploadFile';
import types from '../../types/types';

describe('Tests for notes actions', () => {
  jest.mock('../../helpers/uploadFile', () => ({
    __esModule: true,
    default: jest.fn(() => {
      return 'https://test.com/test.jpg';
    })
  }));

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let store;

  beforeEach(() => {
    // Create store mock
    store = mockStore({
      auth: {
        uid: 'test_id'
      },
      notes: {
        active: {
          id: 'CCwfC3iqLsloneSQAlI0',
          title: 'Updated title',
          body: 'Updated body'
        }
      }
    });
  });

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

  test('Should load notes with startLoadingNotes', async() => {
    const uid = 'test_id';
    await store.dispatch(startLoadingNotes(uid));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array)
    });
    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };
    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test('Should update the note with startSaveNote', async() => {
    const note = {
      id: 'CCwfC3iqLsloneSQAlI0',
      title: 'Updated title',
      body: 'Updated body'
    };
    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();
    expect(actions[0].type).toBe(types.notesUpdate);
    const docRef = await db.doc(`/test_id/journal/notes/${note.id}`).get();
    expect(docRef.data().title).toBe(note.title);
  });

  test('Should update the image url with startUploading', async() => {
    const file = new File([], 'photo.jpg');
    await store.dispatch(startUploading(file));
    const docRef = await db.doc('/test_id/journal/notes/CCwfC3iqLsloneSQAlI0').get();
    expect(docRef.data().url).toBe('https://test.com/test.jpg');
  });
});
