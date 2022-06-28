import Users from '../database/models/user';

class Login {
  getAllUsers = async () => {
    const users = await Users.findAll();
    return users;
  };

  getOneUser = async (email: string) => {
    const users = await Users.findOne({ where: { email } });
    return users;
  };
}

export default Login;
