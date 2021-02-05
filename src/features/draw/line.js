import PropTypes from "prop-types";
import { Line } from "react-konva";
import { ERASE } from "features/tools/constants";

export const linePropType = PropTypes.shape({
  tool: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  thickness: PropTypes.number.isRequired,
  points: PropTypes.arrayOf(PropTypes.number).isRequired,
});

function DrawSingleLine({ line }) {
  if (!line) return null;
  return (
    <Line
      points={line.points}
      stroke={line.color}
      strokeWidth={line.tool === ERASE ? 20 : line.thickness}
      tension={0.5}
      lineCap={line.tool === ERASE ? "square" : "round"}
      globalCompositeOperation={line.tool === ERASE ? "destination-out" : "source-over"}
    />
  );
}

DrawSingleLine.propTypes = {
  line: linePropType,
};

export default DrawSingleLine;
