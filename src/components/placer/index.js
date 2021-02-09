import { useEffect, useRef } from "react";
import { ACTIONS } from "utils/KEYS";
import styles from "./index.module.scss";

function Placer({ width, height, onFinish, onCancel }) {
  const ref = useRef(null);

  useEffect(() => {
    function onMove(e) {
      if (ref.current) {
        ref.current.style.top = `${e.clientY}px`;
        ref.current.style.left = `${e.clientX}px`;
      }
    }

    function onClick(e) {
      onFinish(e.clientX, e.clientY, e);
    }

    function onKeyUp(e) {
      if (e.key === ACTIONS.esc) {
        onCancel();
      }
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    window.addEventListener("keyup", onKeyUp);

    return function cleanup() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onCancel, onFinish]);

  return (
    <div
      ref={ref}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      className={styles.placer}
    />
  );
}

export default Placer;
