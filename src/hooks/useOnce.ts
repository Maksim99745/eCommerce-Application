import { useEffect, useRef } from 'react';

const useOnce = (fn: () => void | Promise<void>): void => {
  const callback = useRef(fn);
  const triggered = useRef(true);

  useEffect(() => {
    if (triggered.current) {
      callback.current();
      triggered.current = false;
    }
  }, []);
};

export default useOnce;
