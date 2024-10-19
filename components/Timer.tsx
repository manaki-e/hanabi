"use client";

import { useEffect } from "react";
import { useTimer } from "./function/timer.hooks";
import { TEACH_TOKEN } from "@/lib/constant";
import { CircularProgress } from "@nextui-org/progress";

export default function Timer({
  params,
  disabled,
  teach_token,
  opponent_hand,
}: {
  params: { room_id: string; player_id: string };
  disabled: boolean;
  teach_token: number;
  opponent_hand: { color: string; number: number }[];
}) {
  const timeLeft = useTimer({ disabled });

  const uniqueColors = Array.from(new Set(opponent_hand.map((card) => card.color))).sort();
  const uniqueNumbers = Array.from(new Set(opponent_hand.map((card) => card.number))).sort();

  const hintTypes = Math.random() < 0.5 ? "color" : "number";
  const hint =
    hintTypes === "color"
      ? uniqueColors[Math.floor(Math.random() * uniqueColors.length)]
      : uniqueNumbers[Math.floor(Math.random() * uniqueNumbers.length)];

  useEffect(() => {
    if (timeLeft == 0) {
      const formData = new FormData();
      if (teach_token === TEACH_TOKEN) {
        formData.append("form_id", "hint");
        formData.append("teach", hintTypes);
        formData.append(hintTypes, String(hint));
      } else {
        formData.append("form_id", "action");
        formData.append("index", "0");
        formData.append("act", "trash");
      }
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${params.room_id}/${params.player_id}`, {
        method: "POST",
        body: formData,
      });
      if (teach_token === TEACH_TOKEN) {
        alert("時間切れです！そのため、自動的にヒントを与えました。");
      } else {
        alert("時間切れです！そのため、自動的に一番左のカードを捨てました。");
      }
      window.location.reload();
    }
  }, [timeLeft]);

  return (
    <CircularProgress
      size="lg"
      value={timeLeft}
      color={disabled ? "warning" : "danger"}
      showValueLabel={true}
      aria-label="Loading..."
      formatOptions={{ style: "decimal" }}
      maxValue={20}
      minValue={0}
      label=""
      classNames={{ value: `text-lg ${disabled ? "text-warning" : "text-danger"}` }}
      disableAnimation={false}
    />
  );
}
