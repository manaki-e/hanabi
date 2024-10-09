from flask import jsonify

from api.models.card import Card
from api.models.deck import Deck
from api.models.trash_card import TrashCard
from api.core.config import colors, teach_token, mistake_token


# * ゲームのクラス
class Game:
    def __init__(self):
        # デッキを作成してシャッフル
        self.deck = Deck()
        self.deck.shuffle()

        # フィールドを作成
        self.field = [Card(color, 0) for color in colors]

        # トークンを設定
        self.teach_token = teach_token
        self.mistake_token = mistake_token

        self.current_player = 0
        self.is_finished = 2

        # 履歴
        self.history = []

        # 捨てられたカード
        self.trash_cards = TrashCard()

    def switch_turn(self):
        self.current_player = 1 - self.current_player

    def check_finished(self):
        return self.mistake_token == 0 or self.is_finished == 0

    def draw(self):
        return self.deck.draw()

    def play(self, card):
        for field_card in self.field:
            if field_card.color == card.color:
                if abs(card.number - field_card.number) == 1:
                    field_card.number = card.number
                    if card.number == 5:
                        self.teach_token += 1
                    return "カードを場に出すことに成功しました！"

        self.mistake_token -= 1
        return "カードを場に出すことに失敗しました！"

    def trash(self, card):
        self.trash_cards.add(card)
        self.teach_token += 1
        return f"「{card.color} - {card.number}」のカードを捨てました！"

    def teach(self, opponent, color=None, number=None):
        self.teach_token -= 1
        if color is not None:
            for index, card in enumerate(opponent.hand):
                if card.color == color:
                    opponent.info[index].color = color
        if number is not None:
            for index, card in enumerate(opponent.hand):
                if card.number == number:
                    opponent.info[index].number = number

    def add_history(self, message, player_id):
        self.history.append({"message": message, "player_id": player_id})

    def return_data(self, message, player, opponent):
        return jsonify(
            {
                "message": message,
                "teach_token": self.teach_token,
                "mistake_token": self.mistake_token,
                "field_cards": [card.to_dict() for card in self.field],
                "opponent_hand": [card.to_dict() for card in opponent.hand],
                "player_hand": [card.to_dict() for card in player.hand],
                "player_info": [card.to_dict() for card in player.info],
                "remaining_cards": len(self.deck.cards),
                "history": self.history,
                "trash_cards": self.trash_cards.to_dict(),
                "current_player": self.current_player,
            }
        )
