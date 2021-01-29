import { useEffect, useState } from "react";
import { KEYS } from 'utils/KEYS';
import { DRAW, ERASE, NOTE, POINTER } from "features/tools/constants";

const ACTIONS_MAP = {}
ACTIONS_MAP[KEYS.p] = DRAW;
ACTIONS_MAP[KEYS.e] = ERASE;
ACTIONS_MAP[KEYS.v] = POINTER;
ACTIONS_MAP[KEYS.n] = NOTE;

function useShortcuts() {
  const [shortcut, setShortcut] = useState(null);

  function onKeyUp(e) {
    const matchingAction = ACTIONS_MAP[e.key];
      if (matchingAction) {
        setShortcut(matchingAction);
      }
  }

  useEffect(() => {
    window.addEventListener("keyup", onKeyUp);
    return function cleanup() {
      window.removeEventListener("keyup", onKeyUp)
    }
  }, []);

  return {
    shortcut,
  };
}

export default useShortcuts;
