import React from 'react';
import LeagueData from '../league-data/league-data.component';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <p>This is the home page content.</p>

      <LeagueData leagueID="917997436273356800">
        {({ leagueData, users }) => (
          <>
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
          </>
        )}
      </LeagueData>
    </div>
  );
};

export default Home;
