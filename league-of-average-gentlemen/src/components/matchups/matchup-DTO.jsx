export class MatchUpDTO {
    constructor() {
      this.starterPoints = [];
      this.starters = [];
      this.rosterId = 0; 
      this.points = 0;   
      this.players = [];
      this.matchupId = 0; 
      this.customPoints = 0; 
    }
  
    createMatchUpObject(matchupId, points, rosterId) {
      this.matchupId = matchupId;
      this.points = points;
      this.rosterId = rosterId;  
      return this;  
    }
  
    createMatchUpFromSleeper(matchup) {
      this.starterPoints = matchup.starters_points || [];
      this.starters = matchup.starters || [];
      this.rosterId = matchup.roster_id || 0; 
      this.points = matchup.points || 0;    
      this.players = matchup.players || [];
      this.matchupId = matchup.matchup_id || 0; 
      this.customPoints = matchup.custom_points || 0; 
      return this;
    }
  }

export default MatchUpDTO