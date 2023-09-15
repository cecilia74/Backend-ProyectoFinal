import { userMongoose } from './models/users.mongoose.js';

class UserModel {
  async getUser(username) {
    try {
      const user = await userMongoose.findOne({ email: username }).exec();
      return user;
    } catch (error) {
      throw new Error('Error al obtener el usuario');
    }
  }

  async createUser(newUser) {
    try {
      const user = await userMongoose.create(newUser);
      return user;
    } catch (error) {
      throw new Error('Error al crear el usuario');
    }
  }

  async getUserById(id) {
    try {
      const user = await userMongoose.findById(id).exec();
      return user;
    } catch (error) {
      throw new Error('Error al obtener el usuario');
    }
  }
}

export const userModel = new UserModel();