import React, { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { cn } from "utils";
import KEYS from "utils/KEYS";
import styles from "./draggable.module.scss";

const MOUSE = "mouse";
const KEYBOARD = "keyboard";

// TODO: explain why these numbers
const handleX = 7;
const handleY = 15;

/*

During mousemove position is constantly updated
- sets the position on every move

onMouseUp: Releasing mouse
- removes the "mousedown" listener
- sets isDragging to false
- fires the "onDragEnd" function

*/

function handleKeyMove(e, width, height, pos) {
  const spaces = e.shiftKey ? 20 : 5;
  switch (e.key) {
    case KEYS.right:
      if (pos.x >= window.innerWidth - width) return pos;
      return {
        x: pos.x + spaces,
        y: pos.y,
      };

    case KEYS.left:
      if (pos.x <= 20) {
        return pos;
      }
      return {
        x: pos.x - spaces,
        y: pos.y,
      };
    case KEYS.up:
      if (pos.y <= 20) {
        return pos;
      }
      return {
        x: pos.x,
        y: pos.y - spaces,
      };
    case KEYS.down:
      if (pos.y >= window.innerHeight - height) return pos;
      return {
        x: pos.x,
        y: pos.y + spaces,
      };
    default:
      return pos;
  }
}

function handleMouseMove(e, isDragging, width, height, pos) {
  if (!isDragging) {
    return pos;
  }

  let x = e.clientX;
  let y = e.clientY;

  if (x >= window.innerWidth - width) {
    x = pos.x;
  } else if (x <= 5) {
    x = 5;
  }

  if (y >= window.innerHeight - height) {
    y = pos.y;
  } else if (y <= 5) {
    y = 5;
  }

  return {
    x,
    y,
  };
}

function updatePosition(dragRef, posRef) {
  // offset the position of the handle so it doesn't jump (much) when grabbing it
  const { x, y } = posRef.current;
  let { top, left } = dragRef.current.style;
  top = parseInt(top, 10);
  left = parseInt(left, 10);

  dragRef.current.style.transform = `translateX(${x - left - handleX}px) translateY(${y - top - handleY}px)`;
}

/**
 * a11y help: https://medium.com/salesforce-ux/4-major-patterns-for-accessible-drag-and-drop-1d43f64ebf09
 *
 * TODO: Aria live region
 */

function Draggable({ id, title, children, startX = 0, startY = 0, onDragEnd = ({ x, y }) => {} }) {
  // these refs get set only once
  const childRef = useRef(null);
  const rect = useRef(null);
  const dragRef = useRef(null);

  // these refs change often
  const isDragging = useRef(false);
  const posRef = useRef({ x: startX, y: startY });

  /**
   * This will store the x,y when key moving starts in order to handle resetting
   * to original position when hitting escape
   */
  const isUsingKeys = useRef(null);

  // this state switches between keyboard and mouse control handlers
  const [currentControl, setCurrentControl] = useState(null);

  /**
   * This gets the dimensions of the draggable items just once on mount so that
   * we can prevent the draggable item from going out of the bounds of the window
   */
  useEffect(() => {
    rect.current = childRef.current.getBoundingClientRect();

    if (dragRef.current) {
      // updatePosition(dragRef, posRef);
      // offset the position of the handle so it doesn't jump (much) when grabbing it
      const x = posRef.current.x - handleX;
      const y = posRef.current.y - handleY;

      dragRef.current.style.top = `${y}px`;
      dragRef.current.style.left = `${x}px`;
    }
  }, []);

  const onKeyMove = useCallback(
    function onKeyMove(e) {
      posRef.current = handleKeyMove(e, rect.current.width, rect.current.height, posRef.current);
      updatePosition(dragRef, posRef);
    },
    []
  );

  const onMouseMove = useCallback(
    function onMouseMove(e) {
      posRef.current = handleMouseMove(
        e,
        isDragging.current,
        rect.current.width,
        rect.current.height,
        posRef.current
      );
      updatePosition(dragRef, posRef);
    },
    []
  );

  function onKeyUp(e) {
    /**
     * - if isUsingKeys and key was space/enter:
     * -- sets isDragging to false
     * -- fires the "onDragEnd" function
     * -- set current control to null to put component back in idle state
     */
    if (isUsingKeys.current) {
      switch (e.key) {
        case KEYS.enter:
        case KEYS.space:
          onDragEnd(posRef.current);
          isDragging.current = false;
          isUsingKeys.current = null;
          setCurrentControl(null);
          break;
        case KEYS.esc:
          // reset to original position
          updatePosition(dragRef, isUsingKeys);
          isDragging.current = false;
          isUsingKeys.current = null;
          setCurrentControl(null);
          break;
        default:
        // nothing
      }
      return;
    }

    /**
     * - if !isUsingKeys and key was space/enter:
     * -- sets isDragging to true
     * -- sets isUsingKeys to true
     * -- attaches "keydown" listener (in useEffect)
     * -- removes "mousemove" listeners (in useEffect)
     * -- attaches "mouseup" listener (in useEffect)
     */
    if (!isUsingKeys.current && (e.key === KEYS.space || e.key === KEYS.enter)) {
      isUsingKeys.current = { ...posRef.current };
      isDragging.current = true;
      setCurrentControl(KEYBOARD);
    }
  }

  useEffect(() => {
    function disableMouse() {
      if (isDragging.current) {
        isDragging.current = false;
        window.removeEventListener("mousemove", onMouseMove);
        document.body.classList.remove("cursor-grabbing");
        onDragEnd(posRef.current);
      }
    }

    function onMouseUp() {
      disableMouse();
      setCurrentControl(null);
      window.removeEventListener("mouseup", onMouseUp);
    }

    /**
     * button.onMouseDown
     * - if mouse button click, disable Keys listeners and attach new mouse move
     *   listeners
     */

    if (currentControl === MOUSE) {
      window.removeEventListener("keydown", onKeyMove);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    /**
     * button.onKeyUp
     */
    if (currentControl === KEYBOARD) {
      disableMouse();
      window.addEventListener("keydown", onKeyMove);
    }

    return function cleanup() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", disableMouse);
      window.removeEventListener("keydown", onKeyMove);
    };
  }, [onKeyMove, onMouseMove, onDragEnd, currentControl]);

  const finalClass =
    currentControl === KEYBOARD
      ? cn(children.props.className, styles.keyMoving)
      : children.props.className;

  return (
    <div ref={dragRef} className={cn(styles.dragContainer)}>
      <span id={id} className="visually-hidden">
        Press space bar to grab
      </span>
      <button
        className={styles.handle}
        onMouseDown={(e) => {
          if (e.button === 0) {
            e.preventDefault();
            isDragging.current = true;
            setCurrentControl(MOUSE);
          }
        }}
        onKeyUp={onKeyUp}
        aria-describedby={id}
      >
        <span className="visually-hidden">{title}</span>
      </button>

      {/* There should only be one child */}
      {React.cloneElement(children, { ref: childRef, className: finalClass })}
    </div>
  );
}

Draggable.propTypes = {
  /**
   * ID to link a11y description to button
   */
  id: PropTypes.string.isRequired,

  /**
   * title
   */
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  startX: PropTypes.number,
  startY: PropTypes.number,
  onDragEnd: PropTypes.func,
};

export default Draggable;
