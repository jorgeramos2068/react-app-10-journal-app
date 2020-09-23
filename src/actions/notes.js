import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import loadNotes from '../helpers/loadNotes';
import uploadFile from '../helpers/uploadFile';
import types from '../types/types';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth;
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(activateNote(doc.id, newNote));
  };
};

export const activateNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth;
    if (!note.url) {
      delete note.url;
    }
    const noteToFirestore = {...note};
    delete noteToFirestore.id;
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    dispatch(refreshNote(note.id, note));
    Swal.fire('Saved', 'The note was saved successfully', 'success');
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    id,
    note: {
      id,
      ...note
    }
  }
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const {active: activeNote} = getState().notes;
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    const fileUrl = await uploadFile(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote));
    Swal.close();
  };
};
