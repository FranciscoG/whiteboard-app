import { useEffect, useState } from "react";
import { KEYS } from "utils/KEYS";
import { DRAW, ERASE, NOTE, POINTER } from "features/tools/constants";

import { ActionCreators } from "redux-undo";
import { useDispatch } from "react-redux";
import { isEditable } from 'utils';

const ACTIONS_MAP = {};
ACTIONS_MAP[KEYS.p] = DRAW;
ACTIONS_MAP[KEYS.e] = ERASE;
ACTIONS_MAP[KEYS.v] = POINTER;
ACTIONS_MAP[KEYS.n] = NOTE;

function useShortcuts() {
  const [shortcut, setShortcut] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    function onKeyDown(e) {
      if (isEditable(document.activeElement)) { return; }
      
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
      if (isEditable(document.activeElement)) { return; }

      const matchingAction = ACTIONS_MAP[e.key];
      if (matchingAction) {
        setShortcut(matchingAction);
      }
    }

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return function cleanup() {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dispatch]);

  return {
    shortcut,
  };
}

export default useShortcuts;
