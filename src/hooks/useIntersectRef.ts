import { useEventCallback } from '@mui/material';
import { useRef } from 'react';

const useIntersectRef = (callback: () => void) => {
  const callbackRef = useRef(callback);
  const observableRef = useRef<Element | null>(null);
  callbackRef.current = callback;

  const observerRef = useRef(
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callbackRef.current();
      }
    }),
  );

  return useEventCallback((observable: Element | null) => {
    if (observableRef.current) {
      observerRef.current.unobserve(observableRef.current);
    }

    if (observable) {
      observableRef.current = observable;
      observerRef.current.observe(observable);
    }
  });
};

export default useIntersectRef;
