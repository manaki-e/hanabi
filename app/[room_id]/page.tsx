import { Button } from '@nextui-org/button';
import Link from 'next/link';

export default function Page({ params }: { params: { room_id: string } }) {
  return (
    <div className="flex justify-center align-middle">
      <div className="my-40 flex w-60 flex-col justify-center gap-20 align-middle">
        <Button className="p-0" color="primary" type="button" variant="bordered">
          <Link className="flex size-full items-center justify-center" href={`/${params.room_id}/0`} target="_blank">
            vs 人間（プレイヤー１）
          </Link>
        </Button>
        <Button className="p-0" color="danger" type="button" variant="bordered">
          <Link className="flex size-full items-center justify-center" href={`/${params.room_id}/1`} target="_blank">
            vs人間（プレイヤー２）
          </Link>
        </Button>
        <Button className="p-0" color="warning" type="button" variant="bordered">
          <Link className="flex size-full items-center justify-center" href={`/${params.room_id}/2`} target="_blank">
            vs エージェント
          </Link>
        </Button>
      </div>
    </div>
  );
}
