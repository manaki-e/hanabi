import random

from flask import jsonify

# * カードの色
colors = ["blue", "green", "red", "white", "yellow"]
# * カードの枚数
card_numbers = [3, 2, 2, 2, 1]
# * 教えることができる回数
teach_token = 8
# * 間違えられる回数
mistake_token = 3


# * カードのクラス
class Card:
    def __init__(self, color=None, number=None):
        self.color = color
        self.number = number

    def __str__(self):
        return f"{self.color} - {self.number}"

    def to_dict(self):
        return {"color": self.color, "number": self.number}


# * プレイヤーのクラス
class Player:
    def __init__(self, name, first_hand):
        self.name = name
        self.hand = first_hand
        self.info = [Card(None, None) for _ in range(5)]

    def __str__(self):
        return "\n".join([f"{hand.color}&{hand.number}" for hand in self.hand])

    def add(self, card):
        self.hand.append(card)
        self.info.append(Card(None, None))

    def discard(self, index):
        self.hand.pop(index)
        self.info.pop(index)

    def get_info(self, indexes, color=None, number=None):
        for index in indexes:
            self.info[index].color = color
            self.info[index].number = number


# * デッキのクラス
class Deck:
    def __init__(self):
        self.cards = []
        for i in range(len(colors)):
            for j in range(5):
                for k in range(card_numbers[j]):
                    self.cards.append(Card(colors[i], j + 1))

    def __str__(self):
        return "\n".join([f"{card.color} - {card.number}" for card in self.cards])

    def shuffle(self):
        random.shuffle(self.cards)

    def draw(self):
        return self.cards.pop()


# * 捨て場のクラス
class TrashCard:
    def __init__(self):
        self.cards = {color: [0] * 5 for color in colors}

    def add(self, card):
        self.cards[card.color][card.number - 1] += 1

    def to_dict(self):
        return self.cards


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
