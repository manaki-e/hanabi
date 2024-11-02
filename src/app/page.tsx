import { Button } from '@nextui-org/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex h-full items-center justify-center">
      <Image alt="hanabi" layout="fill" objectFit={'cover'} sizes="100vw" src="/hanabi.png" />
      <Button as={Link} color="warning" href="/rooms" size="lg" variant="bordered">
        ゲームへ移動
      </Button>
    </div>
  );
}
