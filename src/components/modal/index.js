import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import KEYS from "utils/KEYS";
import styles from "./modal.module.css";

const modalContainer = document.getElementById("modal-root");

function Modal({ id, title, hideTitle = false, children, onHide = () => {} }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("has-dialog");
    document.querySelector("#root").setAttribute("aria-hidden", "true");

    return function cleanup() {
      document.body.classList.remove("has-dialog");
      document.querySelector("#root").removeAttribute("aria-hidden");
    };
  }, []);

  function onBgKeyUp(e) {
    if (e.key === KEYS.esc) {
      onHide();
    }
  }

  const content = (
    <div className={styles.bg} onKeyUp={onBgKeyUp}>
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

export default Modal;
