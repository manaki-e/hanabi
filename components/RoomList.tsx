'use client';

import { Button } from '@nextui-org/button';
import { Tab, Tabs } from '@nextui-org/tabs';
import Link from 'next/link';

import { Rooms } from '@/lib/types';

export default function RoomList({ rooms }: { rooms: Rooms }) {
  return (
    <Tabs aria-label="tabs" color="primary" fullWidth={true} radius="sm" variant="bordered">
      <Tab
        className="m-auto flex flex-wrap justify-center gap-6 overflow-y-scroll"
        key="player_1"
        title="vs 人間（プレイヤー１）"
      >
        {rooms.slice(0, Math.ceil(rooms.length / 2)).map((room) => (
          <Button
            as={Link}
            color="primary"
            href={`/${room.room_id}/0`}
            isDisabled={room.is_finished}
            key={room.room_id}
            size="lg"
            target="_blank"
            variant="bordered"
          >
            {room.room_id}
          </Button>
        ))}
      </Tab>
      <Tab
        className="m-auto flex flex-wrap justify-center gap-6 overflow-y-scroll"
        key="player_2"
        title="vs 人間（プレイヤー２）"
      >
        {rooms.slice(0, Math.ceil(rooms.length / 2)).map((room) => (
          <Button
            as={Link}
            color="danger"
            href={`/${room.room_id}/1`}
            isDisabled={room.is_finished}
            key={room.room_id}
            size="lg"
            target="_blank"
            variant="bordered"
          >
            {room.room_id}
          </Button>
        ))}
      </Tab>
      <Tab className="m-auto flex flex-wrap justify-center gap-6 overflow-y-scroll" key="agent" title="vs エージェント">
        {rooms.slice(Math.ceil(rooms.length / 2)).map((room) => (
          <Button
            as={Link}
            color="warning"
            href={`/${room.room_id}/2`}
            isDisabled={room.is_finished}
            key={room.room_id}
            size="lg"
            target="_blank"
            variant="bordered"
          >
            {room.room_id}
          </Button>
        ))}
      </Tab>
    </Tabs>
  );
}
