import RoomList from '@/components/RoomList';

import { getRooms } from '@/lib/getData';

export default async function Page() {
  const rooms = await getRooms();

  return (
    <div className="flex h-full flex-col p-8 align-middle">
      <RoomList rooms={rooms}></RoomList>
    </div>
  );
}
