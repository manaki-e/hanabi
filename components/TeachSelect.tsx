'use client';

import { Button } from '@nextui-org/button';
import { CircularProgress } from '@nextui-org/progress';
import { Select, SelectItem } from '@nextui-org/select';
import { useState } from 'react';

import { getCurrentTime } from '@/lib/getCurrentTime';
import { submitData } from '@/lib/submitData';

import { useTimer } from './function/timer.hooks';

export default function TeachSelect({
  params,
  opponent_hand,
  teach_token,
  isPlayer,
  isTimer,
}: {
  params: { room_id: string; player_id: string };
  opponent_hand: { color: string; number: number }[];
  teach_token: number;
  isPlayer: boolean;
  isTimer: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [startTime] = useState(getCurrentTime());

  const timeLeft = useTimer({ disabled: !isTimer });

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
    setSelectedColor('');
    setSelectedNumber('');
  };

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
  };

  const handleNumberChange = (value: string) => {
    setSelectedNumber(value);
  };

  const uniqueColors = Array.from(new Set(opponent_hand.map((card) => card.color))).sort();
  const uniqueNumbers = Array.from(new Set(opponent_hand.map((card) => card.number))).sort();

  const isButtonDisabled =
    !isPlayer ||
    teach_token === 0 ||
    (selectedOption === '' && selectedColor === '' && selectedNumber === '') ||
    (selectedOption === 'color' && selectedColor === '') ||
    (selectedOption === 'number' && selectedNumber === '');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const elapsed_time = getCurrentTime() - startTime;
    if (!isTimer) {
      submitData(event, params, undefined, elapsed_time);
      return;
    }
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    setIsLoading(true);
    setTimeout(
      () => {
        submitData(event, params, formData, elapsed_time);
        setIsLoading(false);
      },
      (timeLeft - 1) * 1000,
    );
  };

  return (
    <form className="flex flex-col gap-2 align-middle" onSubmit={handleSubmit}>
      <input name="form_id" type="hidden" value="hint" />
      <div className="flex flex-col gap-4">
        <Select
          aria-label="ColorまたはNumberを選択"
          defaultSelectedKeys={selectedOption}
          label=""
          name="teach"
          onChange={(e) => handleSelectChange(e.target.value)}
          placeholder="ColorまたはNumberを選択"
          size="lg"
          variant="faded"
        >
          <SelectItem key="color">Color</SelectItem>
          <SelectItem key="number">Number</SelectItem>
        </Select>
        {selectedOption === 'color' && (
          <Select
            aria-label="Colorを選択"
            label=""
            name="color"
            onChange={(e) => handleColorChange(e.target.value)}
            placeholder="Colorを選択"
            size="lg"
            variant="faded"
          >
            {uniqueColors.map((color) => (
              <SelectItem key={color}>{color}</SelectItem>
            ))}
          </Select>
        )}
        {selectedOption === 'number' && (
          <Select
            aria-label="Numberを選択"
            label=""
            name="number"
            onChange={(e) => handleNumberChange(e.target.value)}
            placeholder="Numberを選択"
            size="lg"
            variant="faded"
          >
            {uniqueNumbers.map((number) => (
              <SelectItem key={number}>{String(number)}</SelectItem>
            ))}
          </Select>
        )}
      </div>
      <Button color="primary" isDisabled={isButtonDisabled} type="submit">
        教える
      </Button>
      {isLoading && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white opacity-60">
          <CircularProgress aria-label="Loading..." color="primary" size="lg" />
        </div>
      )}
    </form>
  );
}
