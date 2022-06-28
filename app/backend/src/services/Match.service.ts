import MatchesModel from '../models/Match.model';

class Match {
  private model = new MatchesModel();

  getAllMatches = async () => {
    const allMatches = await this.model.getAllMatches();
    return allMatches;
  };
}

export default Match;
