export class UsersDTO{
    constructor(usuario){
        this.first_name=usuario.nombre.toUpperCase()
        this.last_name=usuario.apellido.toUpperCase()
        this.full_name=`${this.first_name} ${this.last_name}`
        this.email=usuario.email
        this.role="user"
        this.username=usuario.email.split("@")[0]
    }
}