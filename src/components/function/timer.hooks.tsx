import { useEffect, useState } from 'react';

export const useTimer = ({ disabled }: { disabled: boolean }) => {
  const [timeLeft, setTimeLeft] = useState(20);
  useEffect(() => {
    if (disabled) {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        return prevTime - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [disabled]);
  return timeLeft;
};
