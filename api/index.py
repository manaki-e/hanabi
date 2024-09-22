from flask import Flask, jsonify, request
from flask_cors import CORS
from api.hanabi import Game, Player
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()
APP_URL = os.getenv("APP_URL")
CORS(app, resources={r"/*": {"origins": APP_URL}})

games = {}
players = {}


@app.route("/api/<room_id>/<player_id>", methods=["GET", "POST"])
def index(room_id, player_id):

    # * ルーティング変数の取得
    room_id = int(room_id)
    player_id = int(player_id)

    # * ゲームの取得または新規作成
    if room_id not in games:
        games[room_id] = Game()
        players[room_id] = {
            0: Player("Player1", [games[room_id].draw() for _ in range(5)]),
            1: Player("Player2", [games[room_id].draw() for _ in range(5)]),
        }

    game = games[room_id]
    player = players[room_id][player_id]
    opponent = players[room_id][1 - player_id]

    #  * ゲームが終了している場合
    if game.check_finished():
        message = "ゲームが終了しました。現在の合計点数を確認してください。"
        game.add_history(message, player_id)
        return game.return_data(message, player, opponent)

    message = (
        player_id == game.current_player
        and "あなたのターンです。ヒントを与えるか、カードを場に出すまたは捨てることができます。"
        or "相手のターンを待っています。"
    )

    # * ゲームの実行処理
    if request.method == "POST":

        if player_id != game.current_player:
            game.add_history("相手のターンです。", player_id)
            return game.return_data(message, player, opponent)

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
                # * トークンが最大の場合は捨てることができない
                if game.teach_token == 8:
                    game.add_history(
                        "トークンが最大なので捨てることができません。ヒントを与えるか、カードを場に出すことができます。",
                        player_id,
                    )
                    return game.return_data(message, player, opponent)
                game.add_history(game.trash(card), player_id)

            # * 手札の更新
            player.discard(index)
            player.add(game.deck.draw())

        elif form_id == "hint":
            if request.form.get("teach") == "color":
                color = request.form.get("color")
                game.teach(opponent, color=color)
                game.add_history(
                    f"{color}色のカードについて、ヒントを伝えました", player_id
                )
            else:
                number = int(request.form.get("number"))
                game.teach(opponent, number=number)
                game.add_history(
                    f"{number}のカードについて、ヒントを伝えました", player_id
                )

        # * ターンの切り替え
        game.switch_turn()

    return game.return_data(message, player, opponent)


if __name__ == "__main__":
    app.run(debug=True)
