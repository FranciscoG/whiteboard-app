import { Layer, Line } from "react-konva";
import { ERASE } from "features/tools/constants";

function DrawLayer({ lines = []}) {

  return (
    <Layer>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          stroke={line.color}
          strokeWidth={line.tool === ERASE ? 20 : line.thickness}
          tension={0.5}
          lineCap="round"
          globalCompositeOperation={line.tool === ERASE ? "destination-out" : "source-over"}
        />
      ))}
    </Layer>
  );
}


export default DrawLayer
