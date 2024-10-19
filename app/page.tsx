'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const [roomId, setRoomId] = useState('');
  const router = useRouter();

  const handleButtonClick = () => {
    if (roomId && /^[0-9]+$/.test(roomId)) {
      router.push(`/${roomId}`);
    }
  };

  const isButtonDisabled = !roomId || !/^[0-9]+$/.test(roomId);

  return (
    <div className="flex justify-center align-middle">
      <div className="my-40 flex w-40 flex-col justify-center gap-20 align-middle">
        <Input
          color="primary"
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="RoomID"
          value={roomId}
          variant="bordered"
        />
        <Button
          color="danger"
          isDisabled={isButtonDisabled}
          onClick={handleButtonClick}
          type="button"
          variant="bordered"
        >
          部屋へ移動
        </Button>
      </div>
    </div>
  );
}
