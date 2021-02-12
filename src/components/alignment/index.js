import { useState } from "react";
import PropTypes from "prop-types";
import { cn } from "utils";
import styles from "./alignment.module.scss";

const svgMap = {
  left: require("@fortawesome/fontawesome-free/svgs/solid/align-left.svg").default,
  center: require("@fortawesome/fontawesome-free/svgs/solid/align-center.svg").default,
  right: require("@fortawesome/fontawesome-free/svgs/solid/align-right.svg").default,
  top: require('assets/icons/align-top.svg').default,
  middle: require('assets/icons/align-middle.svg').default,
  bottom: require('assets/icons/align-bottom.svg').default,
};

function Alignment({
  className,
  selectedHorizontal = "center",
  selectedVertical = "middle",
  onChangeHorizontal,
  onChangeVertical,
}) {
  const [activeHoriz, setActiveHoriz] = useState(selectedHorizontal);
  const [activeVert, setActiveVert] = useState(selectedVertical);

  return (
    <div className={cn("d-flex justify-content-around", className)}>
      <fieldset className={styles.fieldset}>
        <legend className="visually-hidden">Select a horizontal alignment</legend>
        {["left", "center", "right"].map((h, i) => (
          <div className={cn("form-group", styles.wrap)} key={`align-horiz-${h}`}>
            <input
              className={styles.radio}
              type="radio"
              name="horizontal"
              id={`align-horiz-${h}`}
              checked={h === activeHoriz}
              onChange={(e) => {
                setActiveHoriz(e.target.value);
                onChangeHorizontal(e.target.value);
              }}
              value={h}
              title={h}
            />
            <label
              className={cn(styles.label, styles[`label-${i + 1}`])}
              htmlFor={`align-horiz-${h}`}
            >
              <img aria-invalid="true" alt="" src={svgMap[h]} />
              <span className="visually-hidden">{h}</span>
            </label>
          </div>
        ))}
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend className="visually-hidden">Select a vertical alignment</legend>
        {["top", "middle", "bottom"].map((v, i) => (
          <div className={cn("form-group", styles.wrap)} key={`align-vert-${v}`}>
            <input
              className={styles.radio}
              type="radio"
              name="vertical"
              id={`align-vert-${v}`}
              checked={v === activeVert}
              onChange={(e) => {
                setActiveVert(e.target.value);
                onChangeVertical(e.target.value);
              }}
              value={v}
              title={v}
            />
            <label
              className={cn(styles.label, styles[`label-${i + 1}`])}
              htmlFor={`align-vert-${v}`}
            >
              <img aria-invalid="true" alt="" src={svgMap[v]} />
              <span className="visually-hidden">{v}</span>
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}

Alignment.propTypes = {
  /**
   * Add a className to the containing fieldset to alter styles locally
   */
  className: PropTypes.string,

  /**
   * Set the selected horizontal alignment
   */
  selectedHorizontal: PropTypes.oneOf(["left", "center", "right"]),

  /**
   * Set the selected vertical alignment
   */
  selectedVertical: PropTypes.oneOf(["top", "middle", "bottom"]),

  onChangeHorizontal: PropTypes.func.isRequired,

  onChangeVertical: PropTypes.func.isRequired,
};

export default Alignment;
