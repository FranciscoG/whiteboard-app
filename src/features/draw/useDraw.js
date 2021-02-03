import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLines, setLines as reducerSetLine } from "canvas/canvasSlice";
import { DRAW, TOOL_SIZE } from "features/tools/constants";

/**
 * useDraw hook
 * for better performance this hook keeps the lines in its own internal state and
 * updates global redux state only on MouseUp.
 */
function useDraw() {
  const [tool, setTool] = useState(DRAW);
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const dispatch = useDispatch();

  const color = useSelector((state) => state.tool.draw.color);
  const thickness = useSelector((state) => state.tool.draw.thickness);
  const linesFromState = useSelector(selectLines);

  /**
   * When lines in redux state are updated because of undo/redo then we need
   * to update the local state here
   */
  useEffect(() => {
    setLines(linesFromState);
  }, [linesFromState, setLines]);

  const drawMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    const yOffset = tool === DRAW ? TOOL_SIZE : TOOL_SIZE / 2;
    const xOffset = tool === DRAW ? 0 : TOOL_SIZE / 2;
    const newLines = [
      ...lines,
      { tool, color, thickness, points: [pos.x + xOffset, pos.y + yOffset] },
    ];
    setLines(newLines);
  };

  const drawMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];

    /**
     * Offset for the Draw tool to get it to match up with the tip of the pen
     * Offset for the Erase tool to center it within the square
     */
    const yOffset = tool === DRAW ? TOOL_SIZE : TOOL_SIZE / 2;
    const xOffset = tool === DRAW ? 0 : TOOL_SIZE / 2;

    lastLine.points = lastLine.points.concat([point.x + xOffset, point.y + yOffset]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const drawMouseUp = (e) => {
    isDrawing.current = false;
    // update redux store
    setTimeout(() => {
      dispatch(reducerSetLine(lines));
    }, 1);
  };

  return {
    lines,
    drawMouseDown,
    drawMouseMove,
    drawMouseUp,
    setDrawTool: setTool,
  };
}

export default useDraw;
