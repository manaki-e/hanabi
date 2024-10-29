'use client';

import { ScrollShadow } from '@nextui-org/scroll-shadow';

export default function ActionHistory({
  player_id,
  history,
}: {
  room_id: string;
  player_id: string;
  history: { player_id: number; message: string }[];
}) {
  return (
    <ScrollShadow className="h-full" offset={10}>
      <ul className="py-4 text-xs leading-normal">
        {history
          .slice()
          .reverse()
          .map((action, index) => (
            <li key={index}>
              {action.player_id === Number(player_id) % 2 ? '自分' : Number(player_id) === 2 ? 'AI' : '相手'}：
              {action.message}
            </li>
          ))}
      </ul>
    </ScrollShadow>
  );
}
