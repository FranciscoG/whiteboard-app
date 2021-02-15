import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { cn } from "utils";
import styles from "./slider.module.css";

function Slider({
  id,
  label,
  hideLabel = true,
  step = "1",
  min = "1",
  max,
  startingValue = 1,
  onChange = (e) => {},
  example,
  className,
}) {
  const [value, setValue] = useState(startingValue);

  useEffect(() => {
    setValue(startingValue)
  }, [startingValue])

  return (
    <div className={cn("form-control", className, styles.container)}>
      <label
        htmlFor={id}
        className={cn(
          "form-label",
          styles.label,
          hideLabel && "visually-hidden",
          !hideLabel && "d-block"
        )}
      >
        {label}
      </label>
      <input
        className={cn("form-range", styles.range)}
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          setValue(Number(e.target.value));
          onChange(e);
        }}
      />
      {example && <div className={styles.example}>{example(value)}</div>}
    </div>
  );
}

Slider.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  startingValue: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,

  /**
   * renderProp: if set, it will get passed the value and must return a React.Element
   */
  example: PropTypes.func,
};

export default Slider;
