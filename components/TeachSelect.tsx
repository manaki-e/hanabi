"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { submitData } from "@/lib/submitData";
import { useTimer } from "./function/timer.hooks";
import { CircularProgress } from "@nextui-org/progress";

export default function TeachSelect({
  params,
  opponent_hand,
  teach_token,
  isPlayer,
  isTimer,
}: {
  params: { room_id: string; player_id: string };
  opponent_hand: { color: string; number: number }[];
  teach_token: number;
  isPlayer: boolean;
  isTimer: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const timeLeft = useTimer({ disabled: !isTimer });

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
    setSelectedColor("");
    setSelectedNumber("");
  };

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
  };

  const handleNumberChange = (value: string) => {
    setSelectedNumber(value);
  };

  const uniqueColors = Array.from(new Set(opponent_hand.map((card) => card.color))).sort();
  const uniqueNumbers = Array.from(new Set(opponent_hand.map((card) => card.number))).sort();

  const isButtonDisabled =
    !isPlayer ||
    teach_token === 0 ||
    (selectedOption === "" && selectedColor === "" && selectedNumber === "") ||
    (selectedOption === "color" && selectedColor === "") ||
    (selectedOption === "number" && selectedNumber === "");

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
      <input type="hidden" name="form_id" value="hint" />
      <div className="flex flex-col gap-4">
        <Select
          placeholder="ColorまたはNumberを選択"
          size="lg"
          variant="faded"
          onChange={(e) => handleSelectChange(e.target.value)}
          defaultSelectedKeys={selectedOption}
          name="teach"
        >
          <SelectItem key="color">Color</SelectItem>
          <SelectItem key="number">Number</SelectItem>
        </Select>
        {selectedOption === "color" && (
          <Select
            placeholder="Colorを選択"
            size="lg"
            variant="faded"
            name="color"
            onChange={(e) => handleColorChange(e.target.value)}
          >
            {uniqueColors.map((color) => (
              <SelectItem key={color}>{color}</SelectItem>
            ))}
          </Select>
        )}
        {selectedOption === "number" && (
          <Select
            placeholder="Numberを選択"
            size="lg"
            variant="faded"
            name="number"
            onChange={(e) => handleNumberChange(e.target.value)}
          >
            {uniqueNumbers.map((number) => (
              <SelectItem key={number}>{String(number)}</SelectItem>
            ))}
          </Select>
        )}
      </div>
      <Button type="submit" color="primary" isDisabled={isButtonDisabled}>
        教える
      </Button>
      {isLoading && (
        <div className="w-screen h-screen z-50 bg-white opacity-60 absolute top-0 left-0 flex justify-center items-center">
          <CircularProgress size="lg" aria-label="Loading..." color="primary" />
        </div>
      )}
    </form>
  );
}
