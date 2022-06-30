import Matches from '../database/models/match';
import Team from '../database/models/team';

class LeaderboardHome {
  getAllMatches = async () => {
    const allMatches = Matches.findAll();
    return allMatches;
  };

  getAllTeams = async () => {
    const allTeams = Team.findAll();
    return allTeams;
  };
}

export default LeaderboardHome;
