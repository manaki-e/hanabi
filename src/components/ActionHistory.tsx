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
      <ul className="py-4 text-xs font-semibold leading-normal">
        {history
          .slice()
          .reverse()
          .map((action, index) => (
            <li
              className={`pb-1 leading-normal ${action.player_id !== Number(player_id) % 2 && 'text-danger-400'} ${index === 0 && 'text-sm'}`}
              key={index}
            >
              {action.player_id === Number(player_id) % 2 ? '自分' : Number(player_id) === 2 ? 'Agent' : '相手'}：
              {action.message}
            </li>
          ))}
      </ul>
    </ScrollShadow>
  );
}
