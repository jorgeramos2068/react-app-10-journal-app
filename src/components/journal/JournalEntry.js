import React from 'react';

const JournalEntry = () => {
  return (
    <div className="journal__entry">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://assets.tonica.la/__export/1598208780079/sites/debate/img/2020/08/23/the-batman-zoe-kravitz-estx-es-su-primera-aparicixn-como-catwoman_1.jpg_1359985867.jpg)',
        }}
      >
      </div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">
          A new day
        </p>
        <p className="journal__entry-content">
          Lorem ipsum bla bla wooo
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>June 28</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
