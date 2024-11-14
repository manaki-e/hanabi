'use client';

import { Button } from '@nextui-org/button';
import { Tab, Tabs } from '@nextui-org/tabs';
import Link from 'next/link';

import { Rooms } from '@/lib/types';

export default function RoomList({ rooms }: { rooms: Rooms }) {
  const quarterLength = Math.ceil(rooms.length / 5);

  return (
    <Tabs aria-label="tabs" color="primary" fullWidth={true} radius="sm" variant="bordered">
      <Tab className="m-auto flex flex-wrap justify-center gap-12 overflow-y-scroll" key="0-0" title="模擬プレイ(先攻)">
        {rooms.slice(0, quarterLength).map((room) => (
          <Button
            as={Link}
            color="success"
            href={`/rooms/${room.room_id}/0`}
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
      <Tab className="m-auto flex flex-wrap justify-center gap-12 overflow-y-scroll" key="0-1" title="模擬プレイ(後攻)">
        {rooms.slice(0, quarterLength).map((room) => (
          <Button
            as={Link}
            color="danger"
            href={`/rooms/${room.room_id}/1`}
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
      <Tab className="m-auto flex flex-wrap justify-center gap-12 overflow-y-scroll" key="1-1-1" title="実験1-1(先攻)">
        {rooms.slice(quarterLength, quarterLength * 2).map((room) => (
          <Button
            as={Link}
            color="success"
            href={`/rooms/${room.room_id}/0`}
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
      <Tab className="m-auto flex flex-wrap justify-center gap-12 overflow-y-scroll" key="1-1-2" title="実験1-1(後攻)">
        {rooms.slice(quarterLength, quarterLength * 2).map((room) => (
          <Button
            as={Link}
            color="danger"
            href={`/rooms/${room.room_id}/1`}
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
      <Tab className="m-auto flex flex-wrap justify-center gap-12 overflow-y-scroll" key="1-2-1" title="実験1-2(先攻)">
        {rooms.slice(quarterLength * 2, quarterLength * 3).map((room) => (
          <Button
            as={Link}
            color="success"
            href={`/rooms/${room.room_id}/0`}
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
      <Tab className="m-auto flex flex-wrap justify-center gap-12 overflow-y-scroll" key="1-2-2" title="実験1-2(後攻)">
        {rooms.slice(quarterLength * 2, quarterLength * 3).map((room) => (
          <Button
            as={Link}
            color="danger"
            href={`/rooms/${room.room_id}/1`}
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
      <Tab className="m-auto flex flex-wrap justify-center gap-12 overflow-y-scroll" key="2-1" title="実験2-1">
        {rooms.slice(quarterLength * 3, quarterLength * 4).map((room) => (
          <Button
            as={Link}
            color="warning"
            href={`/rooms/${room.room_id}/2`}
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
      <Tab className="m-auto flex flex-wrap justify-center gap-12 overflow-y-scroll" key="2-2" title="実験2-2">
        {rooms.slice(quarterLength * 4).map((room) => (
          <Button
            as={Link}
            color="warning"
            href={`/rooms/${room.room_id}/2`}
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
