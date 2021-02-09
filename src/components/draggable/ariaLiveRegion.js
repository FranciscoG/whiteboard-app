import { cn } from "utils";

function AriaLiveRegion({ text }) {
  return (
    <div id={this.props.id} aria-live="assertive">
      <span className="visually-hideen">
        {this.props.children}
      </span>
    </div>
  );
}

export default AriaLiveRegion;

