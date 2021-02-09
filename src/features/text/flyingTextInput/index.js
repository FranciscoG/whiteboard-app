import PropTypes from "prop-types";
import KEYS from "utils/KEYS";
import styles from "./index.module.scss";

function FlyingTextInput({ x = 0, y = 0, text = "", onSave = (text) => {} }) {
  function onKeyUp(e) {
    if (e.key === KEYS.enter) {
      onSave(e.target.value)
    }
  }

  return (
    <form className={styles.inputContainer} style={{ top: `${y}px`, left: `${x}px` }}>
      <label className="visually-hidden">Add text to canvas, press enter to save</label>
      <textarea className={styles.inptut} defaultValue={text} onKeyUp={onKeyUp} />
    </form>
  );
}

FlyingTextInput.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  text: PropTypes.string,
  onSave: PropTypes.func
};

export default FlyingTextInput;
