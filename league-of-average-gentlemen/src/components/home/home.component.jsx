import React, { useState, useEffect } from 'react';

const Home = () => {
  const [leagueID, setLeagueID] = useState(null);
  const [leagueData, setLeagueData] = useState(null);
  const [users, setUsers] = useState([]);
  const apiUrl = `https://api.sleeper.app/v1/league/${leagueID}`;

  useEffect(() => {
    setLeagueID("917997436273356800");
  }, []);

  useEffect(() => {
    if (leagueID) {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setLeagueData(data))
        .catch((error) => console.error('Error fetching league data:', error));

      // Fetch list of users in the league
      fetch(`${apiUrl}/users`)
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [leagueID, apiUrl]);

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <p>This is the home page content.</p>
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
              <li key={user.user_id}>{user.display_name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;