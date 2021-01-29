import { connect } from "react-redux";
import { TwitterPicker } from "react-color";
import { cn } from "utils";
import Slider from "components/slider";
import { setDrawColor, setDrawThickness } from "features/tools/toolSlice";
import styles from "./drawSettings.module.css";

const pickerColors = [
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#EB144C",
  "#F78DA7",
  "#9900EF",
];

function DrawSettings({ show = false, draw, setDrawColor, setDrawThickness }) {
  return (
    <div className={cn(styles.settingsContainer, show && styles.show)}>
      <Slider
        className={styles.slider}
        id="drawThickness"
        label="Change the thickness of the drawing tool"
        min="5"
        max="40"
        startingValue={draw.thickness}
        onChange={(e) => {
          setDrawThickness(Number(e.target.value));
        }}
        example={(value) => (
          <svg viewBox="0 0 100 100" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50%" cy="50%" r={value} />
          </svg>
        )}
      />
      <TwitterPicker
        color={draw.color}
        triangle={null}
        colors={pickerColors}
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
