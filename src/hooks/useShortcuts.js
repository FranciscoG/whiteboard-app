import { useEffect } from "react";
import { KEYS } from "utils/KEYS";
import { DRAW, ERASE, NOTE, POINTER, TEXT } from "features/tools/constants";

import { ActionCreators } from "redux-undo";
import { useDispatch } from "react-redux";
import { isEditable } from "utils";
import { setTool } from "features/tools/toolSlice";

const ACTIONS_MAP = {};
ACTIONS_MAP[KEYS.p] = DRAW;
ACTIONS_MAP[KEYS.e] = ERASE;
ACTIONS_MAP[KEYS.v] = POINTER;
ACTIONS_MAP[KEYS.n] = NOTE;
ACTIONS_MAP[KEYS.t] = TEXT;

function useShortcuts() {
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
    }

    function onKeyUp(e) {
      if (isEditable(document.activeElement)) {
        return;
      }

      const matchingAction = ACTIONS_MAP[e.key];
      if (matchingAction) {
        dispatch(setTool(matchingAction));
      }
    }

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return function cleanup() {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dispatch]);
}

export default useShortcuts;
