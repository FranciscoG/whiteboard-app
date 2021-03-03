import { useEffect, useState } from "react";
import KEYS from "utils/KEYS";
import { DRAW, ERASE, NOTE, POINTER, TEXT } from "features/tools/constants";

import { ActionCreators } from "redux-undo";
import { useDispatch } from "react-redux";
import { isEditable } from "utils";
import { setTool, incrementThickness, decrementThickness } from "features/tools/toolSlice";

const ACTIONS_MAP = {};
ACTIONS_MAP[KEYS.p] = DRAW;
ACTIONS_MAP[KEYS.e] = ERASE;
ACTIONS_MAP[KEYS.v] = POINTER;
ACTIONS_MAP[KEYS.n] = NOTE;
ACTIONS_MAP[KEYS.t] = TEXT;

function useShortcuts() {
  const [lastShortcut, setLastShortcut] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    function onKeyDown(e) {
      if (isEditable(document.activeElement)) {
        return;
      }

      if (e.metaKey && e.shiftKey && e.key === KEYS.z) {
        dispatch(ActionCreators.redo());
        return;
      }

      if (!e.shiftKey && e.metaKey && e.key === KEYS.z) {
        dispatch(ActionCreators.undo());
        return;
      }

      // TODO: this should only work when certain tools are active and only for
      // the specific active tool
      if (e.key === KEYS["["]) {
        dispatch(decrementThickness());
      } else if (e.key === KEYS["]"]) {
        dispatch(incrementThickness());
      }
    }

    function onKeyUp(e) {
      if (isEditable(document.activeElement)) {
        return;
      }

      const matchingAction = ACTIONS_MAP[e.key];
      if (matchingAction) {
        dispatch(setTool(matchingAction));
      }

      setLastShortcut(e.key);
      setTimeout(() => {
        setLastShortcut(null);
      }, 200);
    }

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return function cleanup() {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dispatch]);

  return { lastShortcut };
}

export default useShortcuts;
