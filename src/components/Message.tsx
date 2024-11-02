export default function Message({ isPlayer, isFinished }: { isPlayer: boolean; isFinished: boolean }) {
  const message = isFinished
    ? 'ゲームが終了しました。'
    : isPlayer
      ? 'あなたのターンです！'
      : '相手のターンを待っています。。。';

  const color = isPlayer
    ? 'border-blue-500 bg-blue-50 text-blue-500'
    : 'border-yellow-500 bg-yellow-50 text-yellow-500';

  return (
    <div className={`flex rounded-md border-2 p-4 text-sm ${color}`}>
      <svg
        className="mr-2 size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <div>{message}</div>
    </div>
  );
}
