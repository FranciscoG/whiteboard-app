import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Rect, Group, Text } from "react-konva";
import { updateNote, addNote } from "canvas/canvasSlice";
import { setActiveNote, clearNewNote } from "features/note/noteSlice";
import { POINTER } from "features/tools/constants";
import Transformable from "components/Transformable";

export const notePropTypes = PropTypes.shape({
  id: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
});

function NoteSingle({ note, updateNote, setActiveNote, currentTool, addNote, clearNewNote }) {
  function onClick(e) {
    /* handle double-click which puts the note into edit mode */
    if (e.evt.detail === 2) {
      setActiveNote(note);
      return;
    }

    /* handle select and transform */
    if (e.evt.detail === 1 && !note.selected) {
      updateNote({
        ...note,
        selected: true,
      });
    }
  }

  function onDragEnd(e) {
    updateNote({
      ...note,
      x: e.target.x(),
      y: e.target.y(),
    });
  }

  function onTransformEnd(node) {
    updateNote({
      ...note,
      x: node.x(),
      y: node.y(),
      scaleX: node.scaleX(),
      scaleY: node.scaleY(),
    });
  }

  return (
    <Transformable
      enabled={note.selected && currentTool === POINTER}
      onTransformEnd={onTransformEnd}
      withRef={(noteRef) => {
        /**
         * This will handle animating the note when first added to the canvas
         * and then once done it'll remove the note from the temporary "newNote"
         * state and move it to the main state
         */
        if (noteRef.current && note.origin) {
          noteRef.current.to({
            x: note.x,
            y: note.y,
            duration: 0.2,
            onFinish: () => {
              addNote({
                ...note,
                origin: null
              });
              clearNewNote();
            },
          });
        }
      }}
    >
      <Group
        draggable={currentTool === POINTER}
        x={note.origin ? note.origin.x : note.x}
        y={note.origin ? note.origin.y : note.y}
        onClick={onClick}
        onDragEnd={onDragEnd}
        scaleX={note.scaleX}
        scaleY={note.scaleY}
      >
        <Rect
          fill={note.color}
          width={note.width}
          height={note.height}
          shadowOffsetX={0}
          shadowOffsetY={5}
          shadowBlur={3}
          shadowEnabled={true}
          shadowColor="#3c4043"
          shadowOpacity={0.26}
        />
        <Text
          width={note.width}
          height={note.height}
          text={note.text}
          fontSize={note.fontSize}
          fontFamily="sans-serif"
          fill="#000000"
          align="center"
          verticalAlign="middle"
          fontStyle="bold"
        />
      </Group>
    </Transformable>
  );
}

NoteSingle.propTypes = {
  note: notePropTypes.isRequired,
  updateNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentTool: state.tool.cursor,
});

const matchDispatchToProps = {
  updateNote,
  setActiveNote,
  addNote,
  clearNewNote,
};

export default connect(mapStateToProps, matchDispatchToProps)(NoteSingle);
