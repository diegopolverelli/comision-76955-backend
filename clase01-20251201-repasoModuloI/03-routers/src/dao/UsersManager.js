import { usuarios } from "../data/users.js";

export class UsersManager{

    static async getUsers(){
        return usuarios
    }

    static async createUser(user){
        let id=1
        if(usuarios.length>0){
            id=Math.max(...usuarios.map(d=>d.id))+1   // ... son aquí el op. spread
        }

        let nuevoUsuario={
            id, 
            ...user
        }

        usuarios.push(nuevoUsuario)

        return nuevoUsuario
    }
}