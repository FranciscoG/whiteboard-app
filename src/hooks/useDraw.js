import { useState, useRef } from "react";

import { DRAW } from 'features/controls/constants'

function useDraw() {
  const [tool, setTool] = useState(DRAW);
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const drawMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x , pos.y] }]);
  };

  const drawMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point, +26 to align with the tip of pencil cursor which is 26px height
    lastLine.points = lastLine.points.concat([point.x, point.y + 26]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const drawMouseUp = () => {
    isDrawing.current = false;
  };

  return {
    lines, 
    drawMouseDown,
    drawMouseMove,
    drawMouseUp,
    setTool
  }
}

export default useDraw;