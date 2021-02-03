import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CirclePicker } from "react-color";

import Slider from "components/slider";
import Modal from "components/modal";
import { cn } from "utils";
import styles from "./addNoteModal.module.css";

const ColorPalette = ["#feff9c", "#6ed2d0", "#def350", "#ff6b81", "#ff339a", "#ff992a"];

function AddNoteModal({
  show,
  onSave = () => {},
  onCancel = () => {},
  text = "",
  noteColor = ColorPalette[0],
}) {
  const [_show, setShow] = useState(show);
  const [editText, setEditText] = useState(text);
  const [fontSize, setFontSize] = useState(32);
  const [currentColor, setCurrentColor] = useState(noteColor);

  useEffect(() => {
    setShow(show);
  }, [show]);

  function reset() {
    setEditText("");
    setCurrentColor(ColorPalette[0]);
  }

  return (
    <Modal id="addNote" title="Add Sticky Note" hideTitle show={_show}>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShow(false);
            onSave({
              text: editText,
              fontSize,
              color: noteColor,
            });
            reset();
          }}
        >
          <div
            style={{ backgroundColor: currentColor }}
            className={cn("form-group", "flex-center", styles.note)}
          >
            <label className="visually-hidden" id="stickyNoteLabel">
              Enter your sticky note text
            </label>
            <div className={styles.textContainer}>
              <div
                style={{ fontSize: fontSize + "px" }}
                role="textbox"
                aria-multiline="true"
                aria-labelledby="stickyNoteLabel"
                aria-required="true"
                className={styles.textEdit}
                contentEditable={true}
                tabIndex="0"
                onInput={(e) => {
                  setEditText(e.target.textContent);
                }}
                html={editText}
              />
            </div>
          </div>
          <div className={styles.actions}>
            <Slider
              hideLabel={false}
              id="noteFontSize"
              label="Change the font size"
              min="32"
              max="128"
              startingValue={fontSize}
              onChange={(e) => {
                setFontSize(Number(e.target.value));
              }}
            />
            <div className="h-center">
              <CirclePicker
                color={currentColor}
                colors={ColorPalette}
                onChangeComplete={({ hex }, e) => {
                  setCurrentColor(hex);
                }}
              />
            </div>
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                setShow(false);
                reset();
                onCancel();
              }}
            >
              cancel
            </button>

            <button className="btn btn-primary" type="submit" disabled={editText.length === 0}>
              save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

// const matchDispatchToProps = {

// }

export default connect(null)(AddNoteModal);
