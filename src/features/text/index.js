import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Text } from "react-konva";
import { updateItem } from "canvas/canvasSlice";
import { setActiveText } from "features/text/textSlice";
import { POINTER } from "features/tools/constants";
import Transformable from "components/Transformable";

export const textPropTypes = PropTypes.shape({
  id: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  text: PropTypes.string,
  fontSize: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  rotation: PropTypes.number,
});

function TextSingle({ data, updateItem, setActiveText, currentTool, currentActiveText }) {
  function onClick(e) {
    /* handle double-click which puts the text into edit mode */
    if (e.evt.detail === 2) {
      setActiveText(data);
      return;
    }
  }

  function setSelected(e) {
    /* handle select and transform */
    if (e.evt.detail === 1 && !data.selected) {
      updateItem({
        ...data,
        selected: true,
      });
    }
  }

  function onDragEnd(e) {
    updateItem({
      ...data,
      x: e.target.x(),
      y: e.target.y(),
    });
  }

  function onTransformEnd(node) {
    updateItem({
      ...data,
      x: node.x(),
      y: node.y(),
      width: node.width(),
      height: node.height()
    });
  }

  return (
    <Transformable
      anchors={[
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
        "top-center",
        "bottom-center",
        "middle-left",
        "middle-right",
      ]}
      keepRatio={false}
      enabled={data.selected && currentTool === POINTER && currentActiveText?.id !== data.id}
      onTransformEnd={onTransformEnd}
      onTransform={(node) => {
        const w = Math.max(node.width() * node.scaleX(), 40);
        const h = Math.max(node.height() * node.scaleY(), 40);
        node.setAttrs({
          width: w,
          height: h,
          scaleX: 1,
          scaleY: 1,
        });
      }}
    >
      <Text
        draggable={currentTool === POINTER}
        x={data.x}
        y={data.y}
        rotation={data.rotation}
        onClick={onClick}
        onDragEnd={onDragEnd}
        onMouseDown={setSelected}
        scaleX={data.scaleX}
        scaleY={data.scaleY}
        width={data.width}
        height={data.height}
        text={currentActiveText?.id === data.id ? '' : data.text}
        fontSize={data.fontSize}
        fontFamily="sans-serif"
        fill="#000000"
        align="left"
        verticalAlign="top"
        fontStyle="bold"
        lineHeight={1.5}
      />
    </Transformable>
  );
}

TextSingle.propTypes = {
  data: textPropTypes,
  updateItem: PropTypes.func,
  setActiveText: PropTypes.func,
  currentTool: PropTypes.string,
};

const mapStateToProps = (state) => ({
  currentTool: state.tool.cursor,
  currentActiveText: state.text.activeText
});

const matchDispatchToProps = {
  updateItem,
  setActiveText,
};

export default connect(mapStateToProps, matchDispatchToProps)(TextSingle);
