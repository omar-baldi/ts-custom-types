import { useEffect, useRef, useState } from "react";

type Options = {
  updateOnMount?: boolean;
};

const defaultOptions: Options = {
  updateOnMount: false,
};

export const useDebouncedValue = <T>(v: T, delay: number, options = defaultOptions) => {
  const [debouncedValue, setDebouncedValue] = useState(v);
  const mounted = useRef(false);

  useEffect(() => {
    const isMounted = mounted.current;
    if (!isMounted && !options.updateOnMount) return;
    const timeout = setTimeout(() => {
      setDebouncedValue(v);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [v, delay, options.updateOnMount]);

  useEffect(() => {
    mounted.current = true;
  }, []);

  return debouncedValue;
};
