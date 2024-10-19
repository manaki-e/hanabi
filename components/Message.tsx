export default function Message({ message, isPlayer }: { message: string; isPlayer: boolean }) {
  if (isPlayer) {
    return (
      <div className="flex rounded-md border-2 border-blue-500 bg-blue-50 p-4 text-sm text-blue-500">
        <svg
          className="mr-3 size-5 shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z"
            fillRule="evenodd"
          />
        </svg>
        <div>
          <b className="pr-4">メッセージ: </b>
          {message}
        </div>
      </div>
    );
  }
  return (
    <div className="flex rounded-md border-2 border-yellow-500 bg-yellow-50 p-4 text-sm text-yellow-500">
      <svg className="mr-3 size-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          clipRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
          fillRule="evenodd"
        />
      </svg>
      <div>
        <b className="pr-4">メッセージ: </b>
        {message}
      </div>
    </div>
  );
}
