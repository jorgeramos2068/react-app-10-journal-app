import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import NotesAppBar from './NotesAppBar';

const NoteScreen = () => {
  const {active:note} = useSelector(state => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const {body, title} = formValues;
  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);
  
  const dispatch = useDispatch();

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="test"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        >
        </textarea>
       {
          (note.url) &&
          <div className="notes__image">
            <img
              src="https://www.theguardian.pe.ca/media/photologue/photos/cache/B97946073Z.1_20190906151130_000GMGP7UF1.1-1_large.jpg"
              alt="Notes"
            />
          </div>
       }
      </div>
    </div>
  );
};

export default NoteScreen;
