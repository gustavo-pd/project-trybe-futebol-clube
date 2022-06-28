import Matches from '../database/models/match';
import Team from '../database/models/team';

class Match {
  getAllMatches = async () => {
    const matches = await Matches.findAll({ include:
      [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ] });
    return matches;
  };

  getInProgressMatches = async (query: boolean) => {
    const matches = await Matches.findAll({ where: { inProgress: query },
      include:
        [
          { model: Team, as: 'teamHome', attributes: ['teamName'] },
          { model: Team, as: 'teamAway', attributes: ['teamName'] },
        ],
    });
    return matches;
  };
}

export default Match;
