import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

function Modal({ id, title, hideTitle = false, children, show = false }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    function reset() {
      document.body.classList.remove("has-dialog");
      document.querySelector("#root").removeAttribute("aria-hidden");
    }

    if (show) {
      document.body.classList.add("has-dialog");
      document.querySelector("#root").setAttribute("aria-hidden", "true");
    } else {
      reset();
    }

    return reset;
  }, [show]);

  const content = (
    <div className={styles.bg}>
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

  return show && createPortal(content, document.body);
}

export default Modal;
