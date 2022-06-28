import TeamModel from '../models/Team.model';

class Team {
  private model = new TeamModel();

  getAllTeams = async () => {
    const allTeams = await this.model.getAllTeams();
    return allTeams;
  };

  getOneTeam = async (id: number) => {
    const team = await this.model.getOneTeam(id);
    return team;
  };
}

export default Team;
