import { Rect, Group, Text } from "react-konva";

function Notes({ notes = [] }) {
  return notes.map((note, i) => (
    <Group key={`note-${i}`} draggable x={note.x} y={note.y}>
      <Rect fill={note.color} width={note.width} height={note.height} />
      <Text
        x={note.text.x}
        y={note.text.y}
        text={note.text.string}
        fontSize={note.text.fontSize}
        fontFamily={note.text.fontFamily}
        fill={note.text.fill}
      />
    </Group>
  ));
}

export default Notes;
