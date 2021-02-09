import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import KEYS from "utils/KEYS";
import styles from "./modal.module.css";

const modalContainer = document.getElementById("modal-root");

function Modal({ id, title, hideTitle = false, children, onHide = () => {} }, ref) {
  const bgRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("has-dialog");
    document.querySelector("#root").setAttribute("aria-hidden", "true");

    setTimeout(() => {
      if (dialogRef.current) {
        dialogRef.current.classList.add(styles.appear);
      }
      if (bgRef.current) {
        bgRef.current.classList.add(styles.bgAppear);
      }
    }, 100);

    return function cleanup() {
      document.body.classList.remove("has-dialog");
      document.querySelector("#root").removeAttribute("aria-hidden");
    };
  }, []);

  function animatedHide() {
    dialogRef.current.classList.remove(styles.appear);
    bgRef.current.classList.remove(styles.bgAppear);
    setTimeout(onHide, 350);
  }

  function onBgKeyUp(e) {
    if (e.key === KEYS.esc) {
      animatedHide();
    }
  }

  function onBgClick(e) {
    if (e.target.classList.contains(styles.bg)) {
      animatedHide();
    }
  }

  useImperativeHandle(ref, () => ({
    hide: animatedHide,
  }));

  const content = (
    <div ref={bgRef} className={styles.bg} onKeyUp={onBgKeyUp} onClick={onBgClick}>
      <div
        role="dialog"
        id={id}
        aria-labelledby={`${id}_label`}
        aria-modal="true"
        className={styles.dialog}
        ref={dialogRef}
      >
        <div id={`${id}_label`} className={hideTitle ? "visually-hidden" : null}>
          {title}
        </div>
        {children}
      </div>
    </div>
  );

  return createPortal(content, modalContainer);
}

export default forwardRef(Modal);
