import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import { updateItem } from "canvas/canvasSlice";
import { setNewNote } from "features/note/noteSlice";

import Slider from "components/slider";
import Modal from "components/modal";
import ColorPicker from "components/colorPicker";
import Alignment from "components/alignment";

import { cn } from "utils";
import { NOTE } from "features/tools/constants";
import styles from "./addNoteModal.module.css";

const ColorPalette = ["#feff9c", "#6ed2d0", "#def350", "#ff6b81", "#ff339a", "#ff992a"];

const defaultNote = {
  type: NOTE,
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
  rotation: 0,
  align: "center",
  verticalAlign: "middle",
};

function AddNoteModal({
  onSave = () => {},
  onCancel = () => {},
  onClose = () => {}, // closing for any reason, cancel or save
  note = defaultNote,
  x,
  y,
  updateItem,
  setNewNote,
}) {
  const [editText, setEditText] = useState(note.text);
  const [fontSize, setFontSize] = useState(note.fontSize);
  const [currentColor, setCurrentColor] = useState(note.color);
  const [textHoriz, setTextHoriz] = useState(note.align);
  const [textVert, setTextVert] = useState(note.verticalAlign);
  const noteRef = useRef(null);
  const noteWrapRef = useRef(null);

  const modalRef = useRef(null);

  useEffect(() => {
    if (noteRef.current) {
      noteRef.current.focus();
    }
  }, [noteRef]);

  return (
    <Modal
      id="addNote"
      title="Add Sticky Note"
      hideTitle
      ref={modalRef}
      onHide={() => {
        onClose();
      }}
    >
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const newNote = {
              text: editText,
              fontSize,
              color: currentColor,
              align: textHoriz,
              verticalAlign: textVert
            };

            if (!note.id) {
              // new note
              newNote.x = x;
              newNote.y = y;
              const bounds = noteWrapRef.current.getBoundingClientRect();
              newNote.origin = { x: bounds.x, y: bounds.y };
              setNewNote(Object.assign({}, note, newNote));
            } else {
              // update to existing note
              updateItem(Object.assign({}, note, newNote));
            }

            onSave();
            modalRef.current.hide();
          }}
        >
          <div
            ref={noteWrapRef}
            style={{ backgroundColor: currentColor }}
            className={cn("form-group", "flex-center", styles.note)}
          >
            <label className="visually-hidden" id="stickyNoteLabel">
              Enter your sticky note text
            </label>
            <div className={styles.textContainer}>
              <div
                ref={noteRef}
                style={{
                  fontSize: fontSize + "px",
                  // @ts-ignore
                  textAlign: textHoriz,
                  verticalAlign: textVert
                }}
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
            <Alignment
              className="mb-3"
              selectedHorizontal={textHoriz}
              selectedVertical={textVert}
              onChangeHorizontal={(newAlignment) => {
                setTextHoriz(newAlignment);
              }}
              onChangeVertical={(newAlignment) => {
                setTextVert(newAlignment);
              }}
            />
            <div className={cn("p-2", styles.colors)}>
              <ColorPicker
                selected={currentColor}
                palette={ColorPalette}
                onSelectColor={(color) => {
                  setCurrentColor(color);
                }}
              />
            </div>
            <div className="d-flex justify-content-end mt-4 pe-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  onCancel();
                  modalRef.current.hide();
                }}
              >
                cancel
              </button>

              <button className="btn btn-primary ms-2" type="submit">
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
  updateItem,
  setNewNote,
};

export default connect(null, matchDispatchToProps)(AddNoteModal);
