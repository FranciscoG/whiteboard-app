import PropTypes from "prop-types";
import DrawSingleLine, { linePropType } from "features/draw/line";

function Draw({ lines = [] }) {
  return (
    <>
      {lines.map((line, i) => (
        <DrawSingleLine key={`line-${i}`} line={line} />
      ))}
    </>
  );
}

Draw.propTypes = {
  lines: PropTypes.arrayOf(linePropType),
};

export default Draw;
