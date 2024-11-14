'use client';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';

export default function HistoryData({
  history,
  elapsed_times,
  agent_action_types,
  playing_card_hint,
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
  playing_card_hint: number[];
}) {
  let playing_card_hint_index = 0;
  return (
    <Table aria-label="Example static collection table" isHeaderSticky isStriped>
      <TableHeader>
        <TableColumn align="center">プレイヤー</TableColumn>
        <TableColumn>行動履歴</TableColumn>
        <TableColumn align="end">思考時間</TableColumn>
        <TableColumn align="center">プレイ時のヒント判明数</TableColumn>
        <TableColumn align="center">エージェント行動タイプ</TableColumn>
      </TableHeader>
      <TableBody>
        {history.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.player_id === 0 ? '先攻' : '後攻'}</TableCell>
            <TableCell>{row.message}</TableCell>
            <TableCell>{elapsed_times[index]?.elapsed_time}</TableCell>
            <TableCell>
              {row.message.includes('プレイ') ? playing_card_hint[playing_card_hint_index++] : null}
            </TableCell>
            <TableCell>{agent_action_types[(index - 1) / 2]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
