import { useCallback, useEffect, useRef } from "react";
import debounce from "lodash-es/debounce";

/**
 *
 * @param {()=>any} effect
 * @param {number} delay
 * @param {array} deps
 */
const useDebounce = (effect, delay, deps) => {
  const debounced = useRef(null);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, deps);

  useEffect(() => {
    debounced.current = debounce(callback, delay);

    return function cleanup() {
      debounced.current.cancel();
    };
  }, [callback, delay]);

  return debounced.current;
};

export default useDebounce;