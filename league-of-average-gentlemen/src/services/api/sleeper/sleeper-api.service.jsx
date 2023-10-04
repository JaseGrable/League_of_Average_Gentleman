import { useEffect, useState } from 'react';
import SleeperApiConfig from './sleeper-api-config.service';
import leagueDTO from '../../../../league-data-league-DTO';

const SleeperApiService = () => {
  const apiConfig = SleeperApiConfig();

  const fetchData = async (endpoint) => {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  };

  const getSleeperUserInformation = (userName) => {
    const endpoint = `${apiConfig.getSleeperUsernameEndpoint}${userName}`;
    return fetchData(endpoint);
  };

  const getSleeperLeaguesByUserID = (userId, year) => {
    const endpoint = `${apiConfig.getSleeperUsernameEndpoint}${userId}/leagues/nfl/${year}`;
    return fetchData(endpoint);
  };

  const getSleeperLeagueByLeagueId = async (leagueId) => {
    const endpoint = `${apiConfig.getSleeperLeagueEndpoint}${leagueId}`;
    const league = await fetchData(endpoint);

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


export default SleeperApiService