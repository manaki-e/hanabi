"use client";

import { SetStateAction, useState } from "react";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { submitData } from "@/lib/submitData";

export default function TeachSelect({
  params,
  opponent_hand,
}: {
  params: { room_id: string; player_id: string };
  opponent_hand: { color: string; number: number }[];
}) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (value: SetStateAction<string>) => {
    setSelectedOption(value);
  };

  const uniqueColors = Array.from(new Set(opponent_hand.map((card) => card.color))).sort();
  const uniqueNumbers = Array.from(new Set(opponent_hand.map((card) => card.number))).sort();

  return (
    <form
      onSubmit={(event) => submitData(event, params)}
      className="flex flex-col gap-2 align-middle"
    >
      <input type="hidden" name="form_id" value="hint" />
      <div className="flex flex-col gap-4">
        <Select
          label="色または数字"
          className="max-w-xs"
          size="sm"
          onChange={(e) => handleSelectChange(e.target.value)}
          defaultSelectedKeys={selectedOption}
          name="teach"
        >
          <SelectItem key="color">色</SelectItem>
          <SelectItem key="number">数字</SelectItem>
        </Select>
        {selectedOption === "color" && (
          <Select label="色" className="max-w-xs" size="sm" name="color">
            {uniqueColors.map((color) => (
              <SelectItem key={color}>{color}</SelectItem>
            ))}
          </Select>
        )}
        {selectedOption === "number" && (
          <Select label="数字" className="max-w-xs" size="sm" name="number">
            {uniqueNumbers.map((number) => (
              <SelectItem key={number}>{String(number)}</SelectItem>
            ))}
          </Select>
        )}
      </div>
      <Button type="submit" color="primary">
        教える
      </Button>
    </form>
  );
}
