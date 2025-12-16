import { userModel } from "./models/UserModel.js";

export class UsersMongoManager{
    static async getUsers(){
        return await userModel.find().lean()
    }

    static async createUser(user){
        let nuevoUsuario=await userModel.create(user)
        return nuevoUsuario.toJSON()
    }
}