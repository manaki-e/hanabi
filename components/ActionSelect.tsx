"use client";

import { TEACH_TOKEN } from "@/lib/constant";
import { submitData } from "@/lib/submitData";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { ChangeEvent, useState } from "react";

export default function ActionSelect({
  params,
  teach_token,
  isPlayer,
}: {
  params: { room_id: string; player_id: string };
  teach_token: number;
  isPlayer: boolean;
}) {
  // State for selected index
  const [selectedIndex, setSelectedIndex] = useState("");

  // Handle the change of the select box
  const handleIndexChange = (value: string) => {
    setSelectedIndex(value);
  };

  // Determine if the button should be disabled
  const isButtonDisabled = selectedIndex === "" || !isPlayer;
  const isTrashButtonDisabled = isButtonDisabled || teach_token === TEACH_TOKEN;

  return (
    <form
      onSubmit={(event) => submitData(event, params)}
      className="flex flex-col gap-2 align-middle"
    >
      <input type="hidden" name="form_id" value="action" />
      <Select
        label="Index"
        name="index"
        className="max-w-xs"
        size="sm"
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
    </form>
  );
}
