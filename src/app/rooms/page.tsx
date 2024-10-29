import RoomList from '@/components/RoomList';

import { Rooms } from '@/lib/types';

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
    method: 'GET',
    cache: 'no-cache',
  });
  const rooms = (await res.json()) as Rooms;

  return (
    <div className="flex h-full flex-col p-8 align-middle">
      <RoomList rooms={rooms}></RoomList>
    </div>
  );
}
