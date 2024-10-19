import Hanabi from '@/components/Hanabi';

import { Color } from '@/lib/types';

export default function Card({ color, number }: { color?: Color; number?: number }) {
  const text_color =
    color === 'red'
      ? 'text-red-500'
      : color === 'green'
        ? 'text-green-500'
        : color === 'yellow'
          ? 'text-yellow-500'
          : color === 'white'
            ? 'text-white'
            : color === 'blue'
              ? 'text-blue-500'
              : 'text-gray-500';

  return (
    <div className="flex w-28 flex-col justify-between rounded-xl border border-gray-600 bg-gray-700 text-center align-middle">
      <Hanabi color={text_color}></Hanabi>
      <p className={`${text_color} py-2 font-mono text-3xl`}>{number ?? '?'}</p>
    </div>
  );
}
