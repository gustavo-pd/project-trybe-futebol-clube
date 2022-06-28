import LoginModel from '../models/Login.model';

class Login {
  private model = new LoginModel();

  getAllUsers = async () => {
    const allUsers = await this.model.getAllUsers();
    return allUsers;
  };

  getOneUser = async (email: string) => {
    const user = await this.model.getOneUser(email);
    return user;
  };
}

export default Login;
