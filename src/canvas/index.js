import { useEffect, useState } from "react";
import { Stage, Rect, Layer } from "react-konva";
import { connect, ReactReduxContext, Provider } from "react-redux";
import debounce from "lodash-es/debounce";

// commponents
import Tools from "features/tools";
import AddNoteModal from "features/note/addNoteModal";
import LayerManager from "canvas/layerManager";
import Placer from "components/placer";

// state
import { setTool } from "features/tools/toolSlice";
import { clearActiveNote } from "features/note/noteSlice";

// other
import { DRAW, ERASE, NOTE, POINTER, TEXT } from "features/tools/constants";
import useDraw from "features/draw/useDraw";
import usePlacing from "hooks/usePlacing";
import bgPattern from "assets/bg-pattern2.png";

// for retina perf, set tip #9 https://konvajs.org/docs/performance/All_Performance_Tips.html
// import Konva from "konva";
// Konva.pixelRatio = 1;

function Canvas({ currentTool, setTool, canvasItems, editNote, clearActiveNote, newNote }) {
  const { lines, drawMouseDown, drawMouseMove, drawMouseUp, setDrawTool } = useDraw();
  const [stageDim, setStageDim] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [bgImageLoadded, setBgImageLoadded] = useState(false);
  const notePlacing = usePlacing(NOTE === currentTool);
  const textPlacing = usePlacing(TEXT === currentTool);

  const bgImage = new Image();
  bgImage.onload = () => {
    setBgImageLoadded(true);
  };
  bgImage.src = bgPattern;

  useEffect(() => {
    setDrawTool(currentTool);
  }, [currentTool, setDrawTool]);

  useEffect(() => {
    function onResize() {
      setStageDim({ w: window.innerWidth, h: window.innerHeight });
    }
    const debouncedResize = debounce(onResize, 25);
    window.addEventListener("resize", debouncedResize);

    return function cleanup() {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

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
                  listening={false}
                />
              )}
            </Layer>
            <Provider store={store}>
              <LayerManager items={canvasItems} lines={lines} newNote={newNote} />
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>

      {notePlacing.state.isPlacing && (
        <Placer
          width="200"
          height="200"
          onFinish={(x, y) => {
            notePlacing.next(x, y);
          }}
          onCancel={() => {
            notePlacing.reset();
            setTool(POINTER);
          }}
        />
      )}

      {textPlacing.state.isPlacing && (
        <Placer
          width="400"
          height="80"
          onFinish={(x, y) => {
            textPlacing.next(x, y);
          }}
          onCancel={() => {
            textPlacing.reset();
            setTool(POINTER);
          }}
        />
      )}

      <Tools />

      {(notePlacing.state.isPlaced || editNote) && (
        <AddNoteModal
          note={editNote}
          x={notePlacing.position.x}
          y={notePlacing.position.y}
          onClose={() => {
            setTool(POINTER);
            clearActiveNote();
            notePlacing.reset();
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
  newNote: state.note.newNote,
});

const mapDispatchToProps = {
  setTool,
  clearActiveNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
