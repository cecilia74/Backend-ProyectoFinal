import importModels from "../DAO/factory.js";

const models = await importModels();

const usersModel = models.users;

class UserService {
    async getUser(username) {
        const user = await usersModel.getUser(username)
        return user;
    }

    async createUser(newUser) {
        const user = await usersModel.createUser(newUser);
        return user;
    }

    async getUserById(id) {
        const user = await usersModel.getUserById(id);
        return user;
    }
}

export const userService = new UserService();
