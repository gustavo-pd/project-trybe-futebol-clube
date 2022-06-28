import MatchesModel from '../models/Match.model';

class Match {
  private model = new MatchesModel();

  getAllMatches = async () => {
    const allMatches = await this.model.getAllMatches();
    return allMatches;
  };

  getInProgressMatches = async (query: boolean) => {
    const matches = await this.model.getInProgressMatches(query);
    return matches;
  };
}

export default Match;
