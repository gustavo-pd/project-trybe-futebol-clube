import Teams from '../database/models/team';

class Team {
  getAllTeams = async () => {
    const teams = await Teams.findAll();
    return teams;
  };

  getOneTeam = async (id: number) => {
    const team = await Teams.findByPk(id);
    return team;
  };
}

export default Team;
