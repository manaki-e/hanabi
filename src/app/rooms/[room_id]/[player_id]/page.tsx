import { CircularProgress } from '@nextui-org/progress';

import ActionHistory from '@/components/ActionHistory';
import ActionSelect from '@/components/ActionSelect';
import Card from '@/components/Card';
import Message from '@/components/Message';
import TeachSelect from '@/components/TeachSelect';
import Timer from '@/components/Timer';
import TrashTable from '@/components/TrashTable';
import AgentAction from '@/components/function/AgentAction';
import AutoReload from '@/components/function/AutoReload';

import { MISS_TOKEN, TEACH_TOKEN } from '@/lib/constant';
import { Color, Dataset } from '@/lib/types';

export default async function Page({ params }: { params: Promise<{ room_id: string; player_id: string }> }) {
  const { room_id, player_id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${room_id}/${player_id}`, {
    method: 'GET',
    cache: 'no-cache',
  });
  const dataset = (await res.json()) as Dataset;

  const isPlayer = dataset.current_player === Number(player_id) % 2;
  const isFixedTime = Number(room_id) >= 100 && Number(room_id) < 200;

  return (
    <>
      {!isPlayer &&
        !dataset.is_finished &&
        (player_id !== '2' ? <AutoReload /> : <AgentAction player_id={player_id} room_id={room_id} />)}

      <div className="mx-8 flex gap-8">
        <div className="flex h-16 flex-1 flex-col justify-center align-middle">
          <Message isFinished={dataset.is_finished} isPlayer={isPlayer} />
        </div>
        <Timer
          disabled={!isPlayer || dataset.is_finished}
          opponent_hand={dataset.opponent_hand}
          player_id={player_id}
          room_id={room_id}
          teach_token={dataset.teach_token}
        />
      </div>

      <div className="flex size-full justify-between gap-4" style={{ height: `calc(100% - 65px)` }}>
        <div className="flex w-1/4 flex-col justify-between p-4">
          <div className="flex flex-wrap justify-center gap-8">
            <CircularProgress
              classNames={{
                svg: 'w-28 h-28 drop-shadow-md',
                indicator: 'stroke-primary',
                track: 'stroke-white/10',
                value: 'text-3xl font-semibold text-primary',
              }}
              formatOptions={{ style: 'decimal' }}
              label="残りの山札枚数"
              maxValue={40}
              minValue={0}
              showValueLabel={true}
              strokeWidth={3}
              value={dataset.remaining_cards}
            />
            <CircularProgress
              classNames={{
                svg: 'w-28 h-28 drop-shadow-md',
                indicator: 'stroke-primary',
                track: 'stroke-white/10',
                value: 'text-3xl font-semibold text-primary',
              }}
              formatOptions={{ style: 'decimal' }}
              label="ヒントトークン"
              maxValue={TEACH_TOKEN}
              minValue={0}
              showValueLabel={true}
              strokeWidth={3}
              value={dataset.teach_token}
            />
            <CircularProgress
              classNames={{
                svg: 'w-28 h-28 drop-shadow-md',
                indicator: 'stroke-danger',
                track: 'stroke-white/10',
                value: 'text-3xl font-semibold text-danger',
              }}
              formatOptions={{ style: 'decimal' }}
              label="ミストークン"
              maxValue={MISS_TOKEN}
              minValue={0}
              showValueLabel={true}
              strokeWidth={3}
              value={dataset.mistake_token}
            />
            <CircularProgress
              classNames={{
                svg: 'w-28 h-28 drop-shadow-md',
                indicator: 'stroke-success',
                track: 'stroke-white/10',
                value: 'text-3xl font-semibold text-success',
              }}
              formatOptions={{ style: 'decimal' }}
              label="現在の合計点数"
              maxValue={25}
              minValue={0}
              showValueLabel={true}
              strokeWidth={3}
              value={dataset.field_cards.reduce((sum: number, card: { number: number }) => sum + card.number, 0)}
            />
          </div>
          <TrashTable trash_table={dataset.trash_table} />
        </div>
        <div className="flex flex-col justify-between overflow-hidden">
          <div className="m-4 flex gap-4 overflow-hidden">
            {dataset.opponent_hand.map((card: { color: Color; number: number }, index: number) => (
              <Card color={card.color} key={index} number={card.number} />
            ))}
          </div>
          <div className="flex gap-4 rounded-md bg-yellow-600/60 p-4">
            {dataset.field_cards.map((card: { color: Color; number: number }, index: number) => (
              <Card color={card.color} key={index} number={card.number} />
            ))}
          </div>
          <div className="m-4 flex gap-4">
            {dataset.player_info.map((card: { color: Color; number: number }, index: number) => (
              <Card color={card.color} key={index} number={card.number} />
            ))}
          </div>
        </div>
        <div className="flex w-1/4 flex-col justify-between p-4">
          <div className="my-4">
            <TeachSelect
              isFixedTime={isFixedTime}
              isPlayer={isPlayer}
              opponent_hand={dataset.opponent_hand}
              player_id={player_id}
              room_id={room_id}
              teach_token={dataset.teach_token}
            />
          </div>
          <ActionHistory history={dataset.history} player_id={player_id} room_id={room_id} />
          <div className="my-4">
            <ActionSelect
              isFixedTime={isFixedTime}
              isPlayer={isPlayer}
              player_id={player_id}
              room_id={room_id}
              teach_token={dataset.teach_token}
            />
          </div>
        </div>
      </div>
    </>
  );
}
