'use client';

import { CircularProgress } from '@nextui-org/progress';
import { useEffect } from 'react';

import { TEACH_TOKEN } from '@/lib/constant';

import { useTimer } from './function/timer.hooks';

export default function Timer({
  params,
  disabled,
  teach_token,
  opponent_hand,
}: {
  params: { room_id: string; player_id: string };
  disabled: boolean;
  teach_token: number;
  opponent_hand: { color: string; number: number }[];
}) {
  const timeLeft = useTimer({ disabled });

  const uniqueColors = Array.from(new Set(opponent_hand.map((card) => card.color))).sort();
  const uniqueNumbers = Array.from(new Set(opponent_hand.map((card) => card.number))).sort();

  const hintTypes = Math.random() < 0.5 ? 'color' : 'number';
  const hint =
    hintTypes === 'color'
      ? uniqueColors[Math.floor(Math.random() * uniqueColors.length)]
      : uniqueNumbers[Math.floor(Math.random() * uniqueNumbers.length)];

  useEffect(() => {
    if (timeLeft < 0) {
      const formData = new FormData();
      if (teach_token === TEACH_TOKEN) {
        formData.append('form_id', 'hint');
        formData.append('teach', hintTypes);
        formData.append(hintTypes, String(hint));
      } else {
        formData.append('form_id', 'action');
        formData.append('index', '0');
        formData.append('act', 'trash');
      }
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${params.room_id}/${params.player_id}`, {
        method: 'POST',
        body: formData,
      });
      if (teach_token === TEACH_TOKEN) {
        alert('時間切れです！そのため、自動的にヒントを与えました。');
      } else {
        alert('時間切れです！そのため、自動的に一番左のカードを捨てました。');
      }
      window.location.reload();
    }
  }, [timeLeft, hint, hintTypes, params, teach_token]);

  return (
    <CircularProgress
      aria-label="Loading..."
      classNames={{ value: `text-lg ${disabled ? 'text-warning' : 'text-danger'}` }}
      color={disabled ? 'warning' : 'danger'}
      disableAnimation={false}
      formatOptions={{ style: 'decimal' }}
      label=""
      maxValue={20}
      minValue={0}
      showValueLabel={true}
      size="lg"
      value={timeLeft}
    />
  );
}
