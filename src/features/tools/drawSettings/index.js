import { connect } from "react-redux";
import { TwitterPicker as ColorPicker } from "react-color";
import { cn } from "utils";
import Slider from "components/slider";
import { setDrawColor, setDrawThickness } from "features/tools/toolSlice";
import { lineColors } from "features/tools/constants";
import styles from "./drawSettings.module.css";

function DrawSettings({ show = false, draw, setDrawColor, setDrawThickness }) {
  return (
    <div className={cn(styles.settingsContainer, show && styles.show)}>
      <Slider
        className={styles.slider}
        id="drawThickness"
        label="Change the thickness of the drawing tool"
        min="1"
        max="40"
        startingValue={draw.thickness}
        onChange={(e) => {
          setDrawThickness(Number(e.target.value));
        }}
        example={(value) => (
          <svg viewBox="0 0 100 100" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
            <g>
              <circle cx="50%" cy="50%" r={value} fill={draw.color} />
              <text
                x="50%"
                y="50%"
                className={styles.px}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {value}
              </text>
            </g>
          </svg>
        )}
      />
      <ColorPicker
        color={draw.color}
        triangle={null}
        colors={lineColors}
        onChange={(c) => {
          setDrawColor(c.hex);
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  draw: state.tool.draw,
});

const mapDispatchToProps = { setDrawThickness, setDrawColor };

export default connect(mapStateToProps, mapDispatchToProps)(DrawSettings);
