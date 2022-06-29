import IMatch from '../interfaces/IMatch.interface';
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

  createMatch = async (match: IMatch): Promise <IMatch> => {
    const newMatch = await Matches.create(match);
    return newMatch;
  };

  updateProgressMatch = async (id: string) => {
    await Matches.update({ inProgress: false }, { where: { id } });
  };

  editMatch = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };
}

export default Match;
