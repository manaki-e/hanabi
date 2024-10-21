import { Divider } from '@nextui-org/divider';
import { Slider } from '@nextui-org/slider';

import ActionHistory from '@/components/ActionHistory';
import ActionSelect from '@/components/ActionSelect';
import Card from '@/components/Card';
import Message from '@/components/Message';
import TeachSelect from '@/components/TeachSelect';
import Timer from '@/components/Timer';
import TrashTable from '@/components/TrashTable';
import AutoReload from '@/components/function/AutoReload';

import { MISS_TOKEN, TEACH_TOKEN } from '@/lib/constant';
import { Color, Dataset } from '@/lib/types';

export default async function Page({ params }: { params: { room_id: string; player_id: string } }) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${params.room_id}/${params.player_id}`, {
    method: 'GET',
    cache: 'no-cache',
  });
  const dataset: Dataset = (await data.json()) as Dataset;

  const isPlayer = dataset.current_player === Number(params.player_id) % 2;
  const isTimer = Number(params.room_id) % 2 === 1;

  return (
    <>
      {!isPlayer && !dataset.is_finished && <AutoReload />}

      <div className="mx-8 flex gap-8">
        <div className="flex h-16 flex-1 flex-col justify-center align-middle">
          <Message isFinished={dataset.is_finished} isPlayer={isPlayer} />
        </div>
        {isTimer && (
          <Timer
            disabled={!isPlayer}
            opponent_hand={dataset.opponent_hand}
            params={params}
            teach_token={dataset.teach_token}
          />
        )}
      </div>

      <div className="flex size-full justify-between gap-4" style={{ height: `calc(100% - 65px)` }}>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div className="">
            <Slider
              className="max-w-md"
              color="primary"
              defaultValue={dataset.remaining_cards}
              isDisabled
              label="残りの山札枚数"
              maxValue={40}
              minValue={0}
              radius="md"
              step={1}
            />
            <Divider className="my-4" />
            <Slider
              className="max-w-md"
              color="primary"
              defaultValue={dataset.teach_token}
              isDisabled
              label="残りのヒントトークン"
              maxValue={TEACH_TOKEN}
              minValue={0}
              radius="md"
              showSteps={true}
              step={1}
            />
            <Divider className="my-4" />
            <Slider
              className="max-w-md"
              color="primary"
              defaultValue={dataset.mistake_token}
              isDisabled
              label="残りのミストークン"
              maxValue={MISS_TOKEN}
              minValue={0}
              radius="md"
              showSteps={true}
              step={1}
            />
            <Divider className="my-4" />
            <Slider
              className="max-w-md"
              color="primary"
              defaultValue={dataset.field_cards.reduce((sum: number, card: { number: number }) => sum + card.number, 0)}
              isDisabled
              label="現在の合計点数"
              maxValue={25}
              minValue={0}
              radius="md"
              showSteps={true}
              step={1}
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
        <div className="flex flex-1 flex-col justify-between pr-4">
          <div className="my-4">
            <TeachSelect
              isPlayer={isPlayer}
              isTimer={isTimer}
              opponent_hand={dataset.opponent_hand}
              params={params}
              teach_token={dataset.teach_token}
            />
          </div>
          <ActionHistory history={dataset.history} params={params} />
          <div className="my-4">
            <ActionSelect isPlayer={isPlayer} isTimer={isTimer} params={params} teach_token={dataset.teach_token} />
          </div>
        </div>
      </div>
    </>
  );
}
