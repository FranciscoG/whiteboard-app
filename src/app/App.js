import { useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";
import { connect } from "react-redux";
import Tools from "features/tools";
import useDraw from "hooks/useDraw";
import { setTool } from "features/tools/toolSlice";
import useShortcuts from 'hooks/useShortcuts';
import { DRAW, ERASE } from "features/tools/constants";

function App({ currentTool, setTool, draw }) {
  const { lines, drawMouseDown, drawMouseMove, drawMouseUp, setDrawTool } = useDraw();
  const { shortcut } = useShortcuts();

  useEffect(() => {
    setDrawTool(currentTool);
  }, [currentTool, setDrawTool]);

  useEffect(() => {
    setTool(shortcut)
  }, [shortcut, setTool]);

  return (
    <div className="App">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
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
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={draw.color}
              strokeWidth={line.tool === ERASE ? 20 : draw.thickness}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === ERASE ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
      <Tools />
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentTool: state.tool.cursor,
  draw: state.tool.draw
});

const mapDispatchToProps = { setTool }

export default connect(mapStateToProps, mapDispatchToProps)(App);
