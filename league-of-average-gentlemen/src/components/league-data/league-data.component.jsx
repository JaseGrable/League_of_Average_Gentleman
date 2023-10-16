import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LeagueData() {
  const [leagueData, setLeagueData] = useState([]);

  useEffect(() => {
    axios.get(`/api/league/917997436273356800`)
      .then((response) => {
        setLeagueData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>League Data</h1>
      {leagueData.length > 0 ? (
        <ul>
          {leagueData.map((user) => (
            <li key={user.user_id}>
              <strong>Username:</strong> {user.display_name},{' '}
              <strong>Team Name:</strong> {user.metadata.team_name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading league data...</p>
      )}
    </div>
  );
}

export default LeagueData;
