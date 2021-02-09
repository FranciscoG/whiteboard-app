import Draw from "features/draw";
import Notes from "features/note";
import NoteSingle from "features/note/single";
import { Layer } from "react-konva";

function LayerManager({ items, lines, newNote }) {
  return (
    <Layer>
      <Draw lines={lines} />
      <Notes notes={items.notes} />
      {newNote && <NoteSingle note={newNote} />}
    </Layer>
  );
}

export default LayerManager;
