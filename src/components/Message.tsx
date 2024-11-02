export default function Message({ isPlayer, isFinished }: { isPlayer: boolean; isFinished: boolean }) {
  const message = isFinished
    ? 'ゲームが終了しました。現在の合計点数を確認してください。'
    : isPlayer
      ? 'あなたのターンです！'
      : '相手のターンを待っています。。。';

  const color = isPlayer
    ? 'border-blue-500 bg-blue-50 text-blue-500'
    : 'border-yellow-500 bg-yellow-50 text-yellow-500';

  return (
    <div className={`flex rounded-md border-2 p-4 text-sm ${color}`}>
      <div>{message}</div>
    </div>
  );
}
