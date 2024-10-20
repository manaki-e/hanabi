from flask import Flask, jsonify, request
from flask_cors import CORS
from api.hanabi import Game
from api.models.player import Player
from api.models.agent import Agent
from dotenv import load_dotenv
import os, random

app = Flask(__name__)

load_dotenv()
APP_URL = os.getenv("APP_URL")
CORS(app, resources={r"/*": {"origins": APP_URL}})

games = {}
players = {}


@app.route("/api/<room_id>/<player_id>", methods=["GET", "POST"])
def index(room_id, player_id):

    # * VSエージェントまたはVS人間
    isVsAgent = int(player_id) == 2

    # * ルーティング変数の取得
    room_id = int(room_id)
    player_id = int(player_id) % 2

    # * ゲームの取得または新規作成
    if room_id not in games:
        games[room_id] = Game()
        if isVsAgent:
            players[room_id] = {
                0: Player([games[room_id].deck.draw() for _ in range(5)]),
                1: Agent([games[room_id].deck.draw() for _ in range(5)]),
            }
        else:
            players[room_id] = {
                0: Player([games[room_id].deck.draw() for _ in range(5)]),
                1: Player([games[room_id].deck.draw() for _ in range(5)]),
            }

    game = games[room_id]
    player = players[room_id][player_id]
    opponent = players[room_id][1 - player_id]

    #  * ゲームが終了している場合
    if game.check_finished():
        message = "ゲームが終了しました。現在の合計点数を確認してください。"
        return game.return_data(message, player, opponent)

    message = (
        player_id == game.current_player
        and "あなたのターンです。ヒントを与えるか、カードを場に出すまたは捨てることができます。"
        or "相手のターンを待っています。"
    )

    # * ゲームの実行処理
    if request.method == "POST":

        # * 残山札が0の場合
        if len(game.deck.cards) == 0:
            game.is_finished -= 1

        form_id = request.form.get("form_id")

        if form_id == "action":
            index = int(request.form.get("index"))
            action = request.form.get("act")
            card = player.hand[index]

            # * アクション（プレイ / 捨てる）別の行動
            if action == "play":
                game.add_history(game.play(card), player_id)
            elif action == "trash":
                game.add_history(game.trash(card), player_id)

            # * 手札の更新
            player.discard(index)
            if len(game.deck.cards) > 0:
                new_card = game.deck.draw()
                player.add(new_card)
                if isVsAgent:
                    for card_model in opponent.info:
                        card_model.decrement_card(new_card.color, new_card.number - 1)

        elif form_id == "hint":
            game.teach_token -= 1
            if request.form.get("teach") == "color":
                color = request.form.get("color")
                opponent.get_info(color=color)
                game.add_history(
                    f"{color}のカードについて、ヒントを伝えました", player_id
                )
            else:
                number = int(request.form.get("number"))
                opponent.get_info(number=number)
                game.add_history(
                    f"{number}のカードについて、ヒントを伝えました", player_id
                )

        # * ターンの切り替え
        game.switch_turn()
        return game.return_data(message, player, opponent)

    if isVsAgent and game.current_player == 1:

        # * プレイ可能なカードを持っていればプレイする
        if opponent.check_playable(game.field_cards) is not None:
            index = opponent.check_playable(game.field_cards)
            card = opponent.hand[index]
            game.add_history(game.play(card), 1)
            opponent.discard(index)
            if len(game.deck.cards) > 0:
                opponent.add(game.deck.draw())
                opponent.update_first_info(
                    game.trash_table, game.field_cards, player.hand
                )
            if len(game.deck.cards) == 0:
                game.is_finished -= 1
        # * 山札が0の場合はヒントを与えたり捨てたりせずににプレイする
        elif len(game.deck.cards) == 0:
            game.is_finished -= 1
            index = random.randint(0, 4)
            card = opponent.hand[index]
            game.add_history(game.play(card), 1)
            opponent.discard(index)
        # * 破棄可能なカードを持っていば捨てる
        elif opponent.check_discardable(game.get_discardable_cards()) is not None:
            index = opponent.check_discardable(game.get_discardable_cards())
            card = opponent.hand[index]
            game.add_history(game.trash(card), 1)
            opponent.discard(index)
            if len(game.deck.cards) > 0:
                opponent.add(game.deck.draw())
                opponent.update_first_info(
                    game.trash_table, game.field_cards, player.hand
                )
        elif game.teach_token > 0:
            # * 相⼿がプレイ可能なカードを持っていたら、⾊または数字のヒントを与える
            if any(opponent.check_opponent_playable(player.hand, game.field_cards)):
                game.teach_token -= 1
                color, number = opponent.teach_hint(
                    opponent.check_opponent_playable(player.hand, game.field_cards),
                    player.hand,
                )
                player.get_info(color=color, number=number)
                game.add_history(
                    f"{color or number}のカードについて、ヒントを伝えました", 1
                )
            # * 相⼿がプレイ可能なカードを持っていないかつ、残りのヒントトークンが少なければ、ヒントをもらっていないカードからランダムに捨てる
            elif game.teach_token < 3:
                index = opponent.random_discard()
                card = opponent.hand[index]
                game.add_history(game.trash(card), 1)
                opponent.discard(index)
                if len(game.deck.cards) > 0:
                    opponent.add(game.deck.draw())
                    opponent.update_first_info(
                        game.trash_table, game.field_cards, player.hand
                    )
            # * 相⼿がプレイ可能なカードを持っていなかったら、与えてない情報の中からランダムにヒントを与える
            else:
                game.teach_token -= 1
                color, number = opponent.teach_random_hint(player.hand)
                player.get_info(color=color, number=number)
                game.add_history(
                    f"{color or number}のカードについて、ヒントを伝えました", 1
                )
        # * ヒントトークンが残っていなかったら、⾃分のカードからランダムに1枚捨てる
        else:
            index = opponent.random_discard()
            card = opponent.hand[index]
            game.add_history(game.trash(card), 1)
            opponent.discard(index)
            if len(game.deck.cards) > 0:
                opponent.add(game.deck.draw())
                opponent.update_first_info(
                    game.trash_table, game.field_cards, player.hand
                )
        game.switch_turn()
        return game.return_data(message, player, opponent)

    return game.return_data(message, player, opponent)


if __name__ == "__main__":
    app.run(debug=True)
