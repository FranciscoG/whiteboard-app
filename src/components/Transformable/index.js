import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Transformer } from "react-konva";

function Transformable({
  enabled = false,
  onTransformEnd,
  minWidth = 100,
  minHeight = 100,
  withRef = null,
  children,

  /**
   * opinionated Transform option defaults
   */ 
  anchors = ["top-left", "top-right", "bottom-right", "bottom-left"],
  keepRatio = true,
  rotateEnabled = false,

  /**
   * see docs for more Transformer options
   * https://konvajs.org/api/Konva.Transformer.html
   */
  ...transformProps
}) {
  const nodeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (enabled) {
      // we need to attach transformer manually
      trRef.current.nodes([nodeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [enabled]);

  useEffect(() => {
    if (typeof withRef === "function" && nodeRef.current) {
      withRef(nodeRef);
    }
  }, [nodeRef, withRef]);

  function onEnd(e) {
    onTransformEnd(nodeRef.current, e);
  }

  return (
    <>
      {/* Transformable only works on a single child */}
      {React.Children.only(children) && React.cloneElement(children, { ref: nodeRef, onEnd })}

      {enabled && (
        <Transformer
          {...transformProps}
          ref={trRef}
          keepRatio={keepRatio}
          rotateEnabled={rotateEnabled}
          enabledAnchors={anchors}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < minWidth || newBox.height < minHeight) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}

Transformable.propTypes = {
  /**
   * Toggle the transform on/off
   */
  enabled: PropTypes.bool,

  /**
   * set which anchors you want to add to the transform
   * https://konvajs.org/api/Konva.Transformer.html#enabledAnchors__anchor
   */
  anchors: PropTypes.arrayOf(PropTypes.string),

  /**
   * set should we keep ratio while resize anchors at corner
   * https://konvajs.org/api/Konva.Transformer.html#keepRatio__anchor
   */
  keepRatio: PropTypes.bool,

  /**
   * set ability to rotate.
   */
  rotateEnabled: PropTypes.bool,

  /**
   * callback when transform has been completed. It will get pass 2 args:
   * (currentNode, event)
   */
  onTransformEnd: PropTypes.func,

  /**
   * set a min width to the element
   */
  minWidth: PropTypes.number,

  /**
   * set a min height to the element
   */
  minHeight: PropTypes.number,

  /**
   * runs a function any time the child ref changes
   */
  withRef: PropTypes.func,

  /**
   * Must be a single child and a Konva react element
   */
  children: PropTypes.node.isRequired
};

export default Transformable;
