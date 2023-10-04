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