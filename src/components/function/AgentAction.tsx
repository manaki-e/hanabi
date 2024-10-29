'use client';

import { Spinner } from '@nextui-org/spinner';
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
    }, thinkingTime * 1000);

    return () => clearTimeout(timer);
  }, [thinkingTime]);

  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white opacity-60">
      <Spinner color="primary" size="lg" />
    </div>
  );
}
