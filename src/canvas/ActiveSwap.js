import { DRAW, ERASE, POINTER } from "features/tools/constants";
import Draw from "features/draw";
import Notes from "features/note";
import NoteSingle from "features/note/single";

/**
 * This will hold the currently active layer
 * - Drawing: This will move all lines to active so that it can erase
 * - Notes: only actively selected if tool is pointer
 */
export function Active({ tool, notes, ...props }) {
  let selectedNote = tool === POINTER ? notes.find((n) => n.selected) : null;
  return (
    <>
      {(tool === DRAW || tool === ERASE) && <Draw lines={props.lines} />}
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
export function Inactive({ tool, notes, ...props }) {
  return (
    <>
      {(tool !== DRAW || tool !== ERASE) && <Draw lines={props.lines} />}
      {tool === POINTER ? (
        <Notes notes={notes.filter((n) => !n.selected)} />
      ) : (
        <Notes notes={notes} />
      )}
    </>
  );
}
