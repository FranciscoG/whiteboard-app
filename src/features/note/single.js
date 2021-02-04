import { useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Rect, Group, Text, Transformer } from "react-konva";
import { updateNote } from "canvas/canvasSlice";

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

function NoteSingle({ note, updateNote }) {
  const noteRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (note.selected) {
      // we need to attach transformer manually
      trRef.current.nodes([noteRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [note.selected]);

  function onClick() {
    if (!note.selected) {
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
        draggable
        x={note.x}
        y={note.y}
        onClick={onClick}
        onDragEnd={onDragEnd}
        onTransformEnd={onTransformEnd}
        scaleX={note.scaleX}
        scaleY={note.scaleY}
      >
        <Rect fill={note.color} width={note.width} height={note.height} />
        <Text
          width={note.width}
          height={note.height}
          text={note.text}
          fontSize={note.fontSize}
          fontFamily="sans-serif"
          fill="#000000"
          align="center"
          verticalAlign="middle"
          wrap="char"
          fontStyle="bold"
        />
      </Group>
      {note.selected && (
        <Transformer
          ref={trRef}
          keepRatio
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 100 || newBox.height < 100) {
              return oldBox;
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

const matchDispatchToProps = {
  updateNote,
};

export default connect(null, matchDispatchToProps)(NoteSingle);
