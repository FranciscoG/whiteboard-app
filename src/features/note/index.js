import PropTypes from "prop-types";
import NoteSingle, { notePropTypes } from "features/note/single";

function Notes({ notes = [] }) {
  return (
    <>
      {notes.map((note, i) => (
        <NoteSingle key={note.id} note={note} />
      ))}
    </>
  );
}

Notes.propTypes = {
  notes: PropTypes.arrayOf(notePropTypes),
};

export default Notes;
