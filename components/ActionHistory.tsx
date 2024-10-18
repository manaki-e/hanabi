"use client";

import { ScrollShadow } from "@nextui-org/scroll-shadow";

export default function ActionHistory({
  params,
  history,
}: {
  params: { room_id: string; player_id: string };
  history: { player_id: number; message: string }[];
}) {
  return (
    <ScrollShadow className="h-full" offset={10}>
      <ul className="text-xs py-4 leading-normal">
        {history
          .slice()
          .reverse()
          .map((action, index) => (
            <li key={index}>
              {action.player_id === Number(params.player_id) ? "自分" : "相手"}：{action.message}
            </li>
          ))}
      </ul>
    </ScrollShadow>
  );
}
