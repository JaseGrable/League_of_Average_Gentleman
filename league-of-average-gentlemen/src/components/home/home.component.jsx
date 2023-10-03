import React from 'react';
import { useState, useEffect } from 'react';
import LeagueData from '../league-data/league-data.component';

const Home = () => {
    const [leagueName, setLeagueName] = useState(null);
  
    useEffect(() => {
      // Fetch the league name from the API
      fetchLeagueName();
  
      async function fetchLeagueName() {
        try {
          const response = await fetch(`https://api.sleeper.app/v1/league/917997436273356800`);
          const data = await response.json();
  
          if (data.name) {
            setLeagueName(data.name);
          }
        } catch (error) {
          console.error('Error fetching league name:', error);
        }
      }
    }, []);
  
    return (
        <div>
          <LeagueData leagueID="917997436273356800" leagueName={leagueName}>
            {({ leagueData, users }) => (
              <>
                {leagueData && (
                  <div>
                    <h2>Welcome to {leagueData.name}</h2>
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
              </>
            )}
          </LeagueData>
        </div>
      );
                      }      
  
  export default Home;

