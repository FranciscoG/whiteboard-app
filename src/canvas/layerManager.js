import { Layer } from "react-konva";
import Draw from "features/draw";
import Note from "features/note";
import Text from "features/text";
import { NOTE, TEXT } from "features/tools/constants";

function DrawItem({ item }) {
  switch (item.type) {
    case NOTE:
      return <Note note={item} key={item.id} />;
    case TEXT:
      return <Text data={item} key={item.id} />;
    default:
      return null;
  }
}

/**
 * TODO: merge state into one array so that order can be manipulated
 */
function LayerManager({ items, lines, newNote }) {
  return (
    <Layer>
      <Draw lines={lines} />
      {items.map((item) => (
        <DrawItem item={item} key={item.id} />
      ))}
      {newNote && <Note note={newNote} />}
    </Layer>
  );
}

export default LayerManager;
