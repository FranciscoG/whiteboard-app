import { useState } from 'react';
import { connect } from "react-redux";

import { setTool } from "features/tools/toolSlice";
import { DRAW, ERASE, NOTE, POINTER } from "features/tools/constants";
import { cn } from "utils";
import DrawSettings from "features/tools/drawSettings";

import { ReactComponent as Pointer } from "@fortawesome/fontawesome-free/svgs/solid/mouse-pointer.svg";
import { ReactComponent as Pen } from "@fortawesome/fontawesome-free/svgs/solid/pen.svg";
import { ReactComponent as Note } from "@fortawesome/fontawesome-free/svgs/solid/sticky-note.svg";
import { ReactComponent as Eraser } from "@fortawesome/fontawesome-free/svgs/solid/eraser.svg";
import styles from "./Tools.module.css";

function Tools({ setTool, cursor }) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div className={`shadow-light ${styles.controls}`}>
        <button
          type="button"
          className={cn(
            "btn-clear",
            styles.toolBtn,
            styles.pointer,
            cursor === POINTER && styles.active
          )}
          data-tooltip="Select (V)"
          onClick={() => {
            setShowSettings(false);
            setTool(POINTER);
          }}
        >
          <Pointer />
        </button>
        <button
          type="button"
          className={cn("btn-clear", styles.toolBtn, cursor === DRAW && styles.active)}
          data-tooltip="Draw (P)"
          onClick={() => {
            setShowSettings(false);
            if (cursor !== DRAW) {
              setTool(DRAW);
              return;
            } else {
              setShowSettings(!showSettings);
            }
          }}
        >
          <Pen />
          <span className={styles.arrowSubMenu}/>
        </button>
        <DrawSettings show={cursor === DRAW && showSettings}  />
        <button
          type="button"
          className={cn("btn-clear", styles.toolBtn, cursor === ERASE && styles.active)}
          data-tooltip="Erase (E)"
          onClick={() => {
            setShowSettings(false);
            setTool(ERASE);
          }}
        >
          <Eraser />
        </button>
        <button
          type="button"
          className={cn("btn-clear", styles.toolBtn, cursor === NOTE && styles.active)}
          data-tooltip="Note (N)"
          onClick={() => {
            setShowSettings(false);
            setTool(NOTE);
          }}
        >
          <Note />
        </button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  cursor: state.tool.cursor,
});

const mapDispatchToProps = { setTool };

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
