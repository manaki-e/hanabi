'use client';

import { CircularProgress } from '@nextui-org/progress';
import { useState, useEffect } from 'react';

import { getAgentAction } from '@/lib/getData';

export default function AgentAction({ params }: { params: { room_id: string; player_id: string } }) {
  const [thinkingTime, setThinkingTime] = useState<number | null>(null);

  useEffect(() => {
    const getAction = async () => {
      const time = await getAgentAction(params.room_id, params.player_id);
      setThinkingTime(time.thinking_time);
    };

    getAction();
  }, [params]);

  useEffect(() => {
    if (thinkingTime === null) return;

    const timer = setTimeout(() => {
      window.location.reload();
    }, thinkingTime * 1000);

    return () => clearTimeout(timer);
  }, [thinkingTime]);

  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white opacity-60">
      <CircularProgress aria-label="Loading..." color="primary" size="lg" />
    </div>
  );
}
