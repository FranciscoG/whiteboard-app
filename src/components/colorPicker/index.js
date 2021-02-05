import { useState } from "react";
import PropTypes from "prop-types";
import { cn } from "utils";
import styles from "./colorPicker.module.scss";

function ColorPicker({ className, selected, palette, onSelectColor = (color) => {} }) {
  const [active, setActive] = useState(selected);

  return (
    <fieldset className={cn(styles.fieldset, className)}>
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

ColorPicker.propTypes = {
  /**
   * Add a className to the containing fieldset to alter styles locally
   */
  className: PropTypes.string,

  /**
   * Set the selected color
   */
  selected: PropTypes.string,

  /**
   * populate the color palette
   */
  palette: PropTypes.arrayOf(PropTypes.string).isRequired,

  /**
   * event handler when a new color is selected
   */
  onSelectColor: PropTypes.func,
};

export default ColorPicker;
