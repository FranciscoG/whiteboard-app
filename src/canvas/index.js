import { useEffect, useState } from "react";
import { Stage, Rect, Layer } from "react-konva";
import { connect, ReactReduxContext, Provider } from "react-redux";
import debounce from "lodash-es/debounce";

// commponents
import Tools from "features/tools";
import AddNoteModal from "features/note/addNoteModal";
import LayerManager from "canvas/layerManager";
import Placer from "components/placer";
import FlyingTextInput from "features/text/flyingTextInput";

// state
import { setTool } from "features/tools/toolSlice";
import { clearActiveNote } from "features/note/noteSlice";
import { addItem, deleteItem, updateItem, clearSelected } from "canvas/canvasSlice";
import { clearActiveText } from "features/text/textSlice";

// other
import { DRAW, ERASE, NOTE, POINTER, TEXT } from "features/tools/constants";
import useDraw from "features/draw/useDraw";
import usePlacing from "hooks/usePlacing";
import bgPattern from "assets/bg-pattern2.png";
import KEYS from "utils/KEYS";

// for retina perf, set tip #9 https://konvajs.org/docs/performance/All_Performance_Tips.html
// import Konva from "konva";
// Konva.pixelRatio = 1;

function Canvas({
  currentTool,
  setTool,
  canvasItems,
  editNote,
  clearActiveNote,
  newNote,
  lastShortcut,
  clearActiveText,
  editText,
  deleteItem,
  addItem,
  updateItem,
  clearSelected,
}) {
  const { lines, drawMouseDown, drawMouseMove, drawMouseUp } = useDraw();
  const [stageDim, setStageDim] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [bgImageLoadded, setBgImageLoadded] = useState(false);
  const notePlacing = usePlacing(NOTE === currentTool);
  const textPlacing = usePlacing(TEXT === currentTool);

  const bgImage = new Image();
  bgImage.onload = () => {
    setBgImageLoadded(true);
  };
  bgImage.src = bgPattern;

  /**
   * ComponentDidMount effect
   */
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

  /**
   * This effect handles changes in the last shortcut key
   */
  useEffect(() => {
    if (lastShortcut === KEYS.del || lastShortcut === KEYS.backspace) {
      deleteItem();
      return;
    }
    if (lastShortcut === KEYS.esc) {
      if (notePlacing.state.isPlacing) {
        notePlacing.reset();
      } else if (textPlacing.state.isPlacing) {
        textPlacing.reset();
      } else if (canvasItems.items.find((e) => e.selected)) {
        clearSelected();
      }
    }
  }, [lastShortcut, deleteItem, notePlacing, textPlacing, canvasItems.items, clearSelected]);

  /**
   * This effect handles reseting any Placers when canceling by switching to a
   * different tool
   */
  useEffect(() => {
    if (currentTool !== TEXT && textPlacing.state.isPlacing) {
      textPlacing.reset();
      return;
    }

    if (currentTool !== NOTE && notePlacing.state.isPlacing) {
      notePlacing.reset();
    }
  }, [currentTool, notePlacing, textPlacing]);

  return (
    <>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            width={stageDim.w}
            height={stageDim.h}
            tabIndex={0}
            onMouseDown={(e) => {
              if (currentTool === DRAW || currentTool === ERASE) {
                drawMouseDown(e);
              }
              if (e.target.constructor.name === "Stage" || e.target.constructor.name === "Line") {
                clearSelected();
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
              <LayerManager items={canvasItems.items} lines={lines} newNote={newNote} />
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>

      {notePlacing.state.isPlacing && (
        <Placer
          width={300 * 0.75}
          height={300 * 0.75}
          onFinish={(x, y) => {
            notePlacing.placed(x, y);
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
            textPlacing.placed(x, y);
          }}
          onCancel={() => {
            textPlacing.reset();
            setTool(POINTER);
          }}
        />
      )}

      <Tools />

      {textPlacing.state.isPlaced && (
        <FlyingTextInput
          x={textPlacing.position.x}
          y={textPlacing.position.y}
          onSave={(text) => {
            addItem(text);
            setTool(POINTER);
            clearActiveText();
            textPlacing.reset();
          }}
          onCancel={() => {
            setTool(POINTER);
            clearActiveText();
            textPlacing.reset();
          }}
        />
      )}

      {editText && (
        <FlyingTextInput
          x={editText.x}
          y={editText.y}
          textData={editText}
          onSave={(updatedTextData) => {
            updateItem(updatedTextData);
            setTool(POINTER);
            clearActiveText();
          }}
          onCancel={() => {
            setTool(POINTER);
            clearActiveText();
          }}
        />
      )}

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
  editText: state.text.activeText,
});

const mapDispatchToProps = {
  setTool,
  clearActiveNote,
  clearActiveText,
  deleteItem,
  addItem,
  updateItem,
  clearSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
