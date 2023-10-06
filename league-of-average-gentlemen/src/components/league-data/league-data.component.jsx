import { useState, useEffect } from 'react';

const LeagueData = ({ leagueID, welcomeMessage }) => {
  const [leagueData, setLeagueData] = useState(null);
  const [users, setUsers] = useState([]);
  const apiUrl = `https://api.sleeper.app/v1/league/${leagueID}`;

  useEffect(() => {
    if (leagueID) {
      // Fetch league data
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setLeagueData(data);

          // Fetch user data
          fetch(`${apiUrl}/users`)
            .then((response) => response.json())
            .then((userData) => setUsers(userData))
            .catch((error) =>
              console.error('Error fetching user data:', error)
            );
        })
        .catch((error) => console.error('Error fetching league data:', error));
    }
  }, [leagueID, apiUrl]);

  // Function to get team name by user_id
  const getTeamName = (userId) => {
    const user = users.find((user) => user.user_id === userId);
    return user ? user.metadata.team_name || 'Unknown Team' : 'Unknown Team';
  };

  return (
    <div>
      <h2>{welcomeMessage}</h2>
      {leagueData && (
        <div>
          <h3>League Information</h3>
          <p>League Name: {leagueData.name}</p>
        </div>
      )}
      {users.length > 0 && (
        <div>
          <h3>List of Users in the League</h3>
          <ul>
            {users.map((user) => (
              <li key={user.user_id}>
                User: {user.display_name}, Team: {getTeamName(user.user_id)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeagueData;
  