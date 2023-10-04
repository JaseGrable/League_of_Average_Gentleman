import { useState, useEffect } from 'react';

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
                {/* Display matchup information as needed */}
                {/* Example: Team {matchup.roster_id} vs. Team {matchup.opponent_roster_id} */}
                <p>Team {matchup.roster_id} vs. Team {matchup.opponent_roster_id}</p>
              </li>
            ))}
          </ul>
          {leagueDTO && (
            <div>
              {/* Use leagueDTO data here */}
              <h3>League Information</h3>
              <p>League ID: {leagueDTO.leagueId}</p>
              <p>Total Rosters: {leagueDTO.totalRosters}</p>
              {/* Add more leagueDTO properties as needed */}
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
