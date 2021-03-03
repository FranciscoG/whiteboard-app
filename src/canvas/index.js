import { useEffect, useState, useRef } from "react";
import { Stage, Rect, Layer } from "react-konva";
import { connect, ReactReduxContext, Provider } from "react-redux";
// import debounce from "lodash-es/debounce";

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
import { scaleStage } from "canvas/scaleManager";

// for retina perf, set tip #9 https://konvajs.org/docs/performance/All_Performance_Tips.html
import Konva from "konva";
Konva.pixelRatio = 1;

const STAGE_WIDTH = 3800;
const STAGE_HEIGHT = 3105;
const scaleBy = 1.05;

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
  const stageRef = useRef(null);
  const { lines, drawMouseDown, drawMouseMove, drawMouseUp } = useDraw();
  const [bgImageLoadded, setBgImageLoadded] = useState(false);
  const notePlacing = usePlacing(NOTE, currentTool);
  const textPlacing = usePlacing(TEXT, currentTool);
  const currentKeyDown = useRef(null);

  const bgImage = new Image();
  bgImage.onload = () => {
    setBgImageLoadded(true);
  };
  bgImage.src = bgPattern;

  useEffect(() => {
    let container = null;

    function onKeyUp(e) {
      currentKeyDown.current = null;
      if (e.key === KEYS.del || e.key === KEYS.backspace) {
        deleteItem();
      }
    }

    function onKeyDown(e) {
      currentKeyDown.current = e.key;
    }

    if (stageRef.current) {
      container = stageRef.current.getContainer();
      container.addEventListener("keyup", onKeyUp);
      container.addEventListener("keydown", onKeyDown);
    }

    return function cleanup() {
      if (container) {
        container.removeEventListener("keyup", onKeyUp);
        container.removeEventListener("keydown", onKeyDown);
      }
    };
  }, [deleteItem]);

  /**
   * This effect handles changes in the last shortcut key
   */
  useEffect(() => {
    if (lastShortcut === KEYS.esc) {
      if (notePlacing.state.isPlacing) {
        notePlacing.reset();
      } else if (textPlacing.state.isPlacing) {
        textPlacing.reset();
      } else if (canvasItems.items.find((e) => e.selected)) {
        clearSelected();
      }
    }
  }, [lastShortcut, notePlacing, textPlacing, canvasItems.items, clearSelected]);

  return (
    <>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            ref={stageRef}
            width={STAGE_WIDTH}
            height={STAGE_HEIGHT}
            // x={(STAGE_WIDTH / 2 - window.innerWidth / 2) * -1}
            // y={(STAGE_HEIGHT / 2 - window.innerHeight / 2) * -1}
            tabIndex={0}
            // onDragMove={(e) => {
            //   const x = e.target.x();
            //   const y = e.target.y();
            //   console.log(x,y)
            //   if (x < 0) {
            //     e.target.x(0)
            //   }
            //   if (y < 0) {
            //     e.target.y(0)
            //   }
            // }}
            onWheel={(e) => {
              e.evt.preventDefault();
              if (e.target instanceof Konva.Stage) {
                scaleStage(e.target, e.evt.deltaY, scaleBy);
              }
            }}
            onMouseDown={(e) => {
              if (currentKeyDown.current === KEYS.space) {
                e.target.draggable(true);
              } else if (currentTool === DRAW || currentTool === ERASE) {
                drawMouseDown(e);
              }
            }}
            onMousemove={(e) => {
              if (currentTool === DRAW || currentTool === ERASE) {
                drawMouseMove(e);
              }
            }}
            onMouseup={(e) => {
              e.target.draggable(false);

              if (currentTool === DRAW || currentTool === ERASE) {
                drawMouseUp(e);
              }
              // mimic "blur" off any selected item to unselect it
              if (e.target instanceof Konva.Stage || e.target instanceof Konva.Line) {
                clearSelected();
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
                  width={STAGE_WIDTH}
                  height={STAGE_HEIGHT}
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
