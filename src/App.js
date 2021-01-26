import { Stage, Layer, Line } from "react-konva";
import Controls from "components/Controls";
import useDraw from "hooks/useDraw";

function App() {
  const { lines, handleMouseDown, handleMouseMove, handleMouseUp, setTool } = useDraw();

  return (
    <div className="App">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className="whiteboard"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={line.tool === "eraser" ? 20 : 5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={line.tool === "eraser" ? "destination-out" : "source-over"}
            />
          ))}
        </Layer>
      </Stage>
      <Controls
        onSelectTool={(newTool) => {
          setTool(newTool);
        }}
      />
    </div>
  );
}

export default App;
