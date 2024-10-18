import random

# * カードの色
colors = ["blue", "green", "red", "white", "yellow"]
# * カードの枚数
card_numbers = [3, 2, 2, 2, 1]
# * 教えることができる回数
teach_token = 8
# * 間違えられる回数
mistake_token = 3


class Game:
    def __init__(self):
        self.field_cards = [Card(color, 0) for color in colors]
        self.trash_table = TrashTable()

    def get_discardable_cards(self):
        """
        _summary_
            捨てられたカードと場にあるカードから、捨てることができるカード一覧を取得する

        Returns:
            _type_: List[Card]
        """
        discardable_cards = []
        for color, numbers in self.trash_table.cards.items():
            for index, number in enumerate(numbers):
                if number == card_numbers[index]:
                    discardable_cards.extend(
                        Card(color, i + 1) for i in range(index, len(numbers))
                    )
                    break

        for card in self.field_cards:
            if card.number == 0:
                continue
            discardable_cards.extend(
                Card(card.color, i + 1) for i in range(card.number)
            )

        return discardable_cards


class Card:
    def __init__(self, color=None, number=None):
        self.color = color
        self.number = number

    def __str__(self):
        return f"{self.color} - {self.number}"

    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    def __hash__(self):
        return hash((self.color, self.number))

    def to_dict(self):
        return {"color": self.color, "number": self.number}


class TrashTable:
    def __init__(self):
        self.cards = {color: [0] * 5 for color in colors}

    def add(self, card):
        self.cards[card.color][card.number - 1] += 1

    def to_dict(self):
        return self.cards


class Player:
    def __init__(self, first_hand):
        self.hand = first_hand
        self.info = [Card(None, None) for _ in range(5)]

    def add(self, card):
        self.hand.append(card)
        self.info.append(Card(None, None))

    def discard(self, index):
        self.hand.pop(index)
        self.info.pop(index)

    def get_info(self, color=None, number=None):
        for index, card in enumerate(self.hand):
            if card.color == color:
                self.info[index].color = color
            if card.number == number:
                self.info[index].number = number


class Agent:
    def __init__(self, first_hand):
        self.hand = first_hand
        self.info = [CardModel() for _ in range(5)]

    def add(self, card):
        self.hand.append(card)
        self.info.append(CardModel())

    def discard(self, index):
        self.hand.pop(index)
        self.info.pop(index)

    def get_info(self, color=None, number=None):
        if color is not None:
            for index, card in enumerate(self.hand):
                if card.color == color:
                    for color_variant in colors:
                        if color_variant != color:
                            self.info[index].cards[color_variant] = [0] * 5
                else:
                    self.info[index].cards[color] = [0] * 5
        if number is not None:
            for index, card in enumerate(self.hand):
                if card.number == number:
                    for color_variant in colors:
                        for i in range(5):
                            if i != number - 1:
                                self.info[index].cards[color_variant][i] = 0
                else:
                    for color_variant in colors:
                        self.info[index].cards[color_variant][number - 1] = 0

    def check_playable(self, field_cards):
        """
        _summary_
            プレイ可能なカードがあるかどうかをチェックする

        Returns
            __type__ : int
        """
        for index, card_model in enumerate(self.info):
            possible_cards = card_model.get_possible_cards()
            if set(
                [
                    Card(color, number)
                    for color, numbers in possible_cards.items()
                    for number in numbers
                ]
            ).issubset(field_cards):
                return index
        return None

    def check_opponent_playable(self, opponent_hand, field_cards):
        """
        _summary_
            相手の手札に対してプレイ可能なカードがあるかどうかをチェックする

        Returns
            __type__ : list[bool]
        """
        playable_cards = []
        for index, card in enumerate(opponent_hand):
            if Card(card.color, card.number - 1) in field_cards:
                playable_cards.append(True)
            else:
                playable_cards.append(False)
        return playable_cards

    def check_discardable(self, discardable_cards):
        """
        _summary_
            プレイ可能なカードがあるかどうかをチェックする

        Returns
            __type__ : int
        """
        for index, card_model in enumerate(self.info):
            possible_cards = card_model.get_possible_cards()
            if set(
                [
                    Card(color, number + 1)
                    for color, numbers in possible_cards.items()
                    for number in numbers
                ]
            ).issubset(discardable_cards):
                return index
        return None

    def teach_hint(self, playable_cards, opponent_hand):
        """
        _summary_
            相手がプレイ可能なカードを持っているときに、色または数字のヒントを与える

        Returns
            __type__ : str, int
        """
        teach_color = None
        teach_number = None
        teachable_colors = {card.color for card in opponent_hand}
        teachable_numbers = {card.number for card in opponent_hand}
        max_probability = 0
        for color in teachable_colors:
            probability_list = [
                playable_cards[i]
                for i, card in enumerate(opponent_hand)
                if card.color == color
            ]
            if probability_list:
                if (sum(probability_list) / len(probability_list)) > max_probability:
                    max_probability = sum(probability_list) / len(probability_list)
                    teach_number = None
                    teach_color = color
        for number in teachable_numbers:
            probability_list = [
                playable_cards[i]
                for i, card in enumerate(opponent_hand)
                if card.number == number
            ]
            if probability_list:
                if (sum(probability_list) / len(probability_list)) > max_probability:
                    max_probability = sum(probability_list) / len(probability_list)
                    teach_number = number
                    teach_color = None
        return teach_color, teach_number

    def teach_random_hint(self, opponent_hand):
        """
        _summary_
            相手にランダムなヒントを与える

        Returns
            __type__ : str, int
        """
        teachable_colors = {card.color for card in opponent_hand}
        teachable_numbers = {card.number for card in opponent_hand}
        if random.choice([True, False]):
            return (random.choice(list(teachable_colors)), None)
        else:
            return (None, random.choice(list(teachable_numbers)))

    def random_discard(self):
        """
        _summary_
            ヒントの与えられていないランダムなカードを捨てる

        Returns
            __type__ : int
        """
        for index, card_model in enumerate(self.info):
            if card_model == CardModel():
                return index
        return random.choice(range(len(self.hand)))


