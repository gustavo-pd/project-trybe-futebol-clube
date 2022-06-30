import Matches from '../database/models/match';
import Team from '../database/models/team';
import LeaderboardModel from '../models/Leaderboard.model';
import ITable from '../interfaces/ITable.interface';

const model = new LeaderboardModel();

class LeaderboardAway {
  private teams: Team[];
  private matches: Matches[];
  private arrayTeams: ITable[] = [];
  private victories: number;
  private draws: number;
  private loss: number;
  private points: number;
  private goalsFavor: number;
  private goalsOwn: number;
  private goalsBalance: number;
  private efficiency: number;

  private getData = async () => {
    this.teams = await model.getAllTeams();
    this.matches = await model.getAllMatches();
  };

  private getGamesPlayed = (id: number | undefined) => {
    const totalGames = this.matches.filter((match) =>
      match.awayTeam === id && match.inProgress === false);
    return totalGames;
  };

  private getGoals = (id: number | undefined) => {
    const allGames = this.getGamesPlayed(id);
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;

    allGames.map((g) => {
      this.goalsFavor += g.awayTeamGoals;
      this.goalsOwn += g.homeTeamGoals;
      this.goalsBalance = this.goalsFavor - this.goalsOwn;
      return this.goalsFavor;
    });
    return { goalsFavor: this.goalsFavor };
  };

  private getPoints = (id: number | undefined) => {
    const games = this.getGamesPlayed(id);
    this.points = 0;
    this.victories = 0;
    this.draws = 0;
    this.loss = 0;
    games.map((g) => {
      if (g.homeTeamGoals === g.awayTeamGoals) {
        this.points += 1;
        this.draws += 1;
      }
      if (g.homeTeamGoals < g.awayTeamGoals) {
        this.points += 3;
        this.victories += 1;
      }
      if (g.homeTeamGoals > g.awayTeamGoals) this.loss += 1;
      return this.points;
    });
    return { points: this.points };
  };

  private getEfficiency = (id: number | undefined) => {
    const totalGames = this.getGamesPlayed(id);
    const { points } = this.getPoints(id);

    const efficiencyFormula = ((points / (totalGames.length * 3)) * 100);
    this.efficiency = Number(efficiencyFormula.toFixed(2));

    return this.efficiency;
  };

  private leaderboardTable = () => {
    this.arrayTeams = [];
    this.teams.map((t) => {
      const home = {
        name: t.teamName,
        totalPoints: this.getPoints(t.id).points,
        totalGames: this.getGamesPlayed(t.id).length,
        totalVictories: this.victories,
        totalDraws: this.draws,
        totalLosses: this.loss,
        goalsFavor: this.getGoals(t.id).goalsFavor,
        goalsOwn: this.goalsOwn,
        goalsBalance: this.goalsBalance,
        efficiency: this.getEfficiency(t.id),
      };
      this.arrayTeams = [...this.arrayTeams, home];
      return this.arrayTeams;
    });

    return this.arrayTeams;
  };

  getLeaderboard = async () => {
    await this.getData();
    const leaderboard = this.leaderboardTable();

    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn);
    return leaderboard;
  };
}

export default LeaderboardAway;
