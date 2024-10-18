import { Button } from "@nextui-org/button";
import Link from "next/link";

export default async function Page({ params }: { params: { room_id: string } }) {
  return (
    <div className="flex justify-center align-middle">
      <div className="flex flex-col gap-20 justify-center align-middle w-60 my-40">
        <Button variant="bordered" color="primary" type="button" className="p-0">
          <Link
            href={`/${params.room_id}/0`}
            target="_blank"
            className="w-full h-full flex justify-center items-center"
          >
            vs 人間（プレイヤー１）
          </Link>
        </Button>
        <Button variant="bordered" color="danger" type="button" className="p-0">
          <Link
            href={`/${params.room_id}/1`}
            target="_blank"
            className="w-full h-full flex justify-center items-center"
          >
            vs人間（プレイヤー２）
          </Link>
        </Button>
        <Button variant="bordered" color="warning" type="button" className="p-0">
          <Link
            href={`/${params.room_id}/2`}
            target="_blank"
            className="w-full h-full flex justify-center items-center"
          >
            vs エージェント
          </Link>
        </Button>
      </div>
    </div>
  );
}
