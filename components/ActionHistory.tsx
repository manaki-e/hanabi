"use client";

import { useRef, useEffect } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

export default function ActionHistory({
  params,
  history,
}: {
  params: { room_id: string; player_id: string };
  history: { player_id: number; message: string }[];
}) {
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollableRef.current?.scrollTo(0, scrollableRef.current.scrollHeight);
  }, []);

  return (
    <ScrollShadow className="h-full" offset={10} ref={scrollableRef}>
      <ul className="text-xs py-4">
        {history.map((action, index) => (
          <li key={index}>
            {action.player_id === Number(params.player_id) ? "自分" : "相手"}：{action.message}
          </li>
        ))}
      </ul>
    </ScrollShadow>
  );
}
