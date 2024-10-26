import { Dataset, Rooms } from './types';

export async function getRooms() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
      method: 'GET',
      cache: 'no-cache',
    });

    return (await response.json()) as Rooms;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getGameData(room_id: string, player_id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${room_id}/${player_id}`, {
      method: 'GET',
      cache: 'no-cache',
    });

    return (await response.json()) as Dataset;
  } catch (error) {
    console.error(error);
    return {} as Dataset;
  }
}

export async function getAgentAction(room_id: string, player_id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${room_id}/${player_id}/agent`, {
      method: 'GET',
      cache: 'no-cache',
    });

    return (await response.json()) as { thinking_time: number };
  } catch (error) {
    console.error(error);
    return { thinking_time: 0 };
  }
}
