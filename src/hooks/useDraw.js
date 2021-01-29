import { useState, useRef } from "react";

import { DRAW, TOOL_SIZE } from "features/tools/constants";

function useDraw() {
  const [tool, setTool] = useState(DRAW);
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const drawMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    const yOffset = tool === DRAW ? TOOL_SIZE : TOOL_SIZE / 2;
    const xOffset = tool === DRAW ? 0 : TOOL_SIZE / 2;
    setLines([...lines, { tool, points: [pos.x + xOffset, pos.y + yOffset] }]);
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
