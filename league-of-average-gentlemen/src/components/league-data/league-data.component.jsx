import { useEffect, useState } from 'react';
import SleeperApiService from '../../services/api/sleeper/sleeper-api.service';

const LeagueData = ({ leagueID }) => {
  const [leagueInfo, setLeagueInfo] = useState(null);

  useEffect(() => {
    async function fetchLeagueData() {
      try {
        const apiService = new SleeperApiService();
        const leagueData = await apiService.getSleeperLeagueByLeagueId(leagueID);
        setLeagueInfo(leagueData);
      } catch (error) {
        console.error('Error fetching league data:', error);
      }
    }

    fetchLeagueData();
  }, [leagueID]);

  return (
    <div>
      {LeagueData ? (
        <div>
          <h3>League Information</h3>
          <p>League Name: {leagueID.name}</p>
        </div>
      ) : (
        <p>Loading league information...</p>
      )}
    </div>
  );
};

export default LeagueData;
  
  