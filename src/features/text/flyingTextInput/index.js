import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Draggable from "components/draggable";
import KEYS from "utils/KEYS";
import { TEXT } from "features/tools/constants";
import { textPropTypes } from "features/text";
import IconButton from "components/IconButton";
import checkmark from "assets/icons/check.svg";
import cancelX from "assets/icons/times.svg";
import styles from "./index.module.scss";
import { cn } from "utils";

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
  const inputRef = useRef(null);
  const [position, setPosition] = useState({ x, y });
  const [text, setText] = useState(textData.text);

  useEffect(()=> {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  function onKeyUp(e) {
    if (e.key === KEYS.esc) {
      onCancel();
      return;
    }

    setText(e.target.textContent);
  }

  function save() {
    if (!text.trim()) {
      onCancel();
      return;
    }
    const rect = inputRef.current.getBoundingClientRect();
    onSave({
      ...textData,
      ...position,
      width: rect.width,
      height: rect.height,
      text: text.trim(),
    });
  }

  const styleObj = textData.width ? { width: textData.width } : { width: 400 };

  return (
    <Draggable
      id="flyingTextInput"
      title="Move text input anywhere on the canvas"
      startX={x}
      // 20px padding-top of container + 5px padTop of input
      startY={y - 25}
      onDragEnd={(pos) => {
        console.log(pos, "flyingtext input drag end");
        setPosition(pos);
      }}
    >
      <div className={styles.inputContainer}>
        <div className="visually-hidden" id="enterText">
          Add text to canvas
        </div>
        <div
          ref={inputRef}
          style={styleObj}
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
            if (
              e.relatedTarget instanceof HTMLButtonElement &&
              e.relatedTarget.id === "flyingText_cancel"
            ) {
              console.log(e.relatedTarget.id)
              return;
            } else {
              save()
            }
          }}
        >
          {textData.text}
        </div>
        <div className={styles.actions}>
          <IconButton
            id="flyingText_cancel"
            className={cn("btn-clear", styles.buttonIcon, styles.cancel)}
            text="cancel"
            icon={cancelX}
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
          />
          <IconButton
            id="flyingText_save"
            className={cn("btn-clear", styles.buttonIcon, styles.save)}
            text="save"
            icon={checkmark}
            onClick={save}
          />
        </div>
      </div>
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
