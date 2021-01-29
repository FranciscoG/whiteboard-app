import { useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";
import { connect } from "react-redux";
import Controls from "features/controls";
import useDraw from "hooks/useDraw";

import { DRAW, ERASE } from "features/controls/constants";

function App({ currentControl }) {
  const { lines, drawMouseDown, drawMouseMove, drawMouseUp, setTool } = useDraw();

  useEffect(() => {
    setTool(currentControl);
  }, [currentControl, setTool]);

  return (
    <div className="App">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={(e) => {
          if (currentControl === DRAW || currentControl === ERASE) {
            drawMouseDown(e);
          }
        }}
        onMousemove={(e) => {
          if (currentControl === DRAW || currentControl === ERASE) {
            drawMouseMove(e);
          }
        }}
        onMouseup={(e) => {
          if (currentControl === DRAW || currentControl === ERASE) {
            drawMouseUp(e);
          }
        }}
        className={`whiteboard cursor-${currentControl}`}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={line.tool === ERASE ? 20 : 5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === ERASE ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
      <Controls />
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentControl: state.control.cursor,
});

export default connect(mapStateToProps)(App);
