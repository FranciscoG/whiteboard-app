import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLines, setLines as reducerSetLine } from "canvas/canvasSlice";
import { DRAW, TOOL_SIZE } from "features/tools/constants";

const eraserOffset = TOOL_SIZE / 2;

function connectPoints(e, tool, lines) {
  const point = e.target.getStage().getPointerPosition();
  let lastLine = lines[lines.length - 1];

  /**
   * Offset for the Draw tool to get it to match up with the tip of the pen
   * Offset for the Erase tool to center it within the square
   */
  if (tool === DRAW) {
    lastLine.points = lastLine.points.concat([point.x, point.y + TOOL_SIZE]);
  } else {
    lastLine.points = lastLine.points.concat([point.x + eraserOffset, point.y + eraserOffset]);
  }

  // replace last
  lines.splice(lines.length - 1, 1, lastLine);
  return Array.from(lines);
}

/**
 * useDraw hook
 * for better performance this hook keeps the lines in its own internal state and
 * updates global redux state only on MouseUp.
 */
function useDraw() {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const isMoving = useRef(false);
  const dispatch = useDispatch();

  // @ts-ignore
  const color = useSelector((state) => state.tool.draw.color);
  // @ts-ignore
  const thickness = useSelector((state) => state.tool.draw.thickness);
  // @ts-ignore
  const tool = useSelector((state) => state.tool.cursor);
  const linesFromState = useSelector(selectLines);

  /**
   * When lines in redux state are updated because of undo/redo then we need
   * to update the local state here
   */
  useEffect(() => {
    setLines(linesFromState);
  }, [linesFromState, setLines]);

  const drawMouseDown = (e) => {
    if (e.evt.button !== 0) return;

    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    if (tool === DRAW) {
      const newLines = Array.from(lines);
      newLines.push({ tool, color, thickness, points: [pos.x, pos.y + TOOL_SIZE] });
      setLines(newLines);
    } else {
      const newLines = Array.from(lines);
      newLines.push({
        tool,
        color,
        thickness,
        points: [pos.x + eraserOffset, pos.y + eraserOffset],
      });
      setLines(newLines);
    }
  };

  const drawMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    isMoving.current = true;
    setLines(connectPoints(e, tool, lines));
  };

  const drawMouseUp = (e) => {
    isDrawing.current = false;

    if (!isMoving.current) {
      setLines(connectPoints(e, tool, lines));
    } else {
      isMoving.current = false;
    }

    setTimeout(() => {
      dispatch(reducerSetLine(lines));
    }, 1);
  };

  return {
    lines,
    drawMouseDown,
    drawMouseMove,
    drawMouseUp,
  };
}

export default useDraw;
