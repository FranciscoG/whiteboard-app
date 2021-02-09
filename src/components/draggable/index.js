import React, { useEffect, useRef, useState } from "react";
import KEYS from "utils/KEYS";
import styles from "./draggable.module.scss";

function Draggable({ id, children, startX = 0, startY = 0 }) {
  const isDragging = useRef(false);
  const isUsingKeys = useRef(false);
  const childRef = useRef(null);
  const rect = useRef(null);
  const [pos, setPos] = useState({ x: startX, y: startY });

  useEffect(() => {
    rect.current = childRef.current.getBoundingClientRect();
  }, []);

  function disableKeys() {
    if (isUsingKeys.current) {
      window.removeEventListener("keydown", onKeyMove);
      isUsingKeys.current = false;
    }
  }

  function onMouseMove(e) {
    if (!isDragging.current) {
      return;
    }
    setPos({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function onMouseUp(e) {
    if (isDragging.current) {
      isDragging.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.classList.remove("cursor-grabbing");
    }
  }

  /**
   * This begins the drag listener by attaching events to the window
   */
  function onMouseDown(e) {
    if (e.button === 0) {
      e.preventDefault();
      disableKeys();
      isDragging.current = true;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      document.body.classList.add("cursor-grabbing");
    }
  }

  function onKeyMove(e) {
    const spaces = e.shiftKey ? 20 : 5;
    switch (e.key) {
      case KEYS.right:
        setPos((p) => {
          if (p.x >= window.innerWidth - rect.current.width) return p;
          return {
            x: p.x + spaces,
            y: p.y,
          };
        });
        break;
      case KEYS.left:
        setPos((p) => {
          if (p.x <= 20) {
            return p;
          }
          return {
            x: p.x - spaces,
            y: p.y,
          };
        });
        break;
      case KEYS.up:
        setPos((p) => {
          if (p.y <= 20) {
            return p;
          }
          return {
            x: p.x,
            y: p.y - spaces,
          };
        });
        break;
      case KEYS.down:
        setPos((p) => {
          if (p.y >= window.innerHeight - rect.current.height) return p;
          return {
            x: p.x,
            y: p.y + spaces,
          };
        });
        break;
      default:
      // do nothing
    }
  }

  function onKeyUp(e) {
    if (isUsingKeys.current) {
      return;
    }

    if (!isUsingKeys.current && (e.key === KEYS.space || e.key === KEYS.enter)) {
      isUsingKeys.current = true;
      window.addEventListener("keydown", onKeyMove);
    }
  }

  // offset the position of the handle so it doesn't jump (much) when grabbing it
  const x = pos.x - 7;
  const y = pos.y - 15;

  return (
    <div className={styles.dragContainer} style={{ top: `${y}px`, left: `${x}px` }}>
      <span id={id} className="visually-hidden">
        Press Spacebar to Grab
      </span>
      <button
        className={styles.handle}
        onMouseDown={onMouseDown}
        onKeyUp={onKeyUp}
        aria-describedby={id}
      >
        <span className="visually-hidden">Move {id} on the canvas</span>
      </button>

      {/* There should only be one child */}
      {React.Children.only(children) && React.cloneElement(children, { ref: childRef })}
    </div>
  );
}

export default Draggable;
