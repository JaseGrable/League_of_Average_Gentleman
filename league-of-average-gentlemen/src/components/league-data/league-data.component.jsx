import { useState, useEffect } from 'react';

const LeagueData = ({ leagueID, children }) => {
    const [leagueData, setLeagueData] = useState(null);
    const [users, setUsers] = useState([]);
    const apiUrl = `https://api.sleeper.app/v1/league/${leagueID}`;
  
    useEffect(() => {
      if (leagueID) {
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            setLeagueData(data);
  
            // Fetch list of users in the league
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
  
    return children({ leagueData, users });
  };
  
  export default LeagueData;