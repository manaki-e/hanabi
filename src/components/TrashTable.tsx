'use client';

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table';

import { Color } from '@/lib/types';

export default function TrashTable({ trash_table }: { trash_table: Record<Color, number[]> }) {
  const getCellValue = (array: number[], index: number) => (index < array.length ? array[index] : 0);

  return (
    <Table aria-label="Example static collection table" classNames={{ base: 'text-xs' }} layout="fixed">
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
            <TableCell className="text-blue-500">{getCellValue(trash_table.blue, rowIndex)}</TableCell>
            <TableCell className="text-green-500">{getCellValue(trash_table.green, rowIndex)}</TableCell>
            <TableCell className="text-red-500">{getCellValue(trash_table.red, rowIndex)}</TableCell>
            <TableCell className="text-gray-500">{getCellValue(trash_table.white, rowIndex)}</TableCell>
            <TableCell className="text-yellow-500">{getCellValue(trash_table.yellow, rowIndex)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
