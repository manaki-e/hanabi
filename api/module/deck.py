import random
from api.module.card import Card
from api.config.constants import colors, card_numbers


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
