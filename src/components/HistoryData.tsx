'use client';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';

export default function HistoryData({
  history,
  elapsed_times,
  agent_action_types,
}: {
  history: {
    message: string;
    player_id: number;
  }[];
  elapsed_times: {
    elapsed_time: number;
    player_id: number;
  }[];
  agent_action_types: number[];
}) {
  return (
    <Table aria-label="Example static collection table" isHeaderSticky isStriped>
      <TableHeader>
        <TableColumn align="center">プレイヤー</TableColumn>
        <TableColumn>行動履歴</TableColumn>
        <TableColumn align="end">思考時間</TableColumn>
        <TableColumn align="center">エージェント行動タイプ</TableColumn>
      </TableHeader>
      <TableBody>
        {history.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.player_id === 0 ? '先攻' : '後攻'}</TableCell>
            <TableCell>{row.message}</TableCell>
            <TableCell>{elapsed_times[index]?.elapsed_time}</TableCell>
            <TableCell>{agent_action_types[(index - 1) / 2]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
