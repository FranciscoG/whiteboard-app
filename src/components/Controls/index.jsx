import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { ReactComponent as Pencil } from "@fortawesome/fontawesome-free/svgs/solid/edit.svg";
import { ReactComponent as Note } from "@fortawesome/fontawesome-free/svgs/solid/sticky-note.svg";
import { ReactComponent as Eraser } from "@fortawesome/fontawesome-free/svgs/solid/eraser.svg";
import styles from "./Controls.module.css";

function Controls({ onSelectTool = () => {} }) {
  const [cursor, setCursor] = useState(null);

  function removeOldCursor(oldCursor) {
    const whiteboard = document.querySelector('.whiteboard');
    if (typeof cursor === "string" && whiteboard.classList.contains(oldCursor)) {
      whiteboard.classList.remove(oldCursor);
    }
  }

  useEffect(() => {
    const whiteboard = document.querySelector('.whiteboard');
    if (cursor && whiteboard) {
      whiteboard.classList.add(cursor);
    }
  }, [cursor]);

  return (
    <div className={`shadow-light ${styles.controls}`}>
      <button
        type="button"
        className="btn-clear"
        onClick={() => {
          setCursor((old) => {
            removeOldCursor(old)
            return "cursor-pencil";
          });
          onSelectTool("pencil");
        }}
      >
        <Pencil />
      </button>
      <button
        type="button"
        className="btn-clear"
        onClick={() => {
          setCursor((old) => {
            removeOldCursor(old)
            return "cursor-eraser";
          });
          onSelectTool("eraser");
        }}
      >
        <Eraser />
      </button>
      <button
        type="button"
        className="btn-clear"
        onClick={() => {
          setCursor((old) => {
            removeOldCursor(old)
            return "cursor-note";
          });
          onSelectTool("note");
        }}
      >
        <Note />
      </button>
    </div>
  );
}

Controls.propTypes = {
  /**
   * Function callback when a tool is selected
   */
  onSelectTool: PropTypes.func
}

export default Controls;
