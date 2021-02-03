import { DRAW, ERASE } from "features/tools/constants";
import Draw from "features/draw";

export function Active({ tool, ...props }) {
  if (tool === DRAW || tool === ERASE) {
    return <Draw lines={props.lines} />;
  }
  return null;
}

export function Inactive({ tool, ...props }) {
  if (tool !== DRAW && tool !== ERASE) {
    return <Draw lines={props.lines} />;
  }
  return null;
}