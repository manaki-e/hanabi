import ActionSelect from "@/components/ActionSelect";
import Card from "@/components/Card";
import AutoReload from "@/components/function/AutoReload";
import BanReload from "@/components/function/BanReload";
import Message from "@/components/Message";
import TeachSelect from "@/components/TeachSelect";
import Timer from "@/components/Timer";
import TrashTable from "@/components/TrashTable";
import { MISS_TOKEN, TEACH_TOKEN } from "@/lib/constant";
import { Color } from "@/lib/types";
import { Divider } from "@nextui-org/divider";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Slider } from "@nextui-org/slider";

export default async function Page({ params }: { params: { room_id: string; player_id: string } }) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${params.room_id}/${params.player_id}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  let dataset = await data.json();

  let isPlayer = dataset.current_player === Number(params.player_id);
  let isTimer = Number(params.room_id) % 2 === 1;

  return (
    <>
      {!isPlayer && <AutoReload />}
      {isPlayer && <BanReload />}

      <div className="flex mx-8 gap-8">
        <div className="h-16 flex flex-col justify-center align-middle flex-1">
          <Message message={dataset.message} />
        </div>
        {isTimer && (
          <Timer disabled={!isPlayer} params={params} teach_token={dataset.teach_token} />
        )}
      </div>

      <div
        className="flex gap-4 justify-between w-full h-full"
        style={{ height: `calc(100% - 65px)` }}
      >
        <div className="flex-1 flex justify-between flex-col p-4">
          <div className="">
            <Slider
              color="primary"
              isDisabled
              label="残山札"
              radius="md"
              step={1}
              maxValue={40}
              minValue={0}
              defaultValue={dataset.remaining_cards}
              className="max-w-md"
            />
            <Divider className="my-4" />
            <Slider
              color="primary"
              isDisabled
              label="残Teachトークン"
              radius="md"
              showSteps={true}
              step={1}
              maxValue={TEACH_TOKEN}
              minValue={0}
              defaultValue={dataset.teach_token}
              className="max-w-md"
            />
            <Divider className="my-4" />
            <Slider
              color="primary"
              isDisabled
              label="残Missトークン"
              radius="md"
              showSteps={true}
              step={1}
              maxValue={MISS_TOKEN}
              minValue={0}
              defaultValue={dataset.mistake_token}
              className="max-w-md"
            />
            <Divider className="my-4" />
            <Slider
              color="primary"
              isDisabled
              label="現在の合計点数"
              radius="md"
              showSteps={true}
              step={1}
              maxValue={25}
              minValue={0}
              defaultValue={dataset.field_cards.reduce(
                (sum: number, card: { number: number }) => sum + card.number,
                0
              )}
              className="max-w-md"
            />
          </div>
          <TrashTable trash_cards={dataset.trash_cards} />
        </div>
        <div className="flex flex-col justify-between overflow-hidden">
          <div className="flex gap-4 m-4 overflow-hidden">
            {dataset.opponent_hand.map((card: { color: Color; number: number }, index: number) => (
              <Card key={index} color={card.color} number={card.number} />
            ))}
          </div>
          <div className="flex gap-4 rounded-md bg-yellow-600 bg-opacity-60 p-4">
            {dataset.field_cards.map((card: { color: Color; number: number }, index: number) => (
              <Card key={index} color={card.color} number={card.number} />
            ))}
          </div>
          <div className="flex gap-4 m-4">
            {dataset.player_info.map((card: { color: Color; number: number }, index: number) => (
              <Card key={index} color={card.color} number={card.number} />
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-between flex-col">
          <div className="my-4">
            <TeachSelect
              params={params}
              opponent_hand={dataset.opponent_hand}
              teach_token={dataset.teach_token}
            />
          </div>
          <ScrollShadow className="h-full">
            <div className="text-xs">
              {dataset.history.map(
                (history: { player_id: number; message: string }, index: number) => (
                  <div key={index}>
                    <p>
                      {history.player_id === Number(params.player_id) ? "自分" : "相手"}：
                      {history.message}
                    </p>
                  </div>
                )
              )}
            </div>
          </ScrollShadow>
          <div className="my-4">
            <ActionSelect params={params} />
          </div>
        </div>
      </div>
    </>
  );
}
