import React from 'react';
import LeagueData from '../league-data/league-data.component';
import Matchups from '../matchups/matchups.component';

const Home = () => {
  return (
    <div>
      <LeagueData leagueID="917997436273356800" />
      <Matchups leagueID="917997436273356800" week={5} />
    </div>
  );
};

export default Home;
