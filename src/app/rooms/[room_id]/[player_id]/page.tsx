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
import { Color, Dataset, Number as CardNumber } from '@/lib/types';

export default async function Page({ params }: { params: Promise<{ room_id: string; player_id: string }> }) {
  const { room_id, player_id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${room_id}/${player_id}`, {
    method: 'GET',
    cache: 'no-cache',
  });
  const dataset = (await res.json()) as Dataset;

  const isPlayer = dataset.current_player === Number(player_id) % 2;
  const isFixedTime = Number(room_id) >= 100 && Number(room_id) < 150;

  return (
    <>
      {!isPlayer &&
        !dataset.is_finished &&
        (player_id !== '2' ? <AutoReload /> : <AgentAction player_id={player_id} room_id={room_id} />)}

      <div className="flex size-full justify-between gap-4">
        <div className="flex w-1/4 flex-col justify-between p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-8">
              <CircularProgress
                classNames={{
                  svg: 'w-16 h-16 drop-shadow-md',
                  indicator: 'stroke-primary',
                  track: 'stroke-white/10',
                  value: 'text-2xl font-semibold text-primary',
                }}
                formatOptions={{ style: 'decimal' }}
                label="残りの山札枚数"
                maxValue={40}
                minValue={0}
                showValueLabel={true}
                strokeWidth={2}
                value={dataset.remaining_cards}
              />
              <CircularProgress
                classNames={{
                  svg: 'w-16 h-16 drop-shadow-md',
                  indicator: 'stroke-primary',
                  track: 'stroke-white/10',
                  value: 'text-2xl font-semibold text-primary',
                }}
                formatOptions={{ style: 'decimal' }}
                label="ヒントトークン"
                maxValue={TEACH_TOKEN}
                minValue={0}
                showValueLabel={true}
                strokeWidth={2}
                value={dataset.teach_token}
              />
            </div>
            <div className="flex gap-8">
              <CircularProgress
                classNames={{
                  svg: 'w-16 h-16 drop-shadow-md',
                  indicator: 'stroke-warning',
                  track: 'stroke-white/10',
                  value: 'text-2xl font-semibold text-warning',
                }}
                formatOptions={{ style: 'decimal' }}
                label="ミストークン"
                maxValue={MISS_TOKEN}
                minValue={0}
                showValueLabel={true}
                strokeWidth={2}
                value={dataset.mistake_token}
              />
              <CircularProgress
                classNames={{
                  svg: 'w-16 h-16 drop-shadow-md',
                  indicator: 'stroke-success',
                  track: 'stroke-white/10',
                  value: 'text-2xl font-semibold text-success',
                }}
                formatOptions={{ style: 'decimal' }}
                label="現在の合計点数"
                maxValue={25}
                minValue={0}
                showValueLabel={true}
                strokeWidth={2}
                value={dataset.field_cards.reduce((sum: number, card: { number: number }) => sum + card.number, 0)}
              />
            </div>
            <Timer
              disabled={!isPlayer || dataset.is_finished}
              opponent_hand={dataset.opponent_hand}
              player_id={player_id}
              room_id={room_id}
              teach_token={dataset.teach_token}
            />
          </div>
          <TrashTable trash_table={dataset.trash_table} />
        </div>
        <div className="flex flex-1 flex-col justify-between py-2">
          <div className="flex w-full justify-between px-4">
            {dataset.opponent_hand.map((card: { color: Color; number: CardNumber }, index: number) => (
              <Card color={card.color} hint={dataset.opponent_info[index]} key={index} number={card.number} />
            ))}
          </div>
          <div className="flex w-full justify-between rounded-md bg-yellow-600/60 p-4">
            {dataset.field_cards.map((card: { color: Color; number: CardNumber }, index: number) => (
              <Card color={card.color} key={index} number={card.number} />
            ))}
          </div>
          <div className="flex w-full justify-between px-4">
            {dataset.player_info.map((card: { color: Color; number: CardNumber }, index: number) => (
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
          <Message isFinished={dataset.is_finished} isPlayer={isPlayer} />
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
