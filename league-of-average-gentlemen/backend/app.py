from sleeper_wrapper import League
from flask import Flask, jsonify, request

app = Flask(__name__)

# Function to get username by roster_id


def get_username(roster_id, users):
    user = next(
        (user for user in users if user.metadata.roster_id == roster_id), None)
    return user.display_name if user else 'Unknown User'


@app.route('/api/league/<string:league_id>', methods=['GET'])
def get_league_data(league_id):
    try:
        # Initialize the League object with the provided league_id
        league = League(league_id)

        # Fetch the league data (including users)
        league_data = league.get_users()

        return jsonify(league_data)
    except Exception as e:
        # Return an error response with status code 500
        return jsonify({'error': str(e)}), 500


@app.route('/api/matchups/<string:league_id>/<string:week>', methods=['GET'])
def get_matchups(league_id, week):
    try:
        # Initialize the League object with the provided league_id
        league = League(league_id)

        # Fetch matchups for the specified week
        matchups = league.get_matchups(week)

        users = league.get_users()  # Fetch users to get usernames

        # Create matchup data with usernames
        matchup_data = []
        for matchup in matchups:
            matchup_info = {
                'roster_id1': matchup.roster_id1,
                'roster_id2': matchup.roster_id2,
                'team1_name': get_username(matchup.roster_id1, users),
                'team2_name': get_username(matchup.roster_id2, users),
                'points1': matchup.points1,
                'points2': matchup.points2,
            }
            matchup_data.append(matchup_info)

        return jsonify(matchup_data)
    except Exception as e:
        # Return an error response with status code 500
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
