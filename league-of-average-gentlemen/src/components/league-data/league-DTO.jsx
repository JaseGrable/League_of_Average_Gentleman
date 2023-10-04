class LeagueDTO {
    constructor(
      rosterPositions,
      leagueId,
      totalRosters,
      previousLeagueId,
      status,
      season,
      metadata,
      settings,
      scoringSettings
    ) {
      this.rosterPositions = rosterPositions;
      this.leagueId = leagueId;
      this.totalRosters = totalRosters;
      this.previousLeagueId = previousLeagueId;
      this.status = status;
      this.season = season;
      this.metadata = metadata;
      this.settings = settings;
      this.scoringSettings = scoringSettings;
    }
  
    static async fetchLeagueData(leagueId) {
      try {
        const endpoint = `https://api.sleeper.app/v1/leagues/${leagueId}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const leagueData = await response.json();
  
        // Map the league data using the LeagueDTO class
        const leagueDTO = LeagueDTO.fromSleeper(leagueData);
  
        // Return the mapped data
        return leagueDTO;
      } catch (error) {
        console.error('Error fetching league data:', error);
        throw error;
      }
    }
  
    static fromSleeper(apiData) {
      return new LeagueDTO(
        apiData.roster_positions,
        apiData.league_id,
        apiData.total_rosters,
        apiData.previous_league_id,
        apiData.status,
        apiData.season,
        apiData.metadata,
        apiData.settings,
        apiData.scoring_settings
      );
    }
  }
  
  export default LeagueDTO;