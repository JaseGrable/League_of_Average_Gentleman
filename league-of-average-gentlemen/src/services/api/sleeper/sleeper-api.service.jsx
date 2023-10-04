import { useEffect, useState } from 'react';
import SleeperApiConfig from './sleeper-api-config.service';

const SleeperApiService = () => {
  const [apiConfig] = useState(SleeperApiConfig());

  const getSleeperUserInformation = (userName) => {
    const endpoint = apiConfig.getSleeperUsernameEndpoint + userName;
    return fetch(endpoint).then((response) => response.json());
  };

  const getSleeperLeaguesByUserID = (userId, year) => {
    const endpoint = `${apiConfig.getSleeperUsernameEndpoint}${userId}/leagues/nfl/${year}`;
    return fetch(endpoint).then((response) => response.json());
  };

  const getSleeperLeagueByLeagueId = async (leagueId) => {
    try {
      const endpoint = `${apiConfig.getSleeperLeagueEndpoint}${leagueId}`;
      const response = await fetch(endpoint);
      const league = await response.json();

      const leagueDTO = new leagueDTO().fromSleeper(
        league.roster_positions,
        league.league_id,
        league.total_rosters,
        league.roster_positions,
        league.previous_league_id,
        league.status,
        league.season,
        league.metadata,
        league.settings,
        league.scoring_settings,
      );

      return leagueDTO;
    } catch (error) {
      console.error('Error fetching sleeper league:', error);
      throw error;
    }
  };

  return {
    getSleeperUserInformation,
    getSleeperLeaguesByUserID,
    getSleeperLeagueByLeagueId,

  };
};

export default SleeperApiService