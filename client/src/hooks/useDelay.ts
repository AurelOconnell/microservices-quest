import { useState, useEffect } from "react";

const useDelay = (
  ms: number
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [delayed, setDelayed] = useState(false);
  useEffect(() => {
    // Happens when a dependency changes
    if (delayed) {
      const timer = setTimeout(() => {
        setDelayed(false);
      }, ms);

      return function cleanup() {
        // Happens when the component unmounts
        clearTimeout(timer);
      };
    }
    return () => {};
  }, [delayed, ms]);
  return [delayed, setDelayed];
};

export default useDelay;
