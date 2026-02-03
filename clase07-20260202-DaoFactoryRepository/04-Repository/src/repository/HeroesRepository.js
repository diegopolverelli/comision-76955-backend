

// aplicar aquí DTO's, si es necesario

export class HeroesRepository{
    constructor(dao){
        this.heroesDAO=dao
    }

    async getHeroes(){
        return await this.heroesDAO.get()
    }
}