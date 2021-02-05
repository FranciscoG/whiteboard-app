import { useEffect, useState } from "react";
import { Stage, Rect, Layer } from "react-konva";
import { connect, ReactReduxContext, Provider } from "react-redux";

// commponents
import Tools from "features/tools";
import AddNoteModal from "features/note/addNoteModal";
import LayerManager from "canvas/layerManager";

// state
import { setTool } from "features/tools/toolSlice";
import { clearActiveNote } from "features/note/noteSlice";

// other
import { DRAW, ERASE, NOTE, POINTER } from "features/tools/constants";
import useDraw from "features/draw/useDraw";
import bgPattern from "assets/bg-pattern2.png";

// for retina perf, set tip #9 https://konvajs.org/docs/performance/All_Performance_Tips.html
import Konva from "konva";
Konva.pixelRatio = 1;

function Canvas({ currentTool, setTool, canvasItems, editNote, clearActiveNote }) {
  const { lines, drawMouseDown, drawMouseMove, drawMouseUp, setDrawTool } = useDraw();
  const [stageDim, setStageDim] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [bgImageLoadded, setBgImageLoadded] = useState(false);

  const bgImage = new Image();
  bgImage.onload = () => {
    setBgImageLoadded(true);
  };
  bgImage.src = bgPattern;

  useEffect(() => {
    setDrawTool(currentTool);
  }, [currentTool, setDrawTool]);

  return (
    <>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            width={stageDim.w}
            height={stageDim.h}
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
            {/* Background pattern layer */}
            <Layer listening={false}>
              {bgImageLoadded && (
                <Rect
                  x={0}
                  y={0}
                  width={stageDim.w}
                  height={stageDim.h}
                  fillPatternImage={bgImage}
                />
              )}
            </Layer>
            <Provider store={store}>
              <LayerManager currentTool={currentTool} items={canvasItems} lines={lines} />
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
      <Tools />

      {(currentTool === NOTE || typeof editNote === "object") && (
        <AddNoteModal
          note={editNote}
          onClose={() => {
            setTool(POINTER);
            clearActiveNote();
          }}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  currentTool: state.tool.cursor,
  canvasItems: state.canvas.present,
  editNote: state.note.activeNote,
});

const mapDispatchToProps = {
  setTool,
  clearActiveNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
