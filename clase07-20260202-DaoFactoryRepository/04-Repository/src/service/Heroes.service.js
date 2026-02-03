

export class HeroesService{
    constructor(repositoryHeroes, repositoryPublisher){
        this.heroesRepository=repositoryHeroes
        this.publisherRepository=repositoryPublisher
    }

    async getHeroes(){
        return await this.heroesRepository.getHeroes()
    }

    async informe(){
        let publishers=await this.publisherRepository.getPublisher()
        let heroes=await this.heroesRepository.getHeroes()

        publishers=publishers.map(p=>{
            return {
                idPublisher: p, 
                heroes: (heroes.filter(h=>h.publisher==p)).map(h=>h.name)
            }
        })

        return publishers
    }
}