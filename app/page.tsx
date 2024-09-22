"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";

export default function Page() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleButtonClick = () => {
    if (roomId && /^[0-9]+$/.test(roomId)) {
      router.push(`/${roomId}`);
    }
  };

  const isButtonDisabled = !roomId || !/^[0-9]+$/.test(roomId);

  return (
    <div className="flex justify-center align-middle">
      <div className="flex flex-col gap-20 justify-center align-middle w-40 my-40">
        <Input
          placeholder="RoomID"
          onChange={(e) => setRoomId(e.target.value)}
          variant="bordered"
          color="primary"
          value={roomId}
        />
        <Button
          variant="bordered"
          color="danger"
          type="button"
          onClick={handleButtonClick}
          isDisabled={isButtonDisabled}
        >
          部屋へ移動
        </Button>
      </div>
    </div>
  );
}
