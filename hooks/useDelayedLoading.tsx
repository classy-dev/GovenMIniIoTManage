import { useState, useEffect } from 'react';

const useDelayedLoading = (isLoading: boolean, delay = 1000) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer = 0;
    if (isLoading) {
      timer = window.setTimeout(() => {
        setShowLoading(true);
      }, delay);
    } else {
      setShowLoading(false);
    }

    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return showLoading;
};

export default useDelayedLoading;
