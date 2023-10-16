import React from 'react';
import LeagueData from '../league-data/league-data.component';
import { CurrentWeekProvider } from '../current-week-provider/current-week-provider';

const Home = () => {
  return (
    <CurrentWeekProvider>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ flex: '0 0 250px', background: '#f2f2f2', padding: '20px' }}>
          <LeagueData />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '20px' }}>
          {/* Your main content here */}
        </div>
      </div>
    </CurrentWeekProvider>
  );
};

export default Home;
