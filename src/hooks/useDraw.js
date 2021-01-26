import { useState, useRef } from "react";

function useDraw() {
  const [tool, setTool] = useState('pencil');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x , pos.y] }]);
  };

  const handleMouseMove = (e) => {
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

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return {
    lines, 
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setTool
  }
}

export default useDraw;