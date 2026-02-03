import { UsersDTO } from "./UsersDTO.js"

const userRequest={
    nombre: "Juan", 
    apellido: "Fernandez", 
    email: "jfernandez@test.com"
}

console.log({userRequest})

let userDB=new UsersDTO(userRequest)

console.log(userDB)


// usersDAO.create(userDB)