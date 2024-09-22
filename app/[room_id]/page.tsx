import { Button } from "@nextui-org/button";
import Link from "next/link";

export default async function Page({ params }: { params: { room_id: string } }) {
  return (
    <div className="flex justify-center align-middle">
      <div className="flex flex-col gap-20 justify-center align-middle w-40 my-40">
        <Button variant="bordered" color="primary" type="button">
          <Link href={`http://localhost:3000/${params.room_id}/0`}>プレイヤー１</Link>
        </Button>
        <Button variant="bordered" color="danger" type="button">
          <Link href={`http://localhost:3000/${params.room_id}/1`}>プレイヤー２</Link>
        </Button>
      </div>
    </div>
  );
}
