import { Model, STRING } from 'sequelize';
import db from '.';
import Match from './match';

class Team extends Model {
  teamName: string;
}

Team.init({
  teamName: STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Team;
