import { useEffect } from "react";
import { Stage } from "react-konva";
import { connect } from "react-redux";
import Tools from "features/tools";
import useDraw from "hooks/useDraw";
import { DRAW, ERASE } from "features/tools/constants";
import DrawLayer from "features/drawLayer";

function Canvas({ currentTool }) {
  const { lines, drawMouseDown, drawMouseMove, drawMouseUp, setDrawTool } = useDraw();

  useEffect(() => {
    setDrawTool(currentTool);
  }, [currentTool, setDrawTool]);

  return (
    <>
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
        <DrawLayer lines={lines} />
      </Stage>
      <Tools />
    </>
  );
}

const mapStateToProps = (state) => ({
  currentTool: state.tool.cursor,
});

export default connect(mapStateToProps)(Canvas);
