import { connect } from "react-redux";

import { setControl } from "features/controls/controlSlice";
import { DRAW, ERASE, NOTE, POINTER } from "features/controls/constants";

import { ReactComponent as Pointer } from "@fortawesome/fontawesome-free/svgs/solid/mouse-pointer.svg";
import { ReactComponent as Pencil } from "@fortawesome/fontawesome-free/svgs/solid/edit.svg";
import { ReactComponent as Note } from "@fortawesome/fontawesome-free/svgs/solid/sticky-note.svg";
import { ReactComponent as Eraser } from "@fortawesome/fontawesome-free/svgs/solid/eraser.svg";
import styles from "./Controls.module.css";

function Controls({ setControl }) {
  return (
    <div className={`shadow-light ${styles.controls}`}>
      <button
        type="button"
        className={`btn-clear ${styles.pointer}`}
        onClick={() => {
          setControl(POINTER);
        }}
      >
        <Pointer />
      </button>
      <button
        type="button"
        className="btn-clear"
        onClick={() => {
          setControl(DRAW);
        }}
      >
        <Pencil />
      </button>
      <button
        type="button"
        className="btn-clear"
        onClick={() => {
          setControl(ERASE);
        }}
      >
        <Eraser />
      </button>
      <button
        type="button"
        className="btn-clear"
        onClick={() => {
          setControl(NOTE);
        }}
      >
        <Note />
      </button>
    </div>
  );
}

const mapDispatchToProps = { setControl };

export default connect(null, mapDispatchToProps)(Controls);
