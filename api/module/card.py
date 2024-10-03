# * カードのクラス
class Card:
    def __init__(self, color=None, number=None):
        self.color = color
        self.number = number

    def __str__(self):
        return f"{self.color} - {self.number}"

    def to_dict(self):
        return {"color": self.color, "number": self.number}
