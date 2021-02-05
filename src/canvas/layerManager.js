import { DRAW, ERASE, POINTER } from "features/tools/constants";
import Draw from "features/draw";
import Notes from "features/note";
import NoteSingle from "features/note/single";
import { Layer } from "react-konva";

/**
 * This will hold the currently active layer
 * - Drawing: This will move all lines to active so that it can erase
 * - Notes: only actively selected if tool is pointer
 */
function Active({ tool, notes, lines }) {
  let selectedNote = tool === POINTER ? notes.find((n) => n.selected) : null;
  return (
    <>
      {(tool === DRAW || tool === ERASE) && <Draw lines={lines} />}
      {selectedNote && <NoteSingle note={selectedNote} />}
    </>
  );
}

/**
 * When item is currently not being interacted with it will move to this
 * inactive layer to reduce constant updating
 * - Drawing: all lines
 * - Notes: only unselected notes or all notes if using any tool other than pointer
 */
function Inactive({ tool, notes, lines }) {
  return (
    <>
      {(tool !== DRAW || tool !== ERASE) && <Draw lines={lines} />}
      {tool === POINTER ? (
        <Notes notes={notes.filter((n) => !n.selected)} />
      ) : (
        <Notes notes={notes} />
      )}
    </>
  );
}

function LayerManager({ currentTool, items, lines }) {
  
  return (
    <>
      {/**
       * Inactive Later so that the whole canvas isn't redrawing for every
       * single tool
       */}
      <Layer>
        <Inactive tool={currentTool} lines={lines} notes={items.notes} />
      </Layer>

      {/**
       * Active layer, only the current active tool should be rendering here
       * otherwise it will get moved to the inactive layer
       */}
      <Layer>
        <Active tool={currentTool} lines={lines} notes={items.notes} />
      </Layer>
    </>
  );
}

export default LayerManager
