import PropTypes from "prop-types";
import { Line } from "react-konva";
import { ERASE } from "features/tools/constants";

const linePropType = PropTypes.shape({
  tool: PropTypes.string,
  color: PropTypes.string,
  thickness: PropTypes.number,
  points: PropTypes.arrayOf(PropTypes.number),
});

export function DrawSingleLine({ line }) {
  if (!line) return null;
  return (
    <Line
      points={line.points}
      stroke={line.color}
      strokeWidth={line.tool === ERASE ? 20 : line.thickness}
      tension={0.5}
      lineCap="round"
      globalCompositeOperation={line.tool === ERASE ? "destination-out" : "source-over"}
    />
  );
}

DrawSingleLine.propTypes = {
  line: linePropType
}

function Draw({ lines = [] }) {
  return lines.map((line, i) => <DrawSingleLine key={`line-${i}`} line={line} />);
}

Draw.propTypes = {
  lines: PropTypes.arrayOf(linePropType),
};

export default Draw;
