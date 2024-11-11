'use client';

import { Chip } from '@nextui-org/chip';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';

import { TotalDataset } from '@/lib/types';

export default function OverviewData({ totalDataset }: { totalDataset: TotalDataset }) {
  return (
    <Table aria-label="Example static collection table" isHeaderSticky>
      <TableHeader>
        <TableColumn align="center">部屋番号</TableColumn>
        <TableColumn align="center">ステータス</TableColumn>
        <TableColumn align="center">デッキ番号</TableColumn>
        <TableColumn align="center">ミストークン</TableColumn>
        <TableColumn align="center">ヒントトークン</TableColumn>
        <TableColumn align="center">合計点数</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{totalDataset.room_id}</TableCell>
          <TableCell>
            {totalDataset.is_finished ? (
              <Chip color="success" variant="bordered">
                終了
              </Chip>
            ) : (
              <Chip color="warning" variant="bordered">
                進行中
              </Chip>
            )}
          </TableCell>
          <TableCell>{totalDataset.deck_number}</TableCell>
          <TableCell>{totalDataset.mistake_token}</TableCell>
          <TableCell>{totalDataset.teach_token}</TableCell>
          <TableCell>{totalDataset.total_points}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
