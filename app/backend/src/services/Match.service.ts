import IMatch from '../interfaces/IMatch.interface';
import MatchesModel from '../models/Match.model';
import Token from '../auth/Token';

class Match {
  private model = new MatchesModel();
  private token = new Token();

  getAllMatches = async () => {
    const allMatches = await this.model.getAllMatches();
    return allMatches;
  };

  getInProgressMatches = async (query: boolean) => {
    const matches = await this.model.getInProgressMatches(query);
    return matches;
  };

  createMatch = async (auth: string, match: IMatch) => {
    await this.token.tokenVerify(auth);
    const newMatch = await this.model.createMatch(match);
    return newMatch;
  };

  updateProgressMatch = async (id: string) => {
    await this.model.updateProgressMatch(id);
  };
}

export default Match;
