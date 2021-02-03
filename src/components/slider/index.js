import { useState } from "react";
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
  onChange = () => {},
  example,
  className,
  ...props
}) {
  const [value, setValue] = useState(startingValue);

  return (
    <div {...props} className={cn(className, styles.container)}>
      <label htmlFor={id} className={cn(styles.label, hideLabel && "visually-hidden")}>
        {label}
      </label>
      <input
        className={styles.range}
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
      />
      {example && <div className={styles.example}>{example(value)}</div>}
    </div>
  );
}

export default Slider;
