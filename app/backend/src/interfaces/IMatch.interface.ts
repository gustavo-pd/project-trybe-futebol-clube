import Match from '../database/models/match';

interface IMatch extends Match {
  teamHome: object;
  teamAway: object;
}

export default IMatch;
