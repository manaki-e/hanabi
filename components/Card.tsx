import Hanabi from "@/components/Hanabi";
import { Color } from "@/lib/types";

export default function Card({ color, number }: { color?: Color; number?: number }) {
  const text_color =
    color === "red"
      ? "text-red-500"
      : color === "green"
      ? "text-green-500"
      : color === "yellow"
      ? "text-yellow-500"
      : color === "white"
      ? "text-white"
      : color === "blue"
      ? "text-blue-500"
      : "text-gray-500";

  return (
    <div className="w-28 border border-gray-600 align-middle text-center rounded-xl bg-gray-700 flex justify-between flex-col">
      <Hanabi color={text_color}></Hanabi>
      <p className={`${text_color} font-mono text-3xl py-2`}>{number ?? "?"}</p>
    </div>
  );
}
