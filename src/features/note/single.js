import { useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Rect, Group, Text, Transformer } from "react-konva";
import { updateNote } from "canvas/canvasSlice";
import { setActiveNote } from "features/note/noteSlice";
import { POINTER } from "features/tools/constants";

export const notePropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
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

function NoteSingle({ note, updateNote, setActiveNote, currentTool }) {
  const noteRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (note.selected && currentTool === POINTER) {
      // we need to attach transformer manually
      trRef.current.nodes([noteRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [note.selected, currentTool]);

  useEffect(() => {
    if (noteRef.current && note.origin) {
      noteRef.current.to({
        x: note.x,
        y: note.y,
        duration: 0.2,
        onFinish: () => {
          const copied = { ...note };
          delete copied.origin;
          updateNote(copied);
        }
      });
    }
  }, [noteRef, note, updateNote])

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

  function onTransformEnd(e) {
    // src: https://konvajs.org/docs/react/Transformer.html
    const node = noteRef.current;

    updateNote({
      ...note,
      x: node.x(),
      y: node.y(),
      scaleX: node.scaleX(),
      scaleY: node.scaleY(),
    });
  }

  return (
    <>
      <Group
        ref={noteRef}
        draggable={currentTool === POINTER}
        x={note.origin ? note.origin.x : note.x}
        y={note.origin ? note.origin.y : note.y}
        onClick={onClick}
        onDragEnd={onDragEnd}
        onTransformEnd={onTransformEnd}
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
      {note.selected && (
        <Transformer
          ref={trRef}
          keepRatio={true}
          rotateEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 100 || newBox.height < 100) {
              return oldBox;
            }

            /**
             * keepRatio doesn't seem to work so forcing it for now
             */
            if (oldBox.height === newBox.height) {
              newBox.height = newBox.width;
            }
            if (oldBox.width === newBox.width) {
              newBox.width = newBox.height;
            }

            return newBox;
          }}
        />
      )}
    </>
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
};

export default connect(mapStateToProps, matchDispatchToProps)(NoteSingle);
