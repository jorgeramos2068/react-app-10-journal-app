import React from 'react';
import NotesAppBar from './NotesAppBar';

const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="test"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
        >
        </textarea>
        <div className="notes__image">
          <img
            src="https://www.theguardian.pe.ca/media/photologue/photos/cache/B97946073Z.1_20190906151130_000GMGP7UF1.1-1_large.jpg"
            alt="Notes"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteScreen;
