import React from 'react';
import LeagueData from '../league-data/league-data.component';
import Matchups from '../matchups/matchups.component';
import { CurrentWeekProvider } from '../current-week-provider/current-week-provider';

const Home = () => {
  return (
    <React.Fragment>
      <CurrentWeekProvider>
        <div>
          <LeagueData/>
          <Matchups leagueID="917997436273356800" week={CurrentWeekProvider} />
        </div>
      </CurrentWeekProvider>
    </React.Fragment>
  );
};

export default Home;