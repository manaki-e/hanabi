export type Color = 'red' | 'blue' | 'green' | 'yellow' | 'white';

export type Number = 0 | 1 | 2 | 3 | 4 | 5;

type Card = {
  color: Color;
  number: Number;
};

export type Dataset = {
  message: string;
  teach_token: number;
  mistake_token: number;
  field_cards: Card[];
  opponent_hand: Card[];
  player_hand: Card[];
  player_info: Card[];
  remaining_cards: number;
  history: {
    message: string;
    player_id: number;
  }[];
  trash_table: Record<Color, number[]>;
  current_player: number;
  is_finished: boolean;
};
