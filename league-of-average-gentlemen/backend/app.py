from sleeper_wrapper import League
from sleeper_wrapper import User
from flask import Flask, jsonify, request

app = Flask(__name__)

# Function to get username by roster_id


def get_username(roster_id, users):
    user = next(
        (user for user in users if user.metadata.roster_id == roster_id), None)
    return user.display_name if user else 'Unknown User'

# You need to implement the logic to calculate the current week


def calculate_current_week():
    # Implement your logic to calculate the current week here
    # This might involve fetching data from your data source or another method
    current_week = 1  # Replace with the actual current week
    return current_week

# This is a new route to fetch roster data


@app.route('/api/league/<string:league_id>/rosters', methods=['GET'])
def get_roster_data(league_id):
    try:
        # Initialize the League object with the provided league_id
        league = League(league_id)

        # Fetch the rosters data
        rosters = league.get_rosters()

        # Fetch the users data for mapping owner_id to user_id
        users = league.get_users()

        # Create a list to store the roster data with user_id
        roster_data = []
        for roster in rosters:
            owner_id = roster.owner_id
            user = next(
                (user for user in users if user.user_id == owner_id), None)
            user_id = user.user_id if user else None
            roster_data.append({
                'roster_id': roster.roster_id,
                'user_id': user_id,
            })

        return jsonify(roster_data)
    except Exception as e:
        # Return an error response with status code 500
        return jsonify({'error': str(e)}), 500


@app.route('/api/league/<string:league_id>', methods=['GET'])
def get_league_data(league_id):
    try:
        # Initialize the League object with the provided league_id
        league = League(league_id)

        # Fetch the standings data
        users = league.get_users()
        rosters = league.get_rosters()
        standings = league.get_standings(rosters, users)

        # Process the standings data into the desired format
        formatted_standings = []
        for username, number_of_wins, number_of_losses, total_points in standings:
            formatted_standings.append({
                'username': username,
                'number_of_wins': number_of_wins,
                'number_of_losses': number_of_losses,
                'total_points': total_points
            })

        # Create a dictionary to include both users and formatted standings
        league_data = {
            'users': users,
            'standings': formatted_standings
        }

        return jsonify(league_data)
    except Exception as e:
        # Return an error response with status code 500
        return jsonify({'error': str(e)}), 500


@app.route('/api/league/<string:league_id>/matchups/current_week', methods=['GET'])
def get_current_week_matchups(league_id):
    try:
        # Fetch the current week using the calculate_current_week function
        current_week = calculate_current_week()

        # Initialize the League object with the provided league_id
        league = League(league_id)

        # Fetch the matchups for the current week
        matchups = league.get_matchups(current_week)

        return jsonify(matchups)
    except Exception as e:
        # Return an error response with status code 500
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
