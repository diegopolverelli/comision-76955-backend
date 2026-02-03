import { MemoryHeroesDAO } from "../dao/memoryHeroesDAO.js";
import { PublisherDAO } from "../dao/memoryPublisherDAO.js";
import { HeroesRepository } from "../repository/HeroesRepository.js";
import { PublisherRepository } from "../repository/PublisherRepository.js";
import { HeroesService } from "./Heroes.service.js";

const heroesDAO=new MemoryHeroesDAO()
const heroesRepository=new HeroesRepository(heroesDAO)


const publisherRepo=new PublisherRepository(PublisherDAO)

export const heroesService=new HeroesService(heroesRepository, publisherRepo)