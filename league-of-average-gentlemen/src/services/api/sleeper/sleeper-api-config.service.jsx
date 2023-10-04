
const SleeperApiConfig = () => {
    const apiConfig = {
      getSleeperUsernameEndpoint: 'https://api.sleeper.app/v1/users/',
      getSleeperLeagueEndpoint: 'https://api.sleeper.app/v1/leagues/',
      getSleeperDraftEndpoint: 'https://api.sleeper.app/v1/drafts/',
      getSleeperStatsEndpoint: 'https://api.sleeper.app/v1/stats/',
      getSleeperNFLStateEndpoint: 'https://api.sleeper.app/v1/state/nfl/',
      getSleeperProjectionsEndpoint: 'https://api.sleeper.app/v1/projections/',
      getSleeperPlayersEndpoint: 'https://api.sleeper.app/v1/players/',
    };
  
    return apiConfig;
  };
  
  export default SleeperApiConfig;