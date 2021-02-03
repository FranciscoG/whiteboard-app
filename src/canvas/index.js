import { useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import { connect } from "react-redux";

// commponents
import Tools from "features/tools";
import AddNoteModal from "features/note/addNoteModal";

// Layers
import { Active, Inactive } from "canvas/Active";

import { DRAW, ERASE, NOTE, POINTER } from "features/tools/constants";
import useDraw from "features/draw/useDraw";
import useNotes from "features/note/useNotes";
import { setTool } from "features/tools/toolSlice";

// for retina perf, set tip #9 https://konvajs.org/docs/performance/All_Performance_Tips.html
import Konva from "konva";
Konva.pixelRatio = 1;

function Canvas({ currentTool, setTool }) {
  const { lines, drawMouseDown, drawMouseMove, drawMouseUp, setDrawTool } = useDraw();
  const { notesMouseDown, notesMouseMove, notesMouseUp } = useNotes();

  useEffect(() => {
    setDrawTool(currentTool);
  }, [currentTool, setDrawTool]);

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={(e) => {
          switch (currentTool) {
            case DRAW:
            case ERASE:
              drawMouseDown(e);
              break;
            case NOTE:
              notesMouseDown(e);
              break;
            default:
            // do nothing for now
          }
        }}
        onMousemove={(e) => {
          switch (currentTool) {
            case DRAW:
            case ERASE:
              drawMouseMove(e);
              break;
            case NOTE:
              notesMouseMove(e);
              break;
            default:
            // do nothing for now
          }
        }}
        onMouseup={(e) => {
          switch (currentTool) {
            case DRAW:
            case ERASE:
              drawMouseUp(e);
              break;
            case NOTE:
              notesMouseUp(e);
              break;
            default:
            // do nothing for now
          }
        }}
        className={`whiteboard cursor-${currentTool}`}
      >
        {/**
         * Inactive Later so that the whole canvas isn't redrawing for every
         * single tool
         */}
        <Layer>
          <Inactive tool={currentTool} lines={lines} />
        </Layer>

        {/**
         * Active layer, only the current active tool should be rendering here
         * otherwise it will get moved to the inactive layer
         */}
        <Layer>
          <Active tool={currentTool} lines={lines} />
        </Layer>
      </Stage>
      <Tools />

      <AddNoteModal
        show={currentTool === NOTE}
        onSave={() => {
          setTool(POINTER)
        }}
        onCancel={() => {
          setTool(POINTER)
        }}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  currentTool: state.tool.cursor,
});

const mapDispatchToProps = {
  setTool
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
