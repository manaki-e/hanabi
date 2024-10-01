"use client";

import { TEACH_TOKEN } from "@/lib/constant";
import { useEffect, useState } from "react";

export default function Timer({
  params,
  disabled,
  teach_token,
}: {
  params: { room_id: string; player_id: string };
  disabled: boolean;
  teach_token: number;
}) {
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (disabled) {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);

          const formData = new FormData();
          if (teach_token === TEACH_TOKEN) {
            formData.append("form_id", "hint");
            formData.append("teach", "color");
            formData.append("color", "red");
          } else {
            formData.append("form_id", "action");
            formData.append("index", "0");
            formData.append("act", "trash");
          }

          fetch(`${process.env.NEXT_PUBLIC_API_URL}/${params.room_id}/${params.player_id}`, {
            method: "POST",
            body: formData,
          });
          window.location.reload();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [params, disabled, teach_token]);

  const formatTime = (seconds: number) => {
    const remainingSeconds = seconds % 60;
    return `${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div className="aspect-square w-12 rounded-full border-3 bold text-2xl border-red-600 bg-red-100 m-2 flex justify-center items-center text-red-600">
      {formatTime(timeLeft)}
    </div>
  );
}
