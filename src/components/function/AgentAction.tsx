'use client';

import { Progress } from '@nextui-org/progress';
import { useState, useEffect } from 'react';

export default function AgentAction({ room_id, player_id }: { room_id: string; player_id: string }) {
  const [thinkingTime, setThinkingTime] = useState<number | null>(null);

  useEffect(() => {
    const getAction = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${room_id}/${player_id}/agent`, {
        method: 'GET',
        cache: 'no-cache',
      });
      const time = (await res.json()) as { thinking_time: number };
      setThinkingTime(time.thinking_time);
    };

    getAction();
  }, [room_id, player_id]);

  useEffect(() => {
    if (thinkingTime === null) return;

    const timer = setTimeout(() => {
      window.location.reload();
    }, thinkingTime);

    return () => clearTimeout(timer);
  }, [thinkingTime]);

  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center ">
      <div className="absolute left-0 top-0 size-full bg-white opacity-60"></div>
      <Progress
        aria-label="Loading..."
        classNames={{ base: 'relative bg-white p-4 max-w-md', labelWrapper: 'flex justify-center items-center' }}
        color="success"
        isIndeterminate
        label="Agentが考え中です・・・"
        size="md"
      />
    </div>
  );
}
