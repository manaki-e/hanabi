import Hanabi from '@/components/Hanabi';

import { Color, Number } from '@/lib/types';

export default function Card({
  color,
  number,
  hint,
}: {
  color?: Color;
  number?: Number;
  hint?: { color: Color; number: Number };
}) {
  function getTextColorClass(color: Color | undefined) {
    switch (color) {
      case 'red':
        return 'text-red-500';
      case 'green':
        return 'text-green-500';
      case 'yellow':
        return 'text-yellow-500';
      case 'white':
        return 'text-white';
      case 'blue':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  }

  const text_color = getTextColorClass(color);
  const hint_text_color = getTextColorClass(hint?.color);

  return (
    <div className="w-1/6">
      <div
        className={`flex flex-col justify-between ${hint ? 'rounded-t-xl' : 'rounded-xl'} bg-gray-700 text-center align-middle`}
      >
        <Hanabi color={text_color}></Hanabi>
        <p className={`${text_color} py-2 font-mono text-3xl`}>{number ?? '?'}</p>
      </div>
      {hint && (
        <div className="flex justify-between rounded-b-xl border-t bg-gray-700 px-4 text-center align-middle">
          <Hanabi color={hint_text_color} is_small={true}></Hanabi>
          <p className={`${hint_text_color} flex items-center font-mono text-lg`}>{hint.number ?? '?'}</p>
        </div>
      )}
    </div>
  );
}
