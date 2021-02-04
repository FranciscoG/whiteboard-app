import { useEffect } from "react";
import { Stage } from "react-konva";
import { connect } from "react-redux";

// commponents
import Tools from "features/tools";
import AddNoteModal from "features/note/addNoteModal";
import LayerManager from "canvas/layerManager";

import { DRAW, ERASE, NOTE, POINTER } from "features/tools/constants";
import useDraw from "features/draw/useDraw";
import { setTool } from "features/tools/toolSlice";

// for retina perf, set tip #9 https://konvajs.org/docs/performance/All_Performance_Tips.html
import Konva from "konva";
Konva.pixelRatio = 1;

function Canvas({ currentTool, setTool, notes }) {
  const { lines, drawMouseDown, drawMouseMove, drawMouseUp, setDrawTool } = useDraw();

  useEffect(() => {
    setDrawTool(currentTool);
  }, [currentTool, setDrawTool]);

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={(e) => {
          if (currentTool === DRAW || currentTool === ERASE) {
            drawMouseDown(e);
          }
        }}
        onMousemove={(e) => {
          if (currentTool === DRAW || currentTool === ERASE) {
            drawMouseMove(e);
          }
        }}
        onMouseup={(e) => {
          if (currentTool === DRAW || currentTool === ERASE) {
            drawMouseUp(e);
          }
        }}
        className={`whiteboard cursor-${currentTool}`}
      >
        <LayerManager
          currentTool={currentTool}
          lines={lines}
          notes={notes.filter((n) => !n.selected)}
        />
      </Stage>
      <Tools />

      <AddNoteModal
        show={currentTool === NOTE}
        onSave={() => {
          setTool(POINTER);
        }}
        onCancel={() => {
          setTool(POINTER);
        }}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  currentTool: state.tool.cursor,
  notes: state.canvas.present.notes,
});

const mapDispatchToProps = {
  setTool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
