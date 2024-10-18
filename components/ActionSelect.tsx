"use client";

import { TEACH_TOKEN } from "@/lib/constant";
import { submitData } from "@/lib/submitData";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { useTimer } from "./function/timer.hooks";
import { CircularProgress } from "@nextui-org/progress";

export default function ActionSelect({
  params,
  teach_token,
  isPlayer,
  isTimer,
}: {
  params: { room_id: string; player_id: string };
  teach_token: number;
  isPlayer: boolean;
  isTimer: boolean;
}) {
  // State for selected index
  const [selectedIndex, setSelectedIndex] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const timeLeft = useTimer({ disabled: !isTimer });

  // Handle the change of the select box
  const handleIndexChange = (value: string) => {
    setSelectedIndex(value);
  };

  // Determine if the button should be disabled
  const isButtonDisabled = selectedIndex === "" || !isPlayer;
  const isTrashButtonDisabled = isButtonDisabled || teach_token === TEACH_TOKEN;

  const handleSubmit = (event: any) => {
    if (!isTimer) {
      submitData(event, params);
      return;
    }
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    setIsLoading(true);
    setTimeout(() => {
      submitData(event, params, formData);
      setIsLoading(false);
    }, (timeLeft - 1) * 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 align-middle">
      <input type="hidden" name="form_id" value="action" />
      <Select
        label=""
        aria-label="カード番号を選択"
        placeholder="カード番号を選択"
        name="index"
        size="lg"
        variant="faded"
        onChange={(e) => handleIndexChange(e.target.value)}
      >
        <SelectItem key={0}>1枚目</SelectItem>
        <SelectItem key={1}>2枚目</SelectItem>
        <SelectItem key={2}>3枚目</SelectItem>
        <SelectItem key={3}>4枚目</SelectItem>
        <SelectItem key={4}>5枚目</SelectItem>
      </Select>
      <div className="flex justify-between">
        <Button type="submit" color="primary" name="act" value="play" isDisabled={isButtonDisabled}>
          場に出す
        </Button>
        <Button
          type="submit"
          color="primary"
          name="act"
          value="trash"
          isDisabled={isTrashButtonDisabled}
        >
          捨てる
        </Button>
      </div>
      {isLoading && (
        <div className="w-screen h-screen z-50 bg-white opacity-60 absolute top-0 left-0 flex justify-center items-center">
          <CircularProgress size="lg" aria-label="Loading..." color="primary" />
        </div>
      )}
    </form>
  );
}
