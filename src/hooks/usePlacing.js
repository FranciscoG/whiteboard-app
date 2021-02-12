import { useRef } from "react";
import { useState, useEffect } from "react";

const states = [
  // idle state
  {
    isIdle: true,
    isPlacing: false,
    isPlaced: false,
  },
  // active state
  {
    isIdle: false,
    isPlacing: true,
    isPlaced: false,
  },
  // completed state
  {
    isIdle: false,
    isPlacing: false,
    isPlaced: true,
  },
];

function usePlacing(enabled = false) {
  const index = useRef(0)
  const [currentState, setCurrentState] = useState(states[index.current]);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function reset() {
    index.current = 0;
    setCurrentState(states[0]);
  }

  function next(x, y) {
    if (x && y) {
      setPosition({ x, y });
    }
    if (index.current === states.length - 1) {
      reset();
    } else {
      index.current = index.current + 1;
      setCurrentState(states[index.current]);
    }
  }

  useEffect(() => {
    if (enabled) {
      index.current = 1;
      setCurrentState(states[1]);
    }
  }, [enabled]);

  return {
    state: currentState,
    reset,
    position,
    next,
  };
}

export default usePlacing;
