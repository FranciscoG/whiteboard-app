import { useState } from 'react';
import { connect } from "react-redux";

import { setTool } from "features/tools/toolSlice";
import { DRAW, ERASE, NOTE, POINTER, TEXT } from "features/tools/constants";
import { cn } from "utils";
import DrawSettings from "features/tools/drawSettings";
import Draggable from 'components/draggable';

import { ReactComponent as Pointer } from "@fortawesome/fontawesome-free/svgs/solid/mouse-pointer.svg";
import { ReactComponent as Pen } from "@fortawesome/fontawesome-free/svgs/solid/pen.svg";
import { ReactComponent as Note } from "@fortawesome/fontawesome-free/svgs/solid/sticky-note.svg";
import { ReactComponent as Eraser } from "@fortawesome/fontawesome-free/svgs/solid/eraser.svg";
import styles from "./Tools.module.css";

function Tools({ setTool, cursor }) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <Draggable id="drag-tools" startX={20} startY={window.innerHeight * 0.2}>
      <div className={`shadow-light ${styles.controls}`}>
        <button
          id={`tool-${POINTER}`}
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
          id={`tool-${DRAW}`}
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
          id={`tool-${ERASE}`}
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
          id={`tool-${NOTE}`}
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
        <button
          id={`tool-${TEXT}`}
          type="button"
          className={cn("btn-clear", styles.toolBtn, cursor === TEXT && styles.active)}
          data-tooltip="Text (T)"
          onClick={() => {
            setShowSettings(false);
            setTool(TEXT);
          }}
        >
          <span className={styles.text}>T</span>
        </button>
      </div>
    </Draggable>
  );
}

const mapStateToProps = (state) => ({
  cursor: state.tool.cursor,
});

const mapDispatchToProps = { setTool };

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
