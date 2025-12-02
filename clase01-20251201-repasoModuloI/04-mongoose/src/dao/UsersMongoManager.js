import { userModel } from "./models/UserModel.js";

export class UsersMongoManager{
    static async getUsers(){
        return await userModel.find().lean()
    }
}