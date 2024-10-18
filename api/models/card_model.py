from api.core.config import colors, card_numbers


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
