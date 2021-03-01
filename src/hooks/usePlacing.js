import { useReducer } from "react";
import { useEffect } from "react";

const initialState = {
  status: {
    isIdle: true,
    isPlacing: false,
    isPlaced: false,
  },
  position: { x: 0, y: 0 },
};

/**
 * @param {initialState} state
 * @param {{type: 'IDLE' | 'PLACING' | 'PLACED', payload?: {x: number, y: number}}} action
 */
function placeReducer(state, action) {
  switch (action.type) {
    case "IDLE": {
      return {
        ...state,
        status: {
          isIdle: true,
          isPlacing: false,
          isPlaced: false,
        },
      };
    }
    case "PLACING": {
      return {
        ...state,
        status: {
          isIdle: false,
          isPlacing: true,
          isPlaced: false,
        },
      };
    }
    case "PLACED": {
      return {
        position: { ...action.payload },
        status: {
          isIdle: false,
          isPlacing: false,
          isPlaced: true,
        },
      };
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
}

function usePlacing(toolName, currentTool) {
  const [state, dispatch] = useReducer(placeReducer, initialState);

  function reset() {
    dispatch({ type: "IDLE" });
  }

  /**
   * put into PLACED state and also set x,y position coordinates
   * @param {number} x
   * @param {number} y
   */
  function placed(x, y) {
    dispatch({ type: "PLACED", payload: { x, y } });
  }

  /**
   * Listens for changes in the hook arguments and dispatches appropriate
   * actions
   */
  useEffect(() => {
    if (state.status.isIdle && toolName === currentTool) {
      dispatch({ type: "PLACING" });
      return;
    }

    if (toolName !== currentTool && state.status.isPlacing) {
      reset();
    }
  }, [currentTool, state.status.isIdle, state.status.isPlacing, toolName]);

  return {
    state: state.status,
    position: state.position,
    reset,
    placed,
  };
}

export default usePlacing;
