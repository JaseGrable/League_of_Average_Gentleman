import { useState, useEffect } from 'react';
import LeagueDTO from '../league-data/league-DTO';

const Matchups = ({ leagueID, week, leagueDTO }) => {
  const [matchupsData, setMatchupsData] = useState(null);
  const apiUrl = `https://api.sleeper.app/v1/league/${leagueID}/matchups/${week}`;

  useEffect(() => {
    // Fetch the matchups data when the component mounts
    fetchMatchups();

    async function fetchMatchups() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Store the matchups data in state
        setMatchupsData(data);
      } catch (error) {
        console.error('Error fetching matchups data:', error);
      }
    }
  }, [apiUrl]);

  return (
    <div>
      {matchupsData ? (
        <div>
          <h2>Matchups for Week {week}</h2>
          <ul>
            {matchupsData.map((matchup) => (
              <li key={matchup.matchup_id}>
                <p>Team {matchup.roster_id} vs. Team {matchup.roster_id}</p>
              </li>
            ))}
          </ul>
          {leagueDTO && (
            <div>
              <h3>League Information</h3>
              <p>League ID: {leagueDTO.leagueId}</p>
              <p>Total Rosters: {leagueDTO.totalRosters}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Loading matchups data...</p>
      )}
    </div>
  );
};

export default Matchups;
