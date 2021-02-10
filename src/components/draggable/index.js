import React, { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { cn } from "utils";
import KEYS from "utils/KEYS";
import styles from "./draggable.module.scss";

/**
 * a11y help: https://medium.com/salesforce-ux/4-major-patterns-for-accessible-drag-and-drop-1d43f64ebf09
 *
 * TODO: Aria live region
 */

function Draggable({ id, children, startX = 0, startY = 0, onDragEnd = ({x,y}) => {} }) {
  const childRef = useRef(null);
  const isDragging = useRef(false);
  const isUsingKeys = useRef(null);
  const [isKeyDragging, setIsKeyDragging] = useState(false);
  const rect = useRef(null);
  const [pos, setPos] = useState({ x: startX, y: startY });

  /**
   * This gets the dimensions of the draggable items just once on mount so that
   * we can prevent the draggable item from going out of the bounds of the window
   */
  useEffect(() => {
    rect.current = childRef.current.getBoundingClientRect();
  }, []);

  const onKeyMove = useCallback((e) => {
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
  }, []);

  function disableKeys() {
    if (isUsingKeys.current) {
      window.removeEventListener("keydown", onKeyMove);
      isUsingKeys.current = null;
      setIsKeyDragging(false);
    }
  }

  function disableMouse() {
    if (isDragging.current) {
      isDragging.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", disableMouse);
      document.body.classList.remove("cursor-grabbing");
      onDragEnd(pos)
    }
  }

  function onMouseMove(e) {
    if (!isDragging.current) {
      return;
    }
    setPos((p) => {
      let x = e.clientX;
      let y = e.clientY;

      if (x >= window.innerWidth - rect.current.width) {
        x = p.x;
      } else if (x <= 5) {
        x = 5;
      }

      if (y >= window.innerHeight - rect.current.height) {
        y = p.y;
      } else if (y <= 5) {
        y = 5;
      }

      return {
        x,
        y,
      };
    });
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
      window.addEventListener("mouseup", disableMouse);
      document.body.classList.add("cursor-grabbing");
    }
  }

  function onKeyUp(e) {
    if (isUsingKeys.current) {
      switch (e.key) {
        case KEYS.enter:
        case KEYS.space:
          disableKeys();
          onDragEnd(pos)
          break;
        case KEYS.esc:
          // reset to original position
          setPos(isUsingKeys.current);
          disableKeys();
          break;
        default:
        // nothing
      }
      return;
    }

    if (!isUsingKeys.current && (e.key === KEYS.space || e.key === KEYS.enter)) {
      disableMouse();
      isUsingKeys.current = { ...pos };
      setIsKeyDragging(true);
      window.addEventListener("keydown", onKeyMove);
    }
  }

  // offset the position of the handle so it doesn't jump (much) when grabbing it
  const x = pos.x - 7;
  const y = pos.y - 15;

  const finalClass = isKeyDragging
    ? cn(children.props.className, styles.keyMoving)
    : children.props.className;

  return (
    <div className={cn(styles.dragContainer)} style={{ top: `${y}px`, left: `${x}px` }}>
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
      {React.cloneElement(children, { ref: childRef, className: finalClass })}
    </div>
  );
}

Draggable.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  startX: PropTypes.number,
  startY: PropTypes.number,
  onDragEnd: PropTypes.func,
};

export default Draggable;
