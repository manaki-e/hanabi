from api.core.config import colors


class TrashCard:
    def __init__(self):
        self.cards = {color: [0] * 5 for color in colors}

    def add(self, card):
        self.cards[card.color][card.number - 1] += 1

    def to_dict(self):
        return self.cards

    def get_discardable_cards(self, field_cards):
        discardable_cards = []
        for color, numbers in self.cards.items():
            for index, number in enumerate(numbers):
                if number == card_numbers[index]:
                    discardable_cards.extend(
                        Card(color, i + 1) for i in range(index, len(numbers))
                    )
                    break

        for card in field_cards:
            if card.number == 0:
                continue
            discardable_cards.extend(
                Card(card.color, i + 1) for i in range(card.number)
            )

        return discardable_cards
