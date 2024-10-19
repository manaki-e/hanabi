'use client';

import { Button } from '@nextui-org/button';
import { CircularProgress } from '@nextui-org/progress';
import { Select, SelectItem } from '@nextui-org/select';
import { useState } from 'react';

import { TEACH_TOKEN } from '@/lib/constant';
import { submitData } from '@/lib/submitData';

import { useTimer } from './function/timer.hooks';

export default function ActionSelect({
  params,
  teach_token,
  isPlayer,
  isTimer,
}: {
  params: { room_id: string; player_id: string };
  teach_token: number;
  isPlayer: boolean;
  isTimer: boolean;
}) {
  const [selectedIndex, setSelectedIndex] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const timeLeft = useTimer({ disabled: !isTimer });

  const handleIndexChange = (value: string) => {
    setSelectedIndex(value);
  };

  const isButtonDisabled = selectedIndex === '' || !isPlayer;
  const isTrashButtonDisabled = isButtonDisabled || teach_token === TEACH_TOKEN;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!isTimer) {
      submitData(event, params);
      return;
    }
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    setIsLoading(true);
    setTimeout(
      () => {
        submitData(event, params, formData);
        setIsLoading(false);
      },
      (timeLeft - 1) * 1000,
    );
  };

  return (
    <form className="flex flex-col gap-2 align-middle" onSubmit={handleSubmit}>
      <input name="form_id" type="hidden" value="action" />
      <Select
        aria-label="カード番号を選択"
        label=""
        name="index"
        onChange={(e) => handleIndexChange(e.target.value)}
        placeholder="カード番号を選択"
        size="lg"
        variant="faded"
      >
        <SelectItem key={0}>1枚目</SelectItem>
        <SelectItem key={1}>2枚目</SelectItem>
        <SelectItem key={2}>3枚目</SelectItem>
        <SelectItem key={3}>4枚目</SelectItem>
        <SelectItem key={4}>5枚目</SelectItem>
      </Select>
      <div className="flex justify-between">
        <Button color="primary" isDisabled={isButtonDisabled} name="act" type="submit" value="play">
          場に出す
        </Button>
        <Button color="primary" isDisabled={isTrashButtonDisabled} name="act" type="submit" value="trash">
          捨てる
        </Button>
      </div>
      {isLoading && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white opacity-60">
          <CircularProgress aria-label="Loading..." color="primary" size="lg" />
        </div>
      )}
    </form>
  );
}
