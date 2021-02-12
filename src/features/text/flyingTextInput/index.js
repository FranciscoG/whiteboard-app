import { useRef } from "react";
import PropTypes from "prop-types";
import Draggable from "components/draggable";
import KEYS from "utils/KEYS";
import { TEXT } from "features/tools/constants";
import { textPropTypes } from "features/text";
import styles from "./index.module.scss";

const defaultText = {
  type: TEXT,
  x: 0,
  y: 0,
  width: null,
  height: null,
  text: "",
  fontSize: 32,
  color: "#000000",
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
};

function FlyingTextInput({ x = 0, y = 0, textData = defaultText, onSave, onCancel }) {
  const positionRef = useRef({ x, y });
  const inputRef = useRef(null);

  function onKeyUp(e) {
    if (e.key === KEYS.esc) {
      onCancel();
    }
  }

  const styleObj = textData.width ? { width: textData.width } : { width: 400 };

  return (
    <Draggable
      id="flyingTextInput"
      startX={x}
      // 20px padding-top of container + 5px padTop of input
      startY={y - 25}
      onDragEnd={(pos) => {
        positionRef.current = pos;
        console.log(positionRef.current, pos);
      }}
    >
      <form className={styles.inputContainer}>
        <label className="visually-hidden" htmlFor="enterText">
          Add text to canvas
        </label>
        <div
          style={styleObj}
          ref={inputRef}
          autoCorrect="off"
          autoCapitalize="off"
          role="textbox"
          aria-multiline="true"
          aria-labelledby="enterText"
          className={styles.input}
          contentEditable={true}
          suppressContentEditableWarning={true}
          tabIndex={0}
          onKeyUp={onKeyUp}
          onBlur={(e) => {
            if (!e.target.textContent.trim()) {
              onCancel();
              return;
            }
            const rect = inputRef.current.getBoundingClientRect();
            onSave({
              ...textData,
              x: positionRef.current.x,
              y: positionRef.current.y,
              width: rect.width,
              height: rect.height,
              text: e.target.textContent,
            });
          }}
        >
          {textData.text}
        </div>
      </form>
    </Draggable>
  );
}

FlyingTextInput.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  text: textPropTypes,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default FlyingTextInput;
