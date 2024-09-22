"use client";

import { Color } from "@/lib/types";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";

export default function TrashTable({ trash_cards }: { trash_cards: Record<Color, number[]> }) {
  const getCellValue = (array: number[], index: number) =>
    index < array.length ? array[index] : 0;

  return (
    <Table
      aria-label="Example static collection table"
      classNames={{ base: "text-xs" }}
      layout="fixed"
    >
      <TableHeader>
        <TableColumn align="center" children={undefined} className="w-8"></TableColumn>
        <TableColumn align="center" className="text-blue-500">
          B
        </TableColumn>
        <TableColumn align="center" className="text-green-500">
          G
        </TableColumn>
        <TableColumn align="center" className="text-red-500">
          R
        </TableColumn>
        <TableColumn align="center" className="text-gray-500">
          W
        </TableColumn>
        <TableColumn align="center" className="text-yellow-500">
          Y
        </TableColumn>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCell>{rowIndex + 1}</TableCell>
            <TableCell className="text-blue-500">
              {getCellValue(trash_cards.blue, rowIndex)}
            </TableCell>
            <TableCell className="text-green-500">
              {getCellValue(trash_cards.green, rowIndex)}
            </TableCell>
            <TableCell className="text-red-500">
              {getCellValue(trash_cards.red, rowIndex)}
            </TableCell>
            <TableCell className="text-gray-500">
              {getCellValue(trash_cards.white, rowIndex)}
            </TableCell>
            <TableCell className="text-yellow-500">
              {getCellValue(trash_cards.yellow, rowIndex)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