class CardModel:
    def __init__(self):
        self.cards = {color: list(card_numbers) for color in colors}

    def __eq__(self, other):
        return self.cards == other.cards

    def __hash__(self):
        return hash(tuple(self.cards.items()))

    def get_possible_cards(self):
        """
        _summary_
            カードモデルから、そのカードがあり得るカードの組み合わせを取得する

        Returns:
            _type_: dict[str, list[int]]
        """
        return {
            color: [i for i, x in enumerate(values) if x != 0]
            for color, values in self.cards.items()
            if any(x != 0 for x in values)
        }


# * テスト(事前準備)
game = Game()
game.trash_table.add(Card("red", 2))
game.trash_table.add(Card("red", 2))
agent = Agent(
    [Card("red", 1), Card("red", 2), Card("red", 3), Card("red", 4), Card("red", 5)],
)
game.field_cards = [
    Card("red", 1),
    Card("white", 0),
    Card("blue", 0),
    Card("green", 0),
    Card("yellow", 2),
]

# * テスト①：プレイ可能なカードがあるかどうかをチェックする
# このカードを出すことがはできない
agent.info[0].cards = {
    "red": [0, 0, 0, 0, 0],
    "white": [3, 0, 0, 0, 0],
    "blue": [3, 0, 0, 0, 0],
    "green": [0, 0, 0, 0, 0],
    "yellow": [0, 0, 0, 1, 0],
}
# このカードを出すことはできる
agent.info[1].cards = {
    "red": [0, 0, 0, 0, 0],
    "white": [3, 0, 0, 0, 0],
    "blue": [3, 0, 0, 0, 0],
    "green": [0, 0, 0, 0, 0],
    "yellow": [0, 0, 0, 0, 0],
}
print(agent.check_playable(game.field_cards))

# * テスト②：破棄可能なカードがあるかどうかをチェックする
# すでに捨てられたカード以上のカードしかないので捨てることができる
agent.info[2].cards = {
    "red": [0, 0, 2, 2, 1],
    "white": [0, 0, 0, 0, 0],
    "blue": [0, 0, 0, 0, 0],
    "green": [0, 0, 0, 0, 0],
    "yellow": [0, 0, 0, 0, 0],
}
# すでにfieldに出されているカードの可能性しかないので捨てることができる
agent.info[3].cards = {
    "red": [3, 0, 0, 0, 0],
    "white": [0, 0, 0, 0, 0],
    "blue": [0, 0, 0, 0, 0],
    "green": [0, 0, 0, 0, 0],
    "yellow": [1, 2, 0, 0, 0],
}
print(agent.check_discardable(game.get_discardable_cards()))

# * テスト③：相手の手札に対してプレイ可能なカードがあるかどうかをチェックする
player = Player(
    [
        Card("blue", 1),
        Card("blue", 2),
        Card("blue", 3),
        Card("blue", 4),
        Card("yellow", 3),
    ]
)
print(agent.check_opponent_playable(player.hand, game.field_cards))

# * テスト③-1：相手がプレイ可能なカードを持っていたら、色または数字のヒントを与える
print(
    agent.teach_hint(
        agent.check_opponent_playable(player.hand, game.field_cards), player.hand
    )
)

# * テスト④：相手がプレイ可能なカードを持っていなかったら、ランダムにヒントを与える
print(agent.teach_random_hint(player.hand))

# * テスト⑤：ヒントの与えられていないランダムなカードを捨てる
print(agent.random_discard())
