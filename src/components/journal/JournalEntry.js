import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activateNote } from '../../actions/notes';

const JournalEntry = ({id, date, title, body, url}) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();

  const handleEntryClick = () => {
    const note = {
      date,
      title,
      body,
      url
    }
    dispatch(activateNote(id, note));
  };

  return (
    <div
      className="journal__entry"
      onClick={handleEntryClick}
    >
      {
        url &&
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${url})`,
          }}
        >
        </div>
      }
      <div className="journal__entry-body">
        <p className="journal__entry-title">
          {title}
        </p>
        <p className="journal__entry-content">
          {body}
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>{noteDate.format('dddd')}</span>
        <h4>{noteDate.format('MMM Do')}</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
