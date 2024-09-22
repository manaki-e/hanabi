"use client";

import { submitData } from "@/lib/submitData";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";

export default function ActionSelect({
  params,
}: {
  params: { room_id: string; player_id: string };
}) {
  return (
    <form
      onSubmit={(event) => submitData(event, params)}
      className="flex flex-col gap-2 align-middle"
    >
      <input type="hidden" name="form_id" value="action" />
      <Select label="Index" name="index" className="max-w-xs" size="sm">
        <SelectItem key={0}>1枚目</SelectItem>
        <SelectItem key={1}>2枚目</SelectItem>
        <SelectItem key={2}>3枚目</SelectItem>
        <SelectItem key={3}>4枚目</SelectItem>
        <SelectItem key={4}>5枚目</SelectItem>
      </Select>
      <div className="flex justify-between">
        <Button type="submit" color="primary" name="act" value="play">
          場に出す
        </Button>
        <Button type="submit" color="primary" name="act" value="trash">
          捨てる
        </Button>
      </div>
    </form>
  );
}
