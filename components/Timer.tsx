"use client";

import { useEffect, useState } from "react";

export default function Timer({ disabled }: { disabled: boolean }) {
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (disabled) {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          alert("時間切れです！");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const remainingSeconds = seconds % 60;
    return `${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div className="aspect-square w-12 rounded-full border-4 bold text-2xl border-red-600 bg-red-100 m-2 flex justify-center items-center text-red-600">
      {formatTime(timeLeft)}
    </div>
  );
}
