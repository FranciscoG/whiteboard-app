import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CirclePicker } from "react-color";
import { v1 as uuidv1 } from "uuid";

import { updateNote, addNote } from "canvas/canvasSlice";

import Slider from "components/slider";
import Modal from "components/modal";
import { cn } from "utils";
import styles from "./addNoteModal.module.css";

const ColorPalette = ["#feff9c", "#6ed2d0", "#def350", "#ff6b81", "#ff339a", "#ff992a"];

const defaultNote = {
  id: null,
  x: null,
  y: null,
  width: 300,
  height: 300,
  text: "",
  fontSize: 32,
  color: ColorPalette[0],
  scaleX: 0.75,
  scaleY: 0.75,
};

function AddNoteModal({
  show = false,
  onSave = () => {},
  onCancel = () => {},
  note = defaultNote,
  updateNote,
  addNote,
}) {
  const [_show, setShow] = useState(show);
  const [editText, setEditText] = useState(note.text);
  const [fontSize, setFontSize] = useState(note.fontSize);
  const [currentColor, setCurrentColor] = useState(note.color);
  const [pos, setPos] = useState([window.innerWidth / 6, window.innerWidth / 6]);

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

            const newNote = {
              text: editText,
              fontSize,
              color: currentColor,
            };

            if (!note.x && !note.y) {
              const [x, y] = pos;
              newNote.x = x;
              newNote.y = y;
              if (x < window.innerWidth - 400) {
                setPos([x + 350, y]);
              } else {
                setPos([window.innerWidth / 6, y + 350]);
              }
            }

            if (!note.id) {
              // new note
              newNote.id = uuidv1();
              // randomly place it x,y
              addNote(Object.assign({}, note, newNote));
            } else {
              // update to existing note
              updateNote(Object.assign({}, note, newNote));
            }

            onSave();
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
                suppressContentEditableWarning={true}
                tabIndex={0}
                onInput={(e) => {
                  // @ts-ignore
                  setEditText(e.target.textContent);
                }}
              >
                {note.text}
              </div>
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
            <div className={cn("h-center p-2", styles.colors)}>
              <CirclePicker
                color={currentColor}
                colors={ColorPalette}
                onChangeComplete={({ hex }, e) => {
                  setCurrentColor(hex);
                }}
              />
            </div>
            <div className="d-flex justify-content-end mt-4 pe-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setShow(false);
                  reset();
                  onCancel();
                }}
              >
                cancel
              </button>

              <button
                className="btn btn-primary ms-2"
                type="submit"
                disabled={editText.length === 0}
              >
                save
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

const matchDispatchToProps = {
  updateNote,
  addNote,
};

export default connect(null, matchDispatchToProps)(AddNoteModal);
