

export class PublisherRepository{
    constructor(dao){
        this.publisherDAO=dao
    }

    async getPublisher(){
        return await this.publisherDAO.get()
    }
}