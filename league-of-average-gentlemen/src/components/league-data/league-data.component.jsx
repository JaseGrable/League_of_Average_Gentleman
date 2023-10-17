import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCurrentWeek } from '../current-week-provider/current-week-provider';

function LeagueData() {
  const currentWeek = useCurrentWeek();
  const [leagueData, setLeagueData] = useState({ standings: [], users: [], matchups: [] });

  useEffect(() => {
    // Fetch league data, standings, and matchups
    Promise.all([
      fetchLeagueData(),
      fetchStandings(),
      fetchMatchups(currentWeek),
    ]);
  }, [currentWeek]);

  // Function to fetch league data
  async function fetchLeagueData() {
    try {
      const response = await axios.get(`/api/league/917997436273356800`);
      setLeagueData((prevData) => ({
        ...prevData,
        users: response.data.users,
      }));
    } catch (error) {
      console.error('Error fetching league data:', error);
    }
  }

  // Function to fetch standings data
  async function fetchStandings() {
    try {
      const leagueResponse = await axios.get(`/api/league/917997436273356800`);
      const standings = leagueResponse.data.standings;

      setLeagueData((prevData) => ({
        ...prevData,
        standings,
      }));
    } catch (error) {
      console.error('Error fetching standings data:', error);
    }
  }

  // Function to fetch matchups data
  async function fetchMatchups(week) {
    try {
      const response = await axios.get(`/api/league/917997436273356800/matchups/current_week`);
      const matchups = organizeMatchups(response.data, leagueData.users);

      setLeagueData((prevData) => ({
        ...prevData,
        matchups,
      }));
    } catch (error) {
      console.error('Error fetching matchups data:', error);
    }
  }

  // Function to organize matchups data
  function organizeMatchups(data, users) {
    const matchupsByUser = {};

    data.forEach((matchup) => {
      const owner_id = matchup.owner_id;

      // Initialize the user's matchups array
      if (!matchupsByUser[owner_id]) {
        matchupsByUser[owner_id] = {
          owner_id,
          username: getUserNameFromUserId(owner_id, users),
          matchups: [],
        };
      }

      matchupsByUser[owner_id].matchups.push({
        roster_id: matchup.roster_id,
        starters: matchup.starters,
        points: matchup.points,
      });
    });

    // Convert the object of matchups by user into an array
    const matchupsArray = Object.values(matchupsByUser);

    return matchupsArray;
  }

  // Function to get username from user_id
  function getUserNameFromUserId(user_id, users) {
    const user = users.find((user) => user.user_id === user_id);
    return user ? user.username : 'Unknown User';
  }

  // Log the league name once it's set
  useEffect(() => {
    console.log(leagueData.leagueName);
  }, [leagueData.leagueName]);

  return (
    <div>
      <h1>The League of Average Gentlemen</h1>
      <h2>Current Week: {currentWeek}</h2>

      <h2>Standings</h2>
      {leagueData.standings.length > 0 ? (
        <ul>
          {leagueData.standings.map((standing, index) => (
            <li key={index}>
              <strong>Username:</strong> {standing.username},{' '}
              <strong>Wins:</strong> {standing.number_of_wins},{' '}
              <strong>Losses:</strong> {standing.number_of_losses},{' '}
              <strong>Total Points:</strong> {standing.total_points}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading standings...</p>
      )}

      <h2>Matchups</h2>
      {leagueData.matchups && leagueData.matchups.length > 0 ? (
        <ul>
          {leagueData.matchups.map((matchupPair, index) => (
            <li key={index}>
              <strong>Matchup {index + 1}:</strong>
              {matchupPair.matchups.map((matchup) => (
                <div key={matchup.roster_id}>
                  <p>
                    <strong>Roster ID:</strong> {matchup.roster_id},{' '}
                    <strong>Starters:</strong> {matchup.starters.join(', ')},{' '}
                    <strong>Total Points:</strong> {matchup.points}
                  </p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading matchups...</p>
      )}
    </div>
  );
}

export default LeagueData;





















