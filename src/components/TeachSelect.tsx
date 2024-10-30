'use client';

import { Button } from '@nextui-org/button';
import { Select, SelectItem } from '@nextui-org/select';
import { Spinner } from '@nextui-org/spinner';
import { useState } from 'react';

import { getCurrentTime } from '@/lib/getCurrentTime';
import { submitData } from '@/lib/submitData';

import { useTimer } from './function/timer.hooks';

export default function TeachSelect({
  room_id,
  player_id,
  opponent_hand,
  teach_token,
  isPlayer,
  isFixedTime,
}: {
  room_id: string;
  player_id: string;
  opponent_hand: { color: string; number: number }[];
  teach_token: number;
  isPlayer: boolean;
  isFixedTime: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [startTime] = useState(getCurrentTime());

  const timeLeft = useTimer({ disabled: !isFixedTime });

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
    event.preventDefault();
    setIsLoading(true);
    const elapsed_time = getCurrentTime() - startTime;
    if (isFixedTime) {
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      setTimeout(
        () => {
          submitData(event, room_id, player_id, formData, elapsed_time).finally(() => setIsLoading(false));
        },
        (timeLeft - 1) * 1000,
      );
    } else {
      submitData(event, room_id, player_id, undefined, elapsed_time).finally(() => setIsLoading(false));
    }
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
          <Spinner color="primary" size="lg" />
        </div>
      )}
    </form>
  );
}
