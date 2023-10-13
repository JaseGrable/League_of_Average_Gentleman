import { useState, useEffect } from 'react';
import { useCurrentWeek } from '../current-week-provider/current-week-provider';

const Matchups = ({ leagueID }) => {
  const [matchupsDTO, setMatchupsDTO] = useState(null);
  const [users, setUsers] = useState([]); // State to store user data
  const currentWeek = useCurrentWeek(); // Use the hook to get the current week
  const apiUrl = `https://api.sleeper.app/v1/league/${leagueID}/matchups/${currentWeek}`;

  // Function to get username by roster_id
  const getUsername = (rosterId) => {
    const user = users.find((user) => user.metadata.roster_id === rosterId);
    return user ? user.display_name : 'Unknown User';
  };

  useEffect(() => {
    // Fetch user data and matchups
    Promise.all([fetchUserdata(), fetchMatchups()]);
  }, [apiUrl, currentWeek]); // Include currentWeek in the dependency array

  async function fetchUserdata() {
    try {
      const response = await fetch(`https://api.sleeper.app/v1/league/${leagueID}/users`);
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async function fetchMatchups() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);

      // Create a map to store unique matchups based on matchup_id
      const uniqueMatchupsMap = new Map();

      // Iterate through matchups and store them in the map
      data.forEach((matchup) => {
        const matchupId = matchup.matchup_id;

        if (!uniqueMatchupsMap.has(matchupId)) {
          uniqueMatchupsMap.set(matchupId, []);
        }

        uniqueMatchupsMap.get(matchupId).push(matchup);
      });

      // Convert the map values back to an array
      const uniqueMatchups = Array.from(uniqueMatchupsMap.values());

      // Store the unique matchups data in state
      setMatchupsDTO(uniqueMatchups.slice(0, 5)); // Limit to the first 5 unique matchups
    } catch (error) {
      console.error('Error fetching matchups data:', error);
    }
  }

  return (
    <div>
      {matchupsDTO ? (
        <div>
          <h2>Matchups for Week {currentWeek}</h2> {/* Display the current week */}
          <ul>
            {matchupsDTO.map((matchupPair, index) => (
              <li key={index}>
                {matchupPair[0] && matchupPair[1] ? (
                  <p>
                    Team {matchupPair[0].roster_id} ({getUsername(matchupPair[0].roster_id)}) vs. Team {matchupPair[1].roster_id} ({getUsername(matchupPair[1].roster_id)})
                  </p>
                ) : (
                  <p>Invalid matchup data</p>
                )}
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
