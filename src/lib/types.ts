export type Color = 'red' | 'blue' | 'green' | 'yellow' | 'white';

export type Number = 0 | 1 | 2 | 3 | 4 | 5;

export type Rooms = {
  room_id: number;
  is_finished: boolean;
}[];

type Card = {
  color: Color;
  number: Number;
};

type History = {
  message: string;
  player_id: number;
};

export type Dataset = {
  teach_token: number;
  mistake_token: number;
  field_cards: Card[];
  opponent_hand: Card[];
  opponent_info: Card[];
  player_hand: Card[];
  player_info: Card[];
  remaining_cards: number;
  history: History[];
  trash_table: Record<Color, Number[]>;
  current_player: 0 | 1;
  is_finished: boolean;
};

export type TotalDataset = {
  room_id: number;
  is_finished: boolean;
  total_points: number;
  teach_token: number;
  mistake_token: number;
  deck_number: number;
  remaining_cards: number;
  playing_card_hint: number[];
  history: History[];
  elapsed_times: {
    elapsed_time: number;
    player_id: number;
  }[];
  agent_action_types: number[];
};
