'use client';

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table';

import { CARD_NUMBERS } from '@/lib/constant';
import { Color } from '@/lib/types';

export default function TrashTable({ trash_table }: { trash_table: Record<Color, number[]> }) {
  const getCellValue = (array: number[], index: number) => {
    const current = index < array.length ? array[index] : 0;
    const total = CARD_NUMBERS[index];

    return (
      <>
        <span className="text-sm font-bold">{current}</span>/{total}
      </>
    );
  };

  return (
    <Table aria-label="Example static collection table text-xs" layout="fixed">
      <TableHeader>
        <TableColumn align="center" className="w-8">
          {null}
        </TableColumn>
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
            <TableCell className="text-xs text-blue-500">{getCellValue(trash_table.blue, rowIndex)}</TableCell>
            <TableCell className="text-xs text-green-500">{getCellValue(trash_table.green, rowIndex)}</TableCell>
            <TableCell className="text-xs text-red-500">{getCellValue(trash_table.red, rowIndex)}</TableCell>
            <TableCell className="text-xs text-gray-500">{getCellValue(trash_table.white, rowIndex)}</TableCell>
            <TableCell className="text-xs text-yellow-500">{getCellValue(trash_table.yellow, rowIndex)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
