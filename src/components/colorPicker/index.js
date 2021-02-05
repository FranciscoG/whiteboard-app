import { useState } from "react";
import styles from "./colorPicker.module.scss";

function ColorPicker({ selected, palette, onSelectColor = (color) => {} }) {
  const [active, setActive] = useState(selected);

  return (
    <fieldset className={styles.fieldset}>
      <legend className="visually-hidden">Select a color</legend>
      {palette.map((color) => (
        <div className={`form-group ${styles.wrap}`} key={color}>
          <input
            className={styles.radio}
            type="radio"
            name="color"
            id={`color-${color}`}
            checked={color === active}
            onChange={(e) => {
              setActive(e.target.value);
              onSelectColor(e.target.value);
            }}
            value={color}
          />
          <label htmlFor={`color-${color}`} style={{ backgroundColor: color }}>
            {color}
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default ColorPicker;
