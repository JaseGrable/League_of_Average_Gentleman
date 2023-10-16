from sleeper_wrapper import League
from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/api/league/<string:league_id>', methods=['GET'])
def get_league_data(league_id):
    # Initialize the League object with the provided league_id
    league = League(league_id)

    # Fetch the league data
    league_data = league.get_users()

    return jsonify(league_data)


if __name__ == '__main__':
    app.run(debug=True)
