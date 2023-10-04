import React, { useState, useEffect } from 'react';

const Matchups = ({ leagueID, week }) => {
  const [matchupsDTO, setMatchupsDTO] = useState(null);
  const apiUrl = `https://api.sleeper.app/v1/league/${leagueID}/matchups/${week}`;

  useEffect(() => {
    fetchMatchups();

    async function fetchMatchups() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data)

        // Create a map to store unique matchups based on matchup_id
        const uniqueMatchupsMap = new Map();

        // Iterate through matchups and store them in the map
        data.forEach((matchup) => {
          if (!uniqueMatchupsMap.has(matchup.matchup_id)) {
            uniqueMatchupsMap.set(matchup.matchup_id, matchup);
          }
        });

        // Convert the map values back to an array
        const uniqueMatchups = Array.from(uniqueMatchupsMap.values());

        // Store the unique matchups data in state
        setMatchupsDTO(uniqueMatchups.slice(0, 5)); // Limit to the first 5 unique matchups
      } catch (error) {
        console.error('Error fetching matchups data:', error);
      }
    }
  }, [apiUrl]);

  return (
    <div>
      {matchupsDTO ? (
        <div>
          <h2>Matchups for Week {week}</h2>
          <ul>

            {matchupsDTO.map((matchup) => (
              <li key={matchup.matchup_id}>
                {console.log(matchup)}
                <p>
                  Team {matchup.roster_id} vs. Team {matchup.roster_id}
                </p>
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

