import { useState, useEffect } from 'react';

const Matchups = ({ leagueID, week }) => {
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
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading matchups data...</p>
      )}
    </div>
  );
};

export default Matchups;
